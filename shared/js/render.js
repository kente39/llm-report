/* =========================================================
   js/render.js — 블록 배열 → DOM
   SCHEMA.md 의 7종 블록(title/text/image/table/code/label/chat)을
   위→아래 순서로 그린다. 마크다운 출력기(serialize)와 같은 규칙을 따른다.
   ========================================================= */

(function (global) {
  'use strict';

  var Render = {};

  /* --- 공통 헬퍼 --------------------------------------- */

  // 텍스트를 안전하게 넣은 엘리먼트 생성
  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  // 인라인 마크다운(**강조**, `코드`, [링크]) 만 최소 변환.
  // 블록 레벨(표/헤딩)은 각 블록 타입이 담당하므로 여기서 다루지 않는다.
  function inlineMd(s) {
    return escapeHtml(s)
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* --- 블록 타입별 렌더러 ------------------------------- */

  // 1) title — 표지
  function renderTitle(b) {
    var wrap = el('div', 'block block--title');
    wrap.appendChild(el('h1', 'title-main', b.main));
    if (b.sub) wrap.appendChild(el('p', 'title-sub', b.sub));
    return wrap;
  }

  // 2) text — h1~h3 / p (p 안의 '- ' 목록과 줄바꿈도 렌더)
  function renderText(b) {
    // 헤딩은 인라인 변환 불필요
    if (b.tag && b.tag !== 'p') {
      var h = el(b.tag, 'block block--text');
      h.textContent = b.value;
      return h;
    }

    var val = b.value || '';
    var lines = val.split('\n');
    var isList = lines.every(function (l) {
      return l.trim() === '' || /^\s*-\s+/.test(l);
    }) && /^\s*-\s+/.test(val);

    // 전부 '- ' 로 시작하면 목록으로
    if (isList) {
      var ul = el('ul', 'block block--text block--list');
      lines.forEach(function (l) {
        if (l.trim() === '') return;
        var li = el('li');
        li.innerHTML = inlineMd(l.replace(/^\s*-\s+/, ''));
        ul.appendChild(li);
      });
      return ul;
    }

    // 목록이 아니면 문단. 내부 줄바꿈은 <br> 로.
    var node = el('p', 'block block--text');
    node.innerHTML = val.split('\n').map(inlineMd).join('<br>');
    return node;
  }

  // 3) image — 캡션 + (zoomable 이면) 라이트박스 연결
  //    placeholder:true 면 실제 파일 대신 회색 박스 (이미지 준비 전)
  function renderImage(b) {
    var fig = el('figure', 'block block--image');

    if (b.placeholder) {
      var ph = el('div', 'image-placeholder', b.caption || 'image');
      fig.appendChild(ph);
      return fig;
    }

    var img = el('img');
    img.src = b.src;
    img.alt = b.caption || '';
    img.loading = 'lazy';
    if (b.zoomable) {
      img.className = 'zoomable';
      img.addEventListener('click', function () {
        if (global.Lightbox) global.Lightbox.open(b.src, b.caption);
      });
    }
    fig.appendChild(img);
    if (b.caption) fig.appendChild(el('figcaption', null, b.caption));
    return fig;
  }

  // 4) table — 단순 격자, 셀 mark 는 옅은 배경색(웹 전용)
  function renderTable(b) {
    var table = el('table', 'block block--table');
    var thead = el('thead'), htr = el('tr');
    b.headers.forEach(function (h) { htr.appendChild(el('th', null, h)); });
    thead.appendChild(htr);
    table.appendChild(thead);

    var tbody = el('tbody');
    b.rows.forEach(function (row) {
      var tr = el('tr');
      row.forEach(function (c) {
        var isObj = c && typeof c === 'object';
        var td = el('td', isObj && c.mark ? 'mark-' + c.mark : null,
                    isObj ? c.t : c);
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    return table;
  }

  // 5) code — 고정폭, 가로 스크롤
  function renderCode(b) {
    var pre = el('pre', 'block block--code');
    var code = el('code', b.lang ? 'lang-' + b.lang : null, b.value);
    pre.appendChild(code);
    return pre;
  }

  // 6) label — 상단 뱃지
  function renderLabel(b) {
    return el('span', 'block block--label label-' + (b.color || 'gray'), b.value);
  }

  // 7) chat — chat.js 에 위임 (없으면 최소 표시)
  function renderChat(b) {
    if (global.Chat) return global.Chat.render(b);
    return el('div', 'block block--chat', '[chat]');
  }

  // 8) nav — 서브페이지 바로가기 탭 (첫 페이지에만 배치)
  //    클릭 시 Nav.jumpSub 로 같은 섹션 내 점프. 방향키 선형 이동과 충돌하지 않는다.
  function renderNav(b, ctx) {
    var box = el('div', 'block block--nav');
    var currentSub = ctx && ctx.subNumber; // 현재 서브페이지 번호
    (b.tabs || []).forEach(function (tab) {
      var btn = el('button', 'nav-tab', tab.label);
      btn.type = 'button';
      if (tab.sub === currentSub) btn.classList.add('current');
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (global.Nav) global.Nav.jumpSub(tab.sub);
      });
      box.appendChild(btn);
    });
    return box;
  }

  // 9) hub — 모델 선택 허브 (카드 = 이미지 + 라벨, 통째로 클릭 시 점프)
  //    첫 페이지 전용. 좌우 클릭영역보다 위에 떠서 클릭이 카드에 닿는다.
  function renderHub(b) {
    var wrap = el('div', 'block block--hub');
    (b.cards || []).forEach(function (card) {
      // card: { label, sub, src, placeholder }
      var c = el('button', 'hub-card');
      c.type = 'button';

      var thumb;
      if (card.placeholder || !card.src) {
        thumb = el('div', 'hub-thumb hub-thumb--ph', card.label);
      } else {
        thumb = el('img', 'hub-thumb');
        thumb.src = card.src;
        thumb.alt = card.label;
        thumb.loading = 'lazy';
      }
      c.appendChild(thumb);
      c.appendChild(el('span', 'hub-label', card.label));

      c.addEventListener('click', function (e) {
        e.stopPropagation();
        if (global.Nav) global.Nav.jumpSub(card.sub);
      });
      wrap.appendChild(c);
    });
    return wrap;
  }

  var MAP = {
    title: renderTitle, text: renderText, image: renderImage,
    table: renderTable, code: renderCode, label: renderLabel,
    chat: renderChat, nav: renderNav, hub: renderHub
  };

  /* --- 진입점 ------------------------------------------ */

  // blocks 배열을 컨테이너에 그린다. ctx: { subNumber } — nav 블록의 현재탭 강조용
  Render.page = function (container, blocks, ctx) {
    container.innerHTML = '';
    var has = blocks && blocks.length > 0;
    container.classList.toggle('has-content', !!has);

    if (!has) {
      // 빈 페이지(미작성)면 위치 라벨만 중앙에
      container.classList.remove('sparse');
      container.appendChild(el('h1', 'page-label', container.dataset.label || ''));
      return;
    }

    // 콘텐츠가 적은 페이지(표·이미지·코드·대화·허브 없이 라벨+짧은 문단 위주)는
    // 카드로 감싸 "의도된 여백"으로 보이게 한다. (넓은 화면 공백 완화)
    var heavy = blocks.some(function (b) {
      return b.type === 'table' || b.type === 'chat' || b.type === 'image' ||
             b.type === 'code' || b.type === 'hub';
    });
    var sparse = !heavy && blocks.length <= 3;
    container.classList.toggle('sparse', sparse);

    // sparse 면 블록들을 하나의 카드 래퍼에 담는다
    var target = container;
    if (sparse) {
      target = el('div', 'sparse-card');
      container.appendChild(target);
    }

    blocks.forEach(function (b) {
      var fn = MAP[b.type];
      if (!fn) { console.warn('[render] 알 수 없는 블록:', b.type); return; }
      target.appendChild(fn(b, ctx));
    });
  };

  // 공통 헬퍼를 chat.js 등에서 재사용
  Render.util = { el: el, inlineMd: inlineMd, escapeHtml: escapeHtml };

  global.Render = Render;

})(window);
