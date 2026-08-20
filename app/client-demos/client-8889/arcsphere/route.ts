const SOURCE_URL = 'https://arcsphere-studio.framer.website/';

export const revalidate = 3600;

const CLIENT_DEMO_STYLES = `
<style id="designedbytd-client-demo-cleanup">
  #__framer-badge-container,
  [id^="__framer-editorbar"],
  [class*="framer-editorbar"] {
    display: none !important;
    visibility: hidden !important;
    opacity: 0 !important;
    pointer-events: none !important;
  }

  #nguyen-client-intro {
    box-sizing: border-box !important;
    width: 100% !important;
    max-width: none !important;
    background: #f0ebe6 !important;
    color: #181818 !important;
    padding: 112px 4.5vw 88px !important;
    border-bottom: 1px solid rgba(24,24,24,.14) !important;
    font-family: "Inter Display", Inter, Arial, sans-serif !important;
  }

  #nguyen-client-intro * {
    box-sizing: border-box !important;
    font-family: inherit !important;
  }

  #nguyen-client-intro .nguyen-kicker {
    margin: 0 0 22px !important;
    font-size: 12px !important;
    font-weight: 600 !important;
    letter-spacing: .12em !important;
    text-transform: uppercase !important;
    opacity: .58 !important;
  }

  #nguyen-client-intro h1 {
    max-width: 1100px !important;
    margin: 0 !important;
    font-size: clamp(48px, 7vw, 112px) !important;
    line-height: .91 !important;
    letter-spacing: -.055em !important;
    font-weight: 500 !important;
  }

  #nguyen-client-intro .nguyen-lede {
    max-width: 860px !important;
    margin: 34px 0 0 !important;
    font-size: clamp(17px, 1.55vw, 24px) !important;
    line-height: 1.45 !important;
    letter-spacing: -.02em !important;
    opacity: .72 !important;
  }

  #nguyen-client-intro .nguyen-flow {
    margin: 42px 0 0 !important;
    font-size: 13px !important;
    font-weight: 600 !important;
    letter-spacing: .05em !important;
    text-transform: uppercase !important;
  }

  #nguyen-client-intro .nguyen-grid {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    gap: 0 !important;
    margin-top: 64px !important;
    border-top: 1px solid rgba(24,24,24,.18) !important;
    border-left: 1px solid rgba(24,24,24,.18) !important;
  }

  #nguyen-client-intro .nguyen-block {
    min-width: 0 !important;
    padding: 30px 32px 34px !important;
    border-right: 1px solid rgba(24,24,24,.18) !important;
    border-bottom: 1px solid rgba(24,24,24,.18) !important;
  }

  #nguyen-client-intro .nguyen-block h2 {
    margin: 0 0 20px !important;
    font-size: 13px !important;
    font-weight: 700 !important;
    letter-spacing: .09em !important;
    text-transform: uppercase !important;
  }

  #nguyen-client-intro .nguyen-block ul {
    margin: 0 !important;
    padding: 0 !important;
    list-style: none !important;
    display: grid !important;
    gap: 11px !important;
  }

  #nguyen-client-intro .nguyen-block li,
  #nguyen-client-intro .nguyen-contact p {
    margin: 0 !important;
    font-size: clamp(14px, 1.05vw, 17px) !important;
    line-height: 1.5 !important;
    letter-spacing: -.01em !important;
  }

  #nguyen-client-intro .nguyen-block li::before {
    content: "↗" !important;
    margin-right: 10px !important;
    opacity: .45 !important;
  }

  #nguyen-client-intro .nguyen-contact {
    display: grid !important;
    gap: 9px !important;
  }

  #nguyen-client-intro .nguyen-contact a {
    color: inherit !important;
    text-decoration: none !important;
  }

  @media (max-width: 809.98px) {
    #nguyen-client-intro {
      padding: 86px 20px 52px !important;
    }

    #nguyen-client-intro h1 {
      font-size: clamp(44px, 14vw, 68px) !important;
    }

    #nguyen-client-intro .nguyen-lede {
      margin-top: 24px !important;
      font-size: 17px !important;
    }

    #nguyen-client-intro .nguyen-flow {
      margin-top: 30px !important;
      line-height: 1.7 !important;
    }

    #nguyen-client-intro .nguyen-grid {
      grid-template-columns: 1fr !important;
      margin-top: 44px !important;
    }

    #nguyen-client-intro .nguyen-block {
      padding: 24px 20px 28px !important;
    }
  }
</style>`;

const BUSINESS_INTRO = `
<section id="nguyen-client-intro" aria-label="Nguyen Architecture and Engineering business information">
  <p class="nguyen-kicker">Commercial Architecture · Engineering · Permit</p>
  <h1>NGUYEN Architecture & Engineering</h1>
  <p class="nguyen-lede">Full-service commercial design, engineering and permit support in Orange County. From existing-condition surveys and layout concepts through architectural, structural and MEP documentation, zoning and code coordination, plan check and building permit support.</p>
  <p class="nguyen-flow">Concept → Design → Engineering → Permit</p>

  <div class="nguyen-grid">
    <div class="nguyen-block">
      <h2>Services</h2>
      <ul>
        <li>Existing-condition survey & business layout planning</li>
        <li>Architectural design & Tenant Improvement (TI)</li>
        <li>Zoning, occupancy & local requirement review</li>
        <li>Architectural, Structural & MEP documentation</li>
        <li>Title 24 & code compliance</li>
        <li>Electrical, Plumbing & HVAC coordination</li>
        <li>Building Permit, Plan Check & Corrections</li>
        <li>Consultant & city-agency coordination during permitting</li>
      </ul>
    </div>

    <div class="nguyen-block">
      <h2>Specialized Commercial Projects</h2>
      <ul>
        <li>Boba Shops, Coffee Shops & Cafés</li>
        <li>Restaurants</li>
        <li>Nail Salons & Beauty Salons</li>
        <li>Retail Stores</li>
        <li>Office & Tenant Improvements</li>
        <li>Commercial Remodel & Renovation</li>
        <li>New Commercial Buildings</li>
      </ul>
    </div>

    <div class="nguyen-block">
      <h2>Project Approach</h2>
      <ul>
        <li>Optimize function and layout for business use</li>
        <li>Coordinate zoning and building-code requirements</li>
        <li>Prepare coordinated technical documents for permit</li>
        <li>Reduce avoidable revisions, time and project cost</li>
      </ul>
    </div>

    <div class="nguyen-block nguyen-contact">
      <h2>Contact</h2>
      <p>Orange County · Huntington Beach, CA</p>
      <p><a href="tel:+12092338888">(209) 233-8888</a> · <a href="tel:+17147078889">(714) 707-8889</a></p>
      <p><a href="mailto:info@nguyenarchitecture.com">info@nguyenarchitecture.com</a></p>
      <p>Design · Engineering · Permit</p>
    </div>
  </div>
</section>`;

const REPLACEMENTS: Array<[RegExp, string]> = [
  [/ArcSphere Studio/gi, 'NGUYEN Architecture & Engineering'],
  [/Interior & Architecture/gi, 'Commercial Architecture & Engineering'],
  [/Interior Design/gi, 'Commercial Design & Tenant Improvement'],
  [/interior and architecture/gi, 'commercial architecture and engineering'],
  [/interior design/gi, 'commercial design and tenant improvement'],
  [/Functional and visually compelling spaces for offices, retail stores, hospitality, and businesses\./gi, 'Commercial architecture, engineering and permit support for restaurants, cafés, salons, retail, offices and other business spaces.'],
  [/Get in touch/gi, 'Start a Commercial Project'],
  [/Contact Us/gi, 'Contact NGUYEN'],
  [/Contact us/gi, 'Contact NGUYEN'],
  [/Our Services/gi, 'Commercial Services'],
  [/Services/gi, 'Commercial Services'],
  [/Projects/gi, 'Commercial Projects'],
  [/About Us/gi, 'About NGUYEN'],
  [/About us/gi, 'About NGUYEN'],
];

export async function GET() {
  try {
    const response = await fetch(SOURCE_URL, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return new Response('Client demo unavailable', { status: 502 });
    }

    let html = await response.text();

    html = html.replace(
      /<head([^>]*)>/i,
      `<head$1><base href="${SOURCE_URL}"><meta name="robots" content="noindex,nofollow,noarchive"><meta name="description" content="NGUYEN Architecture & Engineering — commercial architecture, engineering, tenant improvement and building permit support in Orange County.">${CLIENT_DEMO_STYLES}`,
    );

    html = html.replace(
      /<title>[^<]*<\/title>/i,
      '<title>NGUYEN Architecture & Engineering — Website Demo</title>',
    );

    for (const [pattern, replacement] of REPLACEMENTS) {
      html = html.replace(pattern, replacement);
    }

    html = html.replace(/info@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/gi, 'info@nguyenarchitecture.com');
    html = html.replace(/\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}/g, '(714) 707-8889');

    html = html.replace(/<body([^>]*)>/i, `<body$1>${BUSINESS_INTRO}`);

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
