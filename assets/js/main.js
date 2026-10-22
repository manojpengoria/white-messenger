/**
 * White Messenger page interactions: accordions, tabs, content filters, form validation,
 * back-to-top and scroll reveal. No dependencies. Navigation lives in components.js.
 */
(function () {
  'use strict';
  if (window.WMMain) return;
  window.WMMain = true;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------------- Accordions ---------------- */
  function initAccordions() {
    document.querySelectorAll('[data-accordion] .accordion-trigger').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var panel = document.getElementById(btn.getAttribute('aria-controls'));
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        if (panel) panel.hidden = expanded;
      });
    });
  }

  /* ---------------- Tabs (WAI-ARIA tabs pattern) ---------------- */
  function initTabs() {
    document.querySelectorAll('[data-tabs]').forEach(function (wrap) {
      var tabs = Array.prototype.slice.call(wrap.querySelectorAll('[role="tab"]'));
      function select(tab, focus) {
        tabs.forEach(function (t) {
          var on = t === tab;
          t.setAttribute('aria-selected', String(on));
          t.tabIndex = on ? 0 : -1;
          var panel = document.getElementById(t.getAttribute('aria-controls'));
          if (panel) panel.hidden = !on;
        });
        if (focus) tab.focus();
      }
      tabs.forEach(function (tab, i) {
        tab.addEventListener('click', function () { select(tab, false); });
        tab.addEventListener('keydown', function (e) {
          var next = null;
          if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
          else if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
          else if (e.key === 'Home') next = tabs[0];
          else if (e.key === 'End') next = tabs[tabs.length - 1];
          if (next) { e.preventDefault(); select(next, true); }
        });
      });
    });
  }

  /* ---------------- Category + keyword filters ---------------- */
  function initFilters() {
    document.querySelectorAll('[data-filter-root]').forEach(function (rootEl) {
      var buttons = rootEl.querySelectorAll('[data-filter]');
      var search = rootEl.querySelector('[data-filter-search]');
      var items = rootEl.querySelectorAll('[data-filter-item]');
      var empty = rootEl.querySelector('[data-filter-empty]');
      var count = rootEl.querySelector('[data-filter-count]');
      var active = 'all';

      function apply() {
        var q = search ? search.value.trim().toLowerCase() : '';
        var shown = 0;
        items.forEach(function (it) {
          var okCat = active === 'all' || it.getAttribute('data-category') === active;
          var okText = !q || (it.getAttribute('data-search') || '').indexOf(q) !== -1;
          var show = okCat && okText;
          it.hidden = !show;
          if (show) shown++;
        });
        if (empty) empty.hidden = shown !== 0;
        if (count) count.textContent = shown + (shown === 1 ? ' item' : ' items') + ' shown';
      }
      buttons.forEach(function (b) {
        b.addEventListener('click', function () {
          active = b.getAttribute('data-filter');
          buttons.forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
          apply();
        });
      });
      if (search) search.addEventListener('input', apply);
    });
  }

  /* ---------------- Forms ---------------- */
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  var PHONE_RE = /^\+?[0-9 ()-]{7,20}$/;
  var URL_RE = /^https?:\/\/[^\s.]+\.[^\s]{2,}/i;

  function labelFor(el) {
    var label = document.querySelector('label[for="' + el.id + '"]');
    if (!label) return 'this field';
    return label.textContent.replace('*', '').replace('(optional)', '').trim();
  }

  function messageFor(el) {
    var isBox = el.type === 'checkbox';
    var v = isBox ? el.checked : el.value.trim();
    var label = labelFor(el);
    if (el.required && !v) {
      if (isBox) return 'Please tick this box to confirm you agree before sending.';
      if (el.tagName === 'SELECT') return 'Please select an option for “' + label + '”.';
      return 'Please enter your ' + label.charAt(0).toLowerCase() + label.slice(1) + '.';
    }
    if (!v || isBox) return '';
    if (el.type === 'email' && !EMAIL_RE.test(v)) return 'Please enter a valid email address, for example name@company.com.';
    if (el.getAttribute('data-rule') === 'phone' && !PHONE_RE.test(v)) return 'Please enter a valid phone number using digits, spaces and an optional + country code.';
    if (el.type === 'url' && !URL_RE.test(v)) return 'Please enter a full web address starting with https://';
    if (el.minLength > 0 && v.length < el.minLength) return 'Please add a little more detail (at least ' + el.minLength + ' characters; currently ' + v.length + ').';
    return '';
  }

  function showError(el, msg) {
    var err = document.getElementById(el.id + '-error');
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (err) { err.textContent = msg; err.hidden = !msg; }
  }

  function setStatus(form, kind, html) {
    var box = form.querySelector('[data-form-status]');
    if (!box) return;
    var styles = {
      info: 'border-brand-200 bg-brand-50 text-navy-900',
      success: 'border-emerald-200 bg-emerald-50 text-emerald-900',
      error: 'border-red-200 bg-red-50 text-red-800',
    };
    box.innerHTML = '<div class="rounded-xl border p-4 text-sm leading-relaxed ' + styles[kind] + '">' + html + '</div>';
  }

  function initForms() {
    document.querySelectorAll('form[data-validate]').forEach(function (form) {
      var controls = Array.prototype.slice.call(form.querySelectorAll('input, select, textarea')).filter(function (el) {
        return el.name && el.name !== 'website' && el.type !== 'hidden';
      });
      var summary = form.querySelector('[data-error-summary]');
      var summaryList = form.querySelector('[data-error-list]');
      var attempted = false;

      controls.forEach(function (el) {
        el.addEventListener('blur', function () {
          if (attempted || (el.type !== 'checkbox' && el.value.trim())) showError(el, messageFor(el));
        });
        el.addEventListener(el.type === 'checkbox' || el.tagName === 'SELECT' ? 'change' : 'input', function () {
          if (el.getAttribute('aria-invalid') === 'true') showError(el, messageFor(el));
        });
      });

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        attempted = true;
        var errors = [];
        controls.forEach(function (el) {
          var msg = messageFor(el);
          showError(el, msg);
          if (msg) errors.push({ el: el, msg: msg });
        });

        if (errors.length) {
          summaryList.textContent = '';
          errors.forEach(function (er) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.href = '#' + er.el.id;
            a.className = 'underline';
            a.textContent = er.msg;
            a.addEventListener('click', function (ev) { ev.preventDefault(); er.el.focus(); });
            li.appendChild(a);
            summaryList.appendChild(li);
          });
          summary.hidden = false;
          summary.focus();
          return;
        }
        summary.hidden = true;

        // Spam trap: silently stop if the hidden field was filled
        var trap = form.querySelector('input[name="website"]');
        if (trap && trap.value) return;

        var endpoint = form.getAttribute('data-endpoint');
        var email = form.getAttribute('data-fallback-email');
        var subject = encodeURIComponent(form.getAttribute('data-form-name') === 'careers' ? 'Career inquiry' : 'Project inquiry');

        if (!endpoint) {
          // No backend yet: be explicit, do not pretend the message was sent, and store nothing.
          setStatus(form, 'info', '<p class="font-semibold">Thank you, your details look complete.</p><p class="mt-1">Online submission is not connected yet, so this form has <strong>not</strong> been sent. Please email us at <a class="font-semibold underline" href="mailto:' + email + '?subject=' + subject + '">' + email + '</a> and include the information above. We will reply as soon as possible.</p>');
          var statusBox = form.querySelector('[data-form-status]');
          statusBox.setAttribute('tabindex', '-1');
          statusBox.focus();
          return;
        }

        var btn = form.querySelector('[data-submit]');
        btn.disabled = true;
        btn.setAttribute('aria-busy', 'true');
        setStatus(form, 'info', 'Sending your message…');
        fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' }, credentials: 'same-origin' })
          .then(function (res) {
            if (!res.ok) throw new Error('HTTP ' + res.status);
            setStatus(form, 'success', '<p class="font-semibold">Thank you. Your message has been sent.</p><p class="mt-1">A member of our team will reply by email.</p>');
            form.reset();
          })
          .catch(function () {
            setStatus(form, 'error', '<p class="font-semibold">Sorry, we could not send your message.</p><p class="mt-1">Please try again, or email us at <a class="font-semibold underline" href="mailto:' + email + '?subject=' + subject + '">' + email + '</a>.</p>');
          })
          .then(function () { btn.disabled = false; btn.removeAttribute('aria-busy'); });
      });
    });
  }

  /* ---------------- Back to top ---------------- */
  function initBackToTop() {
    var btn = document.querySelector('[data-back-to-top]');
    if (!btn) return;
    var onScroll = function () { btn.hidden = window.scrollY < 700; };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
      var skip = document.querySelector('.skip-link');
      if (skip) skip.focus({ preventScroll: true });
    });
  }

  /* ---------------- Scroll reveal (progressive, motion-safe) ---------------- */
  function initReveal() {
    if (reduceMotion.matches || !('IntersectionObserver' in window)) return;
    var sections = document.querySelectorAll('main > section:not(:first-child), main > div.section');
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    sections.forEach(function (s) {
      if (s.getBoundingClientRect().top > window.innerHeight) {
        s.classList.add('reveal');
        io.observe(s);
      }
    });
  }

  function init() {
    initAccordions();
    initTabs();
    initFilters();
    initForms();
    initBackToTop();
    initReveal();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
