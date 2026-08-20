const SOURCE_URL = 'https://arcsphere-studio.framer.website/';

export const revalidate = 3600;

const CLIENT_DEMO_STYLES = `
<style id="designedbytd-client-demo-cleanup">
  #__framer-badge-container,
  [id^="__framer-editorbar"],
  [class*="framer-editorbar"],
  .clicksnap-widget,
  [class*="clicksnap-widget"] {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    pointer-events: none !important;
  }

  #nguyen-client-info {
    width: min(93%, 1340px);
    margin: 96px auto 48px;
    color: #4f4742;
    font-family: "Inter Display", Inter, Arial, sans-serif;
  }
  #nguyen-client-info * { box-sizing: border-box; }
  #nguyen-client-info .ng-kicker {
    font-size: 12px;
    letter-spacing: .12em;
    text-transform: uppercase;
    opacity: .58;
    margin-bottom: 20px;
  }
  #nguyen-client-info .ng-title {
    margin: 0;
    max-width: 980px;
    font-size: clamp(42px, 6vw, 92px);
    line-height: .96;
    letter-spacing: -.055em;
    font-weight: 500;
  }
  #nguyen-client-info .ng-grid {
    display: grid;
    grid-template-columns: 1.15fr .85fr;
    gap: 48px;
    margin-top: 56px;
    padding-top: 28px;
    border-top: 1px solid rgba(79,71,66,.22);
  }
  #nguyen-client-info .ng-copy {
    max-width: 700px;
    font-size: 20px;
    line-height: 1.5;
    opacity: .78;
  }
  #nguyen-client-info .ng-services {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 24px;
  }
  #nguyen-client-info .ng-item {
    padding: 14px 0;
    border-bottom: 1px solid rgba(79,71,66,.18);
    font-size: 15px;
    line-height: 1.35;
  }
  #nguyen-client-info .ng-contact {
    margin-top: 52px;
    padding: 28px 0;
    border-top: 1px solid rgba(79,71,66,.22);
    border-bottom: 1px solid rgba(79,71,66,.22);
    display: flex;
    flex-wrap: wrap;
    gap: 14px 34px;
    font-size: 15px;
  }
  #nguyen-client-info .ng-contact a { color: inherit; text-decoration: none; }
  @media (max-width: 809px) {
    #nguyen-client-info { margin-top: 64px; width: calc(100% - 32px); }
    #nguyen-client-info .ng-grid { grid-template-columns: 1fr; gap: 28px; margin-top: 36px; }
    #nguyen-client-info .ng-copy { font-size: 17px; }
    #nguyen-client-info .ng-services { grid-template-columns: 1fr; }
    #nguyen-client-info .ng-contact { flex-direction: column; gap: 10px; }
  }
</style>`;

const CLIENT_DEMO_SCRIPT = `
<script id="designedbytd-nguyen-demo">
(() => {
  const BRAND = 'NGUYEN Architecture & Engineering';
  const replacements = [
    [/ArcSphere Studio/gi, BRAND],
    [/Your Architecture Studio/gi, BRAND],
    [/Interior & Architecture/gi, 'Architecture & Engineering'],
    [/interior and architecture/gi, 'architecture and engineering'],
    [/Functional and visually compelling spaces for offices, retail stores, hospitality, and businesses\./gi,
      'Commercial architecture, engineering, tenant improvements, and permit support for Orange County businesses.'],
    [/Residential Interior Design/gi, 'Architecture & Tenant Improvement'],
    [/Commercial Interior Design/gi, 'Commercial Design & Engineering'],
    [/Interior Design/gi, 'Commercial Design'],
    [/Space Planning/gi, 'Zoning, Occupancy & Code Review'],
    [/Renovation & Remodeling/gi, 'Commercial Remodel & Renovation'],
    [/Renovation Planning/gi, 'Permit, Plan Check & Corrections']
  ];

  const replaceText = (value) => {
    let next = value;
    for (const [pattern, replacement] of replacements) next = next.replace(pattern, replacement);
    return next;
  };

  const applyCopy = (root = document.body) => {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      if (!node.parentElement || ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(node.parentElement.tagName)) continue;
      const oldValue = node.nodeValue || '';
      const newValue = replaceText(oldValue);
      if (newValue !== oldValue) node.nodeValue = newValue;
    }

    document.querySelectorAll('a[href]').forEach((anchor) => {
      const href = anchor.getAttribute('href') || '';
      if (href.includes('arcsphere-studio.framer.website/contact')) {
        anchor.setAttribute('href', 'mailto:info@nguyenarchitecture.com');
      }
    });
  };

  const addBusinessInfo = () => {
    if (document.getElementById('nguyen-client-info')) return;
    const main = document.querySelector('#main');
    if (!main) return;

    const section = document.createElement('section');
    section.id = 'nguyen-client-info';
    section.innerHTML = `
      <div class="ng-kicker">Commercial Architecture · Engineering · Permit</div>
      <h2 class="ng-title">From idea to design, engineering, and building permit.</h2>
      <div class="ng-grid">
        <div class="ng-copy">
          NGUYEN Architecture & Engineering provides complete design, engineering, and permit support for commercial projects. The team coordinates architecture, structural, electrical, plumbing, HVAC, zoning, code compliance, plan check, and corrections so projects can move forward efficiently.
        </div>
        <div class="ng-services">
          <div class="ng-item">Site survey & optimized business layout</div>
          <div class="ng-item">Architecture & Tenant Improvement (TI)</div>
          <div class="ng-item">Zoning, occupancy & local requirements</div>
          <div class="ng-item">Architectural, Structural & MEP documents</div>
          <div class="ng-item">Title 24 & Code Compliance</div>
          <div class="ng-item">Electrical, Plumbing & HVAC coordination</div>
          <div class="ng-item">Building Permit, Plan Check & Corrections</div>
          <div class="ng-item">Consultant & city-agency coordination</div>
          <div class="ng-item">Boba, coffee shops & cafés</div>
          <div class="ng-item">Restaurants</div>
          <div class="ng-item">Nail & beauty salons</div>
          <div class="ng-item">Retail stores</div>
          <div class="ng-item">Office & Tenant Improvements</div>
          <div class="ng-item">Commercial remodel & renovation</div>
          <div class="ng-item">New commercial buildings</div>
        </div>
      </div>
      <div class="ng-contact">
        <span>Huntington Beach · Orange County, CA</span>
        <a href="tel:+12092338888">(209) 233-8888</a>
        <a href="tel:+17147078889">(714) 707-8889</a>
        <a href="mailto:info@nguyenarchitecture.com">info@nguyenarchitecture.com</a>
      </div>
    `;
    main.appendChild(section);
  };

  const run = () => {
    applyCopy();
    addBusinessInfo();
    document.title = 'NGUYEN Architecture & Engineering — Client Website Demo';
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run, { once: true });
  else run();

  let timer = 0;
  const observer = new MutationObserver(() => {
    clearTimeout(timer);
    timer = window.setTimeout(applyCopy, 80);
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.setTimeout(run, 900);
  window.setTimeout(run, 2200);
})();
</script>`;

export async function GET() {
  try {
    const response = await fetch(SOURCE_URL, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return new Response('Client demo unavailable', { status: 502 });
    }

    let html = await response.text();

    html = html.replace(
      /<head([^>]*)>/i,
      `<head$1><base href="${SOURCE_URL}"><meta name="robots" content="noindex,nofollow,noarchive">${CLIENT_DEMO_STYLES}`,
    );

    html = html.replace(/ArcSphere Studio/g, 'NGUYEN Architecture & Engineering');
    html = html.replace(/Your Architecture Studio/g, 'NGUYEN Architecture & Engineering');
    html = html.replace(
      /Functional and visually compelling spaces for offices, retail stores, hospitality, and businesses\./g,
      'Commercial architecture, engineering, tenant improvements, and permit support for Orange County businesses.',
    );

    html = html.replace(
      /<title>[^<]*<\/title>/i,
      '<title>NGUYEN Architecture & Engineering — Client Website Demo</title>',
    );

    html = html.replace(/<\/body>/i, `${CLIENT_DEMO_SCRIPT}</body>`);

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'private, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
      },
    });
  } catch {
    return new Response('Client demo unavailable', { status: 502 });
  }
}
