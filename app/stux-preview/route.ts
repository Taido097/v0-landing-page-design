const SOURCE_URL = 'https://simple-calendar-680910.framer.app/';

export const dynamic = 'force-dynamic';

const TEXT_REPLACEMENTS: Array<[string, string]> = [
  ['Stux — Modern Architecture Agency Template', 'DesignedbyTD Studio | Orange County Web Design'],
  ['Elevate your architecture studio with sleek layouts, immersive visuals, and a refined modern digital experience.', 'Custom, mobile-friendly websites for Orange County businesses, built to look professional and turn visitors into customers.'],
  ["LET'S TALK", 'START A PROJECT'],
  ["Let's Talk", 'Start a Project'],
  ['Cube Sky', 'DesignedbyTD'],
  ['Villa', 'Studio'],
  ['California, USA', 'Orange County, CA'],
  ['Interior', 'Scheduling'],
  ['2730 Sqft', 'Mobile First'],
  ['About us', 'About'],
  ['Elevated design to transform your', 'Websites designed to turn'],
  ['daily living', 'visits into customers'],
  ['More about us', 'View our demos'],
  ['Achievements and Honors', 'Built for real business goals'],
  ['97%', 'CUSTOM'],
  ['Customer Success Driven', 'Designed around your business'],
  ['12', '4'],
  ['Experience and Skills', 'Core website categories'],
  ['160+', 'FAST'],
  ['Executed Project Works', 'Responsive, performance-focused builds'],
  ['Skilled architects and interior designers crafting accessible, high-quality spaces for all.', 'Custom websites for local businesses, built around how you attract customers, take bookings, and present your work.'],
  ['120K', 'OC'],
  ['Happy clients', 'Orange County focus'],
  ['Projects', 'Demos'],
  ['Innovative Concepts', 'Real websites for'],
  ['in Built Forms', 'different businesses'],
  ['All Projects', 'View all demos'],
  ['Diagon Tower', 'Akjo'],
  ['Madrid, Italy', 'Portfolio'],
  ['Architecture', 'Portfolio'],
  ['Claxio Villa', 'Dentalo'],
  ['Austin, USA', 'Scheduling'],
  ['Exterior', 'Scheduling'],
  ['Voxi Museum', 'Luna Frame Studio'],
  ['Berlin, Germany', 'Portfolio'],
  ['Blue Sky Villa', 'Qitchen Sushi'],
  ['Santorini, Greece', 'Restaurant'],
  ['Residential', 'Restaurant'],
  ['We offer wide range', 'Services built around'],
  ['of services', 'how your business works'],
  ['Floor & Layout', 'Custom Website'],
  ['Smart layouts optimizing flow, usability, and balanced spatial efficiency throughout.', 'Flexible websites for contractors, landscaping, local services, lead generation, and businesses with unique needs.'],
  ['Expert architecture services focused on modern, sustainable, and innovative design solutions.', 'Editorial, photography, creative, and personal portfolio websites that make the work itself feel premium.'],
  ['Modern homes blending comfort, functionality, and timeless minimalist architectural expression.', 'Modern restaurant and food websites designed around menus, atmosphere, locations, and clear customer actions.'],
  ['Elegant interiors combining light, texture, and refined contemporary spatial aesthe', 'Service websites for salons, clinics, dental offices, med spas, and other businesses that depend on appointments.'],
  ['featured', 'featured demo'],
  ['2025', 'Orange County'],
  ['Beach Villa', 'LeapFly'],
  ['Resort', 'Custom Website'],
  ['Rome, Italy', 'Landscaping'],
  ['3260 sqft', 'Live Demo'],
  ['Where precision engineering meets the artistic beauty of modern architectural design.', 'A good website should do more than look polished. It should make your business easier to trust, understand, and contact.'],
  ['Jonathan Alex, CEO Stux', 'DesignedbyTD Studio'],
  ['Crafting Your Dream, Step By Step', 'From idea to launch, step by step'],
  ['We analyze site potential to build a solid foundation.', 'We learn your business, audience, goals, and the action your website needs to drive.'],
  ['Discovery & Vision', 'Discover'],
  ['Turning concepts into precise, structured, and functional design blueprints', 'We organize the pages, content, and visual direction around how your customers make decisions.'],
  ['CONCEPT & DESIGN', 'Structure & Design'],
  ['Building projects to perfection via technical documents.', 'We build the responsive site, connect forms and features, test it, and get it ready to launch.'],
  ['Expert Oversight', 'Build & Launch'],
  ['Testimonials', 'Pricing'],
  ['Find what our clients', 'A clear place'],
  ['say about us', 'to start'],
  ['Maria Elia', 'Starter'],
  ['USA', '$500+'],
  ['"Professional and creative experts who truly understand modern and functional design"', 'Up to 5 pages, mobile responsive, contact form, basic SEO setup, and launch support.'],
  ['Alex Hedge', 'Professional'],
  ['Italy', '$1,000+'],
  ['"They listen, they design, and they build pure inspiration"', 'Up to 10 pages, custom homepage, service pages, SEO-friendly structure, and post-launch support.'],
  ['Jonthaan K', 'Custom'],
  ['Spain', 'Quote'],
  ['"They designed a stunning modern space that perfectly complements our unique lifestyle."', 'Booking, e-commerce, custom integrations, or advanced website features tailored to the project.'],
  ['150+ Associated clients', 'Built for local businesses'],
  ["Faq's", 'FAQ'],
  ['Curious? We have all', 'Questions before'],
  ['the answers', 'we get started?'],
  ['How does the free trial work?', 'How long does a website usually take?'],
  ['How do you weigh different criteria in your process?', 'What do you need from me to start?'],
  ['How do I get started?', 'How do I start a project?'],
  ['Can I customize the packages you offer?', 'Can the website include booking or custom features?'],
  ['How can I get custom pricing?', 'How is custom pricing calculated?'],
  ['Start your free trial instantly, explore all features, and cancel anytime before billing begins.', 'Most small business websites can be completed in a few weeks. Timing depends on page count, content, feedback, and custom features.'],
  ['We offer a free trial so you can explore features, experience real value, and decide confidently before committing.', 'Most small business websites can be completed in a few weeks. Timing depends on page count, content, feedback, and custom features.'],
  ['We analyze your goals, audience, budget, timelines, and market insights to create a tailored, effective strategy.', 'Your business information, services, preferred style, photos or brand assets if available, and the main action you want visitors to take.'],
  ['We value clear vision, adaptability, strong communication, leadership qualities, and long-term commitment to sustainable growth.', 'Send the project details through the contact page. We can review the scope, pages, features, and design direction before starting.'],
  ['Yes, we can collaborate with your internal team or help you build a dedicated in-house team.', 'Yes. Booking, request forms, lead capture, e-commerce, and other integrations can be added depending on what your business needs.'],
  ['You receive essential features, limited access tools, and core functionalities to explore the platform at no cost.', 'Pricing depends on page count, content, integrations, animation, booking or e-commerce needs, and the overall project scope.'],
  ['Anything in mind', 'Have a website in mind?'],
  ['let’s talk', 'Let’s build it'],
  ['Fb', 'DEMOS'],
  ['LI', 'CONTACT'],
  ['IN', 'EMAIL'],
  ['hello@stux.com', 'designedbytd.studio@gmail.com'],
  ['+62 018-734-377', 'designedbytd.com'],
  ['@2026 Stux inc. All Right Reserved', '©2026 DesignedbyTD Studio. All rights reserved.'],
  ['210 Wallet Street, California,', 'Orange County, California'],
  ['Main HQ, USA', 'Web Design Studio'],
  ['Error', 'Contact'],
  ['Create a free website with Framer, the website builder loved by startups, designers and agencies.', ''],
  ['Edit Content', ''],
];

const STYLE_OVERRIDES = `
<style id="designedbytd-stux-overrides">
  #__framer-badge-container,
  [id^="__framer-editorbar"],
  #template-overlay {
    display: none !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }

  body {
    --token-6a1cd322-c0e8-4e5d-86e1-199c0b349bf1: #f2f2f2 !important;
    --token-9e1fd155-a5b4-444d-a026-bfa3d5dd5aa4: #0a0a0a !important;
    --token-ef21ff52-87fc-418b-97f0-8625e67bbcc0: #fafafa !important;
  }

  body, body * {
    --framer-font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
    --framer-font-family-bold: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
    --framer-font-family-italic: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
    --framer-font-family-bold-italic: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
  }

  h1, h2, h3, h4, h5, h6 {
    text-transform: none !important;
  }

  img:not([alt="Client Image"]):not([alt="Client Logo"]) {
    filter: grayscale(1);
  }

  nav [data-framer-name="Logo"] {
    min-width: 118px !important;
    width: 118px !important;
  }

  nav [data-framer-name="Logo"] img,
  [data-framer-name="Footer Top"] [data-framer-name="Logo"] img {
    opacity: 0 !important;
  }

  nav [data-framer-name="Logo"] a::after,
  [data-framer-name="Footer Top"] [data-framer-name="Logo"]::after {
    content: "DesignedbyTD";
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #0a0a0a;
    font: 600 13px/1 ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    letter-spacing: -0.03em;
    white-space: nowrap;
  }

  [data-framer-name="Footer Top"] [data-framer-name="Logo"]::after {
    color: #fff;
    justify-content: flex-start;
    font-size: 18px;
  }

  .td-live-frame {
    position: absolute;
    inset: 0;
    width: 200%;
    height: 200%;
    border: 0;
    background: #fff;
    transform: scale(.5);
    transform-origin: top left;
    pointer-events: none;
  }

  .td-logo-label,
  .td-price-index {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    font-weight: 600;
    letter-spacing: -0.04em;
    color: #0a0a0a;
    text-align: center;
    padding: 12px;
  }

  .td-logo-label {
    font-size: clamp(12px, 1.25vw, 18px);
    text-transform: uppercase;
  }

  .td-price-index {
    border-radius: 999px;
    width: 44px;
    height: 44px;
    inset: 50% auto auto 50%;
    transform: translate(-50%, -50%);
    background: #0a0a0a;
    color: #fff;
    font-size: 12px;
  }
</style>`;

function runtimeScript() {
  const textMap = JSON.stringify(Object.fromEntries(TEXT_REPLACEMENTS));

  return `
<script id="designedbytd-stux-runtime">
(() => {
  const TEXT_MAP = ${textMap};
  let raf = 0;

  const normalizeText = (value) => (value || '').replace(/\\s+/g, ' ').trim();

  function replaceText() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const current = normalizeText(node.nodeValue);
      const next = TEXT_MAP[current];
      if (!next || next === current) continue;

      const leading = node.nodeValue.match(/^\\s*/)?.[0] || '';
      const trailing = node.nodeValue.match(/\\s*$/)?.[0] || '';
      node.nodeValue = leading + next + trailing;
    }
  }

  function addSectionIds() {
    const ids = {
      'Section-About': 'about',
      'Section-Project': 'work',
      'Section-Services': 'services',
      'Section-Process': 'process',
      'Section-Testimonials': 'pricing',
      'Section-Faq': 'faq'
    };

    document.querySelectorAll('section[data-framer-name]').forEach((section) => {
      const id = ids[section.getAttribute('data-framer-name') || ''];
      if (id) section.id = id;
    });
  }

  function rewriteLinks() {
    const routeMap = {
      '/': '/stux-preview',
      '/about': '/stux-preview#about',
      '/project': '/demos',
      '/project/diagon-tower': '/portfolio/akjo-portfolio',
      '/project/claxio-villa': '/portfolio/dentalo-clinic',
      '/project/voxi-museum': '/portfolio/photography-studio',
      '/project/blue-sky-villa': '/portfolio/restaurant-website',
      '/contact': '/contact',
      '/404': '/contact'
    };

    document.querySelectorAll('a[href]').forEach((anchor) => {
      const raw = anchor.getAttribute('href') || '';

      if (raw.includes('facebook.com')) {
        anchor.setAttribute('href', window.location.origin + '/demos');
        return;
      }
      if (raw.includes('linkedin.com')) {
        anchor.setAttribute('href', window.location.origin + '/contact');
        return;
      }
      if (raw.includes('instagram.com')) {
        anchor.setAttribute('href', 'mailto:designedbytd.studio@gmail.com');
        return;
      }
      if (raw.startsWith('mailto:')) {
        anchor.setAttribute('href', 'mailto:designedbytd.studio@gmail.com');
        return;
      }
      if (raw.startsWith('tel:')) {
        anchor.setAttribute('href', window.location.origin + '/contact');
        return;
      }

      try {
        const url = new URL(raw, window.location.href);
        if (url.hostname !== 'simple-calendar-680910.framer.app') return;
        const target = routeMap[url.pathname] || '/demos';
        anchor.setAttribute('href', window.location.origin + target);
      } catch {}
    });
  }

  function frameImage(img, href, label) {
    const wrapper = img.parentElement;
    if (!wrapper || wrapper.dataset.tdFrame === '1') return;

    const frame = document.createElement('iframe');
    frame.className = 'td-live-frame';
    frame.src = window.location.origin + href;
    frame.title = label + ' live website preview';
    frame.tabIndex = -1;
    frame.setAttribute('aria-hidden', 'true');
    frame.loading = 'lazy';

    wrapper.dataset.tdFrame = '1';
    wrapper.replaceChildren(frame);
  }

  function replaceProjectMedia() {
    document.querySelectorAll('img[alt="Project Bg Image"]').forEach((img) => {
      frameImage(img, '/portfolio/dentalo-clinic', 'Dentalo');
    });

    const projectFrames = [
      '/portfolio/akjo-portfolio',
      '/portfolio/dentalo-clinic',
      '/portfolio/photography-studio',
      '/portfolio/restaurant-website'
    ];
    const projectImages = Array.from(document.querySelectorAll(
      'img[alt="Project Image"], img[alt="Project Imgage"]'
    ));
    projectImages.forEach((img, index) => {
      frameImage(img, projectFrames[index % projectFrames.length], 'DesignedbyTD demo');
    });

    document.querySelectorAll('img[alt="Project Featured Image"]').forEach((img) => {
      frameImage(img, '/portfolio/leapfly-landscaping', 'LeapFly');
    });

    document.querySelectorAll('img[alt="About Image"]').forEach((img) => {
      frameImage(img, '/portfolio/akjo-portfolio', 'Akjo');
    });
  }

  function relabelClientLogos() {
    const labels = [
      'Portfolio', 'Restaurant', 'Scheduling', 'Custom Website',
      'Dental', 'Salon & Spa', 'Landscaping', 'Photography'
    ];

    document.querySelectorAll('img[alt="Client Logo"]').forEach((img, index) => {
      const wrapper = img.parentElement;
      if (!wrapper || wrapper.dataset.tdLabel === '1') return;
      wrapper.dataset.tdLabel = '1';
      img.style.opacity = '0';
      const label = document.createElement('span');
      label.className = 'td-logo-label';
      label.textContent = labels[index % labels.length];
      wrapper.appendChild(label);
    });
  }

  function relabelPricingAvatars() {
    const section = document.querySelector('section[data-framer-name="Section-Testimonials"]');
    if (!section) return;

    section.querySelectorAll('img[alt="Client Image"]').forEach((img, index) => {
      const wrapper = img.parentElement;
      if (!wrapper || wrapper.dataset.tdPrice === '1') return;
      wrapper.dataset.tdPrice = '1';
      img.style.opacity = '0';
      const label = document.createElement('span');
      label.className = 'td-price-index';
      label.textContent = String(index + 1).padStart(2, '0');
      wrapper.appendChild(label);
    });
  }

  function apply() {
    replaceText();
    addSectionIds();
    rewriteLinks();
    replaceProjectMedia();
    relabelClientLogos();
    relabelPricingAvatars();
  }

  function schedule() {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(apply);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply, { once: true });
  } else {
    apply();
  }

  const observer = new MutationObserver(schedule);
  observer.observe(document.documentElement, { childList: true, subtree: true });

  window.addEventListener('load', apply, { once: true });
  setTimeout(apply, 800);
  setTimeout(apply, 2200);
})();
</script>`;
}

function replaceContent(html: string) {
  return html
    .split('Stux — Modern Architecture Agency Template').join('DesignedbyTD Studio | Orange County Web Design')
    .split('Elevate your architecture studio with sleek layouts, immersive visuals, and a refined modern digital experience.').join('Custom, mobile-friendly websites for Orange County businesses, built to look professional and turn visitors into customers.')
    .split('#ffea2f').join('#f2f2f2')
    .split('rgb(255, 234, 47)').join('rgb(242, 242, 242)')
    .split('mailto: rshdkabir365@gmail.com').join('mailto:designedbytd.studio@gmail.com')
    .split('tel: 2175550134').join('/contact');
}

export async function GET() {
  try {
    const response = await fetch(SOURCE_URL, {
      cache: 'no-store',
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    if (!response.ok) {
      return new Response('Preview unavailable', { status: 502 });
    }

    let html = replaceContent(await response.text());

    html = html.replace(
      /<head([^>]*)>/i,
      `<head$1><meta name="robots" content="noindex,nofollow">${STYLE_OVERRIDES}`,
    );

    html = html.replace(
      /<\/body>/i,
      `${runtimeScript()}</body>`,
    );

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return new Response('Preview unavailable', { status: 502 });
  }
}
