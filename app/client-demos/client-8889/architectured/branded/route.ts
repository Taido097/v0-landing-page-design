import { GET as getOptimized } from "../optimized/route"

export const dynamic = "force-dynamic"
export const revalidate = 0

const FINAL_BRAND_CSS = String.raw`<style id="nguyen-final-brand-css">
  :root {
    --nguyen-navy: #021736;
    --nguyen-navy-panel: #061f46;
    --nguyen-navy-chip: #0b2d5c;
    --nguyen-navy-line: rgba(171, 195, 222, 0.24);
  }

  .nguyen-final-panel {
    background: var(--nguyen-navy-panel) !important;
    background-color: var(--nguyen-navy-panel) !important;
  }

  .nguyen-final-chip {
    background: var(--nguyen-navy-chip) !important;
    background-color: var(--nguyen-navy-chip) !important;
  }

  .nguyen-final-surface {
    background: var(--nguyen-navy) !important;
    background-color: var(--nguyen-navy) !important;
  }

  .nguyen-final-panel *,
  .nguyen-final-chip *,
  .nguyen-final-surface * {
    border-color: var(--nguyen-navy-line);
  }
</style>`

const FINAL_BRAND_RUNTIME = String.raw`<script id="nguyen-final-brand-runtime">
(() => {
  const SELECTOR = 'section,article,main,div,a,button,li,span';

  const readColor = (value) => {
    const match = value && value.match(/rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)(?:\s*,\s*([\d.]+))?\s*\)/i);
    if (!match) return null;
    return {
      r: Number(match[1]),
      g: Number(match[2]),
      b: Number(match[3]),
      a: match[4] === undefined ? 1 : Number(match[4])
    };
  };

  const luminance = (color) => {
    const linear = (channel) => {
      const value = channel / 255;
      return value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * linear(color.r) + 0.7152 * linear(color.g) + 0.0722 * linear(color.b);
  };

  const isDarkNeutral = (color) => {
    if (!color || color.a < 0.18) return false;
    const spread = Math.max(color.r, color.g, color.b) - Math.min(color.r, color.g, color.b);
    return spread <= 24 && luminance(color) <= 0.16;
  };

  function paintElement(el) {
    if (!(el instanceof HTMLElement)) return;
    if (el.dataset.nguyenFinalSurface === '1') return;

    const style = getComputedStyle(el);
    const background = readColor(style.backgroundColor);
    if (!isDarkNeutral(background)) return;
    if (style.backgroundImage && style.backgroundImage.includes('url(')) return;

    const rect = el.getBoundingClientRect();
    if (rect.width < 24 || rect.height < 20) return;

    const viewportWidth = Math.max(window.innerWidth, document.documentElement.clientWidth || 0);
    const isLargeSection = rect.width >= Math.max(280, viewportWidth * 0.72) && rect.height >= 150;
    const isCard = rect.width >= 180 && rect.height >= 70;

    if (isLargeSection) {
      el.classList.add('nguyen-final-surface');
    } else if (isCard) {
      el.classList.add('nguyen-final-panel');
    } else {
      el.classList.add('nguyen-final-chip');
    }

    // Framer frequently uses neutral borders/dividers alongside neutral fills.
    // Keep those details in the same blue family as the converted surface.
    const border = readColor(style.borderTopColor);
    if (border && border.a > 0.05) {
      const spread = Math.max(border.r, border.g, border.b) - Math.min(border.r, border.g, border.b);
      if (spread <= 28 && luminance(border) <= 0.42) {
        el.style.setProperty('border-color', 'rgba(171, 195, 222, 0.24)', 'important');
      }
    }

    el.dataset.nguyenFinalSurface = '1';
  }

  function paintAll() {
    document.querySelectorAll(SELECTOR).forEach(paintElement);
  }

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      paintAll();
    });
  };

  const observer = new MutationObserver(schedule);
  observer.observe(document.documentElement, { childList: true, subtree: true });

  paintAll();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', schedule, { once: true });
  }
  window.addEventListener('load', schedule, { once: true });
  window.addEventListener('resize', schedule, { passive: true });

  // Framer hydrates some card surfaces after first paint, so repeat the pass
  // during the initial hydration window instead of relying on one snapshot.
  [120, 350, 800, 1600, 3000, 5500].forEach((delay) => window.setTimeout(schedule, delay));
  window.setTimeout(() => observer.disconnect(), 7000);
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
  headers.set("Cache-Control", "no-store, max-age=0, must-revalidate")
  headers.set("Pragma", "no-cache")
  headers.set("Expires", "0")

  return new Response(html, {
    status: response.status,
    headers,
  })
}
