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
</style>`;

const REPLACEMENTS: Array<[RegExp, string]> = [
  [/ArcSphere Studio/gi, 'NGUYEN Architecture & Engineering'],
  [/ArcSphere/gi, 'NGUYEN'],
  [/Interior & Architecture/gi, 'Architecture · Engineering · Permit'],
  [/Interior and Architecture/gi, 'Architecture · Engineering · Permit'],
  [/Interior Design/gi, 'Tenant Improvement Design'],
  [/interior design/gi, 'tenant improvement design'],

  [/Residential Interior/gi, 'Tenant Improvement (TI)'],
  [/Commercial Interior/gi, 'Commercial Architecture'],
  [/Space Planning/gi, 'Existing-Condition Survey & Layout'],
  [/Design Consultation/gi, 'Zoning, Occupancy & Code Review'],
  [/Project Management/gi, 'Permit & Plan Check Coordination'],
  [/Architecture Design/gi, 'Architectural, Structural & MEP'],
  [/Interior Styling/gi, 'Electrical, Plumbing & HVAC Coordination'],
  [/Renovation/gi, 'Commercial Remodel & Renovation'],
  [/Office Design/gi, 'Office & Tenant Improvements'],
  [/Retail Design/gi, 'Retail Stores'],
  [/Hospitality Design/gi, 'Restaurants, Cafés & Boba Shops'],
  [/Furniture Selection/gi, 'Title 24 & Code Compliance'],
  [/Lighting Design/gi, 'Electrical & Lighting Coordination'],
  [/3D Visualization/gi, 'Permit Drawing Documentation'],
  [/Material Selection/gi, 'Building Code Coordination'],

  [/Concept Development/gi, 'Site Survey & Project Planning'],
  [/Design Development/gi, 'Architecture & Engineering'],
  [/Documentation/gi, 'Permit Documentation'],
  [/Implementation/gi, 'Plan Check & Corrections'],
  [/We begin by understanding your goals, requirements, and design vision\./gi, 'We begin with the existing conditions, business needs, zoning, occupancy and project requirements.'],
  [/We refine the concept into a cohesive and functional design direction\./gi, 'We develop coordinated architectural, structural and MEP drawings for the commercial project.'],
  [/We prepare detailed drawings and specifications for execution\./gi, 'We prepare permit-ready documentation with Title 24 and applicable code coordination.'],
  [/We oversee the final execution to ensure the design is realized as intended\./gi, 'We support building permit, plan check, corrections, consultants and city coordination through approval.'],

  [/Our Services/gi, 'Our Services'],
  [/Our Projects/gi, 'Commercial Projects'],
  [/Projects/gi, 'Commercial Projects'],
  [/About Us/gi, 'About NGUYEN'],
  [/About us/gi, 'About NGUYEN'],
  [/Get in touch/gi, 'Start a Project'],
  [/Contact Us/gi, 'Contact'],
  [/Contact us/gi, 'Contact'],

  [/Functional and visually compelling spaces for offices, retail stores, hospitality, and businesses\./gi, 'Commercial architecture, engineering and permit support for restaurants, cafés, salons, retail stores, offices and other business spaces.'],
  [/We create spaces that are both functional and beautiful\./gi, 'We coordinate commercial design, engineering and permitting from concept through building permit.'],
  [/Transforming spaces with thoughtful design and attention to detail\./gi, 'Helping commercial projects move from concept to design, engineering and permit with coordinated documentation.'],
  [/Interior spaces designed around how you live and work\./gi, 'Commercial spaces planned around business operations, code requirements and permit approval.'],
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
