(function () {
  var root = document.querySelector('[data-carousel]');
  if (!root) return;

  var viewport = root.querySelector('[data-carousel-viewport]');
  var slides = Array.prototype.slice.call(root.querySelectorAll('.carousel-slide'));
  var caption = root.querySelector('[data-carousel-caption]');
  var prevBtn = root.querySelector('[data-prev]');
  var nextBtn = root.querySelector('[data-next]');
  var total = slides.length;
  if (!total) return;

  var current = 0;

  function render() {
    var narrow = window.innerWidth < 640;
    var maxVisible = narrow ? 2 : 3;
    var centerRect = slides[current].getBoundingClientRect();
    var spacing = centerRect.width * (narrow ? 0.5 : 0.62);

    slides.forEach(function (slide, i) {
      var offset = i - current;
      if (offset > total / 2) offset -= total;
      if (offset < -total / 2) offset += total;
      var abs = Math.abs(offset);
      var visible = abs <= maxVisible;

      slide.style.setProperty('--tx', (offset * spacing) + 'px');
      slide.style.setProperty('--scale', Math.max(1 - abs * 0.16, 0.5));
      slide.style.setProperty('--z', 100 - abs);
      slide.style.setProperty('--op', visible ? 1 : 0);
      slide.style.setProperty('--dim', Math.min(abs * 0.28, 0.6));
      slide.style.pointerEvents = visible ? 'auto' : 'none';
      slide.setAttribute('aria-hidden', offset === 0 ? 'false' : 'true');
      slide.tabIndex = offset === 0 ? 0 : -1;
    });

    caption.textContent = slides[current].dataset.caption || '';
  }

  function go(delta) {
    current = (current + delta + total) % total;
    render();
  }

  prevBtn.addEventListener('click', function () { go(-1); });
  nextBtn.addEventListener('click', function () { go(1); });

  slides.forEach(function (slide, i) {
    slide.addEventListener('click', function () {
      if (i === current) return;
      current = i;
      render();
    });
  });

  viewport.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
  });

  var startX = null;
  viewport.addEventListener('pointerdown', function (e) { startX = e.clientX; });
  viewport.addEventListener('pointerup', function (e) {
    if (startX === null) return;
    var dx = e.clientX - startX;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    startX = null;
  });

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(render, 100);
  });

  root.classList.add('js-ready');
  render();
})();
