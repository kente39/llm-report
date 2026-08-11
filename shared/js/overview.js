/* =========================================================
   overview.js — 전체 구조 격자 맵 (ESC 로 열고 닫음)
   가로 = 섹션(좌→우), 세로 = 서브페이지(위→아래).
   칸을 클릭하면 그 페이지로 점프하고 닫힌다.
   ESC / 배경 클릭 두 방법으로 닫는다.
   ========================================================= */
(function (global) {
  'use strict';

  var Overview = {};
  var el;              // Render.util.el
  var overlay = null;  // 오버레이 DOM (열려 있을 때만 존재)

  function isOpen() { return !!overlay; }

  // 격자 생성: 섹션을 열(column), 서브페이지를 행(row)으로
  function buildGrid() {
    var Nav = global.Nav;
    var sections = Nav.sections;

    var grid = el('div', 'ov-grid');
    // 각 섹션 = 세로 열. 열 안에 서브페이지 칸을 위→아래로.
    sections.forEach(function (sec, si) {
      var col = el('div', 'ov-col');

      // 섹션 헤더 (번호 · 제목)
      var head = el('div', 'ov-col-head', (si + 1) + '. ' + (sec.navTitle || ''));
      col.appendChild(head);

      (sec.subPages || []).forEach(function (sub, pi) {
        var cell = el('button', 'ov-cell');
        cell.type = 'button';

        // 현재 위치 강조
        if (si === Nav.sectionIndex && pi === Nav.subIndex) {
          cell.classList.add('ov-current');
        }

        // 칸 내용: 서브페이지 제목(없으면 페이지 번호)
        var label = sub.title || ('· ' + (pi + 1));
        cell.appendChild(el('span', 'ov-cell-label', label));

        // 클릭 → 그 페이지로 점프 후 닫기
        cell.addEventListener('click', function (e) {
          e.stopPropagation();
          Overview.close();
          Nav.goTo(sec.id, pi + 1);
        });

        col.appendChild(cell);
      });

      grid.appendChild(col);
    });

    return grid;
  }

  Overview.open = function () {
    if (isOpen()) return;
    if (!el) el = global.Render.util.el;

    overlay = el('div', 'ov-overlay');

    var panel = el('div', 'ov-panel');
    panel.appendChild(el('div', 'ov-title', '전체 구조'));
    panel.appendChild(el('div', 'ov-hint', 'ESC 또는 바깥을 눌러 닫기 · 칸을 눌러 이동'));
    panel.appendChild(buildGrid());

    overlay.appendChild(panel);

    // 배경(패널 바깥) 클릭 시 닫기
    overlay.addEventListener('click', function () { Overview.close(); });
    // 패널 안 클릭은 전파 막아 닫히지 않게
    panel.addEventListener('click', function (e) { e.stopPropagation(); });

    document.body.appendChild(overlay);
    // 다음 프레임에 활성 클래스 (트랜지션용)
    void overlay.offsetWidth;
    overlay.classList.add('ov-open');
  };

  Overview.close = function () {
    if (!isOpen()) return;
    var node = overlay;
    overlay = null;
    node.classList.remove('ov-open');
    // 트랜지션 후 제거
    setTimeout(function () {
      if (node && node.parentNode) node.parentNode.removeChild(node);
    }, 200);
  };

  Overview.toggle = function () {
    if (isOpen()) this.close(); else this.open();
  };

  Overview.isOpen = isOpen;

  global.Overview = Overview;

})(window);
