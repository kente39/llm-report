/* =========================================================
   js/lightbox.js — 이미지 확대(zoomable)
   render.js 의 image 블록에서 클릭 시 호출된다.
   ESC / 배경 클릭 / 닫기 버튼으로 닫는다.
   ========================================================= */

(function (global) {
  'use strict';

  var Lightbox = {};
  var overlay = null;

  function build() {
    overlay = document.createElement('div');
    overlay.className = 'lightbox';
    overlay.innerHTML =
      '<button class="lightbox-close" aria-label="닫기">×</button>' +
      '<figure class="lightbox-figure">' +
      '  <img class="lightbox-img" alt="">' +
      '  <figcaption class="lightbox-caption"></figcaption>' +
      '</figure>';

    // 배경(오버레이 자체) 클릭 시 닫기 — 이미지 클릭은 통과시키지 않음
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) Lightbox.close();
    });
    overlay.querySelector('.lightbox-close')
           .addEventListener('click', Lightbox.close);

    global.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) Lightbox.close();
    });

    document.body.appendChild(overlay);
  }

  Lightbox.open = function (src, caption) {
    if (!overlay) build();
    overlay.querySelector('.lightbox-img').src = src;
    var cap = overlay.querySelector('.lightbox-caption');
    cap.textContent = caption || '';
    cap.style.display = caption ? '' : 'none';
    overlay.classList.add('open');
  };

  Lightbox.close = function () {
    if (overlay) overlay.classList.remove('open');
  };

  global.Lightbox = Lightbox;

})(window);
