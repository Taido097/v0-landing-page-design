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
  var processed = new WeakSet();

  var exact = new Map([
    ['PRISMAE', 'NGUYEN'],
    ['Prismae', 'NGUYEN'],
    ['Start Your Project', 'Start Your Commercial Project'],
    ['View Projects', 'View Commercial Projects'],
    ['View All Projects', 'View Commercial Projects'],
    ['Explore Dowm', 'Explore Services'],
    ['About Us', 'About NGUYEN'],
    ['Our Approach', 'Our Process'],

    ['Discovery & Strategy', 'Existing Conditions & Project Planning'],
    ['Client Consultation', 'Business Needs Consultation'],
    ['Site Analysis', 'Existing-Condition Survey'],
    ['Budget Planning', 'Project Scope Planning'],
    ['Project Brief', 'Zoning, Occupancy & Local Requirements'],

    ['Concept & Design', 'Architecture & Tenant Improvement'],
    ['Concept Design', 'Architectural Design & Tenant Improvement (TI)'],
    ['Space Planning', 'Optimized Business Layout'],
    ['3D Visualization', 'Architectural, Structural & MEP'],
    ['Material Selection', 'Title 24 & Code Compliance'],

    ['Development & Construction', 'Engineering & Permit Documentation'],
    ['Technical Drawings', 'Architectural, Structural & MEP Documents'],
    ['Construction Documents', 'Permit-Ready Documentation'],
    ['Site Coordination', 'Consultant & City Coordination'],
    ['Quality Control', 'Title 24 & Code Compliance'],

    ['Completion & Handover', 'Building Permit & Plan Check'],
    ['Final Inspection', 'Plan Check Review'],
    ['Styling & Finishing', 'Corrections & Revisions'],
    ['Project Handover', 'Building Permit Approval'],
    ['Ongoing Support', 'City & Consultant Coordination'],

    ['Boutique Hotel', 'Restaurants, Cafés & Boba Shops'],
    ['Urban Apartment', 'Nail Salons & Beauty Salons'],
    ['Luxury Retail Store', 'Retail Stores'],
    ['Office Interior', 'Office & Tenant Improvements'],
    ['Residential Renovation', 'Commercial Remodel & Renovation'],
    ['New Residence', 'New Commercial Buildings'],

    ['Architecture', 'Commercial Architecture'],
    ['Commercial Design', 'Tenant Improvement (TI)'],
    ['Interior Design', 'Engineering & Permit'],

    ['Do you manage construction as well?', 'Do you help with Building Permits and Plan Check?'],
    ['What types of projects do you specialize in?', 'What commercial projects do you specialize in?'],
    ['How does your design process work?', 'How does your commercial design and permit process work?'],
    ['Do you provide both architecture and interior design services?', 'Do you provide Architectural, Structural and MEP coordination?'],
    ['How long does a typical project take?', 'Do you coordinate zoning, occupancy and local requirements?'],
    ['Can you renovate or remodel an existing property?', 'Can you handle commercial remodels and Tenant Improvements?'],

    ['Subscribe to Our Newsletter', 'Start a Commercial Project'],
    ['Say Hello!', 'Contact NGUYEN'],
    ['New York, USA', 'Huntington Beach, CA'],
    ['London, UK', 'Orange County, CA'],
    ['Toronto, Canada', '(209) 233-8888'],
    ['hello@prismae.com', 'info@nguyenarchitecture.com'],
    ['© 2026 Prismae.', '© 2026 NGUYEN Architecture & Engineering.']
  ]);

  var phrases = [
    ['Every successful project starts with understanding your vision. We explore your goals, lifestyle, site conditions, budget, and aspirations to build a strong creative foundation.', 'We begin with an existing-condition survey, optimized business layout, zoning, occupancy and local requirements to establish a clear commercial project foundation.'],
    ['Once the design is approved, we prepare technical documentation and collaborate with contractors to ensure every element is executed with precision and craftsmanship.', 'We prepare coordinated Architectural, Structural and MEP documents, including Electrical, Plumbing and HVAC design and coordination, for building permit and plan check.'],
    ['After detailed inspections and final refinements, we deliver a fully completed space that reflects your vision and exceeds expectations.', 'We support Building Permit, Plan Check, Corrections, consultants and city agencies through approval while helping reduce revisions, time and project cost.'],
    ['An elegant hospitality destination blending local culture with refined contemporary architecture, creating timeless comfort and memorable experiences.', 'Commercial architecture, engineering and permit support for restaurants, coffee shops, cafés, boba shops and other hospitality spaces.'],
    ['A premium retail space crafted to strengthen brand identity and elevate customer engagement through immersive design experiences daily.', 'Commercial design, Tenant Improvement, engineering and permit support for retail stores and commercial renovations.'],
    ['Designing Homes That Blend Seamlessly with Nature', 'Commercial Architecture Built Around Business Needs'],
    ['Discover how thoughtful planning, natural materials, and modern architecture create homes connected to their surroundings.', 'Commercial architecture planned around business operations, zoning, occupancy, building code and permit requirements.'],
    ['Creating Workspaces That Inspire Innovation', 'Tenant Improvements for Offices and Commercial Spaces'],
    ['Explore how flexible layouts, natural lighting, and employee-focused design improve productivity and workplace well-being.', 'Tenant Improvement design and coordinated engineering for offices, retail, restaurants, salons and other commercial spaces.'],
    ['The Beauty of Minimalist Interiors in Modern Living', 'Engineering, MEP & Permit Coordination'],
    ['Learn how simplicity, texture, and carefully selected materials transform everyday spaces into timeless interiors.', 'Architectural, Structural and MEP documentation with Title 24, Electrical, Plumbing, HVAC, plan check and corrections support.'],
    ['Prismae is an architecture atelier crafting quiet, enduring spaces where light, material, and proportion take precedence.', 'NGUYEN Architecture & Engineering provides full-service commercial design, engineering and permit support from concept through approval.']
  ];

  function patchNode(node) {
    if (!node || processed.has(node)) return;
    var original = node.nodeValue || '';
    var trimmed = original.trim();
    var next = original;

    if (exact.has(trimmed)) {
      next = original.replace(trimmed, exact.get(trimmed));
    } else {
      phrases.forEach(function (pair) {
        if (next.indexOf(pair[0]) !== -1) next = next.split(pair[0]).join(pair[1]);
      });
      next = next.split('PRISMAE').join('NGUYEN').split('Prismae').join('NGUYEN');
      next = next.split('hello@prismae.com').join('info@nguyenarchitecture.com');
    }

    if (next !== original) node.nodeValue = next;
    processed.add(node);
  }

  function patchText(root) {
    if (!root) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(patchNode);
  }

  function patchLinks() {
    document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
      a.setAttribute('href', 'mailto:info@nguyenarchitecture.com');
      if ((a.textContent || '').indexOf('@') !== -1) a.textContent = 'info@nguyenarchitecture.com';
    });

    var telLinks = Array.from(document.querySelectorAll('a[href^="tel:"]'));
    if (telLinks[0]) {
      telLinks[0].setAttribute('href', 'tel:+12092338888');
      telLinks[0].textContent = '(209) 233-8888';
    }
    if (telLinks[1]) {
      telLinks[1].setAttribute('href', 'tel:+17147078889');
      telLinks[1].textContent = '(714) 707-8889';
    }
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
  }

  function patch(root) {
    patchText(root || document.body);
    patchLinks();
    cleanup();
  }

  function start() {
    patch(document.body);
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType === Node.TEXT_NODE) patchNode(node);
          if (node.nodeType === Node.ELEMENT_NODE) patchText(node);
        });
      });
      patchLinks();
      cleanup();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(function () {
      observer.disconnect();
      patch(document.body);
    }, 7000);
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
