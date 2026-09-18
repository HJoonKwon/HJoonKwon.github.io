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

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('video[autoplay]').forEach(function (v) {
      v.removeAttribute('autoplay');
      v.pause();
    });
  }
})();
