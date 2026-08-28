import { GET as getConcept } from "../arcsphere-fixed/route"

const OLD_COPY = 'Based in Orange County, we provide commercial architecture, engineering and permit support from existing-condition survey and business layout through plan check and approval.'
const NEW_COPY = 'Based in Southern California, we provide residential and commercial architecture, engineering, and permit support from concept through approval.'

const SPLIT_TEXT_PATCH = `
<script id="nguyen-socal-split-text-patch">
(() => {
  const normalize = (value) => (value || '').replace(/\s+/g, ' ').trim();
  const compact = (value) => normalize(value).replace(/\s+/g, '').toLowerCase();
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
  const TARGET_URL = 'https://nguyen-studio.framer.website/';
  const normalize = (value) => (value || '').replace(/\s+/g, ' ').trim();

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

const TARGET_IMAGE_PATCH = `
<script id="nguyen-custom-home-target-image-patch-live-v8">
(() => {
  if (window.matchMedia('(max-width: 767px)').matches) return;

  const TARGET_SRC = window.location.origin + '/client-8889/residential/house-2-custom-4k.webp?v=hq-20260828';
  const compact = (value) => (value || '').replace(/\s+/g, '').trim().toLowerCase();
  const WRONG_WIDTH = 1377;
  const WRONG_HEIGHT = 768;

  function isCustomHomeDetail() {
    const text = compact(document.body?.textContent);
    return text.includes(compact('CUSTOM HOME')) && text.includes(compact('Project Details'));
  }

  function isExactWrongImage(img) {
    return img instanceof HTMLImageElement &&
      img.naturalWidth === WRONG_WIDTH &&
      img.naturalHeight === WRONG_HEIGHT;
  }

  function replaceImage(img) {
    if (!img || img.dataset.nguyenCustomHomeExactReplacement === 'true') return false;

    img.dataset.nguyenCustomHomeExactReplacement = 'true';
    img.setAttribute('src', TARGET_SRC);
    img.removeAttribute('srcset');
    img.removeAttribute('sizes');
    img.style.setProperty('filter', 'none', 'important');
    img.style.setProperty('opacity', '1', 'important');
    img.style.setProperty('visibility', 'visible', 'important');

    const picture = img.closest('picture');
    if (picture) {
      picture.querySelectorAll('source').forEach((source) => {
        source.setAttribute('srcset', TARGET_SRC);
        source.removeAttribute('sizes');
      });
    }

    const parent = img.parentElement;
    if (!parent) return true;

    if (window.getComputedStyle(parent).position === 'static') {
      parent.style.setProperty('position', 'relative', 'important');
    }
    parent.style.setProperty('overflow', 'hidden', 'important');

    let overlay = parent.querySelector(':scope > img[data-nguyen-custom-home-exact-overlay="true"]');
    if (!overlay) {
      overlay = img.cloneNode(false);
      overlay.setAttribute('data-nguyen-custom-home-exact-overlay', 'true');
      overlay.removeAttribute('srcset');
      overlay.removeAttribute('sizes');
      overlay.setAttribute('src', TARGET_SRC);
      const computed = window.getComputedStyle(img);
      overlay.style.setProperty('position', 'absolute', 'important');
      overlay.style.setProperty('inset', '0', 'important');
      overlay.style.setProperty('width', '100%', 'important');
      overlay.style.setProperty('height', '100%', 'important');
      overlay.style.setProperty('object-fit', computed.objectFit || 'cover', 'important');
      overlay.style.setProperty('object-position', computed.objectPosition || 'center', 'important');
      overlay.style.setProperty('display', 'block', 'important');
      overlay.style.setProperty('filter', 'none', 'important');
      overlay.style.setProperty('opacity', '1', 'important');
      overlay.style.setProperty('visibility', 'visible', 'important');
      overlay.style.setProperty('z-index', '2147483646', 'important');
      overlay.style.setProperty('pointer-events', 'none', 'important');
      parent.appendChild(overlay);
    }

    return true;
  }

  function inspectImage(img) {
    if (!isCustomHomeDetail()) return;
    if (isExactWrongImage(img)) replaceImage(img);
  }

  function scan() {
    if (!isCustomHomeDetail()) return;
    Array.from(document.images).forEach((img) => {
      if (img.complete) inspectImage(img);
      else img.addEventListener('load', () => inspectImage(img), { once: true });
    });
  }

  scan();
  window.addEventListener('load', scan, { once: true });
  [250, 700, 1500, 3000, 5000].forEach((delay) => setTimeout(scan, delay));

  const observer = new MutationObserver((mutations) => {
    if (!isCustomHomeDetail()) return;
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (!(node instanceof Element)) return;
        if (node instanceof HTMLImageElement) {
          if (node.complete) inspectImage(node);
          else node.addEventListener('load', () => inspectImage(node), { once: true });
        }
        node.querySelectorAll?.('img').forEach((img) => {
          if (img.complete) inspectImage(img);
          else img.addEventListener('load', () => inspectImage(img), { once: true });
        });
      });
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
  setTimeout(() => { scan(); observer.disconnect(); }, 7000);
})();
</script>`

const RESIDENTIAL_NAV_PATCH = `
<script id="nguyen-concept1-residential-nav-patch">
(() => {
  const TARGET_LABEL = 'RESIDENTIAL';
  const TARGET_DESCRIPTION = 'Custom homes, additions, remodels, and multifamily residential design with coordinated engineering and permitting.';
  const TARGET_HREF = '/client-demos/client-8889/arcsphere/residential';
  const normalize = (value) => (value || '').replace(/\s+/g, ' ').trim();
  const normalizedLabel = TARGET_LABEL.toUpperCase();
  const normalizedDescription = normalize(TARGET_DESCRIPTION).toUpperCase();

  function navigate(event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    window.location.assign(TARGET_HREF);
  }

  function patchResidentialServiceRow() {
    if (!document.body) return false;
    const elements = Array.from(document.body.querySelectorAll('div, section, article, li, a'));
    const matches = elements.filter((element) => {
      const text = normalize(element.textContent).toUpperCase();
      return text.includes(normalizedLabel) && text.includes(normalizedDescription);
    });
    if (!matches.length) return false;

    matches.sort((a, b) => a.textContent.length - b.textContent.length);
    const row = matches[0];
    if (!row || row.dataset.nguyenResidentialServiceRow === 'true') return true;

    row.dataset.nguyenResidentialServiceRow = 'true';
    row.style.setProperty('cursor', 'pointer', 'important');
    row.setAttribute('role', row.getAttribute('role') || 'link');
    if (!row.hasAttribute('tabindex')) row.setAttribute('tabindex', '0');
    row.setAttribute('aria-label', 'Open Residential services');

    row.querySelectorAll('a').forEach((anchor) => {
      anchor.setAttribute('href', TARGET_HREF);
      anchor.removeAttribute('target');
      anchor.removeAttribute('rel');
      anchor.dataset.nguyenResidentialStandalone = 'true';
    });

    row.addEventListener('click', navigate, true);
    row.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') navigate(event);
    });
    return true;
  }

  function patchResidentialTextLinks() {
    if (!document.body) return false;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const matches = [];

    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (normalize(node.nodeValue).toUpperCase() === normalizedLabel) matches.push(node);
    }

    let patched = false;
    for (const node of matches) {
      const anchor = node.parentElement?.closest('a');
      if (!anchor) continue;
      anchor.setAttribute('href', TARGET_HREF);
      anchor.removeAttribute('target');
      anchor.removeAttribute('rel');
      anchor.dataset.nguyenResidentialStandalone = 'true';
      patched = true;
    }
    return patched;
  }

  function patchResidentialNavigation() {
    const serviceRowPatched = patchResidentialServiceRow();
    const textLinksPatched = patchResidentialTextLinks();
    return serviceRowPatched || textLinksPatched;
  }

  patchResidentialNavigation();
  window.addEventListener('load', patchResidentialNavigation, { once: true });
  [250, 750, 1500, 3000].forEach((delay) => setTimeout(patchResidentialNavigation, delay));

  const observer = new MutationObserver(() => patchResidentialNavigation());
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  setTimeout(() => observer.disconnect(), 6000);
})();
</script>`

export async function GET() {
  const response = await getConcept()
  if (!response.ok) return response

  let html = await response.text()
  html = html.split(OLD_COPY).join(NEW_COPY)
  html = html.replace('</body>', `${SPLIT_TEXT_PATCH}${BRAND_PATCH}${TARGET_IMAGE_PATCH}${RESIDENTIAL_NAV_PATCH}</body>`)

  const headers = new Headers(response.headers)
  headers.set('Content-Type', 'text/html; charset=utf-8')
  headers.set('Cache-Control', 'no-store')

  return new Response(html, { status: response.status, headers })
}
