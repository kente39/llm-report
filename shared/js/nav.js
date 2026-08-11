/* =========================================================
   js/nav.js — 네비게이션 로직
   - 좌표 상태(섹션 index / 서브 index) 관리
   - 입력 처리 (방향키 / 클릭영역 / 스와이프 / 홈버튼)
   - URL 해시 라우팅 (#섹션ID-서브번호)
   * 여기서는 "정의"만 하고, 실제 시작은 main.js 가 Nav.init() 으로 한다.
   ========================================================= */

(function (global) {
  'use strict';

  var SWIPE_THRESHOLD = 50; // 스와이프 인정 최소 이동거리(px)

  var Nav = {
    sections: [],      // main.js 가 넘겨준 SECTIONS_DATA
    sectionIndex: 0,   // 현재 섹션의 배열 위치 (0-based)
    subIndex: 0,       // 현재 서브페이지 위치 (0-based)
    onChange: null,    // 위치 변경 시 호출되는 콜백
    _lockHash: false,  // 내부에서 해시를 바꿀 때 hashchange 무시용 플래그
    _touch: null       // 터치 시작 좌표
  };

  /* ---------------------------------------------------------
     초기화
     --------------------------------------------------------- */
  Nav.init = function (sections, onChange) {
    this.sections = sections;
    this.onChange = onChange || function () {};

    this._bindKeyboard();
    this._bindHitzones();
    this._bindHomeButton();
    this._bindSwipe();
    this._bindHashChange();

    // 새로고침 / 직접 접속 시 해시 위치로 복원 (없거나 잘못되면 #1-1)
    this._restoreFromHash();
  };

  /* ---------------------------------------------------------
     조회 헬퍼
     --------------------------------------------------------- */

  // 현재 섹션 객체
  Nav.current = function () {
    return this.sections[this.sectionIndex];
  };

  // 현재 섹션의 서브페이지 총 개수 — 항상 데이터 길이로 동적 계산 (하드코딩 금지)
  Nav.subTotal = function () {
    return this.current().subPages.length;
  };

  /* ---------------------------------------------------------
     이동 명령
     --------------------------------------------------------- */

  // 섹션 이동: 양끝에서는 멈춤 / 이동 성공 시 첫 서브페이지(0)로 리셋
  Nav.moveSection = function (delta) {
    var next = this.sectionIndex + delta;
    if (next < 0 || next > this.sections.length - 1) return; // 양끝 멈춤

    this.sectionIndex = next;
    this.subIndex = 0; // 새 섹션은 항상 첫 서브페이지부터
    this._update();
  };

  // 서브페이지 이동: 현재 섹션의 subPages 길이 기준, 양끝 멈춤
  Nav.moveSub = function (delta) {
    var next = this.subIndex + delta;
    if (next < 0 || next > this.subTotal() - 1) return; // 양끝 멈춤

    this.subIndex = next;
    this._update();
  };

  // 홈: 현재 섹션의 첫 서브페이지로 복귀 (섹션은 그대로)
  Nav.goHome = function () {
    if (this.subIndex === 0) return;
    this.subIndex = 0;
    this._update();
  };

  // 같은 섹션 내 특정 서브페이지로 점프 (탭 클릭용, 1-based)
  // 방향키의 moveSub 와 달리 한 번에 목표 서브로 이동한다.
  Nav.jumpSub = function (subNumber) {
    var next = subNumber - 1;
    if (next < 0 || next > this.subTotal() - 1) return; // 범위 밖 무시
    if (next === this.subIndex) return;                 // 제자리면 무시
    this.subIndex = next;
    this._update();
  };

  // 특정 위치로 직접 이동 (해시 복원용). 유효하지 않으면 false 반환
  Nav.goTo = function (sectionId, subNumber) {
    var sIdx = -1;
    for (var i = 0; i < this.sections.length; i++) {
      if (this.sections[i].id === sectionId) { sIdx = i; break; }
    }
    if (sIdx === -1) return false;

    var total = this.sections[sIdx].subPages.length;
    if (subNumber < 1 || subNumber > total) return false;

    this.sectionIndex = sIdx;
    this.subIndex = subNumber - 1;
    this._update();
    return true;
  };

  /* ---------------------------------------------------------
     상태 반영: 해시 갱신 + 콜백 호출
     --------------------------------------------------------- */
  Nav._update = function () {
    var state = {
      sectionId:     this.current().id,
      sectionNumber: this.sectionIndex + 1,
      sectionTotal:  this.sections.length,
      subNumber:     this.subIndex + 1,
      subTotal:      this.subTotal(),
      section:       this.current()
    };

    // URL 해시 갱신 (#9-1). 내부 변경이므로 hashchange 는 무시하도록 잠금
    var hash = '#' + state.sectionId + '-' + state.subNumber;
    try {
      if (global.location.hash !== hash) {
        this._lockHash = true;
        global.location.hash = hash;
      }
    } catch (err) {
      // 미리보기(iframe) 등 해시 변경이 막힌 환경 → 이동 자체는 계속 동작
      this._lockHash = false;
    }

    this.onChange(state);
  };

  /* ---------------------------------------------------------
     해시 라우팅
     --------------------------------------------------------- */

  // "#9-1" → { id:9, sub:1 } / 형식이 아니면 null
  Nav._parseHash = function () {
    var raw;
    try { raw = global.location.hash; } catch (err) { return null; }

    var m = /^#(\d+)-(\d+)$/.exec(raw);
    if (!m) return null;
    return { id: parseInt(m[1], 10), sub: parseInt(m[2], 10) };
  };

  // 해시 기준으로 위치 복원. 잘못된 해시는 첫 섹션 1-1 로 fallback
  Nav._restoreFromHash = function () {
    var parsed = this._parseHash();
    if (parsed && this.goTo(parsed.id, parsed.sub)) return;

    this.sectionIndex = 0;
    this.subIndex = 0;
    this._update();
  };

  // 브라우저 뒤로가기 등 외부 해시 변경 대응
  Nav._bindHashChange = function () {
    var self = this;
    global.addEventListener('hashchange', function () {
      // 내부 이동이 만든 해시 변경이면 무시
      if (self._lockHash) { self._lockHash = false; return; }
      self._restoreFromHash();
    });
  };

  /* ---------------------------------------------------------
     입력 1) 방향키
     --------------------------------------------------------- */
  Nav._bindKeyboard = function () {
    var self = this;
    global.addEventListener('keydown', function (e) {
      // ESC: 전체 구조 격자 맵 토글
      if (e.key === 'Escape') {
        if (global.Overview) global.Overview.toggle();
        e.preventDefault();
        return;
      }
      // 오버뷰가 열려 있으면 방향키로 페이지가 넘어가지 않도록 차단
      if (global.Overview && global.Overview.isOpen()) return;

      switch (e.key) {
        case 'ArrowLeft':  self.moveSection(-1); break;
        case 'ArrowRight': self.moveSection(+1); break;
        case 'ArrowUp':    self.moveSub(-1);     break;
        case 'ArrowDown':  self.moveSub(+1);     break;
        default: return;
      }
      e.preventDefault(); // 방향키 기본 스크롤 방지
    });
  };

  /* ---------------------------------------------------------
     입력 2) 화면 클릭 영역
     --------------------------------------------------------- */
  Nav._bindHitzones = function () {
    var self = this;
    var zones = document.querySelectorAll('.hitzone');

    Array.prototype.forEach.call(zones, function (zone) {
      zone.addEventListener('click', function () {
        switch (zone.dataset.dir) {
          case 'prevSection': self.moveSection(-1); break;
          case 'nextSection': self.moveSection(+1); break;
          case 'prevSub':     self.moveSub(-1);     break;
          case 'nextSub':     self.moveSub(+1);     break;
        }
      });
    });
  };

  /* ---------------------------------------------------------
     입력 3) 홈 버튼
     stopPropagation 으로 아래 클릭영역까지 이벤트가 내려가지 않게 막는다.
     --------------------------------------------------------- */
  Nav._bindHomeButton = function () {
    var self = this;
    var btn = document.getElementById('home-btn');
    if (!btn) return;

    btn.addEventListener('click', function (e) {
      e.stopPropagation(); // 섹션 이동 방지
      self.goHome();
    });
  };

  /* ---------------------------------------------------------
     입력 4) 모바일 스와이프
     가로/세로 이동량 중 더 큰 축 하나만 처리한다.
     --------------------------------------------------------- */
  Nav._bindSwipe = function () {
    var self = this;

    document.addEventListener('touchstart', function (e) {
      var t = e.changedTouches[0];
      self._touch = { x: t.clientX, y: t.clientY };
    }, { passive: true });

    document.addEventListener('touchend', function (e) {
      if (!self._touch) return;

      var t = e.changedTouches[0];
      var dx = t.clientX - self._touch.x;
      var dy = t.clientY - self._touch.y;
      self._touch = null;

      if (Math.abs(dx) > Math.abs(dy)) {
        // 가로 스와이프 → 섹션 이동 (왼쪽으로 밀면 다음 섹션)
        if (Math.abs(dx) < SWIPE_THRESHOLD) return;
        self.moveSection(dx < 0 ? +1 : -1);
      } else {
        // 세로 스와이프 → 서브페이지 이동 (위로 밀면 다음 서브)
        if (Math.abs(dy) < SWIPE_THRESHOLD) return;
        self.moveSub(dy < 0 ? +1 : -1);
      }
    }, { passive: true });
  };

  global.Nav = Nav;

})(window);
