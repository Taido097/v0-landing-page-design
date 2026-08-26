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
  [/ArcSphere Studio/gi, 'NGUYEN ARCHITECTURE & ENGINEERING'],
  [/ArcSphere/gi, 'NGUYEN'],
  [/Interior & Architecture/gi, 'Architecture · Engineering · Permit'],
  [/Interior and Architecture/gi, 'Architecture · Engineering · Permit'],
  [/Where Architecture Meets Experience/gi, 'Commercial Architecture — Engineering & Permit'],
  [/Where Architecture/gi, 'Commercial Architecture'],
  [/Meets Experience/gi, 'Engineering & Permit'],
  [/Based in Dubai, we design residential and commercial spaces that elevate how people live, work, and interact with their environment\.?/gi, 'Based in Orange County, we provide commercial architecture, engineering and permit support from existing-condition survey and business layout through plan check and approval.'],
  [/We offer a complete range of architecture and interior design services tailored to create spaces\.?/gi, 'ARCHITECTURE, ENGINEERING & PERMITTING FOR RESIDENTIAL AND COMMERCIAL PROJECTS.'],
  [/A selection of our recent architecture and interior design work\.?/gi, 'A SELECTION OF OUR RECENT RESIDENTIAL, COMMERCIAL & DEVELOPMENT PROJECTS.'],
  [/12\+ YEARS EXPERIENCE/gi, '15+ YEARS EXPERIENCE'],
  [/150\+ PROJECTS COMPLETED/gi, '500+ SUCCESSFUL PROJECTS'],
  [/250\+ PROJECTS WORLDWIDE/gi, '500+ SUCCESSFUL PROJECTS'],
  [/SERENITY VILLA/gi, 'CUSTOM HOME'],
  [/DUBAI, 2025/gi, 'LOS ANGELES, 2025'],
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

function removeNonVisualTelemetry(html: string) {
  return html
    .replace(/<script\b(?=[^>]*\bsrc=["']https:\/\/events\.framer\.com\/script(?:\?[^"']*)?["'])[^>]*>\s*<\/script>/gi, '')
    .replace(/<link\b(?=[^>]*\bhref=["']https:\/\/events\.framer\.com\/[^"']*["'])[^>]*>/gi, '');
}

function optimizeImageDecoding(html: string) {
  return html.replace(/<img\b[^>]*>/gi, (tag) => {
    if (/\bdecoding\s*=/i.test(tag)) return tag;
    return tag.replace(/<img\b/i, '<img decoding="async"');
  });
}

const CLIENT_PATCH = `
<script id="nguyen-arcsphere-content-patch">
(() => {
  const pairs = [
    ['ArcSphere Studio', 'NGUYEN ARCHITECTURE & ENGINEERING'], ['ArcSphere', 'NGUYEN'],
    ['Interior & Architecture', 'Architecture · Engineering · Permit'], ['Interior and Architecture', 'Architecture · Engineering · Permit'],
    ['Where Architecture Meets Experience', 'Commercial Architecture — Engineering & Permit'], ['Where Architecture', 'Commercial Architecture'], ['Meets Experience', 'Engineering & Permit'],
    ['Based in Dubai, we design residential and commercial spaces that elevate how people live, work, and interact with their environment', 'Based in Orange County, we provide commercial architecture, engineering and permit support from existing-condition survey and business layout through plan check and approval.'],
    ['We offer a complete range of architecture and interior design services tailored to create spaces.', 'ARCHITECTURE, ENGINEERING & PERMITTING FOR RESIDENTIAL AND COMMERCIAL PROJECTS.'],
    ['A selection of our recent architecture and interior design work.', 'A SELECTION OF OUR RECENT RESIDENTIAL, COMMERCIAL & DEVELOPMENT PROJECTS.'],
    ['12+ YEARS EXPERIENCE', '15+ YEARS EXPERIENCE'], ['150+ PROJECTS COMPLETED', '500+ SUCCESSFUL PROJECTS'], ['250+ PROJECTS WORLDWIDE', '500+ SUCCESSFUL PROJECTS'],
    ['SERENITY VILLA', 'CUSTOM HOME'], ['DUBAI, 2025', 'LOS ANGELES, 2025'],
    ['VIEW PROJECTS', 'VIEW PROJECT TYPES'], ['BOOK CONSULTATION', 'START A PROJECT'], ['DESIGN PROCESS', 'PROJECT PROCESS'],
    ['Residential Interior', 'Architectural Design & Tenant Improvement (TI)'], ['Commercial Interior', 'Commercial Architecture'],
    ['Space Planning', 'Existing-Condition Survey & Business Layout'], ['Design Consultation', 'Zoning, Occupancy & Local Requirements'],
    ['Project Management', 'Building Permit, Plan Check & Corrections'], ['Architecture Design', 'Architectural, Structural & MEP'],
    ['Interior Styling', 'Electrical, Plumbing & HVAC Coordination'], ['Furniture Selection', 'Title 24 & Code Compliance'],
    ['Lighting Design', 'Electrical, Plumbing & HVAC Coordination'], ['3D Visualization', 'Permit Drawing Documentation'],
    ['Material Selection', 'Consultant & City Coordination'], ['Renovation', 'Commercial Remodel & Renovation'],
    ['Office Design', 'Office & Tenant Improvements'], ['Retail Design', 'Retail Stores'], ['Hospitality Design', 'Restaurants, Cafés & Boba Shops'],
    ['Concept Development', 'Existing-Condition Survey & Project Planning'], ['Design Development', 'Architecture & Engineering'],
    ['Documentation', 'Permit Documentation'], ['Implementation', 'Plan Check & Corrections'],
    ['We begin by understanding your goals, requirements, and design vision.', 'We begin with existing conditions, business needs, zoning, occupancy and local requirements.'],
    ['We refine the concept into a cohesive and functional design direction.', 'We develop coordinated Architectural, Structural and MEP documentation for the commercial project.'],
    ['We prepare detailed drawings and specifications for execution.', 'We prepare permit-ready drawings with Title 24 and applicable code compliance.'],
    ['We oversee the final execution to ensure the design is realized as intended.', 'We support building permit, plan check, corrections, consultants and city coordination through approval.'],
    ['Functional and visually compelling spaces for offices, retail stores, hospitality, and businesses.', 'Commercial architecture and engineering for restaurants, cafés, boba shops, salons, retail stores, offices and tenant improvements.'],
    ['Our Projects', 'Commercial Project Types'], ['About Us', 'About NGUYEN'], ['About us', 'About NGUYEN'],
    ['Get in touch', 'Start a Project'], ['Contact Us', 'Contact'], ['Contact us', 'Contact'],
    ['Dubai', 'Huntington Beach, CA'], ['United Arab Emirates', 'Orange County, CA']
  ];
  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
  const compact = (value) => normalize(value).replace(/\\s+/g, '').toLowerCase();
  const exact = new Map(pairs.map(([a,b]) => [normalize(a), b]));
  const splitTextReplacements = new Map([
    [compact('We offer a complete range of architecture and interior design services tailored to create spaces.'), 'ARCHITECTURE, ENGINEERING & PERMITTING FOR RESIDENTIAL AND COMMERCIAL PROJECTS.'],
    [compact('A selection of our recent architecture and interior design work.'), 'A SELECTION OF OUR RECENT RESIDENTIAL, COMMERCIAL & DEVELOPMENT PROJECTS.']
  ]);
  const counterReplacements = new Map([
    [compact('12+ YEARS EXPERIENCE'), '15+ YEARS EXPERIENCE'],
    [compact('150+ PROJECTS COMPLETED'), '500+ SUCCESSFUL PROJECTS'],
    [compact('250+ PROJECTS WORLDWIDE'), '500+ SUCCESSFUL PROJECTS']
  ]);
  const officeCardReplacements = new Map([
    [compact('CORPORATE OFFICE SPACE'), 'OFFICE BUILD-OUT'],
    [compact('COMMERCIAL ARCHITECTURE'), 'COMMERCIAL ARCHITECTURE'],
    [compact('NEW YORK, 2026'), 'IRVINE, 2026']
  ]);
  const officeCardKeys = Array.from(officeCardReplacements.keys());
  const customHomeCardReplacements = new Map([
    [compact('SERENITY VILLA'), 'CUSTOM HOME'],
    [compact('RESIDENTIAL ARCHITECTURE'), 'RESIDENTIAL ARCHITECTURE'],
    [compact('DUBAI, 2025'), 'LOS ANGELES, 2025']
  ]);
  const customHomeCardKeys = Array.from(customHomeCardReplacements.keys());
  const thirdCardImage = window.location.origin + '/nguyen-commercial-building.svg?v=office-exact-20260825';
  const thirdCardLabels = [compact('MINIMALIST APPARTMENT INTERIOR'), compact('MINIMALIST APARTMENT INTERIOR')];
  const phones = ['(209) 233-8888', '(714) 707-8889'];

  function patchTextNode(node) { const next = exact.get(normalize(node.nodeValue)); if (next && node.nodeValue !== next) node.nodeValue = next; }
  function patchSplitParagraph(paragraph) {
    const replacement = splitTextReplacements.get(compact(paragraph.textContent)); if (!replacement) return false;
    paragraph.style.setProperty('white-space', 'normal', 'important'); paragraph.style.setProperty('word-break', 'normal', 'important'); paragraph.style.setProperty('overflow-wrap', 'normal', 'important'); paragraph.textContent = replacement; return true;
  }
  function patchSplitParagraphs(root) { if (!root || root.nodeType !== Node.ELEMENT_NODE) return; const element = root; if (element.matches('p')) patchSplitParagraph(element); element.querySelectorAll('p').forEach(patchSplitParagraph); }
  function patchCounters(root) {
    if (!root || root.nodeType !== Node.ELEMENT_NODE) return;
    const element = root;
    const candidates = [element, ...element.querySelectorAll('*')];
    candidates.forEach((candidate) => {
      const key = compact(candidate.textContent);
      const replacement = counterReplacements.get(key);
      if (!replacement) return;
      const hasSameTextChild = Array.from(candidate.children).some((child) => compact(child.textContent) === key);
      if (hasSameTextChild) return;
      candidate.textContent = replacement;
    });
  }
  function patchMappedCard(root, replacements, keys) {
    if (!root || root.nodeType !== Node.ELEMENT_NODE) return false;
    const element = root;
    const candidates = [element, ...element.querySelectorAll('*')];
    let card = null;
    for (let i = candidates.length - 1; i >= 0; i -= 1) {
      const candidate = candidates[i];
      const text = compact(candidate.textContent);
      if (!keys.every((key) => text.includes(key))) continue;
      card = candidate;
      break;
    }
    if (!card) {
      let cursor = element;
      for (let depth = 0; cursor && depth < 10; depth += 1, cursor = cursor.parentElement) {
        const text = compact(cursor.textContent);
        if (keys.every((key) => text.includes(key))) { card = cursor; break; }
      }
    }
    if (!card) return false;
    const cardCandidates = [card, ...card.querySelectorAll('*')];
    cardCandidates.forEach((candidate) => {
      const key = compact(candidate.textContent);
      const replacement = replacements.get(key);
      if (!replacement) return;
      const hasSameTextChild = Array.from(candidate.children).some((child) => compact(child.textContent) === key);
      if (hasSameTextChild) return;
      candidate.textContent = replacement;
    });
    return true;
  }
  function patchOfficeCard(root) { return patchMappedCard(root, officeCardReplacements, officeCardKeys); }
  function patchCustomHomeCard(root) { return patchMappedCard(root, customHomeCardReplacements, customHomeCardKeys); }
  function patchThirdProjectImage(root) {
    if (!root || root.nodeType !== Node.ELEMENT_NODE) return false;
    const element = root;
    const candidates = [element, ...element.querySelectorAll('*')];
    let label = null;
    for (const candidate of candidates) {
      if (thirdCardLabels.includes(compact(candidate.textContent))) { label = candidate; break; }
    }
    if (!label) return false;
    let card = label;
    for (let depth = 0; card && depth < 10; depth += 1, card = card.parentElement) {
      const img = card.querySelector?.('img');
      if (!img) continue;
      if (img.getAttribute('src') !== thirdCardImage) img.setAttribute('src', thirdCardImage);
      img.removeAttribute('srcset');
      img.removeAttribute('sizes');
      img.style.setProperty('filter', 'none', 'important');
      img.style.setProperty('opacity', '1', 'important');
      img.style.setProperty('visibility', 'visible', 'important');
      const picture = img.closest('picture');
      if (picture) picture.querySelectorAll('source').forEach((source) => { source.setAttribute('srcset', thirdCardImage); source.removeAttribute('sizes'); });
      const mediaParent = img.parentElement;
      if (mediaParent) {
        let replacement = mediaParent.querySelector(':scope > img[data-nguyen-third-card-image="true"]');
        if (!replacement) {
          replacement = img.cloneNode(false);
          replacement.setAttribute('data-nguyen-third-card-image', 'true');
          replacement.removeAttribute('srcset');
          replacement.removeAttribute('sizes');
          replacement.setAttribute('src', thirdCardImage);
          const computed = window.getComputedStyle(img);
          replacement.style.setProperty('position', 'absolute', 'important');
          replacement.style.setProperty('inset', '0', 'important');
          replacement.style.setProperty('width', '100%', 'important');
          replacement.style.setProperty('height', '100%', 'important');
          replacement.style.setProperty('object-fit', computed.objectFit || 'cover', 'important');
          replacement.style.setProperty('object-position', computed.objectPosition || 'center', 'important');
          replacement.style.setProperty('filter', 'none', 'important');
          replacement.style.setProperty('opacity', '1', 'important');
          replacement.style.setProperty('visibility', 'visible', 'important');
          replacement.style.setProperty('z-index', '2', 'important');
          replacement.style.setProperty('pointer-events', 'none', 'important');
          if (window.getComputedStyle(mediaParent).position === 'static') mediaParent.style.setProperty('position', 'relative', 'important');
          mediaParent.appendChild(replacement);
        } else if (replacement.getAttribute('src') !== thirdCardImage) {
          replacement.setAttribute('src', thirdCardImage);
        }
      }
      return true;
    }
    return false;
  }
  function keepResidentialLabelOnOneLine(root) {
    if (!root || root.nodeType !== Node.ELEMENT_NODE) return; const element = root; const candidates = [element, ...element.querySelectorAll('*')];
    candidates.forEach((candidate) => { const text = compact(candidate.textContent); if (text !== 'residential' && text !== 'residentialdesign') return; const hasSameTextChild = Array.from(candidate.children).some((child) => compact(child.textContent) === text); if (hasSameTextChild) return; candidate.style.setProperty('white-space', 'nowrap', 'important'); candidate.style.setProperty('word-break', 'keep-all', 'important'); candidate.style.setProperty('overflow-wrap', 'normal', 'important'); });
  }
  function patchContactAnchor(anchor) {
    if (anchor.matches('a[href^="mailto:"]')) { anchor.setAttribute('href', 'mailto:info@nguyenarchitecture.com'); if (/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(normalize(anchor.textContent))) anchor.textContent = 'info@nguyenarchitecture.com'; return; }
    if (anchor.matches('a[href^="tel:"]')) { const allPhones = Array.from(document.querySelectorAll('a[href^="tel:"]')); const index = Math.max(0, allPhones.indexOf(anchor)); const phone = phones[Math.min(index, phones.length - 1)]; anchor.setAttribute('href', 'tel:' + phone.replace(/[^+\\d]/g, '')); if (/^[+()\\d .-]{7,}$/.test(normalize(anchor.textContent))) anchor.textContent = phone; }
  }
  function patchRoot(root) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) { patchTextNode(root); const paragraph = root.parentElement?.closest('p'); if (paragraph) patchSplitParagraph(paragraph); const parent = root.parentElement; if (parent) { patchCounters(parent); patchOfficeCard(parent); patchCustomHomeCard(parent); patchThirdProjectImage(parent); keepResidentialLabelOnOneLine(parent); } return; }
    if (root.nodeType !== Node.ELEMENT_NODE) return; const element = root; patchSplitParagraphs(element); patchCounters(element); patchOfficeCard(element); patchCustomHomeCard(element); patchThirdProjectImage(element); keepResidentialLabelOnOneLine(element);
    if (element.matches('a[href^="mailto:"], a[href^="tel:"]')) patchContactAnchor(element);
    element.querySelectorAll('a[href^="mailto:"], a[href^="tel:"]').forEach(patchContactAnchor);
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT); let node; while ((node = walker.nextNode())) patchTextNode(node);
  }
  patchRoot(document.body);
  window.addEventListener('load', () => patchThirdProjectImage(document.body), { once: true });
  const observer = new MutationObserver((mutations) => { for (const mutation of mutations) { if (mutation.type === 'characterData') { patchTextNode(mutation.target); const paragraph = mutation.target.parentElement?.closest('p'); if (paragraph) patchSplitParagraph(paragraph); const parent = mutation.target.parentElement; if (parent) { patchCounters(parent); patchOfficeCard(parent); patchCustomHomeCard(parent); patchThirdProjectImage(parent); keepResidentialLabelOnOneLine(parent); } continue; } if (mutation.type === 'childList') mutation.addedNodes.forEach(patchRoot); } });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true }); setTimeout(() => observer.disconnect(), 6000);
})();
</script>`;

async function getSource() {
  let lastError: unknown = null;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const response = await fetch(SOURCE_URL, { next: { revalidate: 3600 }, headers: { 'User-Agent': 'Mozilla/5.0', Accept: 'text/html,application/xhtml+xml' } });
      if (response.ok) return response.text(); lastError = new Error(`Upstream returned ${response.status}`);
    } catch (error) { lastError = error; }
    if (attempt < 2) await new Promise((resolve) => setTimeout(resolve, 200 * (attempt + 1)));
  }
  throw lastError instanceof Error ? lastError : new Error('Unable to load source');
}

export async function GET() {
  try {
    let html = await getSource(); html = removeNonVisualTelemetry(html); html = optimizeImageDecoding(html);
    html = html.replace(/<head([^>]*)>/i, `<head$1><base href="${SOURCE_URL}"><meta name="robots" content="noindex,nofollow,noarchive"><meta name="description" content="NGUYEN ARCHITECTURE & ENGINEERING — commercial architecture, engineering, tenant improvement and building permit support in Orange County.">${CLEANUP}`);
    html = html.replace(/<title>[^<]*<\/title>/i, '<title>NGUYEN ARCHITECTURE & ENGINEERING — Website Demo</title>');
    for (const [pattern, replacement] of REPLACEMENTS) html = html.replace(pattern, replacement);
    html = html.replace(/info@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/gi, 'info@nguyenarchitecture.com');
    html = html.replace(/href=["']mailto:[^"']+["']/gi, 'href="mailto:info@nguyenarchitecture.com"');
    const phoneReplacements = ['(209) 233-8888', '(714) 707-8889']; let phoneIndex = 0;
    html = html.replace(/<a([^>]*href=["']tel:[^"']+["'][^>]*)>([\s\S]*?)<\/a>/gi, (_match, attrs, body) => { const phone = phoneReplacements[Math.min(phoneIndex, phoneReplacements.length - 1)]; phoneIndex += 1; const nextAttrs = attrs.replace(/href=["']tel:[^"']+["']/i, `href="tel:${phone.replace(/[^+\d]/g, '')}"`); const nextBody = body.replace(/>\s*[+()\d .-]{7,}\s*</g, `>${phone}<`); return `<a${nextAttrs}>${nextBody}</a>`; });
    html = html.replace('</body>', `${CLIENT_PATCH}</body>`);
    return new Response(html, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400' } });
  } catch {
    return new Response('<!doctype html><html><body style="font-family:Arial,sans-serif;padding:40px">Concept 1 is temporarily unavailable. Please refresh in a moment.</body></html>', { status: 502, headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }
}