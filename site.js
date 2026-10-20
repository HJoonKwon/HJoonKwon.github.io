(function () {
  var root = document.documentElement;
  var btn = document.getElementById('theme-toggle');
  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function current() {
    return root.dataset.theme || (prefersDark.matches ? 'dark' : 'light');
  }
  function refresh() {
    var next = current() === 'light' ? 'dark' : 'light';
    btn.textContent = next === 'dark' ? 'Dark' : 'Light';
    btn.setAttribute('aria-label', 'Switch to ' + next + ' theme');
  }
  btn.addEventListener('click', function () {
    var next = current() === 'light' ? 'dark' : 'light';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
    refresh();
  });
  prefersDark.addEventListener('change', refresh);
  refresh();

  // side menu: mark the section that currently occupies the top of the viewport
  var links = Array.prototype.slice.call(document.querySelectorAll('.side-nav a'));
  var sections = links.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
  if (links.length && 'IntersectionObserver' in window) {
    var visible = {};
    var mark = function () {
      var best = null;
      sections.forEach(function (sec) { if (visible[sec.id] && (best === null || sec.offsetTop < best.offsetTop || visible[sec.id] > visible[best.id] + 0.25)) best = sec; });
      links.forEach(function (a) { a.classList.toggle('current', best !== null && a.getAttribute('href') === '#' + best.id); });
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { visible[e.target.id] = e.isIntersecting ? e.intersectionRatio : 0; });
      mark();
    }, { rootMargin: '-64px 0px -55% 0px', threshold: [0, 0.1, 0.25, 0.5] });
    sections.forEach(function (sec) { io.observe(sec); });
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('video[autoplay]').forEach(function (v) {
      v.removeAttribute('autoplay');
      v.pause();
    });
  }
})();
