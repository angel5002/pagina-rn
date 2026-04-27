// Back-to-top floating button. Visible after the user scrolls past the hero.
export function initBackToTop(): void {
  const btn = document.querySelector<HTMLButtonElement>('[data-back-to-top]');
  if (!btn) return;

  const threshold = 480;
  let ticking = false;

  const update = () => {
    btn.classList.toggle('is-visible', window.scrollY > threshold);
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  update();
}
