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

const contactStrip = `
  <div class="nguyen-contact-strip">
    <div><small>Northern California</small><a href="tel:2092338888">(209) 233-8888</a></div>
    <div><small>Orange County</small><a href="tel:7147078889">(714) 707-8889</a></div>
    <div><small>Email</small><a href="mailto:info@nguyenarchitecture.com">info@nguyenarchitecture.com</a></div>
    <div><small>Orange County Office</small><span>7171 Warner Ave. Ste. B, Huntington Beach, CA 92647</span></div>
  </div>`;

const pages: Record<NguyenPage, PageContent> = {
  home: {
    title: 'NGUYEN Architecture & Engineering | California',
    description:
      'Full-service architecture, structural engineering, MEP, Title 24, permitting, ADU, and development support serving Northern and Southern California.',
    eyebrow: 'Design · Engineer · Permit',
    heading: 'One team. Complete solutions from concept to approval.',
    intro:
      'NGUYEN Architecture & Engineering provides coordinated architectural design, engineering, code compliance, and permit support for residential and commercial projects throughout Northern and Southern California.',
    keywords:
      'California architect, Orange County architecture, commercial architecture, residential architecture, ADU design, structural engineering, MEP engineering, Title 24, permit services',
    body: `
      <div class="nguyen-split">
        <article class="nguyen-feature">
          <span>01</span>
          <h3>Residential</h3>
          <p>Custom homes, ADUs, additions, remodels, garage conversions, architectural design, structural engineering, MEP coordination, Title 24, and permit support.</p>
          <a href="${BASE_PATH}/adu">Explore ADU services →</a>
        </article>
        <article class="nguyen-feature">
          <span>02</span>
          <h3>Commercial</h3>
          <p>Tenant improvements, restaurants, cafés, retail, beauty salons, offices, commercial remodels, and new commercial buildings—from planning through approval.</p>
          <a href="${BASE_PATH}/engineering">Explore engineering →</a>
        </article>
      </div>

      <div class="nguyen-stats">
        <div><strong>15+</strong><span>Years of experience</span></div>
        <div><strong>500+</strong><span>Successful projects</span></div>
        <div><strong>CA</strong><span>Northern & Southern California</span></div>
        <div><strong>100%</strong><span>Focused on our clients</span></div>
      </div>

      <div class="nguyen-services-grid">
        <a class="nguyen-service-card" href="${BASE_PATH}/adu"><small>Accessory Dwelling Units</small><strong>Complete ADU design & permit solutions</strong><p>Detached, attached, garage conversion, junior, and basement ADUs with coordinated design, engineering, Title 24, and permitting.</p><span>View ADU services →</span></a>
        <a class="nguyen-service-card" href="${BASE_PATH}/engineering"><small>Engineering</small><strong>Structural, MEP, code & energy compliance</strong><p>Integrated technical support including structural design, electrical, plumbing, HVAC, Title 24, CalGreen, ADA, and plan check coordination.</p><span>View engineering →</span></a>
        <a class="nguyen-service-card" href="${BASE_PATH}/land-development"><small>Planning & Development</small><strong>Site analysis, planning & permit coordination</strong><p>Existing-condition review, zoning and code analysis, feasibility, concept design, entitlement coordination, and agency submittals.</p><span>View development services →</span></a>
      </div>

      <div class="nguyen-project-types">
        <p class="nguyen-section-label">Commercial project types</p>
        <div class="nguyen-tag-grid">
          <span>Boba Shops & Cafés</span><span>Restaurants</span><span>Nail & Beauty Salons</span><span>Retail Stores</span><span>Office & Tenant Improvement</span><span>Commercial Remodel & Renovation</span><span>New Commercial Buildings</span><span>Tenant Improvement (TI)</span>
        </div>
      </div>
      ${contactStrip}
    `,
  },
  adu: {
    title: 'ADU Design & Permitting | NGUYEN Architecture & Engineering',
    description:
      'Complete ADU planning, architectural design, structural engineering, MEP, Title 24, and permit services in California.',
    eyebrow: 'Complete ADU Solutions',
    heading: 'All ADU design & permit solutions under one coordinated team.',
    intro:
      'From feasibility study and site review through architectural design, engineering, Title 24, plan check, and permit approval, NGUYEN manages the full ADU design and permitting process.',
    keywords:
      'California ADU, Orange County ADU, detached ADU, attached ADU, garage conversion ADU, junior ADU, ADU architect, ADU permit, Title 24 ADU',
    body: `
      <div class="nguyen-services-grid nguyen-services-grid--two">
        <article class="nguyen-service-card"><small>01 · ADU Planning</small><strong>Feasibility, site & zoning review</strong><p>Feasibility study, site and zoning review, lot analysis, concept planning, and early evaluation of the approval path.</p></article>
        <article class="nguyen-service-card"><small>02 · Architectural Design</small><strong>Plans, elevations & 3D views</strong><p>Floor plans, elevations, interior design coordination, 3D views, materials, finishes, and permit-ready architectural documents.</p></article>
        <article class="nguyen-service-card"><small>03 · Structural Engineering</small><strong>Structure, calculations & foundations</strong><p>Structural design, calculations, foundation and framing design, retaining walls, and construction-document coordination.</p></article>
        <article class="nguyen-service-card"><small>04 · MEP Engineering</small><strong>Electrical, plumbing & HVAC</strong><p>Electrical design, plumbing design, HVAC design, load calculations, and building-system coordination.</p></article>
        <article class="nguyen-service-card"><small>05 · Title 24 & Energy</small><strong>Energy compliance</strong><p>Title 24 reports, HERS verification coordination, energy-compliance documentation, and code coordination.</p></article>
        <article class="nguyen-service-card"><small>06 · Permit Services</small><strong>Submittal through approval</strong><p>Plan check coordination, city submittal, permit-approval support, corrections, revisions, and resubmittals.</p></article>
      </div>

      <div class="nguyen-project-types">
        <p class="nguyen-section-label">ADU types we design</p>
        <div class="nguyen-tag-grid nguyen-tag-grid--five">
          <span>Detached ADU</span><span>Attached ADU</span><span>Garage Conversion ADU</span><span>Junior ADU (JADU)</span><span>Basement ADU</span>
        </div>
      </div>

      <div class="nguyen-process nguyen-process--six">
        <div><span>01</span><h4>Consultation</h4><p>Goals, needs, project scope, budget, and timeline.</p></div>
        <div><span>02</span><h4>Site & Feasibility</h4><p>Site visit, measurement, zoning, and code analysis.</p></div>
        <div><span>03</span><h4>Concept & Layout</h4><p>Preliminary layout and design concept.</p></div>
        <div><span>04</span><h4>Design & Engineering</h4><p>Architectural, structural, MEP, and Title 24 documents.</p></div>
        <div><span>05</span><h4>Permit Submittal</h4><p>Permit package preparation and city or agency submittal.</p></div>
        <div><span>06</span><h4>Plan Check & Approval</h4><p>Corrections, resubmittals, and approval support.</p></div>
      </div>
      ${contactStrip}
    `,
  },
  engineering: {
    title: 'Engineering Services | NGUYEN Architecture & Engineering',
    description:
      'Structural engineering, MEP engineering, Title 24, CalGreen, ADA, code compliance, construction support, and permit services for California projects.',
    eyebrow: 'Architecture + Engineering',
    heading: 'Accurate. Compliant. On time.',
    intro:
      'NGUYEN coordinates architectural design and engineering under one team so technical documents, code requirements, and permit submissions stay aligned from concept through approval.',
    keywords:
      'California structural engineer, MEP engineering, electrical design, plumbing design, HVAC design, Title 24, CalGreen, ADA compliance, permit services',
    body: `
      <div class="nguyen-services-grid nguyen-services-grid--two">
        <article class="nguyen-service-card"><small>01 · Site & Planning</small><strong>Survey, zoning, space planning & concepts</strong><p>Site survey and existing conditions, zoning and code review, space planning, feasibility, and concept design.</p></article>
        <article class="nguyen-service-card"><small>02 · Architectural Design</small><strong>Complete architectural documentation</strong><p>Floor plans, elevations, sections, reflected ceiling plans, construction details, 3D renderings, and tenant improvement plans.</p></article>
        <article class="nguyen-service-card"><small>03 · Structural Engineering</small><strong>Structural design & calculations</strong><p>Structural design, structural details, calculations, foundation and framing, retaining walls, and existing-building modification.</p></article>
        <article class="nguyen-service-card"><small>04 · MEP Engineering</small><strong>Electrical, plumbing & HVAC</strong><p>Electrical design, plumbing design, HVAC design, electrical load calculations, and equipment coordination.</p></article>
        <article class="nguyen-service-card"><small>05 · Code & Energy Compliance</small><strong>Title 24, CalGreen, ADA & code review</strong><p>Title 24, CalGreen, ADA compliance, accessibility, building-code review, and occupancy and egress coordination.</p></article>
        <article class="nguyen-service-card"><small>06 · Permit Services</small><strong>Plan check through approval</strong><p>Permit and city submittals, plan check coordination, corrections and resubmittals, permit-approval support, and construction support.</p></article>
      </div>
      <div class="nguyen-callout"><p>One coordinated team</p><strong>Architecture, structural, MEP, Title 24, code compliance, and permit support—all in one place.</strong></div>
      ${contactStrip}
    `,
  },
  'land-development': {
    title: 'Land Development & Planning | NGUYEN Architecture & Engineering',
    description:
      'Site analysis, zoning and land-use review, feasibility, planning, entitlement coordination, engineering, permitting, and agency support in California.',
    eyebrow: 'Planning & Development',
    heading: 'A clear process from the initial idea to permit approval.',
    intro:
      'NGUYEN combines site analysis, planning, architecture, engineering, and permit coordination to help owners and development teams move projects toward an efficient approval path.',
    keywords:
      'California land development, site feasibility, zoning review, land use planning, entitlement coordination, development permit, architectural planning, engineering coordination',
    body: `
      <div class="nguyen-services-grid nguyen-services-grid--two">
        <article class="nguyen-service-card"><small>01 · Consultation</small><strong>Define scope, budget & schedule</strong><p>Project discussion, scope of work, budget and schedule, and initial feasibility review.</p></article>
        <article class="nguyen-service-card"><small>02 · Site Analysis & Feasibility</small><strong>Zoning, land use & code review</strong><p>Site-survey coordination, zoning and land-use review, code analysis, and feasibility study.</p></article>
        <article class="nguyen-service-card"><small>03 · Concept Design</small><strong>Layouts, massing & development direction</strong><p>Conceptual design, preliminary layouts, 3D massing and renderings, and design development.</p></article>
        <article class="nguyen-service-card"><small>04 · Design & Engineering</small><strong>Coordinated technical documents</strong><p>Architectural drawings, structural engineering, MEP system design, Title 24, and code compliance.</p></article>
        <article class="nguyen-service-card"><small>05 · Permit Submittal</small><strong>Package preparation & agency submittal</strong><p>Permit-package preparation, city and agency submittal, document tracking, and coordination.</p></article>
        <article class="nguyen-service-card"><small>06 · Plan Check & Approval</small><strong>Comments, revisions & final approval</strong><p>Plan check coordination, comment responses, resubmittals, revisions, and final-approval support.</p></article>
      </div>

      <div class="nguyen-values">
        <div><strong>Client Focused</strong><p>We listen, understand, and collaborate closely to bring the project vision to life.</p></div>
        <div><strong>Quality Driven</strong><p>Design and engineering are developed with attention to quality and execution.</p></div>
        <div><strong>Code & Safety Compliant</strong><p>Projects are coordinated around current codes, safety standards, and accessibility requirements.</p></div>
        <div><strong>On Time & On Budget</strong><p>Efficient planning, transparent communication, and dependable project coordination.</p></div>
      </div>
      ${contactStrip}
    `,
  },
  contact: {
    title: 'Contact | NGUYEN Architecture & Engineering',
    description:
      'Contact NGUYEN Architecture & Engineering in Huntington Beach or Sacramento for architecture, engineering, ADU, commercial, permitting, and development projects.',
    eyebrow: 'Start a Project',
    heading: 'Tell us what you are planning.',
    intro:
      'NGUYEN serves clients across Northern and Southern California, with an Orange County office in Huntington Beach and a Sacramento presence serving Northern California.',
    keywords:
      'NGUYEN Architecture Engineering contact, Huntington Beach architect, Orange County architect, Sacramento architecture engineering, ADU consultation, engineering consultation',
    body: `
      <div class="nguyen-contact-grid">
        <form class="nguyen-form" id="nguyen-contact-form">
          <label>Name<input required name="name" autocomplete="name" placeholder="Your name"></label>
          <label>Email<input required type="email" name="email" autocomplete="email" placeholder="you@example.com"></label>
          <label>Phone<input name="phone" autocomplete="tel" placeholder="(###) ###-####"></label>
          <label>Service<select name="service"><option>Residential</option><option>Commercial</option><option>ADU</option><option>Architectural Design</option><option>Structural Engineering</option><option>MEP Engineering</option><option>Title 24 / Code Compliance</option><option>Permit Services</option><option>Land Development</option><option>Other</option></select></label>
          <label class="full">Project details<textarea required name="message" rows="6" placeholder="Property location, project type, current stage, and what you need help with"></textarea></label>
          <button type="submit">REQUEST A CONSULTATION ↗</button>
          <p class="nguyen-form-note">Submitting opens a pre-addressed email to NGUYEN Architecture & Engineering.</p>
        </form>
        <aside class="nguyen-contact-card">
          <div><small>Email</small><a href="mailto:info@nguyenarchitecture.com">info@nguyenarchitecture.com</a></div>
          <div><small>Orange County Phone</small><a href="tel:7147078889">(714) 707-8889</a></div>
          <div><small>Northern California Phone</small><a href="tel:2092338888">(209) 233-8888</a></div>
          <div><small>Orange County Office</small><p>7171 Warner Ave. Ste. B<br>Huntington Beach, CA 92647</p></div>
          <div><small>Sacramento Office</small><p>Sacramento, CA<br>Serving Northern California</p></div>
          <div><small>Office Hours</small><p>Please call to confirm availability.</p></div>
          <div><small>Website</small><a href="https://www.nguyenarchitecture.com/" target="_blank" rel="noopener">www.nguyenarchitecture.com</a></div>
          <iframe title="NGUYEN Orange County office map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=7171%20Warner%20Ave%20Ste%20B%2C%20Huntington%20Beach%2C%20CA%2092647&output=embed"></iframe>
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
  .nguyen-feature p,.nguyen-service-card p,.nguyen-process p,.nguyen-contact-card p,.nguyen-values p { font-size:15px; line-height:1.65; opacity:.67; }
  .nguyen-feature a,.nguyen-service-card span { display:inline-block; margin-top:28px; color:inherit; text-decoration:none; font-size:12px; letter-spacing:.08em; text-transform:uppercase; }
  .nguyen-services-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:1px; background:var(--nguyen-line); margin-top:48px; border:1px solid var(--nguyen-line); }
  .nguyen-services-grid--two { grid-template-columns:repeat(2,minmax(0,1fr)); }
  .nguyen-service-card { display:flex; min-height:280px; flex-direction:column; justify-content:space-between; gap:22px; padding:30px; background:var(--nguyen-bg); color:inherit; text-decoration:none; }
  .nguyen-service-card small,.nguyen-contact-card small,.nguyen-contact-strip small { font-size:10px; letter-spacing:.14em; text-transform:uppercase; opacity:.48; }
  .nguyen-service-card strong { max-width:420px; font:inherit; font-size:clamp(24px,2.6vw,42px); line-height:1.06; letter-spacing:-.035em; font-weight:500; }
  .nguyen-service-card p { margin:0; max-width:520px; }
  .nguyen-stats { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); margin-top:48px; border-top:1px solid var(--nguyen-line); border-bottom:1px solid var(--nguyen-line); }
  .nguyen-stats > div { padding:28px 20px 30px 0; display:flex; flex-direction:column; gap:8px; }
  .nguyen-stats > div + div { border-left:1px solid var(--nguyen-line); padding-left:20px; }
  .nguyen-stats strong { font:inherit; font-size:clamp(34px,4vw,62px); font-weight:500; letter-spacing:-.04em; line-height:1; }
  .nguyen-stats span { font-size:12px; line-height:1.4; opacity:.55; text-transform:uppercase; letter-spacing:.08em; }
  .nguyen-process { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); margin-top:64px; border-top:1px solid var(--nguyen-line); border-bottom:1px solid var(--nguyen-line); }
  .nguyen-process--six { grid-template-columns:repeat(3,minmax(0,1fr)); }
  .nguyen-process > div { padding:28px 24px 34px 0; }
  .nguyen-process > div + div { border-left:1px solid var(--nguyen-line); padding-left:24px; }
  .nguyen-process h4 { margin:58px 0 12px; font:inherit; font-size:26px; letter-spacing:-.03em; }
  .nguyen-callout { margin-top:64px; padding:42px 0; border-top:1px solid var(--nguyen-line); border-bottom:1px solid var(--nguyen-line); display:grid; grid-template-columns:1fr 2fr; gap:40px; align-items:start; }
  .nguyen-callout p { margin:0; opacity:.55; }
  .nguyen-callout strong { font:inherit; font-weight:500; font-size:clamp(28px,4vw,56px); line-height:1.08; letter-spacing:-.04em; }
  .nguyen-project-types { margin-top:64px; }
  .nguyen-section-label { margin:0 0 18px; font-size:11px; letter-spacing:.14em; text-transform:uppercase; opacity:.5; }
  .nguyen-tag-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); border-top:1px solid var(--nguyen-line); border-left:1px solid var(--nguyen-line); }
  .nguyen-tag-grid--five { grid-template-columns:repeat(5,minmax(0,1fr)); }
  .nguyen-tag-grid span { padding:22px 18px; border-right:1px solid var(--nguyen-line); border-bottom:1px solid var(--nguyen-line); font-size:13px; line-height:1.4; }
  .nguyen-values { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); margin-top:64px; border-top:1px solid var(--nguyen-line); border-bottom:1px solid var(--nguyen-line); }
  .nguyen-values > div { padding:28px 24px 30px 0; }
  .nguyen-values > div + div { border-left:1px solid var(--nguyen-line); padding-left:24px; }
  .nguyen-values strong { font:inherit; font-size:20px; font-weight:500; }
  .nguyen-values p { margin:18px 0 0; }
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
  .nguyen-contact-card a { color:inherit; text-decoration:none; font-size:18px; overflow-wrap:anywhere; }
  .nguyen-contact-card p { margin:0; }
  .nguyen-contact-card iframe { width:100%; min-height:300px; border:0; filter:grayscale(1); }
  .nguyen-contact-strip { display:grid; grid-template-columns:.65fr .65fr 1fr 1.7fr; gap:0; margin-top:72px; border-top:1px solid var(--nguyen-line); border-bottom:1px solid var(--nguyen-line); }
  .nguyen-contact-strip > div { padding:22px 20px 24px 0; display:flex; flex-direction:column; gap:8px; }
  .nguyen-contact-strip > div + div { border-left:1px solid var(--nguyen-line); padding-left:20px; }
  .nguyen-contact-strip a,.nguyen-contact-strip span { color:inherit; text-decoration:none; font-size:13px; line-height:1.45; }
  @media (max-width: 850px) {
    .nguyen-split,.nguyen-services-grid,.nguyen-services-grid--two,.nguyen-process,.nguyen-process--six,.nguyen-callout,.nguyen-contact-grid,.nguyen-values,.nguyen-stats,.nguyen-contact-strip { grid-template-columns:1fr; }
    .nguyen-feature + .nguyen-feature,.nguyen-process > div + div,.nguyen-contact-card,.nguyen-values > div + div,.nguyen-stats > div + div,.nguyen-contact-strip > div + div { border-left:0; border-top:1px solid var(--nguyen-line); padding-left:0; }
    .nguyen-services-grid { background:transparent; gap:0; }
    .nguyen-service-card { border-top:1px solid var(--nguyen-line); min-height:230px; padding-left:0; padding-right:0; }
    .nguyen-process > div { padding-left:0 !important; }
    .nguyen-tag-grid,.nguyen-tag-grid--five { grid-template-columns:repeat(2,minmax(0,1fr)); }
    .nguyen-bottom-cta { align-items:start; flex-direction:column; }
  }
  @media (max-width: 600px) { .nguyen-form { grid-template-columns:1fr; } .nguyen-tag-grid,.nguyen-tag-grid--five { grid-template-columns:1fr; } }
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
  ${nav.map(([label, href]) => `<a href="${href}" style="color:#181818;text-decoration:${href === activeHref ? 'underline' : 'none'};padding:8px 9px">${label}</a>`).join('')}
</nav>`;
}

function contentPatch(page: NguyenPage) {
  const commonPairs: Array<[string, string]> = [
    ['ArcSphere Studio', 'NGUYEN Architecture & Engineering'],
    ['ArcSphere', 'NGUYEN'],
    ['Interior & Architecture', 'Design · Engineer · Permit'],
    ['Interior and Architecture', 'Design · Engineer · Permit'],
    ['Dubai', 'Huntington Beach, CA'],
    ['United Arab Emirates', 'California'],
  ];

  const heroPairs: Record<NguyenPage, Array<[string, string]>> = {
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
