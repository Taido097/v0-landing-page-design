import { renderNguyenPage, type NguyenPage } from './site';

const BASE_PATH = '/client-demos/client-8889/arcsphere';

const PERFORMANCE_HEAD = `
<link rel="preconnect" href="https://framerusercontent.com" crossorigin>
<link rel="dns-prefetch" href="https://framerusercontent.com">
<style id="nguyen-performance-tuning">
  html { scroll-behavior: auto !important; }
  body { overflow-x: clip; }

  /* Framer's SSR markup sometimes ships with motion elements hidden until its
     runtime hydrates them. We intentionally do not hydrate Framer on the
     client, so make the static layout visible immediately. */
  [data-framer-appear-id] {
    opacity: 1 !important;
    transform: none !important;
  }

  .nguyen-service-card,
  .nguyen-process > div,
  .nguyen-contact-card iframe,
  .nguyen-project-types,
  .nguyen-values,
  .nguyen-contact-strip {
    content-visibility: auto;
    contain-intrinsic-size: auto 320px;
  }

  img {
    image-rendering: auto;
  }

  /* Lightweight compositor-only motion for the content we own. No scroll
     listeners and no per-frame JavaScript. */
  @supports (animation-timeline: view()) {
    .nguyen-feature,
    .nguyen-service-card,
    .nguyen-process > div,
    .nguyen-values > div,
    .nguyen-contact-strip > div,
    .nguyen-callout,
    .nguyen-bottom-cta {
      animation-name: nguyen-native-reveal;
      animation-duration: 1ms;
      animation-fill-mode: both;
      animation-timing-function: linear;
      animation-timeline: view();
      animation-range: entry 0% cover 24%;
    }
  }

  @keyframes nguyen-native-reveal {
    from { opacity: .2; transform: translate3d(0, 24px, 0); }
    to { opacity: 1; transform: translate3d(0, 0, 0); }
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: .01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: .01ms !important;
    }
  }

  @media (max-width: 850px) {
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

function removeFramerRuntime(html: string) {
  return html
    // The visual page is already server-rendered. Removing client scripts is
    // what eliminates Framer hydration, motion loops, observers and scroll work.
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<link\b(?=[^>]*\brel=["']modulepreload["'])[^>]*>/gi, '')
    .replace(/<link\b(?=[^>]*\bas=["']script["'])[^>]*>/gi, '');
}

function addPerformanceHints(html: string) {
  if (html.includes('id="nguyen-performance-tuning"')) return html;
  return html.replace(/<\/head>/i, `${PERFORMANCE_HEAD}</head>`);
}

function lightweightClient(page: NguyenPage) {
  const activeHref = page === 'home' ? BASE_PATH : `${BASE_PATH}/${page}`;
  const nav = [
    ['Home', BASE_PATH],
    ['ADU', `${BASE_PATH}/adu`],
    ['Engineering', `${BASE_PATH}/engineering`],
    ['Land Development', `${BASE_PATH}/land-development`],
    ['Contact', `${BASE_PATH}/contact`],
  ];

  return `
<script id="nguyen-native-client">
(() => {
  const BASE = ${JSON.stringify(BASE_PATH)};
  const nav = ${JSON.stringify(nav)};
  const active = ${JSON.stringify(activeHref)};
  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim().toLowerCase();
  const sourceLabels = new Map([
    ['home', nav[0]],
    ['about', nav[1]],
    ['projects', nav[2]],
    ['services', nav[3]],
    ['contact', nav[4]],
  ]);

  function patchNavigation() {
    document.querySelectorAll('a').forEach((a) => {
      const text = normalize(a.textContent);
      const match = sourceLabels.get(text);
      if (match) {
        a.textContent = match[0];
        a.setAttribute('href', match[1]);
      }
      if (/start a project|book consultation|get in touch|contact us|request consultation/.test(text)) {
        a.setAttribute('href', BASE + '/contact');
      }
      if (/view projects|view project types/.test(text)) a.setAttribute('href', BASE);
    });

    document.querySelectorAll('a[href^="mailto:"]').forEach((a) => {
      a.setAttribute('href', 'mailto:info@nguyenarchitecture.com');
    });

    const floating = document.getElementById('nguyen-fallback-nav');
    if (floating) {
      const anchors = [...document.querySelectorAll('a')];
      const exactNav = nav.every(([label]) => anchors.some((a) => normalize(a.textContent) === label.toLowerCase()));
      floating.hidden = exactNav;
      floating.querySelectorAll('a').forEach((a) => {
        a.style.textDecoration = a.getAttribute('href') === active ? 'underline' : 'none';
      });
    }
  }

  function bindContactForm() {
    const form = document.getElementById('nguyen-contact-form');
    if (!form || form.dataset.bound === 'true') return;
    form.dataset.bound = 'true';
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const subject = 'Project Consultation Request - ' + (data.get('service') || 'Website');
      const body = [
        'Name: ' + (data.get('name') || ''),
        'Email: ' + (data.get('email') || ''),
        'Phone: ' + (data.get('phone') || ''),
        'Service: ' + (data.get('service') || ''),
        '',
        'Project details:',
        String(data.get('message') || '')
      ].join('\\n');
      window.location.href = 'mailto:info@nguyenarchitecture.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    });
  }

  function init() {
    patchNavigation();
    bindContactForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
</script>`;
}

export async function renderNguyenLaunchPage(page: NguyenPage) {
  const original = await renderNguyenPage(page);
  let html = await original.text();

  html = applyServerContent(html, page);
  html = removeFramerRuntime(html);
  html = addPerformanceHints(html);
  html = optimizeImages(html);
  html = html.replace(/<\/body>/i, `${lightweightClient(page)}</body>`);

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
