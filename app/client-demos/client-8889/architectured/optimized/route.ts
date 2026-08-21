import { GET as getSource } from "../source/route"

export const dynamic = "force-dynamic"
export const revalidate = 0

const PATCH_MAP_RE = /function patchMap\(root, map\) \{[\s\S]*?\n  \}\n\n  function findByText/
const FIND_BY_TEXT_RE = /function findByText\(text, root = document\) \{[\s\S]*?\n  \}\n\n  function sectionFrom/
const SCHEDULER_RE = /let queued = false;[\s\S]*?const timer = setInterval\(\(\) => \{[\s\S]*?\}, 125\);/

const FAST_PATCH_MAP = String.raw`const patchLookupCache = new WeakMap();

  function patchMap(root, map) {
    if (!root) return;

    let lookup = patchLookupCache.get(map);
    if (!lookup) {
      lookup = new Map();
      for (const [from, to] of Object.entries(map)) {
        lookup.set(norm(from), to);
        lookup.set(compact(from), to);
      }
      patchLookupCache.set(map, lookup);
    }

    const elements = root.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a,span,div,button,label,li');
    for (let i = 0; i < elements.length; i += 1) {
      const el = elements[i];
      if (blocked.has(el.tagName) || el.children.length > 0) continue;
      const current = norm(el.textContent);
      if (!current) continue;
      const replacement = lookup.get(current) ?? lookup.get(compact(current));
      if (replacement !== undefined) writePreservingStructure(el, replacement);
    }
  }

  function findByText`

const FAST_FIND_BY_TEXT = String.raw`function findByText(text, root = document) {
    const wanted = compact(text);
    const elements = root.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a,span,div,li,button');
    for (let i = 0; i < elements.length; i += 1) {
      const el = elements[i];
      if (!blocked.has(el.tagName) && compact(el.textContent) === wanted) return el;
    }
    return null;
  }

  function sectionFrom`

const FRAME_BATCHED_SCHEDULER = String.raw`let queued = false;
  let observerActive = false;
  let hydrationWindowOpen = true;

  const revealPage = () => {
    document.documentElement.classList.remove('nguyen-template-boot');
    document.documentElement.classList.add('nguyen-template-ready');
  };

  const connectObserver = () => {
    if (observerActive || !hydrationWindowOpen) return;
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    observerActive = true;
  };

  const safePatch = () => {
    try {
      patchAll();
    } catch (error) {
      console.error('[NGUYEN Concept 04] content patch failed', error);
    } finally {
      revealPage();
    }
  };

  const runPatch = () => {
    queued = false;

    if (observerActive) {
      observer.disconnect();
      observerActive = false;
    }

    safePatch();
    connectObserver();
  };

  const queuePatch = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(runPatch);
  };

  const observer = new MutationObserver(queuePatch);
  connectObserver();

  // Never allow a patching error to strand the document in the hidden boot state.
  safePatch();

  document.addEventListener('DOMContentLoaded', () => {
    revealPage();
    queuePatch();
    requestAnimationFrame(() => requestAnimationFrame(queuePatch));
  }, { once: true });

  window.addEventListener('load', () => {
    revealPage();
    queuePatch();
  }, { once: true });

  // Mobile Safari can delay or interrupt hydration callbacks. This independent
  // fallback guarantees the page becomes visible even if Framer fails to hydrate.
  window.setTimeout(revealPage, 700);

  window.setTimeout(() => {
    hydrationWindowOpen = false;
    if (observerActive) {
      observer.disconnect();
      observerActive = false;
    }
    if (queued) {
      queued = false;
      safePatch();
    }
    revealPage();
  }, 6000);`

const BRAND_CSS = String.raw`<style id="nguyen-brand-css">
  :root {
    --nguyen-blue: #00102A;
    --nguyen-blue-rgb: 0, 16, 42;
    --nguyen-blue-dark: #000B1D;
    --nguyen-blue-tint: #EEF3F7;
    --nguyen-blue-soft: #D7E0E8;
    --token-230c3248-009b-4ccd-bda2-d16c47a758d2: #00102A !important;
  }

  a[aria-label="Company Logo"] {
    color: var(--nguyen-blue) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: flex-start !important;
    text-decoration: none !important;
  }
  a[aria-label="Company Logo"] [data-framer-background-image-wrapper] {
    display: none !important;
  }
  a[aria-label="Company Logo"]::after {
    content: "Nguyen";
    color: var(--nguyen-blue);
    font-family: "Geist", "Inter", "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 26px;
    font-style: normal;
    font-weight: 650;
    letter-spacing: -0.045em;
    line-height: 1;
    text-transform: none;
    white-space: nowrap;
  }

  .nguyen-brand-heading { color: var(--nguyen-blue) !important; }
  .nguyen-brand-heading-on-dark { color: var(--nguyen-blue-tint) !important; }

  .nguyen-brand-button {
    background-color: var(--nguyen-blue) !important;
    border-color: var(--nguyen-blue) !important;
    color: #fff !important;
  }
  .nguyen-brand-button:hover,
  .nguyen-brand-button:focus-visible {
    background-color: var(--nguyen-blue-dark) !important;
    border-color: var(--nguyen-blue-dark) !important;
  }
  .nguyen-brand-button,
  .nguyen-brand-button * { color: #fff !important; }
  .nguyen-brand-button svg,
  .nguyen-brand-button svg * {
    color: #fff !important;
    fill: currentColor !important;
  }

  .nguyen-brand-accent { border-color: var(--nguyen-blue) !important; }
  .nguyen-brand-highlight {
    background-color: var(--nguyen-blue-tint) !important;
    border-color: var(--nguyen-blue-soft) !important;
    color: var(--nguyen-blue-dark) !important;
  }
  .nguyen-brand-highlight * { color: var(--nguyen-blue-dark) !important; }

  ::selection {
    background: var(--nguyen-blue);
    color: #fff;
  }
</style>`

const BRAND_RUNTIME = String.raw`<script id="nguyen-brand-runtime">
(() => {
  const CTA_TEXT = new Set([
    'request consultation',
    'start a project',
    'view project types',
    'about nguyen',
    'email nguyen',
    'email us'
  ]);

  const normalize = (value) => (value || '').replace(/\s+/g, ' ').trim().toLowerCase();

  function rgbFrom(value) {
    const match = value && value.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/i);
    if (!match) return null;
    return {
      r: Number(match[1]),
      g: Number(match[2]),
      b: Number(match[3]),
      a: match[4] === undefined ? 1 : Number(match[4])
    };
  }

  function luminance(color) {
    const convert = (channel) => {
      const value = channel / 255;
      return value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * convert(color.r) + 0.7152 * convert(color.g) + 0.0722 * convert(color.b);
  }

  function styleHeadings() {
    document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach((heading) => {
      const current = rgbFrom(getComputedStyle(heading).color);
      const designedForDarkSurface = current ? luminance(current) > 0.62 : false;
      heading.classList.toggle('nguyen-brand-heading-on-dark', designedForDarkSurface);
      heading.classList.toggle('nguyen-brand-heading', !designedForDarkSurface);
    });
  }

  function styleButtons() {
    document.querySelectorAll('a,button').forEach((el) => {
      const text = normalize(el.textContent);
      if (!text || !CTA_TEXT.has(text)) return;
      const background = rgbFrom(getComputedStyle(el).backgroundColor);
      const hasButtonSurface = el.tagName === 'BUTTON' || (background && background.a > 0.05);
      if (hasButtonSurface) el.classList.add('nguyen-brand-button');
    });
  }

  function styleAccents() {
    document.querySelectorAll('[data-framer-name*="Accent" i]').forEach((el) => {
      el.classList.add('nguyen-brand-accent');
    });
    document.querySelectorAll('[data-framer-name*="Highlight" i],[data-framer-name*="Tag" i],[data-framer-name*="Badge" i]').forEach((el) => {
      el.classList.add('nguyen-brand-highlight');
    });
  }

  function applyBrand() {
    try {
      styleHeadings();
      styleButtons();
      styleAccents();
    } catch (error) {
      console.error('[NGUYEN Concept 04] branding pass failed', error);
    }
  }

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      applyBrand();
    });
  };

  const observer = new MutationObserver(schedule);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true
  });

  applyBrand();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', schedule, { once: true });
  }
  window.addEventListener('load', schedule, { once: true });

  window.setTimeout(() => {
    observer.disconnect();
    schedule();
  }, 6000);
})();
</script>`

function replaceOnce(html: string, pattern: RegExp, replacement: string, label: string) {
  if (!pattern.test(html)) {
    console.warn(`[Concept04 performance] ${label} optimization pattern not found`)
    return html
  }
  return html.replace(pattern, replacement)
}

export async function GET() {
  const sourceResponse = await getSource()

  if (!sourceResponse.ok) return sourceResponse

  let html = await sourceResponse.text()

  html = replaceOnce(html, PATCH_MAP_RE, FAST_PATCH_MAP, "patchMap")
  html = replaceOnce(html, FIND_BY_TEXT_RE, FAST_FIND_BY_TEXT, "findByText")
  html = replaceOnce(html, SCHEDULER_RE, FRAME_BATCHED_SCHEDULER, "scheduler")

  html = html.replace(
    "</head>",
    `${BRAND_CSS}<style id="nguyen-performance-css">
      @media (min-width: 810px) {
        [data-framer-name="Section"] { contain: paint; }
      }
      @media (prefers-reduced-motion: reduce) {
        html { scroll-behavior: auto !important; }
      }
    </style></head>`,
  )

  html = html.replace("</body>", `${BRAND_RUNTIME}</body>`)

  const headers = new Headers(sourceResponse.headers)
  headers.set("Content-Type", "text/html; charset=utf-8")
  // Keep the hotfix uncached so mobile clients cannot remain stuck on the
  // previously broken boot script for up to five minutes.
  headers.set("Cache-Control", "no-store, max-age=0, must-revalidate")
  headers.set("Pragma", "no-cache")
  headers.set("Expires", "0")
  headers.set("Vary", "Accept-Encoding")

  return new Response(html, {
    status: sourceResponse.status,
    headers,
  })
}
