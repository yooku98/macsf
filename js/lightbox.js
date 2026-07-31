(function () {
  var lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  var triggers = Array.prototype.slice.call(document.querySelectorAll('.gallery-trigger'));
  if (!triggers.length) return;

  var items = triggers.map(function (btn) {
    var img = btn.querySelector('img');
    var figure = btn.closest('.gallery-item');
    var caption = figure ? figure.querySelector('figcaption') : null;
    return {
      src: img.getAttribute('src'),
      alt: img.getAttribute('alt') || '',
      caption: caption ? caption.textContent : ''
    };
  });

  var imgEl = lightbox.querySelector('.lightbox-img');
  var captionEl = lightbox.querySelector('.lightbox-caption');
  var closeEls = Array.prototype.slice.call(lightbox.querySelectorAll('[data-lightbox-close]'));
  var prevBtn = lightbox.querySelector('.lightbox-prev');
  var nextBtn = lightbox.querySelector('.lightbox-next');
  var closeBtn = lightbox.querySelector('.lightbox-close');

  var current = 0;
  var lastFocused = null;

  function render(index) {
    current = (index + items.length) % items.length;
    var item = items[current];
    imgEl.src = item.src;
    imgEl.alt = item.alt;
    captionEl.textContent = item.caption;
  }

  function open(index, triggerEl) {
    lastFocused = triggerEl || document.activeElement;
    render(index);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
    document.addEventListener('keydown', onKeydown);
  }

  function close() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKeydown);
    if (lastFocused) lastFocused.focus();
  }

  function onKeydown(e) {
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowRight') render(current + 1);
    else if (e.key === 'ArrowLeft') render(current - 1);
  }

  triggers.forEach(function (btn, i) {
    btn.addEventListener('click', function () { open(i, btn); });
  });
  closeEls.forEach(function (el) { el.addEventListener('click', close); });
  prevBtn.addEventListener('click', function () { render(current - 1); });
  nextBtn.addEventListener('click', function () { render(current + 1); });
})();
