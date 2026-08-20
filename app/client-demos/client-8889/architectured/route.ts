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

  .framer-xrcGW .framer-1h0wd5 { display: none !important; }

  a[aria-label="Company Logo"] {
    width: 220px !important;
    min-width: 180px !important;
    height: 48px !important;
    text-decoration: none !important;
  }

  .nguyen-wordmark {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    color: #061b36;
    line-height: 1;
    white-space: nowrap;
  }

  .nguyen-wordmark strong {
    font-family: Geist, Arial, sans-serif;
    font-size: 21px;
    font-weight: 800;
    letter-spacing: .12em;
  }

  .nguyen-wordmark span {
    margin-top: 5px;
    font-family: Geist, Arial, sans-serif;
    font-size: 8px;
    font-weight: 700;
    letter-spacing: .24em;
    text-transform: uppercase;
    color: #d99a2b;
  }

  @media (max-width: 809px) {
    a[aria-label="Company Logo"] {
      width: 170px !important;
      min-width: 150px !important;
    }
    .nguyen-wordmark strong { font-size: 18px; }
    .nguyen-wordmark span { font-size: 7px; letter-spacing: .17em; }
  }
</style>`;

const CLIENT_PATCH = `
<script id="nguyen-architectured-content-patch">
(() => {
  const DEMO_PATH = '${DEMO_PATH}';
  const SOURCE_ORIGIN = 'https://architectured.framer.website';
  const FACEBOOK = 'https://www.facebook.com/profile.php?id=61579114646057&mibextid=wwXIfr&mibextid=wwXIfr';

  const pairs = ${JSON.stringify([
    ['Years of creating spaces', 'Architectural Design'],
    ['Amazing projects brought to life', 'Engineering'],
    ['Happy clients, happy spaces', 'Permit Support'],
    ['Designs that earn awards', 'Residential + Commercial'],
    ['Architecture that connects people and places', 'Residential & Commercial Design Solutions'],
    ['We design more than buildings—we create spaces that foster connection, creativity, and community', 'One team for custom homes, ADUs, residential and commercial projects — from design and engineering through permit support.'],
    ['Get Template', 'Request Consultation'],
    ['Explore our services and see how we bring creativity and expertise to every project', 'Architecture, engineering and permit support for custom homes, ADUs, residential improvements and commercial projects across Southern California.'],
    ['Site Planning', 'Existing-Condition Survey & Site Planning'],
    ['Layout Design', 'Floor Plans & Space Planning'],
    ['3D Visualization', '3D Renderings'],
    ['Rendering', 'Elevations & Sections'],
    ['Construction Documentation', 'Permit & Construction Documents'],
    ['Schematic Design Development', 'Concept & Schematic Design'],
    ['BIM', 'Coordinated Drawings'],
    ['Interior Design & Planning', 'Residential Design'],
    ['Space Planning & Optimization', 'Custom Homes'],
    ['Furniture & Fixture Selection', 'ADUs'],
    ['Material Selection', 'Home Additions'],
    ['Lighting Design', 'Residential Remodels'],
    ['Art & Accessory Curation', 'Garage Conversions'],
    ['Custom Cabinetry Design', 'Interior Reconfiguration'],
    ['Interior Landscaping', 'Residential Permit Support'],
    ['Consulting Services', 'Commercial Design'],
    ['Site & Building Code Consultation', 'Tenant Improvement (TI)'],
    ['Design & Concept Review', 'Restaurants, Cafés & Boba Shops'],
    ['Technical Advisory Services', 'Retail, Office & Salon Projects'],
    ['Cost Estimation & Budgeting', 'Zoning & Occupancy Review'],
    ['Project Feasibility Consulting', 'Commercial Remodel & Renovation'],
    ['Project Management', 'Engineering & Permit'],
    ['Pre-Construction Planning', 'Structural Engineering'],
    ['Site Inspection & Supervision', 'MEP Coordination'],
    ['Cost Estimation', 'Title 24 & Energy Compliance'],
    ['Resource Allocation', 'CalGreen & ADA Compliance'],
    ['Timeline & Milestone Tracking', 'Permit Submittal'],
    ['Contractor & Vendor Management', 'Plan Check & Corrections'],
    ['Final Inspection & Handover', 'City & Consultant Coordination'],
    ['Explore All Services', 'Explore Our Services'],
    ['Our Best Projects', 'Project Types'],
    ['What we’ve been up to—check out our latest projects', 'We support custom homes, ADUs, residential improvements and commercial projects from planning through coordinated design, engineering and permit approval.'],
    ['Skyline Corporate Hub', 'Commercial Tenant Improvement'],
    ['Office', 'Office & Tenant Improvement'],
    ['Central Business District.', 'Orange County, CA'],
    ['350,000 sq. ft.', 'Commercial Project'],
    ['LuxeHaven Villa', 'Custom Home & Residential'],
    ['Luxury Villa', 'Custom Home'],
    ['Savannah, Georgia', 'Southern California'],
    ['4000sqft', 'Residential Project'],
    ['Celestial Towers Condominiums', 'ADU & Residential Addition'],
    ['Apartment and Condo', 'ADU / Addition'],
    ['New Orleans, Louisiana', 'Orange County, CA'],
    ['300,000 sq. ft.', 'Design + Permit'],
    ['View All Projects', 'View Project Types'],
    ['Welcome to our world of creativity, where every project', 'From custom homes and ADUs to commercial spaces, every project'],
    ['starts with a dream', 'starts with your goals'],
    ['and ends with a', 'and moves through coordinated'],
    ['space that', 'design and engineering that'],
    ['feels like home.', 'supports permitting and construction.'],
    ['Take a glimpse into our world of creativity and innovation.', 'NGUYEN Architecture & Engineering provides coordinated architecture, engineering and permit support for residential and commercial projects.'],
    ['Know About Us', 'About NGUYEN'],
    ['Our Differences', 'Why Choose NGUYEN'],
    ['what makes us different (and totally awesome)', 'One team. Complete solution. Residential and commercial design coordinated around code compliance, engineering and permitting.'],
    ['Designs with heart and soul', 'Residential + Commercial Expertise'],
    ['We don’t just design buildings; we craft spaces where life happens, memories are made, and dreams come true. Every project is as unique as the people living in it.', 'Custom homes, ADUs, residential remodels, additions, commercial tenant improvements and new commercial projects supported through one coordinated process.'],
    ['Expert guidance', 'Code & Permit Expertise'],
    ['Smooth and stress-free process', 'Coordinated Design & Engineering'],
    ['Save time and stay on budget', 'Plan Check & Approval Support'],
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
    ['Don’t just take our word for it—see how we turn ideas into stunning spaces. Our gallery is full of inspiration for your next big project!', 'Project types include custom homes, ADUs, additions, residential remodels, boba and coffee shops, restaurants, nail and beauty salons, retail stores, offices, tenant improvements, commercial remodels and new commercial buildings.'],
    ['Browse Gallery', 'Explore Project Types'],
    ['FAQs', 'Project FAQs'],
    ['Do you handle all the permits and paperwork?', 'Do you handle permit submittal and plan check?'],
    ['Absolutely! We take care of all the boring-but-important stuff, like permits and paperwork, so you don’t have to stress about it.', 'Permit support can include permit-ready drawings, city or agency submittal, plan check coordination, corrections, resubmittal and approval support.'],
    ['Do you only design residential spaces?', 'Do you work on both residential and commercial projects?'],
    ['Not at all! While we love creating dream homes, we also work on commercial projects, office spaces, and more. If you’ve got a vision, we’re here to bring it to life.', 'Yes. Residential work can include custom homes, ADUs, additions and remodels. Commercial work can include tenant improvements, restaurants, cafés, boba shops, salons, retail, offices, remodels and new commercial buildings.'],
    ['Can you help with interior design too?', 'Do you support ADUs and Tenant Improvement projects?'],
    ['You bet! From furniture layouts to color schemes, we can assist with the finishing touches that make your space feel like home.', 'Yes. ADU and Tenant Improvement services can include existing-condition survey, space planning, architecture, engineering, code review and permit support.'],
    ['What happens if I still have questions?', 'How do we get started?'],
    ['We’re here to help! If you can’t find the answer you’re looking for, just drop us a message or fill out the form. We’ll get back to you in no time!', 'Contact NGUYEN Architecture & Engineering to discuss the project type, scope, existing conditions and permit requirements.'],
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
  ])};

  const exact = new Map(pairs.map(([from, to]) => [normalize(from), to]));

  function normalize(value) {
    return (value || '').replace(/\\s+/g, ' ').trim();
  }

  function patchLogo() {
    document.querySelectorAll('a[aria-label="Company Logo"]').forEach((logo) => {
      if (logo.dataset.nguyenLogo === 'true') return;
      logo.dataset.nguyenLogo = 'true';
      logo.setAttribute('href', DEMO_PATH);
      logo.innerHTML = '<div class="nguyen-wordmark"><strong>NGUYEN</strong><span>Architecture &amp; Engineering</span></div>';
    });
  }

  function patchText() {
    patchLogo();

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
        if (url.pathname.startsWith('/projects/')) anchor.setAttribute('href', DEMO_PATH + '#projects');
        else if (url.pathname.startsWith('/services')) anchor.setAttribute('href', DEMO_PATH + '#services');
        else if (url.pathname.startsWith('/about')) anchor.setAttribute('href', DEMO_PATH + '#about');
        else if (url.pathname.startsWith('/contact')) anchor.setAttribute('href', 'mailto:info@nguyenarchitecture.com');
        else if (url.pathname.startsWith('/blogs/')) anchor.setAttribute('href', DEMO_PATH + '#faq');
        else anchor.setAttribute('href', DEMO_PATH + (url.hash || ''));
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
    if (runs >= 40) clearInterval(timer);
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
        'Cache-Control': 'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400',
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
