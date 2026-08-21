import { GET as getOptimized } from "../optimized/route"

export const dynamic = "force-dynamic"
export const revalidate = 0

const FINAL_BRAND_CSS = String.raw`<style id="nguyen-final-brand-css">
  :root {
    --nguyen-service-navy: #001b46;
    --nguyen-service-line: rgba(171, 195, 222, 0.24);
  }

  .nguyen-service-row-navy,
  .nguyen-service-row-navy::before,
  .nguyen-service-row-navy::after,
  .nguyen-service-pill-navy,
  .nguyen-service-pill-navy::before,
  .nguyen-service-pill-navy::after {
    background: var(--nguyen-service-navy) !important;
    background-color: var(--nguyen-service-navy) !important;
    background-image: none !important;
    border-color: var(--nguyen-service-line) !important;
    opacity: 1 !important;
    mix-blend-mode: normal !important;
    filter: none !important;
  }
</style>`

const FINAL_BRAND_RUNTIME = String.raw`<script id="nguyen-final-brand-runtime">
(() => {
  const NAVY = '#001b46';
  const LINE = 'rgba(171, 195, 222, 0.24)';

  const normalize = (value) => (value || '')
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

  function parseRgb(value) {
    if (!value || value === 'transparent') return null;
    const match = value.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+))?\s*\)/i);
    if (!match) return null;
    return {
      r: Number(match[1]),
      g: Number(match[2]),
      b: Number(match[3]),
      a: match[4] == null ? 1 : Number(match[4])
    };
  }

  function isNeutralPaintedSurface(el) {
    if (!(el instanceof HTMLElement)) return false;
    const style = getComputedStyle(el);
    const rgb = parseRgb(style.backgroundColor);
    if (!rgb || rgb.a < 0.2) return false;

    const max = Math.max(rgb.r, rgb.g, rgb.b);
    const min = Math.min(rgb.r, rgb.g, rgb.b);
    const brightness = (rgb.r + rgb.g + rgb.b) / 3;

    return max - min <= 28 && brightness >= 10 && brightness <= 245;
  }

  function forceNavy(el, pill = false) {
    if (!(el instanceof HTMLElement)) return;
    el.classList.add(pill ? 'nguyen-service-pill-navy' : 'nguyen-service-row-navy');
    el.style.setProperty('background', NAVY, 'important');
    el.style.setProperty('background-color', NAVY, 'important');
    el.style.setProperty('background-image', 'none', 'important');
    el.style.setProperty('border-color', LINE, 'important');
    el.style.setProperty('opacity', '1', 'important');
    el.style.setProperty('mix-blend-mode', 'normal', 'important');
    el.style.setProperty('filter', 'none', 'important');
  }

  function findFirstServiceRow() {
    const candidates = Array.from(document.querySelectorAll(
      '[data-framer-name="Section"], section, article, main > div, div[class*="framer-"]'
    ));

    const matches = candidates.filter((el) => {
      if (!(el instanceof HTMLElement)) return false;
      const text = normalize(el.textContent);
      if (!text) return false;

      const hasHeading =
        text.includes('site & planning + architectural design') ||
        text.includes('architectural design');
      const hasTag =
        text.includes('site survey & existing conditions') ||
        text.includes('site planning');
      const hasDetails = text.includes('show details');

      if (!hasHeading || !hasTag || !hasDetails) return false;

      const rect = el.getBoundingClientRect();
      return rect.width >= Math.max(320, window.innerWidth * 0.72) &&
        rect.height >= 180 &&
        rect.height <= 900;
    });

    matches.sort((a, b) => {
      const ar = a.getBoundingClientRect();
      const br = b.getBoundingClientRect();
      return ar.width * ar.height - br.width * br.height;
    });

    return matches[0] || null;
  }

  function paintFirstServiceRow() {
    const row = findFirstServiceRow();
    if (!row) return;

    forceNavy(row, false);

    // Framer paints the service chips on nested wrappers. Paint only neutral
    // backgrounds inside this one row so text/icons remain untouched.
    row.querySelectorAll('div,li,span,a,button').forEach((node) => {
      if (!(node instanceof HTMLElement)) return;
      const rect = node.getBoundingClientRect();
      if (rect.width < 45 || rect.height < 16) return;
      if (isNeutralPaintedSurface(node)) forceNavy(node, true);
    });

    // Catch a separate full-width inner panel if Framer keeps the visible
    // charcoal background on a child instead of the row wrapper.
    row.querySelectorAll(':scope > div').forEach((node) => {
      if (!(node instanceof HTMLElement)) return;
      const rect = node.getBoundingClientRect();
      if (rect.width >= row.getBoundingClientRect().width * 0.85 && rect.height >= 150) {
        if (isNeutralPaintedSurface(node)) forceNavy(node, false);
      }
    });
  }

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      paintFirstServiceRow();
    });
  };

  const observer = new MutationObserver(schedule);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['style', 'class']
  });

  paintFirstServiceRow();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', schedule, { once: true });
  }
  window.addEventListener('load', schedule, { once: true });
  window.addEventListener('resize', schedule, { passive: true });

  [50, 120, 250, 500, 900, 1500, 2500, 4000, 7000].forEach((delay) => {
    window.setTimeout(schedule, delay);
  });
})();
</script>`

export async function GET() {
  const response = await getOptimized()
  if (!response.ok) return response

  let html = await response.text()
  html = html.replace("</head>", `${FINAL_BRAND_CSS}</head>`)
  html = html.replace("</body>", `${FINAL_BRAND_RUNTIME}</body>`)

  const headers = new Headers(response.headers)
  headers.set("Content-Type", "text/html; charset=utf-8")
  headers.set("Cache-Control", "no-store, no-cache, max-age=0, must-revalidate")
  headers.set("Pragma", "no-cache")
  headers.set("Expires", "0")

  return new Response(html, {
    status: response.status,
    headers,
  })
}
