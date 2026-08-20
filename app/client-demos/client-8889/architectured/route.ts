const SOURCE_URL = 'https://architectured.framer.website/';
const DEMO_PATH = '/client-demos/client-8889/architectured';

export const revalidate = 3600;

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

  /* The stock template uses unsupported numeric claims. Keep the animated cards,
     but remove the fabricated counters and use Nguyen service labels instead. */
  .framer-xrcGW .framer-1h0wd5 { display: none !important; }

  /* Keep the template's full Framer motion while applying Nguyen's brand accent. */
  a, button { --framer-text-color: inherit; }
</style>`;

const REPLACEMENTS: Array<[string, string]> = [
  ['<title>Architectured - Architecture Firm Framer Template</title>', '<title>NGUYEN Architecture & Engineering — Commercial Design & Permit</title>'],
  ['Best Architecture Framer Template for architects, interior designers, landscapers, builders, developers, real estate agencies', 'Commercial architecture, engineering, tenant improvement and permit support in Orange County.'],

  ['Years of creating spaces', 'Architectural Design'],
  ['Amazing projects brought to life', 'Structural Engineering'],
  ['Happy clients, happy spaces', 'MEP Engineering'],
  ['Designs that earn awards', 'Permit Services'],
  ['Architecture that connects people and places', 'Commercial Design & Permit Solutions'],
  ['We design more than buildings—we create spaces that foster connection, creativity, and community', 'One team. Complete solution. Architecture, engineering and permit support for commercial projects in Orange County.'],
  ['Get Template', 'Request Consultation'],

  ['Our Services', 'Our Services'],
  ['Explore our services and see how we bring creativity and expertise to every project', 'Integrated commercial design, engineering and permit services from existing conditions through plan check and approval.'],
  ['Architectural Design', 'Architectural Design & Tenant Improvement (TI)'],
  ['Site Planning', 'Existing-Condition Survey & Business Layout'],
  ['Layout Design', 'Space Planning'],
  ['3D Visualization', '3D Renderings'],
  ['Rendering', 'Elevations & Sections'],
  ['Construction Documentation', 'Permit Documentation'],
  ['Schematic Design Development', 'Concept Design'],
  ['BIM', 'Coordinated Documents'],
  ['Interior Design & Planning', 'Structural Engineering'],
  ['Space Planning & Optimization', 'Structural Design'],
  ['Furniture & Fixture Selection', 'Structural Details'],
  ['Material Selection', 'Structural Calculations'],
  ['Lighting Design', 'Foundation & Framing'],
  ['Art & Accessory Curation', 'Existing Building Modification'],
  ['Custom Cabinetry Design', 'Retaining Walls'],
  ['Interior Landscaping', 'Engineering Coordination'],
  ['Consulting Services', 'MEP Engineering'],
  ['Site & Building Code Consultation', 'Electrical Design'],
  ['Design & Concept Review', 'Plumbing Design'],
  ['Technical Advisory Services', 'HVAC Design'],
  ['Cost Estimation & Budgeting', 'Electrical Load Calculations'],
  ['Project Feasibility Consulting', 'Equipment Coordination'],
  ['Project Management', 'Code, Energy & Permit'],
  ['Pre-Construction Planning', 'Title 24 & Energy Compliance'],
  ['Site Inspection & Supervision', 'CalGreen & ADA Compliance'],
  ['Cost Estimation', 'Zoning & Occupancy Review'],
  ['Resource Allocation', 'Permit Submittal'],
  ['Timeline & Milestone Tracking', 'Plan Check Coordination'],
  ['Contractor & Vendor Management', 'Corrections & Resubmittal'],
  ['Final Inspection & Handover', 'Permit Approval Support'],
  ['Explore All Services', 'Explore Commercial Services'],

  ['Our Best Projects', 'Commercial Project Types'],
  ['What we’ve been up to—check out our latest projects', 'Commercial spaces designed around business operations, customer experience, code compliance and permit requirements.'],
  ['Skyline Corporate Hub', 'Office & Tenant Improvement'],
  ['Commercial', 'Tenant Improvement'],
  ['Office', 'Commercial Office'],
  ['Central Business District.', 'Orange County, CA'],
  ['2022', 'Design + Permit'],
  ['350,000 sq. ft.', 'Commercial TI'],
  ['LuxeHaven Villa', 'Restaurant & Café'],
  ['Residential', 'Food & Beverage'],
  ['Luxury Villa', 'Restaurant Tenant Improvement'],
  ['Savannah, Georgia', 'Orange County, CA'],
  ['2023', 'Architecture + MEP'],
  ['4000sqft', 'Commercial Project'],
  ['Celestial Towers Condominiums', 'New Commercial Building'],
  ['Apartment and Condo', 'Ground-Up Commercial'],
  ['New Orleans, Louisiana', 'Southern California'],
  ['300,000 sq. ft.', 'Architecture + Engineering'],
  ['View All Projects', 'View Project Types'],

  ['Welcome to our world of creativity, where every project', 'From concept through approval, every commercial project'],
  ['starts with a dream', 'starts with your business needs'],
  ['and ends with a', 'and moves through coordinated'],
  ['space that', 'design and engineering that'],
  ['feels like home.', 'supports permitting and construction.'],
  ['Take a glimpse into our world of creativity and innovation.', 'NGUYEN Architecture & Engineering provides one coordinated team for design, engineering and permit support.'],
  ['Know About Us', 'About NGUYEN'],

  ['Our Differences', 'Why Choose NGUYEN'],
  ['what makes us different (and totally awesome)', 'One team. Complete solution. Built around clear coordination, code compliance and efficient permitting.'],
  ['Designs with heart and soul', 'One Team, Complete Solution'],
  ['We don’t just design buildings; we craft spaces where life happens, memories are made, and dreams come true. Every project is as unique as the people living in it.', 'Architectural, Structural, MEP and Title 24 disciplines coordinated around one commercial project scope.'],
  ['Expert guidance', 'Code & Permit Expertise'],
  ['Smooth and stress-free process', 'Cost & Time Efficiency'],
  ['Save time and stay on budget', 'Client Focused Coordination'],
  ['Orion Caldwell, Home Owner', 'NGUYEN Architecture & Engineering'],

  ['How we work', 'Our Process'],
  ['Let’s turn your big ideas into a masterpiece with a clear and fun process', 'A clear process from consultation and feasibility through design, engineering, permit submittal and plan check approval.'],
  ['Initial Consultation', 'Consultation'],
  ['Once we have a clear understanding of your goals, we move on to brainstorming and designing. We create initial sketches, layouts, and concepts tailored to your unique vision.', 'We discuss project goals, business use, scope, budget and schedule, then review initial feasibility.'],
  ['Concept Development', 'Site Analysis & Feasibility'],
  ['Planning & Preparation', 'Design & Engineering'],
  ['Execution & Delivery', 'Permit Submittal & Plan Check'],

  ['Project images', 'Commercial Project Types'],
  ['Gallery', 'Our Work'],
  ['Don’t just take our word for it—see how we turn ideas into stunning spaces. Our gallery is full of inspiration for your next big project!', 'Commercial project types include boba and coffee shops, restaurants, nail and beauty salons, retail stores, offices and tenant improvements, remodels and new commercial buildings.'],
  ['Browse Gallery', 'Explore Project Types'],

  ['Blogs', 'Project Guidance'],
  ['No fluff, no jargon—just simple, practical advice for making your space look and feel amazing. .', 'Practical commercial design, engineering, zoning, code and permit guidance for business owners and project teams.'],
  ['How to turn “cozy” into “wow”: 5 Pro Tips for Making the Most of Small Spaces', 'Site Survey & Existing Conditions: Starting a Commercial Project Right'],
  ['Latest Blogs', 'Commercial Guidance'],
  ['Design & Inspiration', 'Design & Planning'],
  ['Turning Spaces into Stories: How We Create Meaningful Architecture', 'Tenant Improvement: Coordinating Architecture, Structure & MEP'],
  ['Industry Insights', 'Code & Permit'],
  ['Retail Revolution: How Architecture Is Transforming Shopping Experiences', 'Plan Check & Corrections: What Happens After Permit Submittal'],
  ['Tiny but Mighty: 7 Genius Design Hacks for Compact Living', 'Title 24, CalGreen, ADA & Code Compliance for Commercial Projects'],
  ['From Chaos to Cozy: Tips to Turn Your Cramped Space into a Stylish Sanctuary', 'Zoning, Occupancy and Local Requirements Before Design Begins'],
  ['All Blogs', 'View Guidance'],

  ['FAQs', 'Commercial Project FAQs'],
  ['We’ve answered the big questions, but if you still have something on your mind, we’re here to help.', 'Common questions about Nguyen’s commercial architecture, engineering and permit support.'],
  ['We’re just a form away—send us your question, and we’ll be happy to help!', 'Tell us about your project scope, business use and permit needs.'],
  ['Do you handle all the permits and paperwork?', 'Do you handle permit submittal and plan check?'],
  ['Absolutely! We take care of all the boring-but-important stuff, like permits and paperwork, so you don’t have to stress about it.', 'Yes. Permit support includes permit-ready documentation, city or agency submittal, plan check coordination, corrections, resubmittal and approval support.'],
  ['Can I make changes during the design process?', 'What services can be coordinated in-house?'],
  ['Of course! Your input is always welcome. We want you to be thrilled with the final design, so feel free to share your ideas as we go along.', 'Architectural design, Structural Engineering, MEP coordination, Title 24 and code compliance can be coordinated as one commercial project package.'],
  ['Do you only design residential spaces?', 'What commercial project types do you work on?'],
  ['Not at all! While we love creating dream homes, we also work on commercial projects, office spaces, and more. If you’ve got a vision, we’re here to bring it to life.', 'Boba shops, coffee shops, cafés, restaurants, nail and beauty salons, retail stores, offices, tenant improvements, commercial remodels and new commercial buildings.'],
  ['Can I see a 3D model of my design?', 'Can you provide renderings and design drawings?'],
  ['Absolutely! We love showing off our work with 3D models or renderings to help you visualize your space before construction begins.', 'Yes. Architectural services can include floor plans, elevations and sections, reflected ceiling plans, construction details and 3D renderings.'],
  ['Do you work with contractors?', 'Do you coordinate with consultants and city agencies?'],
  ['Yes! We collaborate with trusted contractors to ensure your design is executed perfectly. If you have your own team, we’re happy to work with them too!', 'Yes. Nguyen coordinates with project consultants and city agencies during permitting and plan check.'],
  ['Can you help with interior design too?', 'Do you support Tenant Improvement projects?'],
  ['You bet! From furniture layouts to color schemes, we can assist with the finishing touches that make your space feel like home.', 'Yes. Tenant Improvement services can include existing-condition survey, business layout planning, architecture, engineering, code review and permit support.'],
  ['What happens if I still have questions?', 'How do we get started?'],
  ['We’re here to help! If you can’t find the answer you’re looking for, just drop us a message or fill out the form. We’ll get back to you in no time!', 'Contact NGUYEN Architecture & Engineering to discuss the project scope, existing conditions, business use and permit requirements.'],

  ['Architect', 'NGUYEN'],
  ['(217) 555-0134', '(209) 233-8888'],
  ['(217) 444-0134', '(714) 707-8889'],
  ['architect@email.com', 'info@nguyenarchitecture.com'],
  ['123 Main Street, Suite 200, Austin, TX 78701', '7171 Warner Ave. Ste. B, Huntington Beach, CA 92647'],
  ['Mon to Sat: 9.00am - 8.30pm', 'Orange County / Southern California'],
  ['Sun: Closed', 'Design • Engineer • Permit'],
  ['Subscribe to the newsletter', 'Commercial Design • Engineering • Permit'],
  ['Subscribe', 'Contact NGUYEN'],
  ['©Template by RealMehedi', '© NGUYEN Architecture & Engineering'],
  ['Built in Framer', 'Commercial Architecture & Engineering'],
  ['Create a free website with Framer, the website builder loved by startups, designers and agencies.', ''],
];

const CLIENT_PATCH = `
<script id="nguyen-architectured-content-patch">
(() => {
  const DEMO_PATH = '${DEMO_PATH}';
  const SOURCE_ORIGIN = 'https://architectured.framer.website';
  const FACEBOOK = 'https://www.facebook.com/profile.php?id=61579114646057&mibextid=wwXIfr&mibextid=wwXIfr';

  const pairs = ${JSON.stringify([
    ['Years of creating spaces', 'Architectural Design'],
    ['Amazing projects brought to life', 'Structural Engineering'],
    ['Happy clients, happy spaces', 'MEP Engineering'],
    ['Designs that earn awards', 'Permit Services'],
    ['Architecture that connects people and places', 'Commercial Design & Permit Solutions'],
    ['We design more than buildings—we create spaces that foster connection, creativity, and community', 'One team. Complete solution. Architecture, engineering and permit support for commercial projects in Orange County.'],
    ['Get Template', 'Request Consultation'],
    ['Explore our services and see how we bring creativity and expertise to every project', 'Integrated commercial design, engineering and permit services from existing conditions through plan check and approval.'],
    ['Architectural Design', 'Architectural Design & Tenant Improvement (TI)'],
    ['Site Planning', 'Existing-Condition Survey & Business Layout'],
    ['Layout Design', 'Space Planning'],
    ['3D Visualization', '3D Renderings'],
    ['Rendering', 'Elevations & Sections'],
    ['Construction Documentation', 'Permit Documentation'],
    ['Schematic Design Development', 'Concept Design'],
    ['BIM', 'Coordinated Documents'],
    ['Interior Design & Planning', 'Structural Engineering'],
    ['Space Planning & Optimization', 'Structural Design'],
    ['Furniture & Fixture Selection', 'Structural Details'],
    ['Material Selection', 'Structural Calculations'],
    ['Lighting Design', 'Foundation & Framing'],
    ['Art & Accessory Curation', 'Existing Building Modification'],
    ['Custom Cabinetry Design', 'Retaining Walls'],
    ['Interior Landscaping', 'Engineering Coordination'],
    ['Consulting Services', 'MEP Engineering'],
    ['Site & Building Code Consultation', 'Electrical Design'],
    ['Design & Concept Review', 'Plumbing Design'],
    ['Technical Advisory Services', 'HVAC Design'],
    ['Cost Estimation & Budgeting', 'Electrical Load Calculations'],
    ['Project Feasibility Consulting', 'Equipment Coordination'],
    ['Project Management', 'Code, Energy & Permit'],
    ['Pre-Construction Planning', 'Title 24 & Energy Compliance'],
    ['Site Inspection & Supervision', 'CalGreen & ADA Compliance'],
    ['Cost Estimation', 'Zoning & Occupancy Review'],
    ['Resource Allocation', 'Permit Submittal'],
    ['Timeline & Milestone Tracking', 'Plan Check Coordination'],
    ['Contractor & Vendor Management', 'Corrections & Resubmittal'],
    ['Final Inspection & Handover', 'Permit Approval Support'],
    ['Explore All Services', 'Explore Commercial Services'],
    ['Our Best Projects', 'Commercial Project Types'],
    ['What we’ve been up to—check out our latest projects', 'Commercial spaces designed around business operations, customer experience, code compliance and permit requirements.'],
    ['Skyline Corporate Hub', 'Office & Tenant Improvement'],
    ['Commercial', 'Tenant Improvement'],
    ['Office', 'Commercial Office'],
    ['Central Business District.', 'Orange County, CA'],
    ['2022', 'Design + Permit'],
    ['350,000 sq. ft.', 'Commercial TI'],
    ['LuxeHaven Villa', 'Restaurant & Café'],
    ['Residential', 'Food & Beverage'],
    ['Luxury Villa', 'Restaurant Tenant Improvement'],
    ['Savannah, Georgia', 'Orange County, CA'],
    ['2023', 'Architecture + MEP'],
    ['4000sqft', 'Commercial Project'],
    ['Celestial Towers Condominiums', 'New Commercial Building'],
    ['Apartment and Condo', 'Ground-Up Commercial'],
    ['New Orleans, Louisiana', 'Southern California'],
    ['300,000 sq. ft.', 'Architecture + Engineering'],
    ['View All Projects', 'View Project Types'],
    ['Our Differences', 'Why Choose NGUYEN'],
    ['what makes us different (and totally awesome)', 'One team. Complete solution. Built around clear coordination, code compliance and efficient permitting.'],
    ['Designs with heart and soul', 'One Team, Complete Solution'],
    ['Expert guidance', 'Code & Permit Expertise'],
    ['Smooth and stress-free process', 'Cost & Time Efficiency'],
    ['Save time and stay on budget', 'Client Focused Coordination'],
    ['Orion Caldwell, Home Owner', 'NGUYEN Architecture & Engineering'],
    ['How we work', 'Our Process'],
    ['Let’s turn your big ideas into a masterpiece with a clear and fun process', 'A clear process from consultation and feasibility through design, engineering, permit submittal and plan check approval.'],
    ['Initial Consultation', 'Consultation'],
    ['Concept Development', 'Site Analysis & Feasibility'],
    ['Planning & Preparation', 'Design & Engineering'],
    ['Execution & Delivery', 'Permit Submittal & Plan Check'],
    ['Project images', 'Commercial Project Types'],
    ['Gallery', 'Our Work'],
    ['Browse Gallery', 'Explore Project Types'],
    ['Blogs', 'Project Guidance'],
    ['Latest Blogs', 'Commercial Guidance'],
    ['Design & Inspiration', 'Design & Planning'],
    ['Industry Insights', 'Code & Permit'],
    ['All Blogs', 'View Guidance'],
    ['FAQs', 'Commercial Project FAQs'],
    ['Do you handle all the permits and paperwork?', 'Do you handle permit submittal and plan check?'],
    ['Can I make changes during the design process?', 'What services can be coordinated in-house?'],
    ['Do you only design residential spaces?', 'What commercial project types do you work on?'],
    ['Can I see a 3D model of my design?', 'Can you provide renderings and design drawings?'],
    ['Do you work with contractors?', 'Do you coordinate with consultants and city agencies?'],
    ['Can you help with interior design too?', 'Do you support Tenant Improvement projects?'],
    ['What happens if I still have questions?', 'How do we get started?'],
    ['Architect', 'NGUYEN'],
    ['(217) 555-0134', '(209) 233-8888'],
    ['(217) 444-0134', '(714) 707-8889'],
    ['architect@email.com', 'info@nguyenarchitecture.com'],
    ['123 Main Street, Suite 200, Austin, TX 78701', '7171 Warner Ave. Ste. B, Huntington Beach, CA 92647'],
    ['Mon to Sat: 9.00am - 8.30pm', 'Orange County / Southern California'],
    ['Sun: Closed', 'Design • Engineer • Permit'],
    ['Subscribe to the newsletter', 'Commercial Design • Engineering • Permit'],
    ['Subscribe', 'Contact NGUYEN'],
    ['©Template by RealMehedi', '© NGUYEN Architecture & Engineering'],
    ['Built in Framer', 'Commercial Architecture & Engineering']
  ])};

  const exact = new Map(pairs.map(([from, to]) => [normalize(from), to]));

  function normalize(value) {
    return (value || '').replace(/\\s+/g, ' ').trim();
  }

  function patchText() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const next = exact.get(normalize(node.nodeValue));
      if (next !== undefined && node.nodeValue !== next) node.nodeValue = next;
    }

    document.querySelectorAll('a').forEach((anchor) => {
      const href = anchor.getAttribute('href') || '';
      const label = normalize(anchor.textContent);

      if (href.startsWith(SOURCE_ORIGIN)) {
        const url = new URL(href);
        if (url.pathname.startsWith('/projects/')) {
          anchor.setAttribute('href', DEMO_PATH + '#projects');
        } else if (url.pathname.startsWith('/services')) {
          anchor.setAttribute('href', DEMO_PATH + '#services');
        } else if (url.pathname.startsWith('/about')) {
          anchor.setAttribute('href', DEMO_PATH + '#about');
        } else if (url.pathname.startsWith('/contact')) {
          anchor.setAttribute('href', 'mailto:info@nguyenarchitecture.com');
        } else if (url.pathname.startsWith('/blogs/')) {
          anchor.setAttribute('href', DEMO_PATH + '#faq');
        } else {
          anchor.setAttribute('href', DEMO_PATH + (url.hash || ''));
        }
      }

      if (label === 'Request Consultation' || label === 'Send Message' || label === 'Contact NGUYEN') {
        anchor.setAttribute('href', 'mailto:info@nguyenarchitecture.com');
      }
      if (label === 'Facebook') {
        anchor.setAttribute('href', FACEBOOK);
        anchor.setAttribute('target', '_blank');
      }
      if (label === 'Instagram' || label === 'Linkedin' || label === 'Twitter/X' || label === 'Youtube' || label === 'Pinterest') {
        anchor.setAttribute('href', FACEBOOK);
        anchor.setAttribute('target', '_blank');
      }
      if (href.startsWith('mailto:')) anchor.setAttribute('href', 'mailto:info@nguyenarchitecture.com');
      if (href.startsWith('tel:')) anchor.setAttribute('href', 'tel:7147078889');
    });

    document.querySelectorAll('form').forEach((form) => {
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        window.location.href = 'mailto:info@nguyenarchitecture.com';
      }, { once: true });
    });
  }

  patchText();
  document.addEventListener('DOMContentLoaded', patchText, { once: true });
  let runs = 0;
  const timer = setInterval(() => {
    patchText();
    runs += 1;
    if (runs >= 36) clearInterval(timer);
  }, 250);
})();
</script>`;

async function getSource() {
  let lastError: unknown = null;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(SOURCE_URL, {
        next: { revalidate: 3600 },
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
      `<head$1><base href="${SOURCE_URL}"><meta name="robots" content="noindex,nofollow,noarchive"><meta name="description" content="NGUYEN Architecture & Engineering — commercial architecture, engineering, Tenant Improvement and permit support in Orange County.">${CLEANUP}`,
    );

    for (const [from, to] of REPLACEMENTS) html = html.split(from).join(to);

    html = html.replace(/<\/body>/i, `${CLIENT_PATCH}</body>`);

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400',
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
      },
    });
  } catch {
    return new Response(
      '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta http-equiv="refresh" content="2"><title>Loading NGUYEN Concept 04</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#061b36;color:white;font-family:Arial,sans-serif}main{text-align:center;padding:24px}p{opacity:.65;color:#d99a2b}</style></head><body><main><h1>NGUYEN Architecture & Engineering</h1><p>Loading Concept 04…</p></main></body></html>',
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
