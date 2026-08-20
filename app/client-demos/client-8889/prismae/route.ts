const SOURCE_URL = 'https://prismae.framer.website/';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const CLEANUP = `
<style id="designedbytd-prismae-cleanup">
  #__framer-badge-container,
  [id^="__framer-editorbar"],
  [class*="framer-editorbar"],
  a[title*="Create a free website with Framer"],
  a[href*="framer.com/@olynex-studio"],
  a[href*="contra.com/payment-link"],
  .framer-15bl60r-container {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    pointer-events: none !important;
  }
</style>`;

const SERVER_REPLACEMENTS: Array<[RegExp, string]> = [
  [/Prismae\s*—\s*Architecture &amp; Interior Template/gi, 'NGUYEN Architecture & Engineering'],
  [/Prismae\s*—\s*Architecture & Interior Template/gi, 'NGUYEN Architecture & Engineering'],
  [/\bPRISMAE\b/g, 'NGUYEN'],
  [/\bPrismae\b/g, 'NGUYEN'],
  [/hello@prismae\.com/gi, 'info@nguyenarchitecture.com'],
];

const CLIENT_PATCH = `
<script id="nguyen-prismae-patch">
(function () {
  var swaps = [
    ['PRISMAE', 'NGUYEN'],
    ['Prismae', 'NGUYEN'],
    ['Start Your Project', 'Start Your Commercial Project'],
    ['View Projects', 'View Project Types'],
    ['View All Projects', 'View All Project Types'],
    ['About Us', 'About NGUYEN'],
    ['Our Approach', 'Our Process'],
    ['Discovery & Strategy', 'Survey & Project Planning'],
    ['Client Consultation', 'Business Needs Consultation'],
    ['Site Analysis', 'Existing-Condition Survey'],
    ['Budget Planning', 'Project Scope Planning'],
    ['Project Brief', 'Zoning & Occupancy Review'],
    ['Concept & Design', 'Architecture & Tenant Improvement'],
    ['Concept Design', 'Architectural Design'],
    ['Space Planning', 'Business Layout Planning'],
    ['3D Visualization', 'Architectural, Structural & MEP'],
    ['Material Selection', 'Title 24 & Code Compliance'],
    ['Development & Construction', 'Engineering & Permit Documentation'],
    ['Technical Drawings', 'Architectural, Structural & MEP'],
    ['Construction Documents', 'Permit-Ready Documentation'],
    ['Site Coordination', 'Consultant & City Coordination'],
    ['Quality Control', 'Title 24 & Code Compliance'],
    ['Completion & Handover', 'Plan Check & Permit Approval'],
    ['Final Inspection', 'Plan Check Review'],
    ['Styling & Finishing', 'Corrections & Revisions'],
    ['Project Handover', 'Building Permit Approval'],
    ['Ongoing Support', 'City & Consultant Coordination'],
    ['Boutique Hotel', 'Restaurants & Cafés'],
    ['Urban Apartment', 'Nail & Beauty Salons'],
    ['Luxury Retail Store', 'Retail Stores'],
    ['Architecture', 'Commercial Architecture'],
    ['Commercial Design', 'Tenant Improvement (TI)'],
    ['Interior Design', 'Engineering & Permit'],
    ['New York, USA', 'Huntington Beach, CA'],
    ['London, UK', 'Orange County, CA'],
    ['Toronto, Canada', '(714) 707-8889'],
    ['hello@prismae.com', 'info@nguyenarchitecture.com']
  ];

  var exactParagraphs = [
    ['Every successful project starts with understanding your vision. We explore your goals, lifestyle, site conditions, budget, and aspirations to build a strong creative foundation.', 'We begin with an existing-condition survey, business layout needs, zoning, occupancy and local requirements to establish a clear commercial project foundation.'],
    ['Once the design is approved, we prepare technical documentation and collaborate with contractors to ensure every element is executed with precision and craftsmanship.', 'We prepare coordinated Architectural, Structural and MEP documents, including Electrical, Plumbing and HVAC coordination, for permit and plan check.'],
    ['After detailed inspections and final refinements, we deliver a fully completed space that reflects your vision and exceeds expectations.', 'We support Building Permit, Plan Check, Corrections and city coordination through approval while helping reduce avoidable revisions, time and project cost.']
  ];

  function patchText() {
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      var original = node.nodeValue || '';
      var next = original;
      swaps.forEach(function (pair) {
        if (next.indexOf(pair[0]) !== -1) next = next.split(pair[0]).join(pair[1]);
      });
      exactParagraphs.forEach(function (pair) {
        if (next.indexOf(pair[0]) !== -1) next = next.split(pair[0]).join(pair[1]);
      });
      if (next !== original) node.nodeValue = next;
    });
  }

  function cleanup() {
    var selectors = [
      '#__framer-badge-container',
      '[id^="__framer-editorbar"]',
      '[class*="framer-editorbar"]',
      'a[title*="Create a free website with Framer"]',
      'a[href*="framer.com/@olynex-studio"]',
      'a[href*="contra.com/payment-link"]',
      '.framer-15bl60r-container'
    ];
    selectors.forEach(function (selector) {
      document.querySelectorAll(selector).forEach(function (el) { el.remove(); });
    });
    document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
      a.setAttribute('href', 'mailto:info@nguyenarchitecture.com');
    });
  }

  function patch() {
    if (!document.body) return;
    patchText();
    cleanup();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      patch();
      setTimeout(patch, 1200);
      setTimeout(patch, 3000);
    }, { once: true });
  } else {
    patch();
    setTimeout(patch, 1200);
    setTimeout(patch, 3000);
  }
})();
</script>`;

export async function GET() {
  try {
    const response = await fetch(SOURCE_URL, {
      cache: 'no-store',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        Accept: 'text/html,application/xhtml+xml',
      },
    });

    if (!response.ok) {
      return new Response('Client demo unavailable', { status: 502 });
    }

    let html = await response.text();

    html = html.replace(
      /<head([^>]*)>/i,
      `<head$1><base href="${SOURCE_URL}"><meta name="robots" content="noindex,nofollow,noarchive"><meta name="description" content="NGUYEN Architecture & Engineering — commercial architecture, engineering, Tenant Improvement and permit support in Orange County.">${CLEANUP}`,
    );

    html = html.replace(
      /<title>[^<]*<\/title>/i,
      '<title>NGUYEN Architecture & Engineering — Website Demo</title>',
    );

    for (const [pattern, replacement] of SERVER_REPLACEMENTS) {
      html = html.replace(pattern, replacement);
    }

    html = html.replace(/<\/body>/i, `${CLIENT_PATCH}</body>`);

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'private, no-store, max-age=0',
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
      },
    });
  } catch {
    return new Response('Client demo unavailable', { status: 502 });
  }
}
