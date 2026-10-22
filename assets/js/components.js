/**
 * White Messenger shared components.
 *
 * 1. Ensures the shared header and footer are present. Pages ship with them pre-rendered at
 *    build time; if a page contains an EMPTY [data-component] placeholder instead, the partial is
 *    fetched from /partials and inserted (requires http(s) — fetch is blocked on file://).
 * 2. Marks the active navigation item.
 * 3. Wires up desktop dropdown/mega menus, the mobile menu and site search.
 * Guarded so listeners are never attached twice, and tolerant of missing components.
 */
(function () {
  'use strict';
  if (window.WMComponents) return;

  var body = document.body;
  var root = body.getAttribute('data-root') || '';
  var hoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------------- Component loading ---------------- */
  function loadComponent(name) {
    var el = document.querySelector('[data-component="' + name + '"]');
    if (!el) {
      console.warn('[White Messenger] No "' + name + '" component placeholder on this page.');
      return Promise.resolve(null);
    }
    if (el.children.length) return Promise.resolve(el);
    return fetch(root + 'partials/' + name + '.html')
      .then(function (res) { if (!res.ok) throw new Error('HTTP ' + res.status); return res.text(); })
      .then(function (html) {
        var tpl = document.createElement('template');
        tpl.innerHTML = html.split('{{ROOT}}').join(root).trim();
        var node = tpl.content.firstElementChild;
        el.replaceWith(node);
        return node;
      })
      .catch(function (err) {
        console.warn('[White Messenger] Could not load the ' + name + ' component.', err);
        return null;
      });
  }

  /* ---------------- Active state ---------------- */
  function normalise(url) {
    var u = new URL(url, window.location.href);
    var p = u.pathname.endsWith('/') ? u.pathname + 'index.html' : u.pathname;
    return u.origin + p;
  }

  function setActive(header) {
    var key = body.getAttribute('data-nav');
    header.querySelectorAll('[data-nav-key]').forEach(function (el) {
      el.classList.toggle('is-active', !!key && el.getAttribute('data-nav-key') === key);
    });
    var here = normalise(window.location.href);
    header.querySelectorAll('nav a[href]').forEach(function (a) {
      if (normalise(a.href) === here) a.setAttribute('aria-current', 'page');
    });
  }

  /* ---------------- Desktop navigation ---------------- */
  function initDesktopNav(header) {
    var items = Array.prototype.slice.call(header.querySelectorAll('[data-nav-item]'));
    var timers = new WeakMap();

    function parts(item) {
      return { btn: item.querySelector('[data-nav-toggle]'), panel: item.querySelector('[data-nav-panel]') };
    }
    function isOpen(item) { return parts(item).btn.getAttribute('aria-expanded') === 'true'; }
    function close(item) {
      var p = parts(item);
      p.btn.setAttribute('aria-expanded', 'false');
      p.panel.hidden = true;
    }
    function open(item) {
      items.forEach(function (other) { if (other !== item) close(other); });
      var p = parts(item);
      p.btn.setAttribute('aria-expanded', 'true');
      p.panel.hidden = false;
    }

    items.forEach(function (item) {
      var p = parts(item);
      if (!p.btn || !p.panel) return;

      p.btn.addEventListener('click', function () { isOpen(item) ? close(item) : open(item); });
      p.btn.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          open(item);
          var first = p.panel.querySelector('a');
          if (first) first.focus();
        }
      });
      item.addEventListener('mouseenter', function () {
        if (!hoverCapable.matches) return;
        clearTimeout(timers.get(item));
        timers.set(item, setTimeout(function () { open(item); }, 80));
      });
      item.addEventListener('mouseleave', function () {
        if (!hoverCapable.matches) return;
        clearTimeout(timers.get(item));
        timers.set(item, setTimeout(function () { close(item); }, 160));
      });
      item.addEventListener('focusout', function (e) {
        if (!item.contains(e.relatedTarget)) close(item);
      });
      p.panel.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { close(item); p.btn.focus(); }
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      items.forEach(function (item) {
        if (isOpen(item)) { close(item); parts(item).btn.focus(); }
      });
    });
    document.addEventListener('click', function (e) {
      items.forEach(function (item) { if (!item.contains(e.target)) close(item); });
    });
  }

  /* ---------------- Mobile navigation ---------------- */
  function initMobileNav(header) {
    var toggle = header.querySelector('[data-mobile-toggle]');
    var menu = header.querySelector('[data-mobile-menu]');
    if (!toggle || !menu) return;

    function focusables() {
      return [toggle].concat(Array.prototype.filter.call(
        menu.querySelectorAll('a[href], button:not([disabled])'),
        function (el) { return el.offsetParent !== null; }
      ));
    }
    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      menu.hidden = !open;
      toggle.querySelector('[data-icon-open]').hidden = open;
      toggle.querySelector('[data-icon-close]').hidden = !open;
      document.documentElement.classList.toggle('overflow-hidden', open);
      if (open) {
        // Expand the current section's links for quicker orientation
        var active = menu.querySelector('[data-nav-key].is-active [data-mobile-sub-toggle]');
        if (active && active.getAttribute('aria-expanded') === 'false') active.click();
      }
    }

    toggle.addEventListener('click', function () { setOpen(toggle.getAttribute('aria-expanded') !== 'true'); });

    header.addEventListener('keydown', function (e) {
      if (toggle.getAttribute('aria-expanded') !== 'true') return;
      if (e.key === 'Escape') { setOpen(false); toggle.focus(); return; }
      if (e.key !== 'Tab') return;
      var list = focusables();
      var first = list[0], last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    menu.querySelectorAll('[data-mobile-sub-toggle]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var sub = document.getElementById(btn.getAttribute('aria-controls'));
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        if (sub) sub.hidden = expanded;
      });
    });

    window.matchMedia('(min-width: 1280px)').addEventListener('change', function (e) {
      if (e.matches) setOpen(false);
    });
  }

  /* ---------------- Site search ---------------- */
  function initSearch(header) {
    var dialog = header.querySelector('#site-search');
    var openers = document.querySelectorAll('[data-search-open]');
    if (!dialog || typeof dialog.showModal !== 'function') {
      openers.forEach(function (b) { b.hidden = true; });
      return;
    }
    var input = dialog.querySelector('[data-search-input]');
    var list = dialog.querySelector('[data-search-results]');
    var status = dialog.querySelector('[data-search-status]');
    var indexPromise = null;
    var timer;

    function loadIndex() {
      if (window.WM_SEARCH_INDEX) return Promise.resolve(window.WM_SEARCH_INDEX);
      if (!indexPromise) {
        indexPromise = new Promise(function (resolve, reject) {
          var s = document.createElement('script');
          s.src = root + 'assets/js/search-index.js';
          s.onload = function () { resolve(window.WM_SEARCH_INDEX || []); };
          s.onerror = reject;
          document.head.appendChild(s);
        });
      }
      return indexPromise;
    }

    function render(q, index) {
      var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
      var results = index.map(function (p) {
        var t = p.t.toLowerCase(), d = p.d.toLowerCase(), s = p.s.toLowerCase();
        var score = 0;
        for (var i = 0; i < terms.length; i++) {
          var term = terms[i];
          var hit = 0;
          if (t.indexOf(term) !== -1) hit += 6;
          if (s.indexOf(term) !== -1) hit += 2;
          if (d.indexOf(term) !== -1) hit += 1;
          if (!hit) return null;
          score += hit;
        }
        return { p: p, score: score };
      }).filter(Boolean).sort(function (a, b) { return b.score - a.score; }).slice(0, 8);

      list.textContent = '';
      results.forEach(function (r) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.className = 'search-result';
        a.href = root + r.p.u;
        var meta = document.createElement('span');
        meta.className = 'block text-[11px] font-bold uppercase tracking-wider text-brand-700';
        meta.textContent = r.p.s;
        var title = document.createElement('span');
        title.className = 'mt-0.5 block font-semibold text-navy-950';
        title.textContent = r.p.t;
        var desc = document.createElement('span');
        desc.className = 'mt-0.5 block text-sm text-slate-600 line-clamp-2';
        desc.textContent = r.p.d;
        a.append(meta, title, desc);
        li.appendChild(a);
        list.appendChild(li);
      });
      status.textContent = results.length
        ? results.length + (results.length === 1 ? ' result' : ' results') + ' for “' + q + '”'
        : 'No results for “' + q + '”. Try a broader term such as “AI”, “cloud” or “healthcare”.';
    }

    function run() {
      var q = input.value.trim();
      if (!q) { list.textContent = ''; status.textContent = 'Start typing to search the site.'; return; }
      loadIndex().then(function (idx) { render(q, idx); }, function () {
        status.textContent = 'Search is temporarily unavailable.';
      });
    }

    openers.forEach(function (b) {
      b.addEventListener('click', function () {
        dialog.showModal();
        input.focus();
        loadIndex();
      });
    });
    dialog.querySelector('[data-search-close]').addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
    input.addEventListener('input', function () { clearTimeout(timer); timer = setTimeout(run, 120); });
    dialog.addEventListener('keydown', function (e) {
      var links = Array.prototype.slice.call(list.querySelectorAll('a'));
      var i = links.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); (links[i + 1] || links[0] || input).focus(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); (i > 0 ? links[i - 1] : input).focus(); }
      else if (e.key === 'Enter' && document.activeElement === input && links[0]) { e.preventDefault(); window.location.href = links[0].href; }
    });
  }

  /* ---------------- Sticky header shadow ---------------- */
  function initStickyShadow(header) {
    var onScroll = function () { header.classList.toggle('shadow-sm', window.scrollY > 8); };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------------- Footer ---------------- */
  function initFooter(footer) {
    var year = footer.querySelector('[data-year]');
    if (year) year.textContent = String(new Date().getFullYear());
  }

  function init() {
    return Promise.all([loadComponent('header'), loadComponent('footer')]).then(function (res) {
      var header = res[0], footer = res[1];
      if (header && !header.hasAttribute('data-wm-ready')) {
        header.setAttribute('data-wm-ready', '');
        setActive(header);
        initDesktopNav(header);
        initMobileNav(header);
        initSearch(header);
        initStickyShadow(header);
      }
      if (footer && !footer.hasAttribute('data-wm-ready')) {
        footer.setAttribute('data-wm-ready', '');
        initFooter(footer);
      }
      document.dispatchEvent(new CustomEvent('wm:components-ready'));
    });
  }

  window.WMComponents = { init: init, reduceMotion: reduceMotion };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
