const SOURCE_URL = 'https://prismae.framer.website/';

export const revalidate = 3600;

const CLEANUP = `
<style id="designedbytd-prismae-cleanup">
  #__framer-badge-container,
  [id^="__framer-editorbar"],
  [class*="framer-editorbar"],
  .framer-15bl60r-container,
  a[href*="contra.com/payment-link"],
  a[href*="framer.com/@olynex-studio"],
  a[title*="Create a free website with Framer"] {
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
  [/© 2026 Prismae\./gi, '© 2026 NGUYEN Architecture & Engineering.'],
];

const CLIENT_PATCH = `
<script id="nguyen-prismae-content">
(function () {
  var swaps = [
    ['PRISMAE', 'NGUYEN'],
    ['Prismae', 'NGUYEN'],
    ['Start Your Project', 'Start Your Commercial Project'],
    ['View Projects', 'View Project Types'],
    ['View All Projects', 'View All Project Types'],
    ['Explore Dowm', 'Explore Services'],
    ['About Us', 'About NGUYEN'],
    ['Our Approach', 'Our Process'],

    ['Discovery & Strategy', 'Survey & Project Planning'],
    ['Every successful project starts with understanding your vision. We explore your goals, lifestyle, site conditions, budget, and aspirations to build a strong creative foundation.', 'We begin with an existing-condition survey, business layout needs, zoning, occupancy and local requirements to establish a clear commercial project foundation.'],
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
    ['Once the design is approved, we prepare technical documentation and collaborate with contractors to ensure every element is executed with precision and craftsmanship.', 'We prepare coordinated Architectural, Structural and MEP documents, including Electrical, Plumbing and HVAC coordination, for permit and plan check.'],
    ['Technical Drawings', 'Architectural, Structural & MEP'],
    ['Construction Documents', 'Permit-Ready Documentation'],
    ['Site Coordination', 'Consultant & City Coordination'],
    ['Quality Control', 'Title 24 & Code Compliance'],

    ['Completion & Handover', 'Plan Check & Permit Approval'],
    ['After detailed inspections and final refinements, we deliver a fully completed space that reflects your vision and exceeds expectations.', 'We support Building Permit, Plan Check, Corrections and city coordination through approval while helping reduce avoidable revisions, time and project cost.'],
    ['Final Inspection', 'Plan Check Review'],
    ['Styling & Finishing', 'Corrections & Revisions'],
    ['Project Handover', 'Building Permit Approval'],
    ['Ongoing Support', 'City & Consultant Coordination'],

    ['Boutique Hotel', 'Restaurants & Cafés'],
    ['An elegant hospitality destination blending local culture with refined contemporary architecture, creating timeless comfort and memorable experiences.', 'Commercial architecture and engineering for restaurants, cafés, boba shops and hospitality spaces with coordinated permit documentation.'],
    ['Urban Apartment', 'Nail & Beauty Salons'],
    ['Luxury Retail Store', 'Retail Stores'],
    ['A premium retail space crafted to strengthen brand identity and elevate customer engagement through immersive design experiences daily.', 'Commercial design, Tenant Improvement, engineering and permit support for retail spaces and business renovations.'],

    ['Architecture', 'Commercial Architecture'],
    ['Commercial Design', 'Tenant Improvement (TI)'],
    ['Interior Design', 'Engineering & Permit'],
    ['Designing Homes That Blend Seamlessly with Nature', 'Commercial Architecture Built Around Business Needs'],
    ['Discover how thoughtful planning, natural materials, and modern architecture create homes connected to their surroundings.', 'Commercial architecture planned around operations, zoning, occupancy, building code and permit requirements.'],
    ['Creating Workspaces That Inspire Innovation', 'Tenant Improvements for Offices and Commercial Spaces'],
    ['Explore how flexible layouts, natural lighting, and employee-focused design improve productivity and workplace well-being.', 'Tenant Improvement design and coordinated engineering for offices, retail, restaurants, salons and other commercial spaces.'],
    ['The Beauty of Minimalist Interiors in Modern Living', 'Engineering, MEP and Permit Coordination'],
    ['Learn how simplicity, texture, and carefully selected materials transform everyday spaces into timeless interiors.', 'Architectural, Structural and MEP documentation with Title 24, Electrical, Plumbing, HVAC, plan check and corrections support.'],

    ['Do you manage construction as well?', 'Do you help with Building Permits and Plan Check?'],
    ['What types of projects do you specialize in?', 'What commercial projects do you specialize in?'],
    ['How does your design process work?', 'How does your commercial design and permit process work?'],
    ['Do you provide both architecture and interior design services?', 'Do you provide Architecture, Structural and MEP coordination?'],
    ['How long does a typical project take?', 'Do you coordinate zoning, occupancy and local requirements?'],
    ['Can you renovate or remodel an existing property?', 'Can you handle commercial remodels and Tenant Improvements?'],

    ['Subscribe to Our Newsletter', 'Start a Commercial Project'],
    ['Say Hello!', 'Contact NGUYEN'],
    ['hello@prismae.com', 'info@nguyenarchitecture.com'],
    ['© 2026 Prismae.', '© 2026 NGUYEN Architecture & Engineering.'],
    ['New York, USA', 'Huntington Beach, CA'],
    ['London, UK', 'Orange County, CA'],
    ['Toronto, Canada', '(714) 707-8889'],
    ['500+', 'Commercial'],
    ['clients have already received our work from worldwide.', 'Architecture · Engineering · Permit'],
    ['100x', 'Full'],
    ['Sucess Rate', 'Permit Support']
  ];

  function patchText(root) {
    if (!root) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) {
      var value = node.nodeValue || '';
      var next = value;
      swaps.forEach(function (pair) {
        if (next.indexOf(pair[0]) !== -1) next = next.split(pair[0]).join(pair[1]);
      });
      if (next !== value) node.nodeValue = next;
    });
  }

  function patchLinks() {
    document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
      a.href = 'mailto:info@nguyenarchitecture.com';
      if ((a.textContent || '').indexOf('@') !== -1) a.textContent = 'info@nguyenarchitecture.com';
    });
    document.querySelectorAll('a[href*="contra.com/payment-link"], a[href*="framer.com/@olynex-studio"], a[title*="Create a free website with Framer"]').forEach(function (a) {
      var container = a.closest('.framer-15bl60r-container');
      if (container) container.remove(); else a.remove();
    });
    var badge = document.getElementById('__framer-badge-container');
    if (badge) badge.remove();
  }

  function patch() {
    patchText(document.body);
    patchLinks();
  }

  function start() {
    patch();
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType === 1) patchText(node);
        });
      });
      patchLinks();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(function () { observer.disconnect(); patch(); }, 7000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
</script>`;

export async function GET() {
  try {
    const response = await fetch(SOURCE_URL, { next: { revalidate: 3600 } });
    if (!response.ok) return new Response('Client demo unavailable', { status: 502 });

    let html = await response.text();

    html = html.replace(
      /<head([^>]*)>/i,
      `<head$1><base href="${SOURCE_URL}"><meta name="robots" content="noindex,nofollow,noarchive"><meta name="description" content="NGUYEN Architecture & Engineering — commercial architecture, engineering, Tenant Improvement and permit support in Orange County.">${CLEANUP}`,
    );

    html = html.replace(/<title>[^<]*<\/title>/i, '<title>NGUYEN Architecture & Engineering — Website Demo</title>');

    for (const [pattern, replacement] of SERVER_REPLACEMENTS) {
      html = html.replace(pattern, replacement);
    }

    html = html.replace(/<\/body>/i, `${CLIENT_PATCH}</body>`);

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
