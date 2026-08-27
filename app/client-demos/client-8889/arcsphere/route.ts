const SOURCE_URL = 'https://arcsphere-studio.framer.website/';

export const revalidate = 3600;

const REPLACEMENTS: Array<[RegExp, string]> = [
  [/ArcSphere Studio/gi, 'NGUYEN ARCHITECTURE & ENGINEERING'],
  [/ArcSphere/gi, 'NGUYEN'],
  [/Interior & Architecture/gi, 'Architecture · Engineering · Permit'],
  [/Interior and Architecture/gi, 'Architecture · Engineering · Permit'],
  [/Where Architecture Meets Experience/gi, 'Commercial Architecture — Engineering & Permit'],
  [/Where Architecture/gi, 'Commercial Architecture'],
  [/Meets Experience/gi, 'Engineering & Permit'],
  [/Based in Dubai, we design residential and commercial spaces that elevate how people live, work, and interact with their environment\.?/gi, 'Based in Southern California, we provide residential and commercial architecture, engineering, and permit support from concept through approval.'],
  [/We offer a complete range of architecture and interior design services tailored to create spaces\.?/gi, 'ARCHITECTURE, ENGINEERING & PERMITTING FOR RESIDENTIAL AND COMMERCIAL PROJECTS.'],
  [/A selection of our recent architecture and interior design work\.?/gi, 'A SELECTION OF OUR RECENT RESIDENTIAL, COMMERCIAL & DEVELOPMENT PROJECTS.'],
  [/12\+ YEARS EXPERIENCE/gi, '15+ YEARS EXPERIENCE'],
  [/150\+ PROJECTS COMPLETED/gi, '500+ SUCCESSFUL PROJECTS'],
  [/250\+ PROJECTS WORLDWIDE/gi, '500+ SUCCESSFUL PROJECTS'],
  [/SERENITY VILLA/gi, 'CUSTOM HOME'],
  [/DUBAI, 2025/gi, 'LOS ANGELES, 2025'],
  [/CORPORATE OFFICE SPACE/gi, 'OFFICE BUILD-OUT'],
  [/NEW YORK, 2026/gi, 'IRVINE, 2026'],
  [/MINIMALIST APPARTMENT INTERIOR/gi, 'COMMERCIAL BUILDING'],
  [/MINIMALIST APARTMENT INTERIOR/gi, 'COMMERCIAL BUILDING'],
  [/VIEW PROJECTS/gi, 'VIEW PROJECT TYPES'],
  [/BOOK CONSULTATION/gi, 'START A PROJECT'],
  [/DESIGN PROCESS/gi, 'PROJECT PROCESS'],
  [/Our Projects/gi, 'Commercial Project Types'],
  [/About Us/gi, 'About NGUYEN'],
  [/About us/gi, 'About NGUYEN'],
  [/Get in touch/gi, 'Start a Project'],
  [/Contact Us/gi, 'Contact'],
  [/Contact us/gi, 'Contact'],
  [/Dubai/gi, 'Huntington Beach, CA'],
  [/United Arab Emirates/gi, 'Orange County, CA'],
];

const PATCH = `
<script id="nguyen-safe-content-patch">
(() => {
  const normalize = (v) => (v || '').replace(/\\s+/g, ' ').trim();
  const compact = (v) => normalize(v).replace(/\\s+/g, '').toLowerCase();
  const replacements = new Map([
    [compact('ArcSphere Studio'), 'NGUYEN ARCHITECTURE & ENGINEERING'],
    [compact('Corporate Office Space'), 'OFFICE BUILD-OUT'],
    [compact('New York, 2026'), 'IRVINE, 2026'],
    [compact('Based in Dubai, we design residential and commercial spaces that elevate how people live, work, and interact with their environment.'), 'Based in Southern California, we provide residential and commercial architecture, engineering, and permit support from concept through approval.'],
    [compact('Based in Dubai, we design residential and commercial spaces that elevate how people live, work, and interact with their environment'), 'Based in Southern California, we provide residential and commercial architecture, engineering, and permit support from concept through approval.']
  ]);
  function patch(root) {
    if (!root || root.nodeType !== Node.ELEMENT_NODE) return;
    const nodes = [root, ...root.querySelectorAll('*')];
    for (const node of nodes) {
      const key = compact(node.textContent);
      const value = replacements.get(key);
      if (!value) continue;
      const sameChild = Array.from(node.children).some((child) => compact(child.textContent) === key);
      if (sameChild) continue;
      if (normalize(node.textContent) !== value) node.textContent = value;
    }
  }
  patch(document.body);
  window.addEventListener('load', () => patch(document.body), { once: true });
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') mutation.addedNodes.forEach((node) => { if (node.nodeType === Node.ELEMENT_NODE) patch(node); });
      if (mutation.type === 'characterData' && mutation.target.parentElement) patch(mutation.target.parentElement);
    }
  });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  setTimeout(() => observer.disconnect(), 6000);
})();
</script>`;

async function getSource() {
  const response = await fetch(SOURCE_URL, { next: { revalidate: 3600 }, headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'text/html,application/xhtml+xml' } });
  if (!response.ok) throw new Error(`Upstream returned ${response.status}`);
  return response.text();
}

export async function GET() {
  try {
    let html = await getSource();
    html = html.replace(/<head([^>]*)>/i, `<head$1><base href="${SOURCE_URL}"><meta name="robots" content="noindex,nofollow,noarchive">`);
    html = html.replace(/<title>[^<]*<\/title>/i, '<title>NGUYEN ARCHITECTURE & ENGINEERING — Website Demo</title>');
    for (const [pattern, replacement] of REPLACEMENTS) html = html.replace(pattern, replacement);
    html = html.replace('</body>', `${PATCH}</body>`);
    return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } });
  } catch {
    return new Response('<!doctype html><html><body style="font-family:Arial,sans-serif;padding:40px">Concept 1 is temporarily unavailable. Please refresh in a moment.</body></html>', { status: 502, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }
}
