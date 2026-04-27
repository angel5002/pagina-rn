// Mobile sidebar drawer toggled from the topbar trigger.
const ATTR = 'data-sidebar-open';

export function initSidebarDrawer(): void {
  const trigger = document.querySelector<HTMLButtonElement>('[data-sidebar-trigger]');
  const scrim = document.querySelector<HTMLElement>('[data-scrim]');
  const root = document.documentElement;
  if (!trigger) return;

  const close = () => {
    root.removeAttribute(ATTR);
    trigger.setAttribute('aria-expanded', 'false');
  };

  const open = () => {
    root.setAttribute(ATTR, '');
    trigger.setAttribute('aria-expanded', 'true');
  };

  trigger.addEventListener('click', () => {
    if (root.hasAttribute(ATTR)) close();
    else open();
  });

  scrim?.addEventListener('click', close);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  const sidebar = document.getElementById('sidebar');
  sidebar?.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    if (target.closest('a')) close();
  });

  const mq = window.matchMedia('(min-width: 1024px)');
  mq.addEventListener('change', (e) => {
    if (e.matches) close();
  });
}
