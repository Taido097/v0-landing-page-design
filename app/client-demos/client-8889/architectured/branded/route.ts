import { GET as getOptimized } from "../optimized/route"

export const dynamic = "force-dynamic"
export const revalidate = 0

const FINAL_BRAND_CSS = String.raw`<style id="nguyen-final-brand-css">
  :root {
    --nguyen-service-navy: #001b46;
    --nguyen-service-line: rgba(171, 195, 222, 0.24);
  }

  /*
   * The first Architectured service card is rendered by Framer with two
   * inherited color tokens. Override those tokens on this card only, rather
   * than repainting generic divs. This preserves layout, typography, motion,
   * sizing, controls and all other component behavior.
   */
  #services [data-highlight="true"],
  .nguyen-first-service-card {
    --token-c8809533-d74e-4474-af14-ef3a211efd13: #001b46 !important;
    --token-48491f83-896f-4e01-8893-2183c442eb00: #001b46 !important;
    background-color: #001b46 !important;
  }

  #services [data-highlight="true"] [data-framer-name="Sub Services"],
  #services [data-highlight="true"] [data-framer-name="Light Text"],
  .nguyen-first-service-card [data-framer-name="Sub Services"],
  .nguyen-first-service-card [data-framer-name="Light Text"] {
    background-color: #001b46 !important;
  }
</style>`

const FINAL_BRAND_RUNTIME = String.raw`<script id="nguyen-final-brand-runtime">
(() => {
  const NAVY = '#001b46';
  const CARD_TOKEN = '--token-c8809533-d74e-4474-af14-ef3a211efd13';
  const PILL_TOKEN = '--token-48491f83-896f-4e01-8893-2183c442eb00';

  const normalize = (value) => (value || '')
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

  function isFirstServiceHeading(el) {
    const text = normalize(el && el.textContent);
    return text === 'site & planning + architectural design' ||
      text === 'architectural design';
  }

  function findCardRoot(heading) {
    if (!(heading instanceof HTMLElement)) return null;

    const namedVariant = heading.closest(
      '[data-highlight="true"], [data-framer-name="Desktop - Closed"], [data-framer-name="Desktop - Open"], [data-framer-name="Tablet and Phone"]'
    );
    if (namedVariant instanceof HTMLElement) return namedVariant;

    const bordered = heading.closest('[data-border="true"]');
    return bordered instanceof HTMLElement ? bordered : null;
  }

  function forceExactServiceColors(card) {
    if (!(card instanceof HTMLElement)) return;

    card.classList.add('nguyen-first-service-card');
    card.style.setProperty(CARD_TOKEN, NAVY, 'important');
    card.style.setProperty(PILL_TOKEN, NAVY, 'important');
    card.style.setProperty('background-color', NAVY, 'important');

    card.querySelectorAll('[data-framer-name="Sub Services"], [data-framer-name="Light Text"]').forEach((surface) => {
      if (!(surface instanceof HTMLElement)) return;
      surface.style.setProperty(CARD_TOKEN, NAVY, 'important');
      surface.style.setProperty(PILL_TOKEN, NAVY, 'important');
      surface.style.setProperty('background-color', NAVY, 'important');
    });
  }

  function fixFirstServiceCard() {
    const roots = new Set();

    document.querySelectorAll('[data-highlight="true"]').forEach((card) => {
      if (card instanceof HTMLElement) roots.add(card);
    });

    document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach((heading) => {
      if (!isFirstServiceHeading(heading)) return;
      const card = findCardRoot(heading);
      if (card) roots.add(card);
    });

    roots.forEach(forceExactServiceColors);
  }

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      fixFirstServiceCard();
    });
  };

  const observer = new MutationObserver(schedule);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['style', 'class', 'data-framer-name', 'data-highlight']
  });

  fixFirstServiceCard();
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
