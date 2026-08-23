import { renderNguyenPage, type NguyenPage } from './site';

const BASE_PATH = '/client-demos/client-8889/arcsphere';

const PERFORMANCE_HEAD = `
<link rel="preconnect" href="https://framerusercontent.com" crossorigin>
<link rel="dns-prefetch" href="https://framerusercontent.com">
<style id="nguyen-performance-tuning">
  .nguyen-service-card,
  .nguyen-process > div,
  .nguyen-contact-card iframe,
  .nguyen-project-types,
  .nguyen-values,
  .nguyen-contact-strip {
    content-visibility: auto;
    contain-intrinsic-size: auto 320px;
  }
  img { image-rendering: auto; }
  @media (max-width: 850px) {
    body { overflow-x: clip; }
    .nguyen-official-detail { contain: layout style; }
  }
</style>`;

const commonPairs: Array<[string, string]> = [
  ['ArcSphere Studio', 'NGUYEN Architecture & Engineering'],
  ['ArcSphere', 'NGUYEN'],
  ['Interior & Architecture', 'Design · Engineer · Permit'],
  ['Interior and Architecture', 'Design · Engineer · Permit'],
  ['Dubai', 'Huntington Beach, CA'],
  ['United Arab Emirates', 'California'],
];

const pagePairs: Record<NguyenPage, Array<[string, string]>> = {
  home: [
    ['Where Architecture Meets Experience', 'Design · Engineer · Permit'],
    ['Where Architecture', 'One Team.'],
    ['Meets Experience', 'Complete Solutions.'],
    ['Based in Dubai, we design residential and commercial spaces that elevate how people live, work, and interact with their environment.', 'Serving Northern and Southern California with architecture, engineering, Title 24, permit support, ADUs, commercial design, and development services.'],
    ['Residential Interior', 'Residential Architecture'],
    ['Commercial Interior', 'Commercial Architecture'],
    ['Space Planning', 'ADU Design & Permitting'],
    ['Design Consultation', 'Engineering'],
    ['Project Management', 'Permit Services'],
  ],
  adu: [
    ['Where Architecture Meets Experience', 'Complete ADU Design & Permit Solutions'],
    ['Where Architecture', 'Complete ADU'],
    ['Meets Experience', 'Design & Permit Solutions'],
    ['Based in Dubai, we design residential and commercial spaces that elevate how people live, work, and interact with their environment.', 'ADU planning, architecture, structural engineering, MEP, Title 24, plan check, and permit support under one coordinated team.'],
    ['Residential Interior', 'ADU Planning'],
    ['Commercial Interior', 'Architectural Design'],
    ['Space Planning', 'Structural + MEP'],
    ['Design Consultation', 'Title 24'],
    ['Project Management', 'Permit Services'],
  ],
  engineering: [
    ['Where Architecture Meets Experience', 'Complete Design & Engineering Solutions'],
    ['Where Architecture', 'Architecture +'],
    ['Meets Experience', 'Engineering'],
    ['Based in Dubai, we design residential and commercial spaces that elevate how people live, work, and interact with their environment.', 'Architectural, structural, MEP, Title 24, code compliance, and permit services coordinated from concept to approval.'],
    ['Residential Interior', 'Architectural Design'],
    ['Commercial Interior', 'Structural Engineering'],
    ['Space Planning', 'MEP Engineering'],
    ['Design Consultation', 'Title 24 & Code'],
    ['Project Management', 'Permit Services'],
  ],
  'land-development': [
    ['Where Architecture Meets Experience', 'A Clear Process. A Smooth Journey.'],
    ['Where Architecture', 'Site to'],
    ['Meets Experience', 'Approval'],
    ['Based in Dubai, we design residential and commercial spaces that elevate how people live, work, and interact with their environment.', 'Site analysis, zoning and land-use review, feasibility, concept design, engineering, permit submittal, and plan-check coordination.'],
    ['Residential Interior', 'Site & Feasibility'],
    ['Commercial Interior', 'Planning & Zoning'],
    ['Space Planning', 'Concept Design'],
    ['Design Consultation', 'Engineering'],
    ['Project Management', 'Permit & Approval'],
  ],
  contact: [
    ['Where Architecture Meets Experience', 'Start Your Project with NGUYEN'],
    ['Where Architecture', 'Start Your Project'],
    ['Meets Experience', 'with NGUYEN'],
    ['Based in Dubai, we design residential and commercial spaces that elevate how people live, work, and interact with their environment.', 'Serving Northern and Southern California. Orange County office: 7171 Warner Ave. Ste. B, Huntington Beach, CA 92647.'],
    ['Residential Interior', 'Residential'],
    ['Commercial Interior', 'Commercial'],
    ['Space Planning', 'ADU'],
    ['Design Consultation', 'Engineering'],
    ['Project Management', 'Permit Services'],
  ],
};

function replaceAllLiteral(html: string, from: string, to: string) {
  if (!from || from === to) return html;
  return html.split(from).join(to);
}

function applyServerContent(html: string, page: NguyenPage) {
  const pairs = [...commonPairs, ...pagePairs[page]].sort((a, b) => b[0].length - a[0].length);
  let next = html;
  for (const [from, to] of pairs) next = replaceAllLiteral(next, from, to);
  return next;
}

function optimizeImages(html: string) {
  let index = 0;
  return html.replace(/<img\b[^>]*>/gi, (tag) => {
    const current = index++;
    let next = tag;

    if (!/\bdecoding=/i.test(next)) next = next.replace(/<img\b/i, '<img decoding="async"');
    if (current > 1 && !/\bloading=/i.test(next)) next = next.replace(/<img\b/i, '<img loading="lazy"');
    if (current === 0 && !/\bfetchpriority=/i.test(next)) next = next.replace(/<img\b/i, '<img fetchpriority="high"');

    return next;
  });
}

function stripPollingScripts(html: string) {
  return html
    .replace(/<script id="nguyen-official-content-patch">[\s\S]*?<\/script>/i, '')
    .replace(/<script id="nguyen-official-nav-patch">[\s\S]*?<\/script>/i, '');
}

function lightweightClientPatch(page: NguyenPage) {
  const pairs = [...commonPairs, ...pagePairs[page]];
  const activeHref = page === 'home' ? BASE_PATH : `${BASE_PATH}/${page}`;
  const nav = [
    ['Home', BASE_PATH],
    ['ADU', `${BASE_PATH}/adu`],
    ['Engineering', `${BASE_PATH}/engineering`],
    ['Land Development', `${BASE_PATH}/land-development`],
    ['Contact', `${BASE_PATH}/contact`],
  ];

  return `
<script id="nguyen-lightweight-patch">
(() => {
  const pairs = ${JSON.stringify(pairs)};
  const exact = new Map(pairs.map(([a,b]) => [a.replace(/\\s+/g, ' ').trim(), b]));
  const nav = ${JSON.stringify(nav)};
  const active = ${JSON.stringify(activeHref)};
  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
  const normalizeLower = (value) => normalize(value).toLowerCase();
  const sourceLabels = new Map([
    ['home', nav[0]],
    ['about', nav[1]],
    ['projects', nav[2]],
    ['services', nav[3]],
    ['contact', nav[4]],
  ]);

  function patchTextOnce() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const next = exact.get(normalize(node.nodeValue));
      if (next && node.nodeValue !== next) node.nodeValue = next;
    }
  }

  function patchLinksOnce() {
    document.querySelectorAll('a').forEach((a) => {
      const text = normalizeLower(a.textContent);
      const match = sourceLabels.get(text);
      if (match) {
        a.textContent = match[0];
        a.setAttribute('href', match[1]);
      }
      if (/start a project|book consultation|get in touch|contact us|request consultation/.test(text)) {
        a.setAttribute('href', ${JSON.stringify(BASE_PATH)} + '/contact');
      }
      if (/view projects|view project types/.test(text)) a.setAttribute('href', ${JSON.stringify(BASE_PATH)});
    });

    document.querySelectorAll('a[href^="mailto:"]').forEach((a) => {
      a.setAttribute('href', 'mailto:info@nguyenarchitecture.com');
      if (/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(normalize(a.textContent))) {
        a.textContent = 'info@nguyenarchitecture.com';
      }
    });

    const anchors = [...document.querySelectorAll('a')];
    const exactNav = nav.every(([label]) => anchors.some((a) => normalizeLower(a.textContent) === label.toLowerCase()));
    const floating = document.getElementById('nguyen-fallback-nav');
    if (floating) {
      floating.hidden = exactNav;
      floating.querySelectorAll('a').forEach((a) => {
        a.style.textDecoration = a.getAttribute('href') === active ? 'underline' : 'none';
      });
    }
  }

  function run() {
    patchTextOnce();
    patchLinksOnce();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => requestAnimationFrame(run), { once: true });
  } else {
    requestAnimationFrame(run);
  }

  // One final post-hydration pass only. No polling or scroll-time DOM scans.
  setTimeout(() => requestAnimationFrame(run), 350);
})();
</script>`;
}

function addPerformanceHints(html: string) {
  if (html.includes('id="nguyen-performance-tuning"')) return html;
  return html.replace(/<\/head>/i, `${PERFORMANCE_HEAD}</head>`);
}

export async function renderNguyenLaunchPage(page: NguyenPage) {
  const original = await renderNguyenPage(page);
  let html = await original.text();

  html = applyServerContent(html, page);
  html = stripPollingScripts(html);
  html = addPerformanceHints(html);
  html = optimizeImages(html);
  html = html.replace(/<\/body>/i, `${lightweightClientPatch(page)}</body>`);

  const headers = new Headers(original.headers);
  headers.set('Content-Type', 'text/html; charset=utf-8');
  headers.set('Cache-Control', 'no-store, max-age=0');
  headers.set('CDN-Cache-Control', 'no-store');
  headers.set('Pragma', 'no-cache');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('X-Content-Type-Options', 'nosniff');

  return new Response(html, {
    status: original.status,
    headers,
  });
}
