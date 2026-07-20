/* Light Work Exterior Services — interactions */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---------- Theme toggle (system preference default) ---------- */
  var toggle = document.querySelector('[data-theme-toggle]');
  var theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  var themeParam = new URLSearchParams(location.search).get('theme');
  if (themeParam === 'light' || themeParam === 'dark') theme = themeParam;
  root.setAttribute('data-theme', theme);

  var sunIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  var moonIcon = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  function paintToggle() {
    if (!toggle) return;
    toggle.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
    toggle.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
  }
  paintToggle();

  if (toggle) {
    toggle.addEventListener('click', function () {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      paintToggle();
    });
  }

  /* ---------- Header shadow on scroll ---------- */
  var header = document.querySelector('.header');
  function onScroll() {
    header.classList.toggle('header--scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav ---------- */
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
      navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Image fallback ---------- */
  document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('error', function () {
      img.style.objectFit = 'contain';
      img.alt = '';
    });
  });

  /* ---------- Quote form ---------- */
  var form = document.getElementById('quote-form');
  if (form) {
    var fields = form.querySelectorAll('input[required], select[required]');
    var emailField = form.querySelector('#q-email');

    function validateField(el) {
      var wrap = el.closest('.form-field');
      var bad = !el.value.trim();
      if (el === emailField) {
        bad = !!el.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(el.value.trim());
      }
      wrap.classList.toggle('has-error', bad);
      return !bad;
    }

    fields.forEach(function (el) {
      el.addEventListener('blur', function () { validateField(el); });
      el.addEventListener('input', function () { el.closest('.form-field').classList.remove('has-error'); });
    });
    if (emailField) emailField.addEventListener('blur', function () { validateField(emailField); });

    form.addEventListener('submit', function (e) {
      var ok = true;
      fields.forEach(function (el) { if (!validateField(el)) ok = false; });
      if (emailField && !validateField(emailField)) ok = false;

      if (!ok) {
        e.preventDefault();
        var firstBad = form.querySelector('.has-error input, .has-error select');
        if (firstBad) firstBad.focus();
        return;
      }

      // Demo mode: no form backend connected yet (see comment in index.html).
      // Once a real endpoint is set in `action`, remove data-demo to enable real submits.
      if (form.hasAttribute('data-demo')) {
        e.preventDefault();
        Array.prototype.forEach.call(form.children, function (child) {
          if (!child.classList.contains('form-success')) child.style.display = 'none';
        });
        form.querySelector('.form-success').classList.add('is-visible');
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  /* ---------- Footer year ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
