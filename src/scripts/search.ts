// Client-side search over the static index emitted at /search-index.json.
// Combobox UX: input opens a panel of matches, Up/Down moves selection,
// Enter navigates, Escape closes. Matches against title/topic/summary/tags.

interface Entry {
  id: string;
  number: string;
  title: string;
  topic: string;
  summary: string;
  tags: string[];
  url: string;
}

const COMBINING = /[̀-ͯ]/g;
const NORMALIZE = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(COMBINING, '');

let cache: Entry[] | null = null;
let inflight: Promise<Entry[]> | null = null;

async function loadIndex(endpoint: string): Promise<Entry[]> {
  if (cache) return cache;
  if (inflight) return inflight;
  inflight = fetch(endpoint, { credentials: 'same-origin' })
    .then((r) => (r.ok ? r.json() : Promise.reject(new Error('http ' + r.status))))
    .then((data: { entries: Entry[] }) => {
      cache = data.entries ?? [];
      return cache;
    })
    .finally(() => {
      inflight = null;
    });
  return inflight;
}

function score(entry: Entry, terms: string[]): number {
  const haystack = NORMALIZE(
    [entry.title, entry.topic, entry.summary, entry.tags.join(' '), entry.number].join(' ')
  );
  let total = 0;
  for (const term of terms) {
    if (!term) continue;
    if (!haystack.includes(term)) return -1; // any miss disqualifies
    if (NORMALIZE(entry.title).includes(term)) total += 10;
    if (NORMALIZE(entry.tags.join(' ')).includes(term)) total += 5;
    if (NORMALIZE(entry.topic).includes(term)) total += 3;
    total += 1;
  }
  return total;
}

function highlight(text: string, terms: string[]): string {
  if (terms.length === 0) return escapeHtml(text);
  const escaped = escapeHtml(text);
  const lowered = NORMALIZE(text);
  const ranges: [number, number][] = [];
  for (const term of terms) {
    if (!term) continue;
    let idx = 0;
    while ((idx = lowered.indexOf(term, idx)) !== -1) {
      ranges.push([idx, idx + term.length]);
      idx += term.length;
    }
  }
  if (ranges.length === 0) return escaped;
  ranges.sort((a, b) => a[0] - b[0]);
  // merge overlapping
  const merged: [number, number][] = [];
  for (const r of ranges) {
    const last = merged[merged.length - 1];
    if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1]);
    else merged.push([...r]);
  }
  // operate on escaped text but using indices from raw normalized text — risky if escaping changed length.
  // Instead: build from raw text and escape per-segment, then wrap matches.
  let out = '';
  let cursor = 0;
  for (const [start, end] of merged) {
    out += escapeHtml(text.slice(cursor, start));
    out += `<mark>${escapeHtml(text.slice(start, end))}</mark>`;
    cursor = end;
  }
  out += escapeHtml(text.slice(cursor));
  return out;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function debounce<T extends (...args: never[]) => void>(fn: T, ms: number) {
  let t: ReturnType<typeof setTimeout> | undefined;
  return (...args: Parameters<T>) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

export function initSearch(): void {
  const root = document.querySelector<HTMLElement>('[data-search-root]');
  const input = document.querySelector<HTMLInputElement>('[data-search-input]');
  const panel = document.querySelector<HTMLElement>('[data-search-panel]');
  if (!root || !input || !panel) return;

  const endpoint = root.dataset.searchEndpoint || '/search-index.json';

  let activeIndex = -1;
  let lastResults: Entry[] = [];
  let lastTerms: string[] = [];

  const close = () => {
    panel.hidden = true;
    input.setAttribute('aria-expanded', 'false');
    activeIndex = -1;
  };

  const open = () => {
    if (panel.hidden && (lastResults.length > 0 || input.value.length > 0)) {
      panel.hidden = false;
      input.setAttribute('aria-expanded', 'true');
    }
  };

  const render = () => {
    if (lastResults.length === 0) {
      const query = input.value.trim();
      panel.innerHTML = query
        ? `<p class="search__empty">Sin resultados para "<strong>${escapeHtml(query)}</strong>".</p>`
        : `<p class="search__empty">Escribí un título, tema o etiqueta.</p>`;
      panel.hidden = false;
      input.setAttribute('aria-expanded', 'true');
      return;
    }
    const html = lastResults
      .map((entry, i) => {
        const tags = entry.tags
          .slice(0, 3)
          .map((t) => `<span class="search__tag">${escapeHtml(t)}</span>`)
          .join('');
        return `
          <a class="search__result${i === activeIndex ? ' is-active' : ''}"
             href="${entry.url}"
             role="option"
             aria-selected="${i === activeIndex ? 'true' : 'false'}"
             data-index="${i}">
            <p class="search__result-eyebrow">${escapeHtml(entry.number)} · ${escapeHtml(entry.topic)}</p>
            <p class="search__result-title">${highlight(entry.title, lastTerms)}</p>
            <p class="search__result-summary">${highlight(entry.summary, lastTerms)}</p>
            <div class="search__result-tags">${tags}</div>
          </a>
        `;
      })
      .join('');
    panel.innerHTML = html;
    panel.hidden = false;
    input.setAttribute('aria-expanded', 'true');
  };

  const updateActive = (delta: number) => {
    if (lastResults.length === 0) return;
    activeIndex =
      (activeIndex + delta + lastResults.length) % lastResults.length;
    const items = panel.querySelectorAll<HTMLElement>('.search__result');
    items.forEach((el, i) => {
      el.classList.toggle('is-active', i === activeIndex);
      el.setAttribute('aria-selected', i === activeIndex ? 'true' : 'false');
    });
    items[activeIndex]?.scrollIntoView({ block: 'nearest' });
  };

  const search = async (raw: string) => {
    const query = raw.trim();
    if (!query) {
      lastResults = [];
      lastTerms = [];
      render();
      return;
    }
    const terms = NORMALIZE(query).split(/\s+/).filter(Boolean);
    lastTerms = terms;
    try {
      const entries = await loadIndex(endpoint);
      const ranked = entries
        .map((e) => ({ entry: e, s: score(e, terms) }))
        .filter((r) => r.s > 0)
        .sort((a, b) => b.s - a.s)
        .slice(0, 8)
        .map((r) => r.entry);
      lastResults = ranked;
      activeIndex = ranked.length > 0 ? 0 : -1;
      render();
    } catch (_e) {
      panel.innerHTML = `<p class="search__empty">No se pudo cargar el índice de búsqueda.</p>`;
      panel.hidden = false;
    }
  };

  const debounced = debounce((v: string) => search(v), 120);

  input.addEventListener('input', () => debounced(input.value));
  input.addEventListener('focus', () => {
    if (input.value.trim()) {
      search(input.value);
    } else {
      open();
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      updateActive(1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      updateActive(-1);
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && lastResults[activeIndex]) {
        e.preventDefault();
        window.location.href = lastResults[activeIndex].url;
      }
    } else if (e.key === 'Escape') {
      close();
      input.blur();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== input) {
      const tag = (document.activeElement as HTMLElement | null)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      e.preventDefault();
      input.focus();
    }
  });

  document.addEventListener('click', (e) => {
    const target = e.target as Node;
    if (root.contains(target)) return;
    close();
  });
}
