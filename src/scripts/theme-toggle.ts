// Light/dark theme toggle. Persists preference in localStorage and wraps
// the swap with the .is-theme-transitioning class so the cross-fade is slow
// and smooth without affecting other micro-interactions.
type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';
const TRANSITION_CLASS = 'is-theme-transitioning';
const TRANSITION_HOLD_MS = 480;

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

let releaseTimer: ReturnType<typeof setTimeout> | undefined;

function withTransition(swap: () => void): void {
  const root = document.documentElement;
  if (releaseTimer) clearTimeout(releaseTimer);

  root.classList.add(TRANSITION_CLASS);
  // Force a paint so the class is in effect before data-theme flips.
  void root.offsetWidth;
  swap();

  releaseTimer = setTimeout(() => {
    root.classList.remove(TRANSITION_CLASS);
    releaseTimer = undefined;
  }, TRANSITION_HOLD_MS);
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
      withTransition(() => {
        applyTheme(next);
        persist(next);
      });
    });
  });

  // Sync with system changes only if user hasn't chosen explicitly.
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener('change', (e) => {
    if (readStored()) return;
    withTransition(() => applyTheme(e.matches ? 'dark' : 'light'));
  });
}
