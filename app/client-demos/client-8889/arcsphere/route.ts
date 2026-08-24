const SOURCE_URL = 'https://arcsphere-studio.framer.website/';

export const revalidate = 3600;

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

const REPLACEMENTS: Array<[RegExp, string]> = [
  [/ArcSphere Studio/gi, 'NGUYEN Architecture & Engineering'],
  [/ArcSphere/gi, 'NGUYEN'],
  [/Interior & Architecture/gi, 'Architecture · Engineering · Permit'],
  [/Interior and Architecture/gi, 'Architecture · Engineering · Permit'],
  [/Where Architecture Meets Experience/gi, 'Commercial Architecture — Engineering & Permit'],
  [/Where Architecture/gi, 'Commercial Architecture'],
  [/Meets Experience/gi, 'Engineering & Permit'],
  [/Based in Dubai, we design residential and commercial spaces that elevate how people live, work, and interact with their environment\.?/gi, 'Based in Orange County, we provide commercial architecture, engineering and permit support from existing-condition survey and business layout through plan check and approval.'],
  [/VIEW PROJECTS/gi, 'VIEW PROJECT TYPES'],
  [/BOOK CONSULTATION/gi, 'START A PROJECT'],
  [/DESIGN PROCESS/gi, 'PROJECT PROCESS'],
  [/Residential Interior/gi, 'Architectural Design & Tenant Improvement (TI)'],
  [/Commercial Interior/gi, 'Commercial Architecture'],
  [/Space Planning/gi, 'Existing-Condition Survey & Business Layout'],
  [/Design Consultation/gi, 'Zoning, Occupancy & Local Requirements'],
  [/Project Management/gi, 'Building Permit, Plan Check & Corrections'],
  [/Architecture Design/gi, 'Architectural, Structural & MEP'],
  [/Interior Styling/gi, 'Electrical, Plumbing & HVAC Coordination'],
  [/Furniture Selection/gi, 'Title 24 & Code Compliance'],
  [/Lighting Design/gi, 'Electrical, Plumbing & HVAC Coordination'],
  [/3D Visualization/gi, 'Permit Drawing Documentation'],
  [/Material Selection/gi, 'Consultant & City Coordination'],
  [/Renovation/gi, 'Commercial Remodel & Renovation'],
  [/Office Design/gi, 'Office & Tenant Improvements'],
  [/Retail Design/gi, 'Retail Stores'],
  [/Hospitality Design/gi, 'Restaurants, Cafés & Boba Shops'],
  [/Concept Development/gi, 'Existing-Condition Survey & Project Planning'],
  [/Design Development/gi, 'Architecture & Engineering'],
  [/Documentation/gi, 'Permit Documentation'],
  [/Implementation/gi, 'Plan Check & Corrections'],
  [/We begin by understanding your goals, requirements, and design vision\.?/gi, 'We begin with existing conditions, business needs, zoning, occupancy and local requirements.'],
  [/We refine the concept into a cohesive and functional design direction\.?/gi, 'We develop coordinated Architectural, Structural and MEP documentation for the commercial project.'],
  [/We prepare detailed drawings and specifications for execution\.?/gi, 'We prepare permit-ready drawings with Title 24 and applicable code compliance.'],
  [/We oversee the final execution to ensure the design is realized as intended\.?/gi, 'We support building permit, plan check, corrections, consultants and city coordination through approval.'],
  [/Functional and visually compelling spaces for offices, retail stores, hospitality, and businesses\.?/gi, 'Commercial architecture and engineering for restaurants, cafés, boba shops, salons, retail stores, offices and tenant improvements.'],
  [/Our Projects/gi, 'Commercial Project Types'],
  [/About Us/gi, 'About NGUYEN'],
  [/About us/gi, 'About NGUYEN'],
  [/Get in touch/gi, 'Start a Project'],
  [/Contact Us/gi, 'Contact'],
  [/Contact us/gi, 'Contact'],
  [/Dubai/gi, 'Huntington Beach, CA'],
  [/United Arab Emirates/gi, 'Orange County, CA'],
];

function rewriteContactLinks(html: string) {
  html = html.replace(/info@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/gi, 'info@nguyenarchitecture.com');

  const phones = ['(209) 233-8888', '(714) 707-8889'];
  let phoneIndex = 0;

  return html.replace(
    /<a\b([^>]*?)href=(['"])tel:[^'"]*\2([^>]*)>([\s\S]*?)<\/a>/gi,
    (match, before: string, quote: string, after: string, inner: string) => {
      const phone = phones[Math.min(phoneIndex, phones.length - 1)];
      phoneIndex += 1;
      const href = `tel:${phone.replace(/[^+\d]/g, '')}`;
      const updatedInner = inner.replace(/[+()\d][+()\d .-]{6,}/g, phone);
      return `<a${before}href=${quote}${href}${quote}${after}>${updatedInner}</a>`;
    },
  );
}

function removeNonVisualTelemetry(html: string) {
  return html
    .replace(
      /<script\b(?=[^>]*\bsrc=["']https:\/\/events\.framer\.com\/script(?:\?[^"']*)?["'])[^>]*>\s*<\/script>/gi,
      '',
    )
    .replace(
      /<link\b(?=[^>]*\bhref=["']https:\/\/events\.framer\.com\/[^"']*["'])[^>]*>/gi,
      '',
    );
}

function optimizeImageDecoding(html: string) {
  // Decoding is a scheduling hint only; image source, dimensions, crop,
  // loading order, layout, and Framer animation attributes stay unchanged.
  return html.replace(/<img\b(?![^>]*\bdecoding=)/gi, '<img decoding="async"');
}

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
      `<head$1><base href="${SOURCE_URL}"><meta name="robots" content="noindex,nofollow,noarchive"><meta name="description" content="NGUYEN Architecture & Engineering — commercial architecture, engineering, tenant improvement and building permit support in Orange County.">${CLEANUP}`,
    );

    html = html.replace(
      /<title>[^<]*<\/title>/i,
      '<title>NGUYEN Architecture & Engineering — Website Demo</title>',
    );

    // Replace both rendered markup and Framer's serialized page data before
    // the response reaches the browser, preventing hydration from restoring
    // the source labels without any MutationObserver or DOM walker.
    for (const [pattern, replacement] of REPLACEMENTS) {
      html = html.replace(pattern, replacement);
    }

    html = rewriteContactLinks(html);
    html = removeNonVisualTelemetry(html);
    html = optimizeImageDecoding(html);

    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400',
        'X-Robots-Tag': 'noindex, nofollow, noarchive',
      },
    });
  } catch {
    return new Response(
      '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><meta http-equiv="refresh" content="2"><title>Loading NGUYEN Concept 01</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#f0ebe6;color:#181818;font-family:Arial,sans-serif}main{text-align:center;padding:24px}p{opacity:.6}</style></head><body><main><h1>NGUYEN Architecture & Engineering</h1><p>Loading Concept 01…</p></main></body></html>',
      {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-store',
          'X-Robots-Tag': 'noindex, nofollow,noarchive',
        },
      },
    );
  }
}
