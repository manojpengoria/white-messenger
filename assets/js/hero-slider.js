/**
 * White Messenger homepage hero slider: autoplay (6 s, driven by the progress-bar animation),
 * arrows, slide tabs, pause/play, pause on hover/focus/hidden tab, swipe and keyboard support.
 * Scales each slide visual from its 652 px design canvas. No dependencies. Markup: src/pages/hero-slider.mjs.
 */
(function () {
  'use strict';
  if (window.WMHeroSlider) return;
  window.WMHeroSlider = true;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  function initHeroSlider() {
    document.querySelectorAll('[data-hero-slider]').forEach(function (root) {
      var slides = Array.prototype.slice.call(root.querySelectorAll('[data-slide]'));
      var tabs = Array.prototype.slice.call(root.querySelectorAll('[data-slide-to]'));
      var viewport = root.querySelector('[data-slide-live]');
      var countEl = root.querySelector('[data-slide-count]');
      var toggle = root.querySelector('[data-slide-toggle]');
      var stages = root.querySelectorAll('.hs-stage');
      var total = slides.length;
      if (total < 2) return;

      var current = 0;
      var autoplay = !reduceMotion.matches;
      var userPaused = false, hoverPaused = false, focusPaused = false;
      if (!autoplay) root.classList.add('no-autoplay');

      // Scale every slide visual from its 652px design canvas to the real column width.
      function fit() {
        stages.forEach(function (s) {
          if (s.clientWidth) s.style.setProperty('--hs-scale', (s.clientWidth / 652).toFixed(4));
        });
      }
      fit();
      if ('ResizeObserver' in window) new ResizeObserver(fit).observe(root);
      else window.addEventListener('resize', fit);

      function syncPause() {
        var paused = userPaused || hoverPaused || focusPaused || document.hidden;
        root.classList.toggle('is-paused', paused);
        root.classList.toggle('is-user-paused', userPaused);
        if (toggle) toggle.setAttribute('aria-label', userPaused ? 'Play slideshow' : 'Pause slideshow');
        // Announce slide changes only while the carousel is not rotating on its own.
        viewport.setAttribute('aria-live', !autoplay || userPaused ? 'polite' : 'off');
      }

      function go(index) {
        index = (index + total) % total;
        slides.forEach(function (slide, i) {
          var on = i === index;
          slide.classList.toggle('is-active', on);
          if (on) slide.removeAttribute('aria-hidden'); else slide.setAttribute('aria-hidden', 'true');
          slide.inert = !on;
        });
        tabs.forEach(function (tab, i) {
          tab.classList.toggle('is-active', i === index);
          tab.classList.toggle('is-done', i < index);
          if (i === index) tab.setAttribute('aria-current', 'true'); else tab.removeAttribute('aria-current');
          // Restart the progress animation on the newly active bar.
          var bar = tab.querySelector('.hs-bar i');
          bar.style.animation = 'none';
          void bar.offsetWidth;
          bar.style.animation = '';
        });
        if (countEl) countEl.textContent = (index < 9 ? '0' : '') + (index + 1);
        current = index;
      }

      // Autoplay: each progress bar's animation lasts one slide interval (6 s); its end advances the slider.
      tabs.forEach(function (tab, i) {
        tab.querySelector('.hs-bar i').addEventListener('animationend', function () {
          if (autoplay && i === current) go(current + 1);
        });
        tab.addEventListener('click', function () { go(i); });
      });
      root.querySelector('[data-slide-prev]').addEventListener('click', function () { go(current - 1); });
      root.querySelector('[data-slide-next]').addEventListener('click', function () { go(current + 1); });
      if (toggle) toggle.addEventListener('click', function () { userPaused = !userPaused; syncPause(); });

      root.addEventListener('keydown', function (e) {
        if (!e.target.closest('.hs-controls')) return;
        if (e.key === 'ArrowRight') { e.preventDefault(); go(current + 1); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1); }
      });

      // Pause while the pointer is over the slide.
      viewport.addEventListener('mouseenter', function () { hoverPaused = true; syncPause(); });
      viewport.addEventListener('mouseleave', function () { hoverPaused = false; syncPause(); });
      // Keyboard focus (not mouse clicks on the controls) pauses rotation until focus leaves the slider.
      root.addEventListener('focusin', function (e) {
        var keyboard = true;
        try { keyboard = e.target.matches(':focus-visible'); } catch (err) { /* older browsers */ }
        if (keyboard) { focusPaused = true; syncPause(); }
      });
      root.addEventListener('focusout', function (e) {
        if (!root.contains(e.relatedTarget)) { focusPaused = false; syncPause(); }
      });
      document.addEventListener('visibilitychange', syncPause);

      // Touch swipe.
      var startX = null, startY = 0;
      viewport.addEventListener('pointerdown', function (e) {
        if (e.pointerType === 'mouse') return;
        startX = e.clientX; startY = e.clientY;
      });
      viewport.addEventListener('pointerup', function (e) {
        if (startX === null) return;
        var dx = e.clientX - startX, dy = e.clientY - startY;
        startX = null;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(current + (dx < 0 ? 1 : -1));
      });
      viewport.addEventListener('pointercancel', function () { startX = null; });

      go(0);
      syncPause();
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initHeroSlider);
  else initHeroSlider();
})();
