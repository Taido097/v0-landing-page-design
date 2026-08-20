const SOURCE_URL = 'https://architectured.framer.website/';
const DEMO_PATH = '/client-demos/client-8889/architectured';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const CLEANUP = `
<style id="designedbytd-architectured-cleanup">
  #__framer-badge-container,
  [id^="__framer-editorbar"],
  [class*="framer-editorbar"],
  #template-overlay {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    pointer-events: none !important;
  }

  body {
    --token-c8809533-d74e-4474-af14-ef3a211efd13: #061b36 !important;
    --token-44dd7634-948b-4475-884c-16fbad7c474d: #f8f7f3 !important;
    --token-cef92a4d-d47e-40c4-9eae-b4ff7c06350d: #f1f3f5 !important;
    --token-9c090586-7a62-43ef-af9a-db53933ce9ee: #061b36 !important;
    --token-f688b0c3-89d4-41da-82a2-fdf0869df82e: #061b36cc !important;
    --token-b8e91d38-56d6-4914-9d4c-c8d64604eb8d: #061b3680 !important;
    --token-5d5de10c-51bb-4596-ab88-00139ed62b55: #061b3633 !important;
    --token-11ce1999-7b74-4e05-b5ef-93fa4e693a84: #061b361a !important;
    --token-c7cd53d3-de4f-4304-b753-767171c86167: #f8f7f3cc !important;
    --token-ff2a6766-d9d5-4a1d-a552-e969fba53510: #ffffff !important;
    --token-230c3248-009b-4ccd-bda2-d16c47a758d2: #d99a2b !important;
    --token-37033d4e-1ccc-4cf2-bb27-e6ad4c96fbc3: #d99a2b !important;
  }

  .framer-xrcGW .framer-1h0wd5 { display: none !important; }

  a[aria-label="Company Logo"] {
    width: clamp(132px, 21vw, 220px) !important;
    min-width: 0 !important;
    max-width: min(220px, calc(100vw - 118px)) !important;
    height: 48px !important;
    overflow: hidden !important;
    text-decoration: none !important;
    flex-shrink: 1 !important;
  }

  .nguyen-wordmark {
    width: 100%;
    max-width: 100%;
    height: 100%;
    min-width: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    color: #061b36;
    line-height: 1;
    white-space: nowrap;
    overflow: hidden;
  }

  .nguyen-wordmark strong {
    max-width: 100%;
    overflow: hidden;
    font-family: Geist, Arial, sans-serif;
    font-size: clamp(16px, 2vw, 21px);
    font-weight: 800;
    letter-spacing: .1em;
  }

  .nguyen-wordmark span {
    max-width: 100%;
    margin-top: 5px;
    overflow: hidden;
    font-family: Geist, Arial, sans-serif;
    font-size: clamp(6px, .8vw, 8px);
    font-weight: 700;
    letter-spacing: .16em;
    text-transform: uppercase;
    color: #d99a2b;
  }

  .nguyen-services-shell {
    width: min(1180px, calc(100% - 40px));
    margin: 0 auto;
    padding: clamp(58px, 7vw, 92px) 0 clamp(50px, 6vw, 78px);
    color: #061b36;
    font-family: Geist, Arial, sans-serif;
  }

  .nguyen-services-head {
    position: relative;
    margin-bottom: 34px;
    padding-right: 130px;
  }

  .nguyen-services-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 18px;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: .08em;
    text-transform: uppercase;
  }

  .nguyen-services-brand::before {
    content: '';
    width: 36px;
    height: 2px;
    background: #d99a2b;
    flex: 0 0 auto;
  }

  .nguyen-services-title {
    margin: 0;
    font-size: clamp(42px, 6vw, 76px);
    line-height: .95;
    letter-spacing: -.045em;
    font-weight: 850;
    text-transform: uppercase;
    color: #d99a2b;
  }

  .nguyen-services-title span { color: #d99a2b; }

  .nguyen-services-intro {
    max-width: 660px;
    margin: 22px 0 0;
    font-size: clamp(15px, 1.4vw, 18px);
    line-height: 1.6;
    color: #ffffff;
  }

  .nguyen-services-number {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 104px;
    padding: 15px 16px 13px;
    background: #061b36;
    color: white;
    text-align: center;
  }

  .nguyen-services-number strong {
    display: block;
    font-size: 34px;
    line-height: 1;
    font-weight: 800;
  }

  .nguyen-services-number span {
    display: block;
    margin-top: 7px;
    color: #d99a2b;
    font-size: 9px;
    font-weight: 800;
    letter-spacing: .09em;
    text-transform: uppercase;
  }

  .nguyen-services-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    border-top: 1px solid #d5d8dc;
    border-left: 1px solid #d5d8dc;
    background: white;
  }

  .nguyen-service-card {
    display: grid;
    grid-template-columns: minmax(0, .95fr) minmax(0, 1.05fr);
    min-height: 315px;
    border-right: 1px solid #d5d8dc;
    border-bottom: 1px solid #d5d8dc;
    background: #fff;
    overflow: hidden;
  }

  .nguyen-service-media {
    position: relative;
    min-height: 315px;
    overflow: hidden;
    background: #e9edf1;
  }

  .nguyen-service-media img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
    transition: transform .6s cubic-bezier(.2,.7,.2,1);
    image-rendering: auto;
  }

  .nguyen-service-card:hover .nguyen-service-media img { transform: scale(1.035); }

  .nguyen-service-copy {
    position: relative;
    padding: 27px 28px 26px;
    background: #fff;
  }

  .nguyen-service-topline {
    display: flex;
    align-items: flex-start;
    gap: 13px;
    margin-bottom: 16px;
  }

  .nguyen-service-index {
    color: #d99a2b;
    font-size: 27px;
    line-height: 1;
    font-weight: 800;
    flex: 0 0 auto;
  }

  .nguyen-service-name {
    margin: 0;
    font-size: clamp(19px, 2vw, 27px);
    line-height: 1.05;
    font-weight: 850;
    letter-spacing: -.02em;
    text-transform: uppercase;
  }

  .nguyen-service-list {
    margin: 0;
    padding-left: 18px;
    display: grid;
    gap: 8px;
    color: #22344c;
    font-size: 13px;
    line-height: 1.35;
  }

  .nguyen-service-list li::marker { color: #d99a2b; }

  .nguyen-services-strip {
    display: grid;
    grid-template-columns: repeat(6, minmax(0, 1fr));
    border: 1px solid #d5d8dc;
    border-top: 0;
    background: #fbfbfa;
  }

  .nguyen-services-strip span {
    min-height: 86px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 14px 10px;
    text-align: center;
    font-size: 11px;
    line-height: 1.25;
    font-weight: 800;
    text-transform: uppercase;
    border-right: 1px solid #d5d8dc;
  }

  .nguyen-services-strip span:last-child { border-right: 0; }

  .nguyen-services-footerline {
    padding: 15px 18px;
    background: #061b36;
    color: #fff;
    text-align: center;
    font-size: 11px;
    font-weight: 750;
    letter-spacing: .08em;
    text-transform: uppercase;
  }

  .nguyen-services-footerline b { color: #d99a2b; }

  @media (max-width: 900px) {
    .nguyen-services-shell { width: min(100% - 28px, 760px); }
    .nguyen-services-head { padding-right: 0; }
    .nguyen-services-number { position: static; width: max-content; margin: 20px 0 0 auto; }
    .nguyen-services-grid { grid-template-columns: 1fr; }
    .nguyen-services-strip { grid-template-columns: repeat(3, 1fr); }
    .nguyen-services-strip span:nth-child(3) { border-right: 0; }
    .nguyen-services-strip span:nth-child(-n+3) { border-bottom: 1px solid #d5d8dc; }
  }

  @media (max-width: 620px) {
    a[aria-label="Company Logo"] {
      width: clamp(132px, 42vw, 176px) !important;
      max-width: calc(100vw - 112px) !important;
      height: 44px !important;
    }
    .nguyen-wordmark strong { font-size: clamp(15px, 4.5vw, 18px); letter-spacing: .08em; }
    .nguyen-wordmark span { font-size: clamp(5.8px, 1.75vw, 7px); letter-spacing: .11em; }
    .nguyen-services-shell { width: calc(100% - 20px); padding-top: 44px; }
    .nguyen-services-brand { font-size: 9px; }
    .nguyen-services-title { font-size: clamp(38px, 14vw, 56px); }
    .nguyen-service-card { grid-template-columns: 1fr; min-height: 0; }
    .nguyen-service-media { min-height: 250px; }
    .nguyen-service-copy { padding: 24px 22px 26px; }
    .nguyen-service-list { font-size: 13px; }
    .nguyen-services-strip { grid-template-columns: repeat(2, 1fr); }
    .nguyen-services-strip span { min-height: 72px; border-bottom: 1px solid #d5d8dc; }
    .nguyen-services-strip span:nth-child(odd) { border-right: 1px solid #d5d8dc; }
    .nguyen-services-strip span:nth-child(even) { border-right: 0; }
    .nguyen-services-strip span:nth-last-child(-n+2) { border-bottom: 0; }
  }

  @media (max-width: 390px) {
    a[aria-label="Company Logo"] {
      width: 138px !important;
      max-width: calc(100vw - 104px) !important;
    }
    .nguyen-wordmark strong { font-size: 15px; }
    .nguyen-wordmark span { font-size: 5.8px; letter-spacing: .08em; }
  }
</style>`;

const CLIENT_PATCH = `
<script id="nguyen-architectured-content-patch">
(() => {
  const DEMO_PATH = '${DEMO_PATH}';
  const PROJECTS_PATH = DEMO_PATH + '/projects';
  const SOURCE_ORIGIN = 'https://architectured.framer.website';
  const FACEBOOK = 'https://www.facebook.com/profile.php?id=61579114646057&mibextid=wwXIfr&mibextid=wwXIfr';

  const projectCards = [
    {
      oldTitle: 'Skyline Corporate Hub',
      title: 'Boba Shops & Cafés',
      replacements: {
        'Office': 'Tenant Improvement',
        'Central Business District.': 'Commercial Project',
        '2022': 'Design',
        '350,000 sq. ft.': 'Design + Permit'
      },
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1800&q=92'
    },
    {
      oldTitle: 'LuxeHaven Villa',
      title: 'Restaurants',
      replacements: {
        'Residential': 'Commercial',
        'Luxury Villa': 'Restaurant Design',
        'Savannah, Georgia': 'Commercial Project',
        '2023': 'Engineering',
        '4000sqft': 'Design + Engineering'
      },
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=92'
    },
    {
      oldTitle: 'Celestial Towers Condominiums',
      title: 'Office & Tenant Improvement',
      replacements: {
        'Residential': 'Commercial',
        'Apartment and Condo': 'Tenant Improvement (TI)',
        'New Orleans, Louisiana': 'Commercial Project',
        '2024': 'Permit',
        '300,000 sq. ft.': 'Design + Permit'
      },
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=92'
    }
  ];

  const serviceCards = [
    { number: '01', title: 'Site & Planning', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=92', items: ['Site Survey & Existing Conditions', 'Zoning & Code Review', 'Space Planning', 'Concept Design'] },
    { number: '02', title: 'Architectural Design', image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1800&q=92', items: ['Floor Plans', 'Elevations & Sections', 'Reflected Ceiling Plans', 'Construction Details', '3D Renderings', 'Tenant Improvement Plans'] },
    { number: '03', title: 'Structural Engineering', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1800&q=92', items: ['Structural Design', 'Structural Details', 'Structural Calculations', 'Foundation & Framing', 'Retaining Walls', 'Existing Building Modification'] },
    { number: '04', title: 'MEP Engineering', image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1800&q=92', items: ['Electrical Design', 'Plumbing Design', 'HVAC Design', 'Electrical Load Calculations', 'Equipment Coordination'] },
    { number: '05', title: 'Code & Energy Compliance', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=92', items: ['Title 24', 'CalGreen', 'ADA Compliance', 'Building Code Review', 'Accessibility', 'Occupancy & Egress'] },
    { number: '06', title: 'Permit Services', image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=92', items: ['Permit Submittal', 'City Submittal', 'Plan Check Coordination', 'Corrections & Resubmittal', 'Permit Approval Support', 'Construction Support'] }
  ];

  const pairs = [
    ['Years of creating spaces', 'Architectural Design'],
    ['Amazing projects brought to life', 'Engineering'],
    ['Happy clients, happy spaces', 'Permit Support'],
    ['Designs that earn awards', 'Residential + Commercial'],
    ['Architecture that connects people and places', 'Residential & Commercial Design Solutions'],
    ['We design more than buildings—we create spaces that foster connection, creativity, and community', 'One team for custom homes, ADUs, residential and commercial projects — from design and engineering through permit support.'],
    ['Get Template', 'Request Consultation'],
    ['Explore All Services', 'Explore Our Services'],
    ['Our Best Projects', 'Project Types'],
    ['What we’ve been up to—check out our latest projects', 'We design a wide range of commercial spaces tailored to your business goals and customer experience.'],
    ['View All Projects', 'Explore Project Types'],
    ['Welcome to our world of creativity, where every project starts with a dream and ends with a space that feels like home.', 'Commercial project types include Boba Shops & Cafés, Restaurants, Nail & Beauty Salons, Retail Stores, Office & Tenant Improvement, Commercial Remodel & Renovation, New Commercial Buildings, and Tenant Improvement (TI).'],
    ['Take a glimpse into our world of creativity and innovation.', 'Residential services also include custom homes and ADUs, supported by coordinated design, engineering and permit services.'],
    ['Know About Us', 'About NGUYEN'],
    ['Our Differences', 'Why Choose NGUYEN'],
    ['what makes us different (and totally awesome)', 'One team. Complete solution. Residential and commercial design coordinated around engineering, code requirements and permitting.'],
    ['Designs with heart and soul', 'Residential + Commercial Expertise'],
    ['We don’t just design buildings; we craft spaces where life happens, memories are made, and dreams come true. Every project is as unique as the people living in it.', 'Custom homes, ADUs, residential projects, tenant improvements and commercial projects supported through one coordinated process.'],
    ['Expert guidance', 'Code & Permit Expertise'],
    ['Smooth and stress-free process', 'Coordinated Design & Engineering'],
    ['Save time and stay on budget', 'Plan Check & Corrections Support'],
    ['Orion Caldwell, Home Owner', 'NGUYEN Architecture & Engineering'],
    ['How we work', 'Our Process'],
    ['Let’s turn your big ideas into a masterpiece with a clear and fun process', 'A clear process for residential and commercial projects — consultation, feasibility, design, engineering, permit submittal and plan check.'],
    ['Initial Consultation', 'Consultation'],
    ['Once we have a clear understanding of your goals, we move on to brainstorming and designing. We create initial sketches, layouts, and concepts tailored to your unique vision.', 'We review your goals, project type, existing conditions, scope and permitting needs before moving into design.'],
    ['Concept Development', 'Site Analysis & Feasibility'],
    ['Planning & Preparation', 'Design & Engineering'],
    ['Execution & Delivery', 'Permit Submittal & Plan Check'],
    ['Project images', 'Residential & Commercial Projects'],
    ['Gallery', 'Our Work'],
    ['Don’t just take our word for it—see how we turn ideas into stunning spaces. Our gallery is full of inspiration for your next big project!', 'Commercial project types include Boba Shops & Cafés, Restaurants, Nail & Beauty Salons, Retail Stores, Office & Tenant Improvement, Commercial Remodel & Renovation, New Commercial Buildings, and Tenant Improvement (TI). Residential services include custom homes and ADUs.'],
    ['Browse Gallery', 'Explore Project Types'],
    ['FAQs', 'Project FAQs'],
    ['Do you handle all the permits and paperwork?', 'Do you handle permit submittal and plan check?'],
    ['Absolutely! We take care of all the boring-but-important stuff, like permits and paperwork, so you don’t have to stress about it.', 'Permit support includes building permit documentation, permit submittal, plan check coordination, corrections and resubmittal support.'],
    ['Do you only design residential spaces?', 'What project types do you work on?'],
    ['Not at all! While we love creating dream homes, we also work on commercial projects, office spaces, and more. If you’ve got a vision, we’re here to bring it to life.', 'Commercial project types include Boba Shops & Cafés, Restaurants, Nail & Beauty Salons, Retail Stores, Office & Tenant Improvement, Commercial Remodel & Renovation, New Commercial Buildings, and Tenant Improvement (TI). Residential work includes custom homes and ADUs.'],
    ['Can you help with interior design too?', 'Do you support ADUs and Tenant Improvement projects?'],
    ['You bet! From furniture layouts to color schemes, we can assist with the finishing touches that make your space feel like home.', 'Yes. ADU and Tenant Improvement projects can be supported with architectural design, engineering coordination, code review and permit services.'],
    ['What happens if I still have questions?', 'How do we get started?'],
    ['We’re here to help! If you can’t find the answer you’re looking for, just drop us a message or fill out the form. We’ll get back to you in no time!', 'Contact NGUYEN Architecture & Engineering to discuss the project type, existing conditions, business or residential use, scope and permit requirements.'],
    ['Architect', 'NGUYEN'],
    ['(217) 555-0134', '(209) 233-8888'],
    ['(217) 444-0134', '(714) 707-8889'],
    ['architect@email.com', 'info@nguyenarchitecture.com'],
    ['123 Main Street, Suite 200, Austin, TX 78701', '7171 Warner Ave. Ste. B, Huntington Beach, CA 92647'],
    ['Mon to Sat: 9.00am - 8.30pm', 'Orange County / Southern California'],
    ['Sun: Closed', 'Design • Engineering • Permit'],
    ['Subscribe to the newsletter', 'Custom Homes • ADUs • Residential • Commercial'],
    ['Subscribe', 'Contact NGUYEN'],
    ['©Template by RealMehedi', '© NGUYEN Architecture & Engineering'],
    ['Built in Framer', 'Design • Engineering • Permit']
  ];

  const exact = new Map(pairs.map(([from, to]) => [normalize(from), to]));

  function normalize(value) {
    return (value || '').replace(/\\s+/g, ' ').trim();
  }

  function serviceMarkup() {
    const cards = serviceCards.map((service) => {
      const bullets = service.items.map((item) => '<li>' + item + '</li>').join('');
      return '<article class="nguyen-service-card">' +
        '<div class="nguyen-service-media"><img src="' + service.image + '" alt="' + service.title + '" loading="eager" decoding="async"></div>' +
        '<div class="nguyen-service-copy">' +
          '<div class="nguyen-service-topline"><span class="nguyen-service-index">' + service.number + '</span><h3 class="nguyen-service-name">' + service.title + '</h3></div>' +
          '<ul class="nguyen-service-list">' + bullets + '</ul>' +
        '</div>' +
      '</article>';
    }).join('');

    return '<div class="nguyen-services-shell" id="services">' +
      '<header class="nguyen-services-head">' +
        '<div class="nguyen-services-brand">NGUYEN Architecture &amp; Engineering</div>' +
        '<h2 class="nguyen-services-title">Our <span>Services</span></h2>' +
        '<p class="nguyen-services-intro">We provide comprehensive design, engineering, and permit support services for commercial projects — all in one place.</p>' +
        '<div class="nguyen-services-number"><strong>03</strong><span>Our Services</span></div>' +
      '</header>' +
      '<div class="nguyen-services-grid">' + cards + '</div>' +
      '<div class="nguyen-services-strip">' +
        '<span>Architectural Design</span><span>Structural Engineering</span><span>MEP Engineering</span><span>Title 24 &amp; Code</span><span>Permit Services</span><span>Construction Support</span>' +
      '</div>' +
      '<div class="nguyen-services-footerline"><b>Design</b> &nbsp;•&nbsp; Engineer &nbsp;•&nbsp; Permit &nbsp; | &nbsp; All in one. From concept to approval.</div>' +
    '</div>';
  }

  function patchLogo() {
    document.querySelectorAll('a[aria-label="Company Logo"]').forEach((logo) => {
      logo.setAttribute('href', DEMO_PATH);
      if (logo.dataset.nguyenLogo === 'true') return;
      logo.dataset.nguyenLogo = 'true';
      logo.innerHTML = '<div class="nguyen-wordmark"><strong>NGUYEN</strong><span>Architecture &amp; Engineering</span></div>';
      logo.addEventListener('click', (event) => {
        event.preventDefault();
        history.replaceState(null, '', DEMO_PATH);
        window.scrollTo(0, 0);
        window.location.reload();
      });
    });
  }

  function patchServicesSection() {
    const markers = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6,p'))
      .filter((el) => normalize(el.textContent) === 'Explore our services and see how we bring creativity and expertise to every project');

    markers.forEach((marker) => {
      let root = marker.parentElement;
      for (let depth = 0; depth < 12 && root && root !== document.body; depth += 1) {
        const text = normalize(root.textContent);
        if (text.includes('Architectural Design') && text.includes('Interior Design & Planning') && text.includes('Consulting Services') && text.includes('Project Management')) break;
        root = root.parentElement;
      }
      if (!root || root === document.body || root.dataset.nguyenServices === 'true') return;
      root.dataset.nguyenServices = 'true';
      root.innerHTML = serviceMarkup();
    });
  }

  function patchProjectCards() {
    projectCards.forEach((config) => {
      const titleNode = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,div'))
        .find((el) => normalize(el.textContent) === config.oldTitle);
      if (!titleNode) return;

      let card = titleNode.closest('a');
      if (!card) {
        card = titleNode;
        for (let depth = 0; depth < 8 && card && !card.querySelector('img'); depth += 1) card = card.parentElement;
      }
      if (!card) return;

      const local = new Map([[config.oldTitle, config.title], ...Object.entries(config.replacements)]);
      const walker = document.createTreeWalker(card, NodeFilter.SHOW_TEXT);
      let node;
      while ((node = walker.nextNode())) {
        const key = normalize(node.nodeValue);
        const next = local.get(key);
        if (next !== undefined) node.nodeValue = next;
      }

      if (card.tagName === 'A') card.setAttribute('href', PROJECTS_PATH);
      const image = card.querySelector('img');
      if (image) {
        image.setAttribute('src', config.image);
        image.removeAttribute('srcset');
        image.setAttribute('loading', 'eager');
        image.setAttribute('decoding', 'async');
        image.style.objectFit = 'cover';
        image.style.objectPosition = 'center';
        const picture = image.closest('picture');
        if (picture) picture.querySelectorAll('source').forEach((source) => source.removeAttribute('srcset'));
      }
    });
  }

  function patchText() {
    patchLogo();
    patchServicesSection();
    patchProjectCards();

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const next = exact.get(normalize(node.nodeValue));
      if (next !== undefined && node.nodeValue !== next) node.nodeValue = next;
    }

    document.querySelectorAll('a').forEach((anchor) => {
      const href = anchor.getAttribute('href') || '';
      const label = normalize(anchor.textContent);
      let url = null;
      try { url = new URL(href, SOURCE_ORIGIN); } catch {}
      if (url && url.origin === SOURCE_ORIGIN) {
        if (url.pathname === '/projects' || url.pathname.startsWith('/projects/')) anchor.setAttribute('href', PROJECTS_PATH);
        else if (url.pathname === '/services' || url.pathname.startsWith('/services/')) anchor.setAttribute('href', DEMO_PATH + '#services');
        else if (url.pathname === '/about' || url.pathname.startsWith('/about/')) anchor.setAttribute('href', DEMO_PATH + '#about');
        else if (url.pathname === '/contact' || url.pathname.startsWith('/contact/')) anchor.setAttribute('href', 'mailto:info@nguyenarchitecture.com');
        else if (url.pathname.startsWith('/blogs/')) anchor.setAttribute('href', DEMO_PATH + '#faq');
        else if (url.pathname === '/') anchor.setAttribute('href', DEMO_PATH + (url.hash || ''));
      }
      if (label === 'Projects' || label === 'Explore Project Types' || label === 'View Project') anchor.setAttribute('href', PROJECTS_PATH);
      if (label === 'Home') anchor.setAttribute('href', DEMO_PATH);
      if (label === 'Request Consultation' || label === 'Send Message' || label === 'Contact NGUYEN') anchor.setAttribute('href', 'mailto:info@nguyenarchitecture.com');
      if (label === 'Facebook' || label === 'Instagram' || label === 'Linkedin' || label === 'Twitter/X' || label === 'Youtube' || label === 'Pinterest') {
        anchor.setAttribute('href', FACEBOOK);
        anchor.setAttribute('target', '_blank');
      }
      if (href.startsWith('mailto:')) anchor.setAttribute('href', 'mailto:info@nguyenarchitecture.com');
      if (href.startsWith('tel:')) anchor.setAttribute('href', 'tel:7147078889');
    });

    document.querySelectorAll('form').forEach((form) => {
      if (form.dataset.nguyenPatched === 'true') return;
      form.dataset.nguyenPatched = 'true';
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        window.location.href = 'mailto:info@nguyenarchitecture.com';
      });
    });
  }

  patchText();
  document.addEventListener('DOMContentLoaded', patchText, { once: true });
  let runs = 0;
  const timer = setInterval(() => {
    patchText();
    runs += 1;
    if (runs >= 48) clearInterval(timer);
  }, 250);
})();
</script>`;

async function getSource() {
  let lastError: unknown = null;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(SOURCE_URL, {
        cache: 'no-store',
        headers: {
          'User-Agent': 'Mozilla/5.0',
          Accept: 'text/html,application/xhtml+xml',
        },
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

export async function GET() {
  try {
    let html = await getSource();
    html = html.replace(
      /<head([^>]*)>/i,
      `<head$1><base href="${SOURCE_URL}"><meta name="robots" content="noindex,nofollow,noarchive"><meta name="description" content="NGUYEN Architecture & Engineering — custom homes, ADUs, residential and commercial architecture, engineering and permit support in Southern California.">${CLEANUP}`,
    );
    html = html.replace(
      /<title>[^<]*<\/title>/i,
      '<title>NGUYEN Architecture & Engineering — Residential & Commercial Design</title>',
    );
    html = html.replace(/<\/body>/i, `${CLIENT_PATCH}</body>`);
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store, max-age=0',
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
      },
    });
  } catch {
    return new Response(
      '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta http-equiv="refresh" content="2"><title>Loading NGUYEN Concept 04</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#061b36;color:white;font-family:Arial,sans-serif}main{text-align:center;padding:24px}p{opacity:.75;color:#d99a2b}</style></head><body><main><h1>NGUYEN Architecture & Engineering</h1><p>Loading Concept 04…</p></main></body></html>',
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-store',
          'X-Robots-Tag': 'noindex, nofollow, noarchive',
        },
      },
    );
  }
}
