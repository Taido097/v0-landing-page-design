import { GET as getConcept } from "../arcsphere/route"

const RESIDENTIAL_PATCH = `
<script id="nguyen-residential-page-patch">
(() => {
  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
  const compact = (value) => normalize(value).replace(/\\s+/g, '').toLowerCase();
  const imageOne = window.location.origin + '/client-8889/residential/house-1.webp';
  const imageTwo = window.location.origin + '/client-8889/residential/house-2.webp';

  const exactText = new Map([
    [compact('Commercial Architecture — Engineering & Permit'), 'RESIDENTIAL ARCHITECTURE — ENGINEERING & PERMIT'],
    [compact('Based in Orange County, we provide commercial architecture, engineering and permit support from existing-condition survey and business layout through plan check and approval.'), 'Residential architecture, engineering and permitting for custom homes, additions, major remodels, ADUs and multifamily projects throughout Southern California.'],
    [compact('Based in Southern California, we provide residential and commercial architecture, engineering, and permit support from concept through approval.'), 'Residential architecture, engineering and permitting for custom homes, additions, major remodels, ADUs and multifamily projects throughout Southern California.'],
    [compact('A SELECTION OF OUR RECENT RESIDENTIAL, COMMERCIAL & DEVELOPMENT PROJECTS.'), 'A SELECTION OF OUR RESIDENTIAL DESIGN & DEVELOPMENT WORK.'],
    [compact('ARCHITECTURE, ENGINEERING & PERMITTING FOR RESIDENTIAL AND COMMERCIAL PROJECTS.'), 'RESIDENTIAL ARCHITECTURE, ENGINEERING & PERMITTING FROM CONCEPT THROUGH APPROVAL.']
  ]);

  const serviceSpecs = [
    {
      source: 'Custom homes, additions, remodels, and multifamily residential design with coordinated engineering and permitting.',
      titleSources: ['RESIDENTIAL'],
      title: 'CUSTOM HOMES',
      description: 'Custom residences designed around your site, lifestyle and vision, with coordinated engineering and permit-ready documentation.'
    },
    {
      source: 'Architecture and engineering for offices, retail, restaurants, tenant improvements, and other commercial projects.',
      titleSources: ['COMMERCIAL'],
      title: 'ADDITIONS & MAJOR REMODELS',
      description: 'Thoughtful additions and major remodels that improve function, expand living space and add long-term value.'
    },
    {
      source: 'ADU design, engineering, Title 24, permit documentation, and city coordination from concept through approval.',
      titleSources: ['ADU'],
      title: 'ADUs',
      description: 'Detached, attached and garage-conversion ADUs with architecture, structural engineering, Title 24 and permit coordination.'
    },
    {
      source: 'Site planning, entitlement support, grading and utility coordination, and development documentation for residential and commercial sites.',
      titleSources: ['LAND DEVELOPMENT'],
      title: 'ENGINEERING & PERMITTING',
      description: 'Structural, MEP, Title 24, code compliance, permit submittal and plan-check support through approval.'
    }
  ];

  const projectSpecs = [
    {
      keys: ['OFFICE BUILD-OUT', 'IRVINE, 2026'],
      replacements: [
        ['OFFICE BUILD-OUT', 'CUSTOM HOME'],
        ['COMMERCIAL ARCHITECTURE', 'RESIDENTIAL ARCHITECTURE'],
        ['IRVINE, 2026', 'SOUTHERN CALIFORNIA, 2026']
      ],
      image: imageOne
    },
    {
      keys: ['CUSTOM HOME', 'LOS ANGELES, 2025'],
      replacements: [
        ['CUSTOM HOME', 'LUXURY ESTATE'],
        ['RESIDENTIAL ARCHITECTURE', 'RESIDENTIAL ARCHITECTURE'],
        ['LOS ANGELES, 2025', 'SOUTHERN CALIFORNIA, 2026']
      ],
      image: imageTwo
    },
    {
      keys: ['COMMERCIAL BUILDING'],
      replacements: [
        ['COMMERCIAL BUILDING', 'CONTEMPORARY HOME'],
        ['COMMERCIAL ARCHITECTURE', 'RESIDENTIAL ARCHITECTURE'],
        ['LONDON, 2025', 'SOUTHERN CALIFORNIA, 2026']
      ],
      image: imageOne
    }
  ];

  function replaceLeaf(node, sources, replacement) {
    const sourceKeys = new Set(sources.map(compact));
    const candidates = [node, ...node.querySelectorAll('*')];
    for (const candidate of candidates) {
      const key = compact(candidate.textContent);
      if (!sourceKeys.has(key)) continue;
      const sameChild = Array.from(candidate.children).some((child) => compact(child.textContent) === key);
      if (sameChild) continue;
      if (normalize(candidate.textContent) !== replacement) candidate.textContent = replacement;
      candidate.style.setProperty('white-space', 'normal', 'important');
      candidate.style.setProperty('word-break', 'normal', 'important');
      candidate.style.setProperty('overflow-wrap', 'normal', 'important');
      return true;
    }
    return false;
  }

  function patchExactText(root) {
    if (!root || root.nodeType !== Node.ELEMENT_NODE) return;
    const candidates = [root, ...root.querySelectorAll('*')];
    for (const candidate of candidates) {
      const key = compact(candidate.textContent);
      const replacement = exactText.get(key);
      if (!replacement) continue;
      const sameChild = Array.from(candidate.children).some((child) => compact(child.textContent) === key);
      if (sameChild) continue;
      if (normalize(candidate.textContent) !== replacement) candidate.textContent = replacement;
      candidate.style.setProperty('white-space', 'normal', 'important');
      candidate.style.setProperty('word-break', 'normal', 'important');
      candidate.style.setProperty('overflow-wrap', 'normal', 'important');
    }
  }

  function setImage(img, src) {
    if (!img) return;
    if (img.getAttribute('src') !== src) img.setAttribute('src', src);
    img.removeAttribute('srcset');
    img.removeAttribute('sizes');
    img.style.setProperty('filter', 'none', 'important');
    img.style.setProperty('opacity', '1', 'important');
    img.style.setProperty('visibility', 'visible', 'important');
    const picture = img.closest('picture');
    if (picture) picture.querySelectorAll('source').forEach((source) => {
      source.setAttribute('srcset', src);
      source.removeAttribute('sizes');
    });
  }

  function findCardByKeys(keys) {
    const wanted = keys.map(compact);
    const all = Array.from(document.querySelectorAll('*'));
    for (let i = all.length - 1; i >= 0; i -= 1) {
      const candidate = all[i];
      const text = compact(candidate.textContent);
      if (!wanted.every((key) => text.includes(key))) continue;
      if (!candidate.querySelector('img')) continue;
      return candidate;
    }
    return null;
  }

  function patchProjects() {
    projectSpecs.forEach((spec) => {
      const card = findCardByKeys(spec.keys);
      if (!card) return;
      spec.replacements.forEach(([from, to]) => replaceLeaf(card, [from, to], to));
      setImage(card.querySelector('img'), spec.image);
    });
  }

  function findServiceCard(description) {
    const target = compact(description);
    for (const candidate of document.querySelectorAll('*')) {
      if (compact(candidate.textContent) !== target) continue;
      let card = candidate;
      for (let depth = 0; card && depth < 8; depth += 1, card = card.parentElement) {
        if (!card.querySelector?.('img')) continue;
        if (compact(card.textContent).includes(target)) return card;
      }
    }
    return null;
  }

  function patchServices() {
    serviceSpecs.forEach((spec) => {
      const card = findServiceCard(spec.source);
      if (!card) return;
      replaceLeaf(card, spec.titleSources.concat([spec.title]), spec.title);
      replaceLeaf(card, [spec.source, spec.description], spec.description);
    });
  }

  function patchHeroImage() {
    const projectImages = new Set(projectSpecs.map((spec) => findCardByKeys(spec.keys)?.querySelector('img')).filter(Boolean));
    const candidates = Array.from(document.images)
      .filter((img) => !projectImages.has(img) && img.clientWidth > 400 && img.clientHeight > 250)
      .sort((a, b) => (b.clientWidth * b.clientHeight) - (a.clientWidth * a.clientHeight));
    if (candidates[0]) setImage(candidates[0], imageTwo);
  }

  function patchAll() {
    patchExactText(document.body);
    patchProjects();
    patchServices();
    patchHeroImage();
  }

  patchAll();
  window.addEventListener('load', patchAll, { once: true });
  [500, 1500, 3200, 6500].forEach((delay) => setTimeout(patchAll, delay));

  const observer = new MutationObserver((mutations) => {
    let relevant = false;
    for (const mutation of mutations) {
      if (mutation.type === 'characterData' || mutation.addedNodes.length) { relevant = true; break; }
    }
    if (relevant) patchAll();
  });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  setTimeout(() => observer.disconnect(), 7200);
})();
</script>`

export async function GET() {
  const response = await getConcept()
  if (!response.ok) return response

  let html = await response.text()
  html = html.replace('</body>', `${RESIDENTIAL_PATCH}</body>`)

  const headers = new Headers(response.headers)
  headers.set('Content-Type', 'text/html; charset=utf-8')
  headers.set('Cache-Control', 'no-store')

  return new Response(html, { status: response.status, headers })
}
