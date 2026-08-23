const SOURCE_URL = 'https://arcsphere-studio.framer.website/';
const BASE_PATH = '/client-demos/client-8889/arcsphere';

export type NguyenPage = 'home' | 'adu' | 'engineering' | 'land-development' | 'contact';

type PageContent = {
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  intro: string;
  keywords: string;
  body: string;
};

const pages: Record<NguyenPage, PageContent> = {
  home: {
    title: 'NGUYEN Architecture & Engineering | Orange County',
    description:
      'Residential and commercial architecture, ADU design, engineering, permitting, and land development support in Orange County, California.',
    eyebrow: 'Architecture · Engineering · Development',
    heading: 'Residential and commercial projects, one coordinated team.',
    intro:
      'NGUYEN Architecture & Engineering supports homeowners, businesses, and development teams from early planning through design, engineering coordination, permitting, and project delivery.',
    keywords:
      'Orange County architecture, residential architecture, commercial architecture, ADU design, engineering services, land development, building permits',
    body: `
      <div class="nguyen-split">
        <article class="nguyen-feature">
          <span>01</span>
          <h3>Residential</h3>
          <p>Home additions, remodels, new residential design, ADUs, permitting, and engineering coordination tailored to the property and project goals.</p>
          <a href="${BASE_PATH}/adu">Explore ADU services →</a>
        </article>
        <article class="nguyen-feature">
          <span>02</span>
          <h3>Commercial</h3>
          <p>Commercial architecture, tenant improvements, existing-condition surveys, business layouts, engineering coordination, plan check, and permit support.</p>
          <a href="${BASE_PATH}/engineering">Explore engineering →</a>
        </article>
      </div>
      <div class="nguyen-services-grid">
        <a class="nguyen-service-card" href="${BASE_PATH}/adu"><small>Accessory Dwelling Units</small><strong>ADU design, permitting & construction support</strong><span>View service →</span></a>
        <a class="nguyen-service-card" href="${BASE_PATH}/engineering"><small>Engineering</small><strong>Structural, civil & coordinated building systems</strong><span>View service →</span></a>
        <a class="nguyen-service-card" href="${BASE_PATH}/land-development"><small>Land Development</small><strong>Site analysis, entitlement & infrastructure coordination</strong><span>View service →</span></a>
      </div>
    `,
  },
  adu: {
    title: 'ADU Design & Permitting | NGUYEN Architecture & Engineering',
    description:
      'ADU design, permitting, engineering coordination, and construction-document support for accessory dwelling units in Orange County, California.',
    eyebrow: 'Accessory Dwelling Units',
    heading: 'ADUs designed around the property, the code, and how you plan to use the space.',
    intro:
      'From early feasibility through permit-ready documents, NGUYEN helps property owners plan accessory dwelling units that respond to site constraints, local requirements, budget, and long-term use.',
    keywords:
      'Orange County ADU, ADU design, ADU architect, accessory dwelling unit plans, ADU permit, ADU engineering, garage conversion ADU',
    body: `
      <div class="nguyen-services-grid nguyen-services-grid--two">
        <article class="nguyen-service-card"><small>01 · Feasibility</small><strong>Site & zoning review</strong><p>Review the property, access, setbacks, utilities, and applicable local requirements before design begins.</p></article>
        <article class="nguyen-service-card"><small>02 · Design</small><strong>ADU planning & architecture</strong><p>Develop a functional layout and exterior approach aligned with the existing property and intended use.</p></article>
        <article class="nguyen-service-card"><small>03 · Engineering</small><strong>Structural & systems coordination</strong><p>Coordinate the drawings and engineering information required for a complete permit package.</p></article>
        <article class="nguyen-service-card"><small>04 · Permitting</small><strong>Plan check & corrections</strong><p>Prepare permit documentation and support responses to agency comments through the approval process.</p></article>
      </div>
      <div class="nguyen-process">
        <div><span>01</span><h4>Discover</h4><p>Goals, property information, budget, and intended ADU use.</p></div>
        <div><span>02</span><h4>Design</h4><p>Space planning, architectural development, and code coordination.</p></div>
        <div><span>03</span><h4>Document</h4><p>Permit drawings and required engineering coordination.</p></div>
        <div><span>04</span><h4>Approve</h4><p>Plan check support, corrections, and permit coordination.</p></div>
      </div>
    `,
  },
  engineering: {
    title: 'Engineering Services | NGUYEN Architecture & Engineering',
    description:
      'Structural, civil, and multidisciplinary engineering coordination for residential, commercial, ADU, and development projects in Orange County.',
    eyebrow: 'Engineering',
    heading: 'Engineering that stays connected to the architecture and the permit process.',
    intro:
      'NGUYEN coordinates engineering requirements with the architectural design so project teams can move from concept to a coordinated, permit-ready set with fewer disconnects.',
    keywords:
      'Orange County engineering, structural engineering, civil engineering, architecture engineering, permit engineering, commercial engineering, ADU engineering',
    body: `
      <div class="nguyen-services-grid nguyen-services-grid--two">
        <article class="nguyen-service-card"><small>Structural</small><strong>Building structure & modifications</strong><p>Structural design and coordination for additions, remodels, tenant improvements, ADUs, and other building projects where required.</p></article>
        <article class="nguyen-service-card"><small>Civil</small><strong>Site & civil coordination</strong><p>Site-related engineering support may include grading, drainage, utility, and development coordination based on project scope.</p></article>
        <article class="nguyen-service-card"><small>Building Systems</small><strong>MEP coordination</strong><p>Coordinate electrical, plumbing, HVAC, Title 24, and related consultants with the architectural and permit documents as applicable.</p></article>
        <article class="nguyen-service-card"><small>Permit Support</small><strong>Plan check responses</strong><p>Address discipline-related agency comments and coordinate revised drawings during plan review.</p></article>
      </div>
      <div class="nguyen-callout"><p>Need architecture and engineering together?</p><strong>Start with one project conversation so the scope can be coordinated from the beginning.</strong></div>
    `,
  },
  'land-development': {
    title: 'Land Development Services | NGUYEN Architecture & Engineering',
    description:
      'Land development support from site analysis and feasibility through entitlement, infrastructure coordination, permitting, and project completion in Orange County.',
    eyebrow: 'Land Development',
    heading: 'Move a site from early feasibility toward an approvable, buildable project.',
    intro:
      'Land development requires architecture, engineering, agency coordination, and practical sequencing to work together. NGUYEN helps organize those moving parts from the earliest site questions through project approvals.',
    keywords:
      'Orange County land development, site analysis, entitlement services, development planning, civil engineering, infrastructure coordination, permit development',
    body: `
      <div class="nguyen-services-grid nguyen-services-grid--two">
        <article class="nguyen-service-card"><small>01 · Site Analysis</small><strong>Feasibility & due diligence</strong><p>Evaluate property constraints, access, zoning context, development goals, and major approval considerations before committing to a direction.</p></article>
        <article class="nguyen-service-card"><small>02 · Planning</small><strong>Concept & entitlement coordination</strong><p>Develop the project concept and coordinate documentation needed for planning, entitlement, and agency review processes.</p></article>
        <article class="nguyen-service-card"><small>03 · Infrastructure</small><strong>Site systems coordination</strong><p>Coordinate grading, drainage, utilities, access, and other site engineering requirements with the project design as applicable.</p></article>
        <article class="nguyen-service-card"><small>04 · Completion</small><strong>Permits, corrections & consultant coordination</strong><p>Support plan review, agency comments, consultant updates, and project documentation as the design advances toward approval and construction.</p></article>
      </div>
      <div class="nguyen-process">
        <div><span>01</span><h4>Analyze</h4><p>Understand the parcel, constraints, approvals, and development objective.</p></div>
        <div><span>02</span><h4>Plan</h4><p>Develop a coordinated concept and entitlement path.</p></div>
        <div><span>03</span><h4>Engineer</h4><p>Coordinate infrastructure and technical requirements.</p></div>
        <div><span>04</span><h4>Approve</h4><p>Manage documentation and corrections through agency review.</p></div>
      </div>
    `,
  },
  contact: {
    title: 'Contact | NGUYEN Architecture & Engineering',
    description:
      'Contact NGUYEN Architecture & Engineering to discuss residential, commercial, ADU, engineering, permitting, or land development projects in Orange County.',
    eyebrow: 'Start a Project',
    heading: 'Tell us what you are planning.',
    intro:
      'Share the project type, property location, current stage, and what you need help with. The information below is ready for launch except the exact street address and office-hour schedule, which should be confirmed with the client before the public site goes live.',
    keywords:
      'NGUYEN Architecture Engineering contact, Orange County architect contact, ADU consultation, engineering consultation, land development consultation',
    body: `
      <div class="nguyen-contact-grid">
        <form class="nguyen-form" id="nguyen-contact-form">
          <label>Name<input required name="name" autocomplete="name" placeholder="Your name"></label>
          <label>Email<input required type="email" name="email" autocomplete="email" placeholder="you@example.com"></label>
          <label>Phone<input name="phone" autocomplete="tel" placeholder="(###) ###-####"></label>
          <label>Service<select name="service"><option>Residential / Commercial</option><option>ADU</option><option>Engineering</option><option>Land Development</option><option>Other</option></select></label>
          <label class="full">Project details<textarea required name="message" rows="6" placeholder="Property location, project type, current stage, and what you need help with"></textarea></label>
          <button type="submit">REQUEST A CONSULTATION ↗</button>
          <p class="nguyen-form-note">Submitting opens a pre-addressed email to info@nguyenarchitecture.com so the client can receive the inquiry without a third-party form service.</p>
        </form>
        <aside class="nguyen-contact-card">
          <div><small>Email</small><a href="mailto:info@nguyenarchitecture.com">info@nguyenarchitecture.com</a></div>
          <div><small>Phone</small><a href="tel:2092338888">(209) 233-8888</a><a href="tel:7147078889">(714) 707-8889</a></div>
          <div><small>Office</small><p>Huntington Beach, California</p><em>Exact street address to be confirmed before launch.</em></div>
          <div><small>Business Hours</small><p>To be confirmed with the client before launch.</p></div>
          <iframe title="NGUYEN office area map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=Huntington%20Beach%2C%20CA&output=embed"></iframe>
        </aside>
      </div>
    `,
  },
};

const CLEANUP = `
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

function detailStyles() {
  return `
<style id="nguyen-official-site-styles">
  :root { --nguyen-bg: #f0ebe6; --nguyen-ink: #181818; --nguyen-line: rgba(24,24,24,.16); }
  html { scroll-behavior: smooth; }
  .nguyen-official-detail { position: relative; z-index: 2; background: var(--nguyen-bg); color: var(--nguyen-ink); padding: clamp(72px,9vw,140px) clamp(20px,5vw,72px); font-family: inherit; }
  .nguyen-official-inner { width: min(1440px, 100%); margin: 0 auto; }
  .nguyen-eyebrow { margin: 0 0 24px; font-size: 11px; letter-spacing: .16em; text-transform: uppercase; opacity: .58; }
  .nguyen-official-detail h2 { max-width: 1080px; margin: 0; font: inherit; font-size: clamp(42px,7vw,104px); font-weight: 500; line-height: .93; letter-spacing: -.055em; }
  .nguyen-intro { max-width: 760px; margin: 34px 0 64px auto; font-size: clamp(17px,1.5vw,24px); line-height: 1.5; opacity: .72; }
  .nguyen-split { display:grid; grid-template-columns: repeat(2,minmax(0,1fr)); border-top:1px solid var(--nguyen-line); border-bottom:1px solid var(--nguyen-line); }
  .nguyen-feature { padding: 34px 28px 42px 0; }
  .nguyen-feature + .nguyen-feature { border-left:1px solid var(--nguyen-line); padding-left:28px; }
  .nguyen-feature span,.nguyen-process span { font-size:11px; letter-spacing:.14em; opacity:.45; }
  .nguyen-feature h3 { font:inherit; font-size:clamp(32px,4vw,66px); line-height:1; letter-spacing:-.045em; margin:52px 0 20px; }
  .nguyen-feature p,.nguyen-service-card p,.nguyen-process p,.nguyen-contact-card p { font-size:15px; line-height:1.65; opacity:.67; }
  .nguyen-feature a,.nguyen-service-card span { display:inline-block; margin-top:28px; color:inherit; text-decoration:none; font-size:12px; letter-spacing:.08em; text-transform:uppercase; }
  .nguyen-services-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:1px; background:var(--nguyen-line); margin-top:48px; border:1px solid var(--nguyen-line); }
  .nguyen-services-grid--two { grid-template-columns:repeat(2,minmax(0,1fr)); }
  .nguyen-service-card { display:flex; min-height:280px; flex-direction:column; justify-content:space-between; gap:22px; padding:30px; background:var(--nguyen-bg); color:inherit; text-decoration:none; }
  .nguyen-service-card small,.nguyen-contact-card small { font-size:10px; letter-spacing:.14em; text-transform:uppercase; opacity:.48; }
  .nguyen-service-card strong { max-width:420px; font:inherit; font-size:clamp(24px,2.6vw,42px); line-height:1.06; letter-spacing:-.035em; font-weight:500; }
  .nguyen-service-card p { margin:0; max-width:520px; }
  .nguyen-process { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); margin-top:64px; border-top:1px solid var(--nguyen-line); border-bottom:1px solid var(--nguyen-line); }
  .nguyen-process > div { padding:28px 24px 34px 0; }
  .nguyen-process > div + div { border-left:1px solid var(--nguyen-line); padding-left:24px; }
  .nguyen-process h4 { margin:58px 0 12px; font:inherit; font-size:26px; letter-spacing:-.03em; }
  .nguyen-callout { margin-top:64px; padding:42px 0; border-top:1px solid var(--nguyen-line); border-bottom:1px solid var(--nguyen-line); display:grid; grid-template-columns:1fr 2fr; gap:40px; align-items:start; }
  .nguyen-callout p { margin:0; opacity:.55; }
  .nguyen-callout strong { font:inherit; font-weight:500; font-size:clamp(28px,4vw,56px); line-height:1.08; letter-spacing:-.04em; }
  .nguyen-bottom-cta { display:flex; justify-content:space-between; gap:30px; align-items:end; padding-top:80px; }
  .nguyen-bottom-cta strong { font:inherit; font-weight:500; font-size:clamp(30px,5vw,72px); line-height:1; letter-spacing:-.045em; max-width:850px; }
  .nguyen-bottom-cta a { white-space:nowrap; color:inherit; text-decoration:none; border-bottom:1px solid currentColor; padding-bottom:5px; font-size:12px; letter-spacing:.1em; }
  .nguyen-contact-grid { display:grid; grid-template-columns:minmax(0,1.25fr) minmax(320px,.75fr); gap:44px; border-top:1px solid var(--nguyen-line); padding-top:36px; }
  .nguyen-form { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:22px; }
  .nguyen-form label { display:flex; flex-direction:column; gap:9px; font-size:10px; letter-spacing:.12em; text-transform:uppercase; }
  .nguyen-form .full,.nguyen-form button,.nguyen-form-note { grid-column:1 / -1; }
  .nguyen-form input,.nguyen-form select,.nguyen-form textarea { width:100%; box-sizing:border-box; border:0; border-bottom:1px solid var(--nguyen-line); border-radius:0; background:transparent; color:var(--nguyen-ink); padding:12px 0 14px; font:inherit; font-size:16px; outline:none; }
  .nguyen-form textarea { border:1px solid var(--nguyen-line); padding:16px; resize:vertical; }
  .nguyen-form button { border:1px solid var(--nguyen-ink); background:var(--nguyen-ink); color:var(--nguyen-bg); min-height:58px; padding:0 22px; cursor:pointer; font:inherit; font-size:12px; letter-spacing:.1em; }
  .nguyen-form-note { margin:0; font-size:12px; line-height:1.5; opacity:.52; text-transform:none; letter-spacing:0; }
  .nguyen-contact-card { display:flex; flex-direction:column; gap:28px; border-left:1px solid var(--nguyen-line); padding-left:34px; }
  .nguyen-contact-card > div { display:flex; flex-direction:column; gap:8px; }
  .nguyen-contact-card a { color:inherit; text-decoration:none; font-size:18px; }
  .nguyen-contact-card p { margin:0; }
  .nguyen-contact-card em { font-size:12px; line-height:1.45; opacity:.48; font-style:normal; }
  .nguyen-contact-card iframe { width:100%; min-height:280px; border:0; filter:grayscale(1); }
  @media (max-width: 850px) {
    .nguyen-split,.nguyen-services-grid,.nguyen-services-grid--two,.nguyen-process,.nguyen-callout,.nguyen-contact-grid { grid-template-columns:1fr; }
    .nguyen-feature + .nguyen-feature,.nguyen-process > div + div,.nguyen-contact-card { border-left:0; border-top:1px solid var(--nguyen-line); padding-left:0; }
    .nguyen-services-grid { background:transparent; gap:0; }
    .nguyen-service-card { border-top:1px solid var(--nguyen-line); min-height:230px; padding-left:0; padding-right:0; }
    .nguyen-process > div { padding-left:0 !important; }
    .nguyen-bottom-cta { align-items:start; flex-direction:column; }
  }
  @media (max-width: 600px) { .nguyen-form { grid-template-columns:1fr; } }
</style>`;
}

function navPatch(page: NguyenPage) {
  const activeHref = page === 'home' ? BASE_PATH : `${BASE_PATH}/${page}`;
  const nav = [
    ['Home', BASE_PATH],
    ['ADU', `${BASE_PATH}/adu`],
    ['Engineering', `${BASE_PATH}/engineering`],
    ['Land Development', `${BASE_PATH}/land-development`],
    ['Contact', `${BASE_PATH}/contact`],
  ];

  return `
<script id="nguyen-official-nav-patch">
(() => {
  const BASE = ${JSON.stringify(BASE_PATH)};
  const ACTIVE = ${JSON.stringify(activeHref)};
  const nav = ${JSON.stringify(nav)};
  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim().toLowerCase();
  const sourceLabels = new Map([
    ['home', nav[0]],
    ['about', nav[1]],
    ['projects', nav[2]],
    ['services', nav[3]],
    ['contact', nav[4]],
  ]);

  function rewriteLinks() {
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

    const anchors = [...document.querySelectorAll('a')];
    const exactNav = nav.every(([label]) => anchors.some((a) => normalize(a.textContent) === normalize(label)));
    if (!exactNav) {
      const floating = document.getElementById('nguyen-fallback-nav');
      if (floating) floating.hidden = false;
    }
  }

  rewriteLinks();
  document.addEventListener('DOMContentLoaded', rewriteLinks, { once: true });
  let runs = 0;
  const timer = setInterval(() => {
    rewriteLinks();
    runs += 1;
    if (runs > 16) clearInterval(timer);
  }, 300);
})();
</script>
<nav id="nguyen-fallback-nav" hidden aria-label="Primary" style="position:fixed;z-index:9999;right:18px;bottom:18px;display:flex;flex-wrap:wrap;gap:7px;max-width:min(720px,calc(100vw - 36px));padding:8px;background:rgba(240,235,230,.94);border:1px solid rgba(24,24,24,.14);backdrop-filter:blur(12px);font-family:Arial,sans-serif;font-size:10px;letter-spacing:.08em;text-transform:uppercase">
  ${nav
    .map(([label, href]) => `<a href="${href}" style="color:#181818;text-decoration:${href === activeHref ? 'underline' : 'none'};padding:8px 9px">${label}</a>`)
    .join('')}
</nav>`;
}

function contentPatch(page: NguyenPage) {
  const content = pages[page];
  const commonPairs: Array<[string, string]> = [
    ['ArcSphere Studio', 'NGUYEN Architecture & Engineering'],
    ['ArcSphere', 'NGUYEN'],
    ['Interior & Architecture', 'Architecture · Engineering · Development'],
    ['Interior and Architecture', 'Architecture · Engineering · Development'],
    ['Dubai', 'Huntington Beach, CA'],
    ['United Arab Emirates', 'Orange County, CA'],
  ];

  const heroPairs: Record<NguyenPage, Array<[string, string]>> = {
    home: [
      ['Where Architecture Meets Experience', 'Residential + Commercial Architecture & Engineering'],
      ['Where Architecture', 'Residential + Commercial'],
      ['Meets Experience', 'Architecture & Engineering'],
      ['Based in Dubai, we design residential and commercial spaces that elevate how people live, work, and interact with their environment.', 'Based in Orange County, we support residential and commercial projects through architecture, engineering coordination, permitting, ADUs, and land development.'],
      ['Residential Interior', 'Residential Architecture'],
      ['Commercial Interior', 'Commercial Architecture'],
      ['Space Planning', 'ADU Design & Permitting'],
      ['Design Consultation', 'Engineering'],
      ['Project Management', 'Land Development'],
    ],
    adu: [
      ['Where Architecture Meets Experience', 'Accessory Dwelling Units — Design to Permit'],
      ['Where Architecture', 'Accessory Dwelling Units'],
      ['Meets Experience', 'Design to Permit'],
      ['Based in Dubai, we design residential and commercial spaces that elevate how people live, work, and interact with their environment.', 'ADU planning, architectural design, engineering coordination, and permit documentation for Orange County property owners.'],
      ['Residential Interior', 'ADU Feasibility'],
      ['Commercial Interior', 'ADU Architectural Design'],
      ['Space Planning', 'Garage Conversions & Detached ADUs'],
      ['Design Consultation', 'Engineering Coordination'],
      ['Project Management', 'Permitting & Plan Check'],
    ],
    engineering: [
      ['Where Architecture Meets Experience', 'Integrated Architecture & Engineering'],
      ['Where Architecture', 'Integrated Architecture'],
      ['Meets Experience', '& Engineering'],
      ['Based in Dubai, we design residential and commercial spaces that elevate how people live, work, and interact with their environment.', 'Coordinated structural, civil, building-system, and permit support for residential, commercial, ADU, and development projects.'],
      ['Residential Interior', 'Structural Engineering'],
      ['Commercial Interior', 'Civil & Site Coordination'],
      ['Space Planning', 'MEP Coordination'],
      ['Design Consultation', 'Title 24 & Code Coordination'],
      ['Project Management', 'Plan Check & Corrections'],
    ],
    'land-development': [
      ['Where Architecture Meets Experience', 'Land Development — Site to Approval'],
      ['Where Architecture', 'Land Development'],
      ['Meets Experience', 'Site to Approval'],
      ['Based in Dubai, we design residential and commercial spaces that elevate how people live, work, and interact with their environment.', 'Site analysis, planning, entitlement coordination, infrastructure engineering support, permitting, and agency coordination for development projects.'],
      ['Residential Interior', 'Site Analysis & Feasibility'],
      ['Commercial Interior', 'Development Planning'],
      ['Space Planning', 'Entitlement Coordination'],
      ['Design Consultation', 'Infrastructure Coordination'],
      ['Project Management', 'Agency Review & Permitting'],
    ],
    contact: [
      ['Where Architecture Meets Experience', 'Start Your Project with NGUYEN'],
      ['Where Architecture', 'Start Your Project'],
      ['Meets Experience', 'with NGUYEN'],
      ['Based in Dubai, we design residential and commercial spaces that elevate how people live, work, and interact with their environment.', 'Contact NGUYEN Architecture & Engineering to discuss a residential, commercial, ADU, engineering, or land development project in Orange County.'],
      ['Residential Interior', 'Residential & Commercial'],
      ['Commercial Interior', 'ADU'],
      ['Space Planning', 'Engineering'],
      ['Design Consultation', 'Land Development'],
      ['Project Management', 'Permit Support'],
    ],
  };

  const allPairs = [...commonPairs, ...heroPairs[page]];
  return `
<script id="nguyen-official-content-patch">
(() => {
  const pairs = ${JSON.stringify(allPairs)};
  const exact = new Map(pairs.map(([a,b]) => [a.replace(/\\s+/g, ' ').trim(), b]));
  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
  function patch() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const next = exact.get(normalize(node.nodeValue));
      if (next && node.nodeValue !== next) node.nodeValue = next;
    }
    document.querySelectorAll('a[href^="mailto:"]').forEach((a) => {
      a.setAttribute('href', 'mailto:info@nguyenarchitecture.com');
      if (/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(normalize(a.textContent))) a.textContent = 'info@nguyenarchitecture.com';
    });
  }
  patch();
  document.addEventListener('DOMContentLoaded', patch, { once: true });
  let runs = 0;
  const timer = setInterval(() => { patch(); runs += 1; if (runs > 18) clearInterval(timer); }, 250);
})();
</script>`;
}

function formScript(page: NguyenPage) {
  if (page !== 'contact') return '';
  return `
<script id="nguyen-contact-form-script">
(() => {
  const bind = () => {
    const form = document.getElementById('nguyen-contact-form');
    if (!form || form.dataset.bound) return;
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
  };
  bind();
  document.addEventListener('DOMContentLoaded', bind, { once:true });
})();
</script>`;
}

function details(page: NguyenPage) {
  const content = pages[page];
  return `
${detailStyles()}
<section class="nguyen-official-detail" id="nguyen-page-detail">
  <div class="nguyen-official-inner">
    <p class="nguyen-eyebrow">${content.eyebrow}</p>
    <h2>${content.heading}</h2>
    <p class="nguyen-intro">${content.intro}</p>
    ${content.body}
    ${page !== 'contact' ? `<div class="nguyen-bottom-cta"><strong>Have a project in mind?</strong><a href="${BASE_PATH}/contact">REQUEST A CONSULTATION ↗</a></div>` : ''}
  </div>
</section>
${formScript(page)}`;
}

async function getSource() {
  let lastError: unknown = null;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(SOURCE_URL, {
        next: { revalidate: 3600 },
        headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'text/html,application/xhtml+xml' },
      });
      if (response.ok) return response.text();
      lastError = new Error(`Upstream returned ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 200 * (attempt + 1)));
  }
  throw lastError instanceof Error ? lastError : new Error('Unable to load source');
}

export async function renderNguyenPage(page: NguyenPage) {
  const content = pages[page];
  try {
    let html = await getSource();

    html = html.replace(
      /<head([^>]*)>/i,
      `<head$1><base href="${SOURCE_URL}"><meta name="robots" content="noindex,nofollow,noarchive"><meta name="description" content="${content.description}"><meta name="keywords" content="${content.keywords}">${CLEANUP}`,
    );
    html = html.replace(/<title>[^<]*<\/title>/i, `<title>${content.title}</title>`);
    html = html.replace(/info@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/gi, 'info@nguyenarchitecture.com');
    html = html.replace(
      /<\/body>/i,
      `${contentPatch(page)}${navPatch(page)}${details(page)}</body>`,
    );

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400',
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
      },
    });
  } catch {
    return new Response(
      `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta http-equiv="refresh" content="2"><title>${content.title}</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f0ebe6;color:#181818;font-family:Arial,sans-serif}main{text-align:center;padding:24px}p{opacity:.6}</style></head><body><main><h1>NGUYEN Architecture & Engineering</h1><p>Loading ${content.eyebrow}…</p></main></body></html>`,
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex, nofollow, noarchive' } },
    );
  }
}
