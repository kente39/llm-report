/* =========================================================
   js/main.js — 앱 초기화
   data 파일이 모두 로드된 뒤 실행된다. (index.html 로드 순서 보장)
   역할: 데이터 정렬 → Nav 시작 → 위치 변경 시 해당 페이지 블록 렌더
        → chat 진입 애니메이션 재생 및 스킵 처리
   ========================================================= */

(function (global) {
  'use strict';

  var skipAnim = null; // 현재 페이지 애니메이션 강제 완료 함수

  function boot() {
    var data = global.SECTIONS_DATA;

    if (!Array.isArray(data) || data.length === 0) {
      console.error('[main] SECTIONS_DATA 가 비어 있습니다. data 파일 로드 순서를 확인하세요.');
      return;
    }

    // 파일 로드 순서와 무관하게 id 오름차순 보장
    data.sort(function (a, b) { return a.id - b.id; });

    var pageEl      = document.getElementById('page');       // 블록이 그려질 컨테이너
    var indicatorEl = document.getElementById('indicator');

    // 위치가 바뀔 때마다 호출
    function onChange(state) {
      var sub = state.section.subPages[state.subNumber - 1] || {};

      // 페이지 라벨(빈 블록일 때 표시용)을 컨테이너에 기록
      pageEl.dataset.label = state.sectionId + '-' + state.subNumber;

      // 블록 렌더 (render.js). 블록이 비어 있으면 위치 라벨만 나온다.
      // ctx.subNumber: nav 블록의 현재 탭 강조에 사용
      global.Render.page(pageEl, sub.blocks, { subNumber: state.subNumber });

      // 페이지 전환 애니메이션 재생 — 클래스를 뗐다 붙여 CSS animation 재실행
      // reflow 를 강제해야 재생되므로 offsetWidth 를 읽는다 (가벼운 연산)
      pageEl.classList.remove('page-anim');
      void pageEl.offsetWidth;
      pageEl.classList.add('page-anim');

      // 페이지 전환 시 스크롤을 맨 위로 — 긴 페이지 다음으로 넘어가도 처음부터 보이게
      pageEl.scrollTop = 0;
      if (global.scrollTo) global.scrollTo(0, 0); // 문서 자체가 스크롤된 경우까지 대비

      // 마지막 페이지(섹션의 끝 서브페이지)면 은은한 빛 효과
      var isLastPage = (state.sectionNumber === state.sectionTotal) &&
                       (state.subNumber === state.subTotal);
      pageEl.classList.toggle('page-finale', isLastPage);

      // chat 블록이 있으면 진입 애니메이션 재생 (페이지당 1회)
      skipAnim = null;
      var chatBox = pageEl.querySelector('[data-animate="chat"]');
      if (chatBox && global.Chat) {
        skipAnim = global.Chat.animate(chatBox);
      }

      // 위치 표시기: "9 / 12  ·  1 / 4"
      indicatorEl.textContent =
        state.sectionNumber + ' / ' + state.sectionTotal +
        '  ·  ' +
        state.subNumber + ' / ' + state.subTotal;
    }

    // 방향키/클릭으로 이동 직전, 진행 중 애니메이션을 즉시 완료(스킵)
    function skipIfAnimating() {
      if (skipAnim) { skipAnim(); skipAnim = null; return true; }
      return false;
    }
    global.addEventListener('keydown', function (e) {
      if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].indexOf(e.key) !== -1) {
        skipIfAnimating();
      }
    }, true); // capture: Nav 의 keydown 보다 먼저 실행되도록
    document.addEventListener('click', function () { skipIfAnimating(); }, true);

    global.Nav.init(data, onChange);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})(window);
