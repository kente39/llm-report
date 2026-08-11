/* =========================================================
   js/chat.js — chat 블록 렌더링
   - 발췌 규칙: <!-- more --> 우선, 없으면 700자 문단 경계 (SCHEMA.md)
   - 진입 시 말풍선이 순차로 나타나는 애니메이션 (1회)
   - 방향키/클릭으로 페이지 전환 시 즉시 완료(스킵)
   ========================================================= */

(function (global) {
  'use strict';

  var Chat = {};

  var EXCERPT_LIMIT = 700;                 // 웹 발췌 글자 수 한도
  var MORE = /\n?<!--\s*more\s*-->\n?/;     // 발췌 경계 마커

  var U = null; // Render.util (el/inlineMd) — 초기화 시 연결

  /* --- 발췌: 직렬화기의 chatExcerpt 와 동일 규칙 --------- */
  function excerpt(body) {
    if (MORE.test(body)) {
      return { text: body.split(MORE)[0].trim(), cut: true };
    }
    var paras = body.split(/\n\n+/);
    var out = [], total = 0;
    for (var i = 0; i < paras.length; i++) {
      if (out.length && total + paras[i].length > EXCERPT_LIMIT) {
        return { text: out.join('\n\n'), cut: true };
      }
      out.push(paras[i]); total += paras[i].length;
    }
    return { text: body.trim(), cut: false };
  }

  /* --- 본문(마크다운 일부) → DOM ------------------------ */
  // chat body 안에는 문단/표/코드펜스/목록이 올 수 있다.
  // 발췌는 700자 이하라 가벼운 블록 파서로 충분하다.
  function bodyToNodes(md) {
    var frag = document.createDocumentFragment();
    var lines = md.split('\n');
    var i = 0;

    while (i < lines.length) {
      var line = lines[i];

      // 코드펜스
      if (/^```/.test(line)) {
        var lang = line.replace(/^```/, '').trim();
        var buf = [];
        i++;
        while (i < lines.length && !/^```/.test(lines[i])) { buf.push(lines[i]); i++; }
        i++; // 닫는 펜스
        var pre = U.el('pre', 'chat-code');
        pre.appendChild(U.el('code', lang ? 'lang-' + lang : null, buf.join('\n')));
        frag.appendChild(pre);
        continue;
      }

      // 표 (| ... | 로 시작하고 다음 줄이 구분선)
      if (/^\s*\|/.test(line) && i + 1 < lines.length && /^\s*\|[\s:|-]+\|/.test(lines[i + 1])) {
        var rows = [];
        while (i < lines.length && /^\s*\|/.test(lines[i])) { rows.push(lines[i]); i++; }
        frag.appendChild(buildTable(rows));
        continue;
      }

      // 목록
      if (/^\s*[-*]\s+/.test(line)) {
        var ul = U.el('ul', 'chat-list');
        while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
          var li = U.el('li');
          li.innerHTML = U.inlineMd(lines[i].replace(/^\s*[-*]\s+/, ''));
          ul.appendChild(li); i++;
        }
        frag.appendChild(ul);
        continue;
      }

      // 빈 줄
      if (line.trim() === '') { i++; continue; }

      // 표로 시작하지만 구분선이 없어 표가 아닌 파이프 줄(| a | b |)은
      // 그냥 한 줄 텍스트로 처리한다. (이 처리를 빼면 아래 문단 루프가
      // 파이프 줄에서 전진하지 못해 무한루프에 빠진다)
      if (/^\s*\|/.test(line)) {
        var pipeP = U.el('p');
        pipeP.innerHTML = U.inlineMd(line);
        frag.appendChild(pipeP);
        i++;
        continue;
      }

      // 일반 문단 (빈 줄 전까지)
      var para = [];
      while (i < lines.length && lines[i].trim() !== '' &&
             !/^```/.test(lines[i]) && !/^\s*\|/.test(lines[i]) &&
             !/^\s*[-*]\s+/.test(lines[i])) {
        para.push(lines[i]); i++;
      }
      // 안전장치: 어떤 이유로든 전진하지 못하면 강제로 한 줄 소비
      if (para.length === 0) { i++; continue; }
      var p = U.el('p');
      p.innerHTML = U.inlineMd(para.join(' '));
      frag.appendChild(p);
    }
    return frag;
  }

  function buildTable(rows) {
    var table = U.el('table', 'chat-table');
    var parse = function (r) {
      return r.trim().replace(/^\||\|$/g, '').split('|').map(function (c) { return c.trim(); });
    };
    var head = parse(rows[0]);
    var thead = U.el('thead'), htr = U.el('tr');
    head.forEach(function (h) { htr.appendChild(U.el('th', null, h)); });
    thead.appendChild(htr); table.appendChild(thead);

    var tbody = U.el('tbody');
    rows.slice(2).forEach(function (r) {
      var tr = U.el('tr');
      parse(r).forEach(function (c) {
        var td = U.el('td'); td.innerHTML = U.inlineMd(c); tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    return table;
  }

  /* --- 말풍선 하나 ------------------------------------- */
  function bubble(msg, sourceHref, full) {
    var isUser = msg.role === 'user';
    var wrap = U.el('div', 'chat-msg ' + (isUser ? 'chat-msg--user' : 'chat-msg--ai'));

    var meta = U.el('div', 'chat-meta');
    if (isUser) {
      meta.textContent = '🧑 User';
    } else {
      meta.textContent = '🤖 ' + (msg.model || 'AI');
      if (msg.version) {
        var v = U.el('span', 'chat-ver', msg.version);
        meta.appendChild(v);
      }
    }
    wrap.appendChild(meta);

    // full 모드면 전문 표시 (섹션 6 통찰 등 발췌하면 안 되는 경우)
    var ex = full ? { text: msg.body.trim(), cut: false } : excerpt(msg.body);
    var bodyBox = U.el('div', 'chat-body');
    bodyBox.appendChild(bodyToNodes(ex.text));

    // 발췌로 잘렸으면 전문 링크
    if (ex.cut && sourceHref) {
      var more = U.el('a', 'chat-more', '전문 보기 →');
      more.href = sourceHref;
      bodyBox.appendChild(more);
    }
    wrap.appendChild(bodyBox);
    return wrap;
  }

  /* --- chat 블록 전체 렌더 ----------------------------- */
  Chat.render = function (b) {
    if (!U) U = global.Render.util;

    var box = U.el('div', 'block block--chat');
    b.messages.forEach(function (m) {
      box.appendChild(bubble(m, b.source, b.full));  // b.full: 전문 표시 여부
    });
    // 애니메이션 대상 표시 (main.js 가 진입 시 재생)
    box.dataset.animate = 'chat';
    return box;
  };

  /* --- 진입 애니메이션 --------------------------------- */
  // 컨테이너 안 말풍선을 순차로 나타나게 한다. 반환: 강제 완료 함수.
  Chat.animate = function (container) {
    var msgs = container.querySelectorAll('.chat-msg');
    if (!msgs.length) return function () {};

    // 접근성(절충): 모션 최소화 설정이면 순차 표시는 유지하되
    // 간격을 짧게 해 움직임을 최소화한다. (CSS 가 슬라이드 없이 페이드만 처리)
    var reduce = global.matchMedia &&
                 global.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var step = reduce ? 120 : 260;

    var timers = [];
    var done = false;

    function finish() {
      if (done) return;
      done = true;
      timers.forEach(clearTimeout);
      Array.prototype.forEach.call(msgs, function (m) { m.classList.add('shown'); });
    }

    Array.prototype.forEach.call(msgs, function (m, idx) {
      m.classList.remove('shown');
      timers.push(setTimeout(function () { m.classList.add('shown'); }, idx * step));
    });

    return finish; // 방향키/클릭 시 호출 → 즉시 완료(스킵)
  };

  global.Chat = Chat;

})(window);
