// Mobile menu toggle. Wired by Header.astro on load.
export function initMobileMenu(): void {
  const button = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
  const nav = document.querySelector<HTMLElement>('[data-menu-target]');
  if (!button || !nav) return;

  const closeOnLink = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.closest('a')) {
      nav.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
    }
  };

  button.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(isOpen));
  });

  nav.addEventListener('click', closeOnLink);

  const mq = window.matchMedia('(min-width: 769px)');
  mq.addEventListener('change', (e) => {
    if (e.matches) {
      nav.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
    }
  });
}
