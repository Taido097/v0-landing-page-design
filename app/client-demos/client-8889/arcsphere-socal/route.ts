import { GET as getConcept } from "../arcsphere-fixed/route"

const OLD_COPY = 'Based in Orange County, we provide commercial architecture, engineering and permit support from existing-condition survey and business layout through plan check and approval.'
const NEW_COPY = 'Based in Southern California, we provide residential and commercial architecture, engineering, and permit support from concept through approval.'

const SPLIT_TEXT_PATCH = `
<script id="nguyen-socal-split-text-patch">
(() => {
  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
  const compact = (value) => normalize(value).replace(/\\s+/g, '').toLowerCase();
  const sources = new Set([
    compact('Based in Dubai, we design residential and commercial spaces that elevate how people live, work, and interact with their environment.'),
    compact('Based in Dubai, we design residential and commercial spaces that elevate how people live, work, and interact with their environment'),
    compact('Based in Orange County, we provide commercial architecture, engineering and permit support from existing-condition survey and business layout through plan check and approval.'),
    compact('Based in Orange County, we provide commercial architecture, engineering and permit support from existing-condition survey and business layout through plan check and approval.')
  ]);
  const replacement = 'Based in Southern California, we provide residential and commercial architecture, engineering, and permit support from concept through approval.';

  function patchParagraph(p) {
    if (!p) return false;
    const key = compact(p.textContent);
    if (!sources.has(key)) return false;
    if (normalize(p.textContent) === replacement) return true;
    p.style.setProperty('white-space', 'normal', 'important');
    p.style.setProperty('word-break', 'normal', 'important');
    p.style.setProperty('overflow-wrap', 'normal', 'important');
    p.textContent = replacement;
    return true;
  }

  function patchRoot(root) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) {
      patchParagraph(root.parentElement?.closest('p'));
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE) return;
    const el = root;
    if (el.matches('p')) patchParagraph(el);
    el.querySelectorAll('p').forEach(patchParagraph);
  }

  patchRoot(document.body);
  window.addEventListener('load', () => patchRoot(document.body), { once: true });

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'characterData') {
        patchParagraph(mutation.target.parentElement?.closest('p'));
      } else if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(patchRoot);
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  setTimeout(() => { patchRoot(document.body); observer.disconnect(); }, 6000);
})();
</script>`

const BRAND_PATCH = `
<script id="nguyen-socal-brand-patch">
(() => {
  const TARGET_TEXT = 'NGUYEN ARCHITECTURE & ENGINEERING';
  const TARGET_URL = window.location.origin + '/client-demos/client-8889/arcsphere-socal';
  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();

  function patchBrand() {
    if (!document.body) return;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const matches = [];

    while (walker.nextNode()) {
      const node = walker.currentNode;
      const text = normalize(node.nodeValue);
      if (text === 'ArcSphere' || text === 'ArcSphere Studio') matches.push(node);
    }

    matches.forEach((node) => {
      if (normalize(node.nodeValue) !== 'ArcSphere' && normalize(node.nodeValue) !== 'ArcSphere Studio') return;
      node.nodeValue = TARGET_TEXT;

      const anchor = node.parentElement?.closest('a');
      if (anchor && anchor.getAttribute('href') !== TARGET_URL) {
        anchor.setAttribute('href', TARGET_URL);
        anchor.removeAttribute('target');
        anchor.removeAttribute('rel');
      }
    });
  }

  patchBrand();
  window.addEventListener('load', patchBrand, { once: true });
  [250, 750, 1500, 3000].forEach((delay) => setTimeout(patchBrand, delay));
})();
</script>`

const SQUARE_IMAGES_PATCH = `
<script id="nguyen-socal-square-cards">
(() => {
  function squareImages() {
    var imgs = document.querySelectorAll('img');
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      var ir = parseFloat(window.getComputedStyle(img).borderTopLeftRadius) || 0;
      var iw = img.getBoundingClientRect().width || 0;
      if (ir > 0 && ir < iw / 2) img.style.setProperty('border-radius', '0', 'important');
      var el = img.parentElement, depth = 0;
      while (el && el !== document.body && depth < 4) {
        var cs = window.getComputedStyle(el);
        var br = parseFloat(cs.borderTopLeftRadius) || 0;
        var w = el.getBoundingClientRect().width || 0;
        if (br > 0 && br < w / 2) el.style.setProperty('border-radius', '0', 'important');
        el = el.parentElement; depth++;
      }
    }
    return imgs.length > 0;
  }
  squareImages();
  window.addEventListener('load', squareImages, { once: true });
  [400, 1000, 2000, 3500, 5500].forEach(function (t) { setTimeout(squareImages, t); });
})();
</script>`

const SERVICES_ANCHOR_PATCH = `
<script id="nguyen-socal-services-anchor">
(() => {
  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim().toLowerCase();
  function markServices() {
    if (document.getElementById('services')) return true;
    const headings = document.querySelectorAll('h1,h2,h3,h4,p');
    for (const heading of headings) {
      const text = normalize(heading.textContent);
      if (text !== 'our services' && text !== 'services') continue;
      const section = heading.closest('section') || heading.closest('[data-framer-name]') || heading.parentElement;
      if (!section) continue;
      section.id = 'services';
      section.style.scrollMarginTop = '90px';
      return true;
    }
    return false;
  }
  markServices();
  window.addEventListener('load', markServices, { once: true });
  [250, 750, 1500, 3000, 6000].forEach((delay) => setTimeout(markServices, delay));
})();
</script>`

const ENGINEERING_SERVICE_PATCH = `
<script id="nguyen-socal-engineering-service-patch">
(() => {
  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
  const compact = (value) => normalize(value).replace(/\\s+/g, '').toLowerCase();
  const sourceDescription = compact('Optimizing layouts to improve functionality, circulation, and spatial flow.');
  const targetDescription = 'Structural engineering, MEP, Title 24, permitting, and plan-check support coordinated from design through approval.';
  const targetDescriptionKey = compact(targetDescription);
  const titleKeys = new Set([
    compact('Space Planning'),
    compact('Existing-Condition Survey & Business Layout'),
    compact('ENGINEERING')
  ]);
  const targetUrl = window.location.origin + '/client-demos/client-8889/residential/services/engineering-approvals';

  function findEngineeringCard() {
    const existing = document.querySelector('[data-nguyen-engineering-service="true"]');
    if (existing) return existing;

    const candidates = Array.from(document.querySelectorAll('*'));
    for (const candidate of candidates) {
      const key = compact(candidate.textContent);
      if (key !== sourceDescription && key !== targetDescriptionKey) continue;
      let card = candidate;
      for (let depth = 0; card && depth < 10; depth += 1, card = card.parentElement) {
        if (!card.querySelector?.('img')) continue;
        const text = compact(card.textContent);
        if (!text.includes(sourceDescription) && !text.includes(targetDescriptionKey)) continue;
        return card;
      }
    }
    return null;
  }

  function replaceLeafText(card, keys, replacement) {
    const candidates = [card, ...card.querySelectorAll('*')];
    for (const candidate of candidates) {
      const key = compact(candidate.textContent);
      if (!keys.has(key)) continue;
      const hasSameTextChild = Array.from(candidate.children).some((child) => compact(child.textContent) === key);
      if (hasSameTextChild) continue;
      if (normalize(candidate.textContent) !== replacement) candidate.textContent = replacement;
      candidate.style.setProperty('white-space', 'normal', 'important');
      candidate.style.setProperty('word-break', 'normal', 'important');
      candidate.style.setProperty('overflow-wrap', 'normal', 'important');
      return true;
    }
    return false;
  }

  function patchEngineering() {
    const card = findEngineeringCard();
    if (!card) return false;

    replaceLeafText(card, new Set([sourceDescription, targetDescriptionKey]), targetDescription);
    replaceLeafText(card, titleKeys, 'ENGINEERING');

    card.setAttribute('data-nguyen-engineering-service', 'true');
    card.setAttribute('data-nguyen-link', targetUrl);
    card.style.removeProperty('display');
    card.style.setProperty('cursor', 'pointer', 'important');
    return true;
  }

  patchEngineering();
  window.addEventListener('load', patchEngineering, { once: true });
  [250, 750, 1500, 3000, 6200].forEach((delay) => setTimeout(patchEngineering, delay));

  const observer = new MutationObserver(() => patchEngineering());
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  setTimeout(() => observer.disconnect(), 7000);
})();
</script>`

export async function GET() {
  const response = await getConcept()
  if (!response.ok) return response

  let html = await response.text()
  html = html.split(OLD_COPY).join(NEW_COPY)
  html = html.replace('</body>', `${SPLIT_TEXT_PATCH}${BRAND_PATCH}${SQUARE_IMAGES_PATCH}${SERVICES_ANCHOR_PATCH}${ENGINEERING_SERVICE_PATCH}</body>`)

  const headers = new Headers(response.headers)
  headers.set('Content-Type', 'text/html; charset=utf-8')
  headers.set('Cache-Control', 'no-store')

  return new Response(html, { status: response.status, headers })
}
