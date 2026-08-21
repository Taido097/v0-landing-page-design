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
      if (skip(el) || el.children.length > 0) continue;
      const current = norm(el.textContent);
      if (!current) continue;
      const replacement = lookup.get(current) ?? lookup.get(compact(current));
      if (replacement !== undefined) writeText(el, replacement);
    }
  }

  function findByText`

const FAST_FIND_BY_TEXT = String.raw`function findByText(text, root = document) {
    const wanted = compact(text);
    const elements = root.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a,span,div,li,button');
    for (let i = 0; i < elements.length; i += 1) {
      const el = elements[i];
      if (!skip(el) && compact(el.textContent) === wanted) return el;
    }
    return null;
  }

  function sectionFrom`

const FRAME_BATCHED_SCHEDULER = String.raw`let queued = false;
  let observerActive = false;
  let hydrationWindowOpen = true;

  const connectObserver = () => {
    if (observerActive || !hydrationWindowOpen) return;
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true,
    });
    observerActive = true;
  };

  const runPatch = () => {
    queued = false;

    // Do not observe our own text writes. This prevents the patcher from
    // recursively scheduling itself while Framer is animating/hydrating.
    if (observerActive) {
      observer.disconnect();
      observerActive = false;
    }

    patchAll();
    connectObserver();
  };

  const queuePatch = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(runPatch);
  };

  // Child/text mutations are relevant during Framer hydration. Attribute
  // mutations (including transforms/styles used by animation) are purposely
  // ignored so animation frames never trigger content rescans.
  const observer = new MutationObserver(queuePatch);
  connectObserver();

  patchAll();

  document.addEventListener('DOMContentLoaded', () => {
    queuePatch();
    document.documentElement.classList.add('nguyen-template-ready');
    requestAnimationFrame(() => requestAnimationFrame(queuePatch));
  }, { once: true });

  window.addEventListener('load', queuePatch, { once: true });

  // The old implementation forced 40 full-document patch passes every 125ms.
  // Keep the observer only for the hydration window, then disconnect it.
  window.setTimeout(() => {
    hydrationWindowOpen = false;
    if (observerActive) {
      observer.disconnect();
      observerActive = false;
    }
    if (queued) {
      queued = false;
      patchAll();
    }
  }, 6000);`

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

  // Keep the native Framer motion system untouched. We optimize only the
  // NGUYEN content-patching work around it.
  html = html.replace(
    "</head>",
    `<style id="nguyen-performance-css">
      /* Isolate paint/layout work for major Framer sections without changing
         their authored animation values or transition curves. */
      @media (min-width: 810px) {
        [data-framer-name="Section"] { contain: paint; }
      }
      @media (prefers-reduced-motion: reduce) {
        /* Respect the operating-system preference without modifying the
           default animation experience for other visitors. */
        html { scroll-behavior: auto !important; }
      }
    </style></head>`,
  )

  const headers = new Headers(sourceResponse.headers)
  headers.set("Content-Type", "text/html; charset=utf-8")
  headers.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=86400")
  headers.set("Vary", "Accept-Encoding")

  return new Response(html, {
    status: sourceResponse.status,
    headers,
  })
}
