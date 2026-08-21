import { GET as getOptimized } from "../optimized/route"

export const dynamic = "force-dynamic"
export const revalidate = 0

const FINAL_BRAND_CSS = String.raw`<style id="nguyen-final-brand-css">
  :root {
    --nguyen-navy: #001b46;
    --nguyen-navy-line: rgba(171, 195, 222, 0.24);
  }

  .nguyen-hard-navy,
  .nguyen-hard-navy::before,
  .nguyen-hard-navy::after {
    background: #001b46 !important;
    background-color: #001b46 !important;
    background-image: none !important;
    border-color: var(--nguyen-navy-line) !important;
  }

  .nguyen-hard-navy * {
    border-color: var(--nguyen-navy-line);
  }
</style>`

const FINAL_BRAND_RUNTIME = String.raw`<script id="nguyen-final-brand-runtime">
(() => {
  const NAVY = '#001b46';
  const LINE = 'rgba(171, 195, 222, 0.24)';
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
  const PROJECT_TEXT = [
    'Boba Shops & Cafés',
    'Restaurants',
    'New Commercial Buildings',
    'Garden Grove, CA',
    'Interior TI',
    '1,200 SF',
    'View Project'
  ];

  const normalize = (value) => (value || '').replace(/\s+/g, ' ').trim();

  function exactMatches(text) {
    const wanted = normalize(text);
    return Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a,span,div,li,button')).filter((el) => normalize(el.textContent) === wanted);
  }

  function ancestors(el, limit) {
    const result = [];
    let node = el instanceof HTMLElement ? el : null;
    let depth = 0;
    while (node && depth < limit && node !== document.body && node !== document.documentElement) {
      result.push(node);
      node = node.parentElement;
      depth += 1;
    }
    return result;
  }

  function hardNavy(el, clearImage) {
    if (!(el instanceof HTMLElement)) return;

    if (!el.classList.contains('nguyen-hard-navy')) {
      el.classList.add('nguyen-hard-navy');
    }

    if (el.style.getPropertyValue('background-color').toLowerCase() !== NAVY) {
      el.style.setProperty('background-color', NAVY, 'important');
    }

    if (el.style.getPropertyValue('background').toLowerCase() !== NAVY) {
      el.style.setProperty('background', NAVY, 'important');
    }

    if (clearImage && el.style.getPropertyValue('background-image') !== 'none') {
      el.style.setProperty('background-image', 'none', 'important');
    }

    el.style.setProperty('border-color', LINE, 'important');
  }

  function hasPaintedBackground(el) {
    if (!(el instanceof HTMLElement)) return false;
    const style = getComputedStyle(el);
    const bg = style.backgroundColor;
    return bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'rgb(0, 0, 0, 0)';
  }

  function paintServiceTags() {
    const groupRoots = new Set();

    SERVICE_TAGS.forEach((label) => {
      exactMatches(label).forEach((anchor) => {
        const chain = ancestors(anchor, 8);

        chain.forEach((node) => {
          const rect = node.getBoundingClientRect();
          if (rect.width >= 70 && rect.height >= 20 && rect.height <= 95) {
            hardNavy(node, true);
          }
        });

        for (const node of chain) {
          const rect = node.getBoundingClientRect();
          if (rect.width >= Math.min(250, window.innerWidth * 0.62) && rect.height >= 90 && rect.height <= 390) {
            groupRoots.add(node);
            break;
          }
        }
      });
    });

    groupRoots.forEach((root) => {
      hardNavy(root, true);
      root.querySelectorAll('*').forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        const rect = node.getBoundingClientRect();
        if (rect.width >= 40 && rect.height >= 18 && hasPaintedBackground(node)) {
          hardNavy(node, true);
        }
      });
    });
  }

  function paintProjectPanels() {
    const detailRoots = new Set();

    PROJECT_TEXT.forEach((text) => {
      exactMatches(text).forEach((anchor) => {
        const chain = ancestors(anchor, 11);

        for (const node of chain) {
          const rect = node.getBoundingClientRect();
          if (rect.width >= Math.min(250, window.innerWidth * 0.66) && rect.height >= 180 && rect.height <= 780) {
            detailRoots.add(node);
            break;
          }
        }
      });
    });

    detailRoots.forEach((root) => {
      hardNavy(root, true);
      root.querySelectorAll('*').forEach((node) => {
        if (!(node instanceof HTMLElement)) return;
        const rect = node.getBoundingClientRect();
        if (rect.width >= 34 && rect.height >= 18 && hasPaintedBackground(node)) {
          hardNavy(node, true);
        }
      });
    });
  }

  function findFooterRoot() {
    const anchor = exactMatches('info@nguyenarchitecture.com')[0] || exactMatches('(209) 233-8888')[0];
    if (!anchor) return null;

    const semanticFooter = anchor.closest('footer');
    if (semanticFooter instanceof HTMLElement) return semanticFooter;

    const chain = ancestors(anchor, 16);
    return chain.find((node) => {
      const rect = node.getBoundingClientRect();
      return rect.width >= Math.min(300, window.innerWidth * 0.78) && rect.height >= 500;
    }) || null;
  }

  function paintFooter() {
    const footer = findFooterRoot();
    if (!footer) return;

    hardNavy(footer, true);
    footer.querySelectorAll('*').forEach((node) => {
      if (!(node instanceof HTMLElement)) return;
      const rect = node.getBoundingClientRect();
      const style = getComputedStyle(node);
      const hasBackgroundImage = style.backgroundImage && style.backgroundImage !== 'none';
      if (
        hasBackgroundImage ||
        (rect.width >= 30 && rect.height >= 18 && hasPaintedBackground(node)) ||
        (rect.width >= Math.min(260, window.innerWidth * 0.68) && rect.height >= 110)
      ) {
        hardNavy(node, true);
      }
    });
  }

  function paintKnownGraySurfaces() {
    paintServiceTags();
    paintProjectPanels();
    paintFooter();
  }

  let queued = false;
  function schedule() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      paintKnownGraySurfaces();
    });
  }

  const observer = new MutationObserver(schedule);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ['style', 'class']
  });

  paintKnownGraySurfaces();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', schedule, { once: true });
  }
  window.addEventListener('load', schedule, { once: true });
  window.addEventListener('resize', schedule, { passive: true });
  window.addEventListener('orientationchange', schedule, { passive: true });

  [50, 120, 250, 500, 900, 1500, 2500, 4000, 7000, 11000, 16000, 24000].forEach((delay) => {
    window.setTimeout(schedule, delay);
  });

  window.setInterval(schedule, 2500);
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
