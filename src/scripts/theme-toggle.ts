// Light/dark theme toggle. Persists preference in localStorage.
type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
}

function readStored(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    return null;
  }
}

function persist(theme: Theme): void {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore */
  }
}

export function initThemeToggle(): void {
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]');
  if (buttons.length === 0) return;

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const current =
        (document.documentElement.getAttribute('data-theme') as Theme | null) ||
        'light';
      const next: Theme = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      persist(next);
    });
  });

  // Sync with system changes only if user hasn't chosen explicitly.
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener('change', (e) => {
    if (readStored()) return;
    applyTheme(e.matches ? 'dark' : 'light');
  });
}
