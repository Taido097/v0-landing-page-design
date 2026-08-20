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
  [/Interior & Architecture/gi, 'Commercial Architecture & Engineering'],
  [/Interior and Architecture/gi, 'Commercial Architecture & Engineering'],
  [/Interior Design/gi, 'Tenant Improvement & Commercial Design'],
  [/Space Planning/gi, 'Existing-Condition Survey & Layout'],
  [/Design Consultation/gi, 'Zoning, Occupancy & Code Review'],
  [/Project Management/gi, 'Permit & Plan Check Coordination'],
  [/Architecture Design/gi, 'Architectural, Structural & MEP'],
  [/Commercial Interior/gi, 'Commercial Architecture'],
  [/Residential Interior/gi, 'Tenant Improvement'],
  [/Office Design/gi, 'Office & Tenant Improvements'],
  [/Retail Design/gi, 'Retail Stores'],
  [/Hospitality Design/gi, 'Restaurants, Cafés & Boba Shops'],
  [/Interior Styling/gi, 'Electrical, Plumbing & HVAC'],
  [/Renovation/gi, 'Commercial Remodel & Renovation'],
  [/Get in touch/gi, 'Start a Project'],
  [/Contact Us/gi, 'Contact'],
  [/Contact us/gi, 'Contact'],
  [/About Us/gi, 'About NGUYEN'],
  [/About us/gi, 'About NGUYEN'],
  [/Functional and visually compelling spaces for offices, retail stores, hospitality, and businesses\./gi, 'Commercial architecture, engineering and permit support for restaurants, cafés, salons, retail stores, offices and other business spaces.'],
  [/We create spaces that are both functional and beautiful\./gi, 'We coordinate design, engineering and permitting from concept through building permit.'],
  [/Transforming spaces with thoughtful design and attention to detail\./gi, 'Helping commercial projects move from concept to design, engineering and permit with coordinated documentation.'],
];

export async function GET() {
  try {
    const response = await fetch(SOURCE_URL, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
        Accept: 'text/html,application/xhtml+xml',
      },
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
