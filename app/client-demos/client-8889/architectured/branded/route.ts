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

  .nguyen-final-surface,
  .nguyen-final-surface::before,
  .nguyen-final-surface::after {
    background-color: var(--nguyen-navy) !important;
  }

  .nguyen-final-panel,
  .nguyen-final-panel::before,
  .nguyen-final-panel::after {
    background-color: var(--nguyen-navy-panel) !important;
  }

  .nguyen-final-chip,
  .nguyen-final-chip::before,
  .nguyen-final-chip::after {
    background-color: var(--nguyen-navy-chip) !important;
  }

  .nguyen-final-footer {
    background-color: var(--nguyen-navy) !important;
  }

  .nguyen-final-panel *,
  .nguyen-final-chip *,
  .nguyen-final-surface *,
  .nguyen-final-footer * {
    border-color: var(--nguyen-navy-line);
  }
</style>`

const FINAL_BRAND_RUNTIME = String.raw`<script id="nguyen-final-brand-runtime">
(() => {
  const SELECTOR = 'section,article,main,footer,div,a,button,li,span';
  const PROJECT_TITLES = [
    'Boba Shops & Cafés',
    'Restaurants',
    'New Commercial Buildings'
  ];
  const SERVICE_TAGS = [
    'Structural Design',
    'Structural Details',
    'Structural Calculations',
    'Foundation & Framing',
    'Retaining Walls',
    'Existing Building Modification',
    'ADU & Commercial TI Structural Support',
    'Electrical Design',
    'Plumbing Design',
    'HVAC Design',
    'Electrical Load Calculations',
    'Equipment Coordination',
    'Title 24',
    'CalGreen',
    'ADA Compliance',
    'Building Code Review',
    'Accessibility · Occupancy & Egress',
    'Permit Submittal · City Submittal',
    'Plan Check · Corrections · Resubmittal · Approval Support'
  ];

  const normalize = (value) => (value || '').replace(/\s+/g, ' ').trim();
  const colorCache = new Map();
  const colorCanvas = document.createElement('canvas');
  colorCanvas.width = 1;
  colorCanvas.height = 1;
  const colorContext = colorCanvas.getContext('2d', { willReadFrequently: true });

  function readColor(value) {
    if (!value || value === 'transparent' || !colorContext) return null;
    if (colorCache.has(value)) return colorCache.get(value);

    colorContext.clearRect(0, 0, 1, 1);
    colorContext.fillStyle = 'rgba(0,0,0,0)';
    colorContext.fillStyle = value;
    colorContext.fillRect(0, 0, 1, 1);
    const data = colorContext.getImageData(0, 0, 1, 1).data;
    const color = { r: data[0], g: data[1], b: data[2], a: data[3] / 255 };
    colorCache.set(value, color);
    return color;
  }

  function luminance(color) {
    const linear = (channel) => {
      const value = channel / 255;
      return value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * linear(color.r) + 0.7152 * linear(color.g) + 0.0722 * linear(color.b);
  }

  function isDarkNeutral(color) {
    if (!color || color.a < 0.12) return false;
    const spread = Math.max(color.r, color.g, color.b) - Math.min(color.r, color.g, color.b);
    return spread <= 60 && luminance(color) <= 0.26;
  }

  function hasDarkSurface(el) {
    if (!(el instanceof HTMLElement)) return false;
    const style = getComputedStyle(el);
    const own = readColor(style.backgroundColor);
    if (isDarkNeutral(own)) return true;

    const before = readColor(getComputedStyle(el, '::before').backgroundColor);
    const after = readColor(getComputedStyle(el, '::after').backgroundColor);
    return isDarkNeutral(before) || isDarkNeutral(after);
  }

  function addSurfaceClass(el, className) {
    if (!(el instanceof HTMLElement)) return;
    el.classList.remove('nguyen-final-surface', 'nguyen-final-panel', 'nguyen-final-chip');
    el.classList.add(className);
    el.style.setProperty('border-color', 'rgba(171, 195, 222, 0.24)', 'important');
  }

  function paintElement(el) {
    if (!(el instanceof HTMLElement) || !hasDarkSurface(el)) return;

    const rect = el.getBoundingClientRect();
    if (rect.width < 22 || rect.height < 18) return;

    const viewportWidth = Math.max(window.innerWidth, document.documentElement.clientWidth || 0);
    const isLargeSection = rect.width >= Math.max(280, viewportWidth * 0.72) && rect.height >= 150;
    const isCard = rect.width >= 180 && rect.height >= 70;

    if (isLargeSection) addSurfaceClass(el, 'nguyen-final-surface');
    else if (isCard) addSurfaceClass(el, 'nguyen-final-panel');
    else addSurfaceClass(el, 'nguyen-final-chip');
  }

  function findExact(text) {
    const wanted = normalize(text);
    const elements = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a,span,div,li,button');
    for (let i = 0; i < elements.length; i += 1) {
      const el = elements[i];
      if (normalize(el.textContent) === wanted) return el;
    }
    return null;
  }

  function ancestors(el, limit = 10) {
    const list = [];
    let node = el instanceof HTMLElement ? el : null;
    let depth = 0;
    while (node && depth < limit) {
      list.push(node);
      node = node.parentElement;
      depth += 1;
    }
    return list;
  }

  function forceProjectPanels() {
    PROJECT_TITLES.forEach((title) => {
      const anchor = findExact(title);
      if (!anchor) return;

      ancestors(anchor, 10).forEach((node) => {
        const rect = node.getBoundingClientRect();
        if (rect.width >= 220 && rect.height >= 140 && rect.height <= 760 && hasDarkSurface(node)) {
          addSurfaceClass(node, 'nguyen-final-panel');
        }
      });
    });
  }

  function forceServiceTags() {
    const groupParents = new Set();

    SERVICE_TAGS.forEach((label) => {
      const anchor = findExact(label);
      if (!anchor) return;

      const chain = ancestors(anchor, 7);
      let chip = null;

      for (const node of chain) {
        const rect = node.getBoundingClientRect();
        if (rect.width >= 80 && rect.height >= 24 && rect.height <= 92 && hasDarkSurface(node)) {
          chip = node;
          break;
        }
      }

      if (chip) {
        addSurfaceClass(chip, 'nguyen-final-chip');
        ancestors(chip.parentElement, 4).forEach((parent) => {
          if (!(parent instanceof HTMLElement)) return;
          const rect = parent.getBoundingClientRect();
          if (rect.width >= 260 && rect.height >= 90 && rect.height <= 360 && hasDarkSurface(parent)) {
            groupParents.add(parent);
          }
        });
      }
    });

    groupParents.forEach((group) => addSurfaceClass(group, 'nguyen-final-panel'));
  }

  function tintFooterBackground(footer) {
    if (!(footer instanceof HTMLElement)) return;
    footer.classList.add('nguyen-final-footer');

    const candidates = [footer, ...footer.querySelectorAll('*')];
    candidates.forEach((node) => {
      if (!(node instanceof HTMLElement)) return;
      const rect = node.getBoundingClientRect();
      const style = getComputedStyle(node);
      const backgroundImage = style.backgroundImage;

      if (
        backgroundImage &&
        backgroundImage !== 'none' &&
        backgroundImage.includes('url(') &&
        rect.width >= Math.max(260, window.innerWidth * 0.68) &&
        rect.height >= 260 &&
        node.dataset.nguyenFooterTinted !== '1'
      ) {
        node.style.setProperty(
          'background-image',
          'linear-gradient(rgba(2, 23, 54, 0.90), rgba(2, 23, 54, 0.90)), ' + backgroundImage,
          'important'
        );
        node.style.setProperty('background-color', '#021736', 'important');
        node.dataset.nguyenFooterTinted = '1';
      }

      if (hasDarkSurface(node)) {
        const nodeRect = node.getBoundingClientRect();
        if (nodeRect.width >= Math.max(260, window.innerWidth * 0.68) && nodeRect.height >= 120) {
          addSurfaceClass(node, 'nguyen-final-surface');
        } else if (nodeRect.width >= 160 && nodeRect.height >= 56) {
          addSurfaceClass(node, 'nguyen-final-panel');
        } else if (nodeRect.width >= 24 && nodeRect.height >= 18) {
          addSurfaceClass(node, 'nguyen-final-chip');
        }
      }
    });
  }

  function forceFooter() {
    const footerAnchor = findExact('info@nguyenarchitecture.com') || findExact('(209) 233-8888');
    if (!footerAnchor) return;

    let footer = footerAnchor.closest('footer');
    if (!footer) {
      const chain = ancestors(footerAnchor, 14);
      footer = chain.find((node) => {
        const rect = node.getBoundingClientRect();
        return rect.width >= Math.max(280, window.innerWidth * 0.78) && rect.height >= 520;
      }) || null;
    }

    if (footer) tintFooterBackground(footer);
  }

  function paintAll() {
    document.querySelectorAll(SELECTOR).forEach(paintElement);
    forceProjectPanels();
    forceServiceTags();
    forceFooter();
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
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style', 'class']
  });

  paintAll();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', schedule, { once: true });
  }
  window.addEventListener('load', schedule, { once: true });
  window.addEventListener('resize', schedule, { passive: true });

  [80, 180, 350, 700, 1200, 2000, 3500, 5500, 8000, 12000].forEach((delay) => {
    window.setTimeout(schedule, delay);
  });
  window.setTimeout(() => observer.disconnect(), 15000);
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
