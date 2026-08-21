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

  const SERVICE_HEADINGS = [
    'Site & Planning + Architectural Design',
    'Structural Engineering',
    'MEP Engineering',
    'Code, Energy & Permit Services'
  ];

  const SERVICE_TAGS = [
    'Site Survey & Existing Conditions',
    'Zoning & Code Review',
    'Space Planning',
    'Concept Design',
    'Floor Plans',
    'Elevations & Sections',
    'Reflected Ceiling Plans',
    'Construction Details · 3D Renderings · TI Plans',
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
    return Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,a,span,div,li,button')).filter(
      (el) => normalize(el.textContent) === wanted
    );
  }

  function ancestors(el, limit = 14) {
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

  function hardNavy(el, clearImage = true) {
    if (!(el instanceof HTMLElement)) return;

    el.classList.add('nguyen-hard-navy');
    el.style.setProperty('background', NAVY, 'important');
    el.style.setProperty('background-color', NAVY, 'important');
    if (clearImage) el.style.setProperty('background-image', 'none', 'important');
    el.style.setProperty('border-color', LINE, 'important');
  }

  function hasVisualSurface(el) {
    if (!(el instanceof HTMLElement)) return false;
    const style = getComputedStyle(el);
    const bg = style.backgroundColor;
    const image = style.backgroundImage;
    const paintedColor = bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'rgb(0, 0, 0, 0)';
    const paintedImage = image && image !== 'none';
    return paintedColor || paintedImage;
  }

  function paintSurfaceTree(root) {
    if (!(root instanceof HTMLElement)) return;
    hardNavy(root, true);

    root.querySelectorAll('*').forEach((node) => {
      if (!(node instanceof HTMLElement)) return;
      const rect = node.getBoundingClientRect();
      if (rect.width < 20 || rect.height < 14) return;
      if (hasVisualSurface(node)) hardNavy(node, true);
    });
  }

  function paintServiceRows() {
    const roots = new Set();
    const viewportWidth = Math.max(window.innerWidth, document.documentElement.clientWidth || 0);

    SERVICE_HEADINGS.forEach((heading) => {
      exactMatches(heading).forEach((anchor) => {
        const chain = ancestors(anchor, 16);

        // Framer nests each service row several levels deep. Paint every wide
        // row/section ancestor, not just the heading or chip wrapper.
        chain.forEach((node) => {
          const rect = node.getBoundingClientRect();
          if (
            rect.width >= Math.max(300, viewportWidth * 0.78) &&
            rect.height >= 150 &&
            rect.height <= 2800
          ) {
            roots.add(node);
          }
        });
      });
    });

    roots.forEach(paintSurfaceTree);

    // Also force the individual pill/tag wrappers, in case a Framer variant
    // gives them their own opaque background after hydration or interaction.
    SERVICE_TAGS.forEach((label) => {
      exactMatches(label).forEach((anchor) => {
        ancestors(anchor, 7).forEach((node) => {
          const rect = node.getBoundingClientRect();
          if (rect.width >= 55 && rect.height >= 18 && rect.height <= 110 && hasVisualSurface(node)) {
            hardNavy(node, true);
          }
        });
      });
    });
  }

  function paintProjectPanels() {
    const roots = new Set();

    PROJECT_TEXT.forEach((text) => {
      exactMatches(text).forEach((anchor) => {
        ancestors(anchor, 11).forEach((node) => {
          const rect = node.getBoundingClientRect();
          if (
            rect.width >= Math.min(250, window.innerWidth * 0.66) &&
            rect.height >= 180 &&
            rect.height <= 780
          ) {
            roots.add(node);
          }
        });
      });
    });

    roots.forEach(paintSurfaceTree);
  }

  function findFooterRoot() {
    const anchor = exactMatches('info@nguyenarchitecture.com')[0] || exactMatches('(209) 233-8888')[0];
    if (!anchor) return null;

    const semanticFooter = anchor.closest('footer');
    if (semanticFooter instanceof HTMLElement) return semanticFooter;

    return ancestors(anchor, 18).find((node) => {
      const rect = node.getBoundingClientRect();
      return rect.width >= Math.min(300, window.innerWidth * 0.78) && rect.height >= 450;
    }) || null;
  }

  function paintFooter() {
    const footer = findFooterRoot();
    if (footer) paintSurfaceTree(footer);
  }

  function paintKnownGraySurfaces() {
    paintServiceRows();
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

  [50, 120, 250, 500, 900, 1500, 2500, 4000, 7000, 11000, 16000].forEach((delay) => {
    window.setTimeout(schedule, delay);
  });

  window.setInterval(schedule, 2200);
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
