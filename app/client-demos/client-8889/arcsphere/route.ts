const SOURCE_URL = 'https://arcsphere-studio.framer.website/';

export const revalidate = 3600;

const CLIENT_DEMO_STYLES = `
<style id="designedbytd-client-demo-cleanup">
  #__framer-badge-container,
  [id^="__framer-editorbar"],
  [class*="framer-editorbar"] {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    pointer-events: none !important;
  }
</style>`;

const REPLACEMENTS: Array<[RegExp, string]> = [
  [/ArcSphere Studio/gi, 'NGUYEN Architecture & Engineering'],
  [/Interior & Architecture/gi, 'Commercial Architecture & Engineering'],
  [/Interior and Architecture/gi, 'Commercial Architecture & Engineering'],
  [/Interior Design/gi, 'Tenant Improvement & Commercial Design'],
  [/interior design/gi, 'tenant improvement and commercial design'],
  [/Our Services/gi, 'Our Services'],
  [/Our Projects/gi, 'Commercial Projects'],
  [/Projects/gi, 'Commercial Projects'],
  [/About Us/gi, 'About NGUYEN'],
  [/About us/gi, 'About NGUYEN'],
  [/Get in touch/gi, 'Start a Project'],
  [/Contact Us/gi, 'Contact'],
  [/Contact us/gi, 'Contact'],
  [/Residential Interior/gi, 'Tenant Improvement'],
  [/Commercial Interior/gi, 'Commercial Architecture'],
  [/Space Planning/gi, 'Existing-Condition Survey & Layout'],
  [/Design Consultation/gi, 'Zoning, Occupancy & Code Review'],
  [/Project Management/gi, 'Permit & Plan Check Coordination'],
  [/Architecture Design/gi, 'Architectural, Structural & MEP'],
  [/Interior Styling/gi, 'Electrical, Plumbing & HVAC'],
  [/Renovation/gi, 'Commercial Remodel & Renovation'],
  [/Office Design/gi, 'Office & Tenant Improvements'],
  [/Retail Design/gi, 'Retail Stores'],
  [/Hospitality Design/gi, 'Restaurants, Cafés & Boba Shops'],
  [/Functional and visually compelling spaces for offices, retail stores, hospitality, and businesses\./gi, 'Commercial architecture, engineering and permit support for restaurants, cafés, salons, retail stores, offices and other business spaces.'],
  [/We create spaces that are both functional and beautiful\./gi, 'We coordinate design, engineering and permitting from concept through building permit.'],
  [/Transforming spaces with thoughtful design and attention to detail\./gi, 'Helping commercial projects move from concept to design, engineering and permit with coordinated documentation.'],
];

const BUSINESS_DETAILS_SCRIPT = `
<script id="nguyen-business-content">
(function () {
  const swaps = [
    ['ArcSphere Studio', 'NGUYEN Architecture & Engineering'],
    ['Interior & Architecture', 'Commercial Architecture & Engineering'],
    ['Interior and Architecture', 'Commercial Architecture & Engineering'],
    ['Interior Design', 'Tenant Improvement & Commercial Design'],
    ['Space Planning', 'Existing-Condition Survey & Layout'],
    ['Design Consultation', 'Zoning, Occupancy & Code Review'],
    ['Project Management', 'Permit & Plan Check Coordination'],
    ['Architecture Design', 'Architectural, Structural & MEP'],
    ['Commercial Interior', 'Commercial Architecture'],
    ['Residential Interior', 'Tenant Improvement'],
    ['Office Design', 'Office & Tenant Improvements'],
    ['Retail Design', 'Retail Stores'],
    ['Hospitality Design', 'Restaurants, Cafés & Boba Shops'],
    ['Interior Styling', 'Electrical, Plumbing & HVAC'],
    ['Get in touch', 'Start a Project'],
    ['Contact Us', 'Contact'],
    ['About Us', 'About NGUYEN']
  ];

  const details = {
    email: 'info@nguyenarchitecture.com',
    phone1: '(209) 233-8888',
    phone2: '(714) 707-8889',
    location: 'Orange County · Huntington Beach, CA'
  };

  function replaceTextNode(node) {
    let value = node.nodeValue || '';
    let next = value;
    swaps.forEach(function (pair) {
      next = next.split(pair[0]).join(pair[1]);
    });
    if (next !== value) node.nodeValue = next;
  }

  function walk(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(replaceTextNode);
  }

  function patchContact() {
    document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
      a.href = 'mailto:' + details.email;
      if ((a.textContent || '').includes('@')) a.textContent = details.email;
    });

    const phoneLinks = Array.from(document.querySelectorAll('a[href^="tel:"]'));
    if (phoneLinks[0]) {
      phoneLinks[0].href = 'tel:+12092338888';
      phoneLinks[0].textContent = details.phone1;
    }
    if (phoneLinks[1]) {
      phoneLinks[1].href = 'tel:+17147078889';
      phoneLinks[1].textContent = details.phone2;
    }
  }

  function patch() {
    walk(document.body);
    patchContact();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', patch, { once: true });
  } else {
    patch();
  }

  const observer = new MutationObserver(function () { patch(); });
  observer.observe(document.documentElement, { subtree: true, childList: true });
  setTimeout(function () { observer.disconnect(); patch(); }, 5000);
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
      `<head$1><base href="${SOURCE_URL}"><meta name="robots" content="noindex,nofollow,noarchive"><meta name="description" content="NGUYEN Architecture & Engineering — commercial architecture, engineering, tenant improvement and building permit support in Orange County.">${CLIENT_DEMO_STYLES}`,
    );

    html = html.replace(
      /<title>[^<]*<\/title>/i,
      '<title>NGUYEN Architecture & Engineering — Website Demo</title>',
    );

    for (const [pattern, replacement] of REPLACEMENTS) {
      html = html.replace(pattern, replacement);
    }

    html = html.replace(/info@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/gi, 'info@nguyenarchitecture.com');

    html = html.replace(/<\/body>/i, `${BUSINESS_DETAILS_SCRIPT}</body>`);

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
