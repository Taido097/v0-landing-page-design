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
  [/ArcSphere/gi, 'NGUYEN'],
  [/Interior & Architecture/gi, 'Architecture · Engineering · Permit'],
  [/Interior and Architecture/gi, 'Architecture · Engineering · Permit'],
  [/Interior Design/gi, 'Architectural Design & Tenant Improvement (TI)'],
  [/Residential Interior/gi, 'Architectural Design & Tenant Improvement (TI)'],
  [/Commercial Interior/gi, 'Commercial Architecture'],
  [/Space Planning/gi, 'Existing-Condition Survey & Business Layout'],
  [/Design Consultation/gi, 'Zoning, Occupancy & Local Requirements'],
  [/Project Management/gi, 'Building Permit, Plan Check & Corrections'],
  [/Architecture Design/gi, 'Architectural, Structural & MEP'],
  [/Interior Styling/gi, 'Electrical, Plumbing & HVAC Coordination'],
  [/Furniture Selection/gi, 'Title 24 & Code Compliance'],
  [/Lighting Design/gi, 'Electrical, Plumbing & HVAC Coordination'],
  [/3D Visualization/gi, 'Permit Drawing Documentation'],
  [/Material Selection/gi, 'Consultant & City Coordination'],
  [/Renovation/gi, 'Commercial Remodel & Renovation'],
  [/Office Design/gi, 'Office & Tenant Improvements'],
  [/Retail Design/gi, 'Retail Stores'],
  [/Hospitality Design/gi, 'Restaurants, Cafés & Boba Shops'],
  [/Concept Development/gi, 'Existing-Condition Survey & Project Planning'],
  [/Design Development/gi, 'Architecture & Engineering'],
  [/Documentation/gi, 'Permit Documentation'],
  [/Implementation/gi, 'Plan Check & Corrections'],
  [/Our Projects/gi, 'Commercial Project Types'],
  [/Projects/gi, 'Commercial Project Types'],
  [/About Us/gi, 'About NGUYEN'],
  [/About us/gi, 'About NGUYEN'],
  [/Get in touch/gi, 'Start a Project'],
  [/Contact Us/gi, 'Contact'],
  [/Contact us/gi, 'Contact'],
];

const RENDERED_CONTENT_PATCH = `
<script id="nguyen-rendered-content-patch">
(function () {
  var processed = new WeakSet();

  var swaps = [
    [/ArcSphere Studio/gi, 'NGUYEN Architecture & Engineering'],
    [/ArcSphere/gi, 'NGUYEN'],
    [/Where Architecture\\s+Meets Experience/gi, 'Commercial Architecture\\nEngineering & Permit'],
    [/Based in Dubai, we design residential and commercial spaces that elevate how people live, work, and interact with their environment\\.?/gi, 'Based in Orange County, we provide commercial architecture, engineering and permit support from existing-condition survey and business layout through coordinated permit documents, plan check and approval.'],
    [/VIEW PROJECTS/gi, 'VIEW PROJECT TYPES'],
    [/BOOK CONSULTATION/gi, 'START A PROJECT'],
    [/DESIGN PROCESS/gi, 'PROJECT PROCESS'],
    [/PROJECTS/gi, 'PROJECT TYPES'],
    [/CONTACT US/gi, 'CONTACT'],

    [/Residential Interior/gi, 'Architectural Design & Tenant Improvement (TI)'],
    [/Commercial Interior/gi, 'Commercial Architecture'],
    [/Space Planning/gi, 'Existing-Condition Survey & Business Layout'],
    [/Design Consultation/gi, 'Zoning, Occupancy & Local Requirements'],
    [/Project Management/gi, 'Building Permit, Plan Check & Corrections'],
    [/Architecture Design/gi, 'Architectural, Structural & MEP'],
    [/Interior Styling/gi, 'Electrical, Plumbing & HVAC Coordination'],
    [/Furniture Selection/gi, 'Title 24 & Code Compliance'],
    [/Lighting Design/gi, 'Electrical, Plumbing & HVAC Coordination'],
    [/3D Visualization/gi, 'Permit Drawing Documentation'],
    [/Material Selection/gi, 'Consultant & City Coordination'],
    [/Office Design/gi, 'Office & Tenant Improvements'],
    [/Retail Design/gi, 'Retail Stores'],
    [/Hospitality Design/gi, 'Restaurants, Cafés & Boba Shops'],
    [/Renovation/gi, 'Commercial Remodel & Renovation'],

    [/Concept Development/gi, 'Existing-Condition Survey & Project Planning'],
    [/Design Development/gi, 'Architecture & Engineering'],
    [/^\\s*Documentation\\s*$/gi, 'Permit Documentation'],
    [/^\\s*Implementation\\s*$/gi, 'Plan Check & Corrections'],

    [/We begin by understanding your goals, requirements, and design vision\\.?/gi, 'We begin with an existing-condition survey, business layout needs, zoning, occupancy and local requirements.'],
    [/We refine the concept into a cohesive and functional design direction\\.?/gi, 'We develop coordinated architectural, structural and MEP documents for the commercial project.'],
    [/We prepare detailed drawings and specifications for execution\\.?/gi, 'We prepare permit-ready drawings with Title 24 and applicable code compliance.'],
    [/We oversee the final execution to ensure the design is realized as intended\\.?/gi, 'We support building permit, plan check, corrections, consultant coordination and city review through approval.'],

    [/Functional and visually compelling spaces for offices, retail stores, hospitality, and businesses\\.?/gi, 'Commercial architecture and engineering for boba shops, coffee shops, cafés, restaurants, nail and beauty salons, retail stores, offices and tenant improvements.'],
    [/We create spaces that are both functional and beautiful\\.?/gi, 'We coordinate design, engineering and permit requirements to reduce avoidable revisions, time and project cost.'],
    [/Transforming spaces with thoughtful design and attention to detail\\.?/gi, 'Commercial design, engineering and permit support from concept through plan check and corrections.'],
    [/Interior spaces designed around how you live and work\\.?/gi, 'Commercial spaces planned around business operations, zoning, building code and permit approval.'],

    [/Dubai/gi, 'Huntington Beach, CA'],
    [/United Arab Emirates/gi, 'Orange County, CA']
  ];

  function patchTextNodes(root) {
    if (!root) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach(function (node) {
      if (processed.has(node)) return;
      var original = node.nodeValue || '';
      var next = original;
      swaps.forEach(function (swap) { next = next.replace(swap[0], swap[1]); });
      if (next !== original) node.nodeValue = next;
      processed.add(node);
    });
  }

  function patchContacts() {
    document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
      a.setAttribute('href', 'mailto:info@nguyenarchitecture.com');
      if ((a.textContent || '').indexOf('@') !== -1) a.textContent = 'info@nguyenarchitecture.com';
    });

    var phones = document.querySelectorAll('a[href^="tel:"]');
    if (phones[0]) {
      phones[0].setAttribute('href', 'tel:+12092338888');
      phones[0].textContent = '(209) 233-8888';
    }
    if (phones[1]) {
      phones[1].setAttribute('href', 'tel:+17147078889');
      phones[1].textContent = '(714) 707-8889';
    }
  }

  function patch() {
    patchTextNodes(document.body);
    patchContacts();
  }

  var runs = 0;
  function runPatch() {
    patch();
    runs += 1;
    if (runs < 24) setTimeout(runPatch, 250);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runPatch, { once: true });
  } else {
    runPatch();
  }
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
      /<title>[^<]*<\\/title>/i,
      '<title>NGUYEN Architecture & Engineering — Website Demo</title>',
    );

    for (const [pattern, replacement] of REPLACEMENTS) {
      html = html.replace(pattern, replacement);
    }

    html = html.replace(/info@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}/gi, 'info@nguyenarchitecture.com');
    html = html.replace(/\\(?\\d{3}\\)?[\\s.-]\\d{3}[\\s.-]\\d{4}/g, '(714) 707-8889');
    html = html.replace(/<\\/body>/i, `${RENDERED_CONTENT_PATCH}</body>`);

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
