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
  const TARGET_URL = 'https://nguyen-studio.framer.website/';
  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();

  function patchBrand(root = document.body) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const matches = [];

    while (walker.nextNode()) {
      const node = walker.currentNode;
      const text = normalize(node.nodeValue);
      if (text === 'ArcSphere' || text === 'ArcSphere Studio' || text === TARGET_TEXT) {
        matches.push(node);
      }
    }

    matches.forEach((node) => {
      node.nodeValue = TARGET_TEXT;
      const element = node.parentElement;
      if (!element) return;

      const anchor = element.closest('a');
      if (anchor) {
        anchor.setAttribute('href', TARGET_URL);
        anchor.removeAttribute('target');
        anchor.removeAttribute('rel');
        return;
      }

      const link = document.createElement('a');
      link.href = TARGET_URL;
      link.style.color = 'inherit';
      link.style.textDecoration = 'none';
      element.parentNode?.insertBefore(link, element);
      link.appendChild(element);
    });
  }

  patchBrand();
  window.addEventListener('load', () => patchBrand(), { once: true });

  const observer = new MutationObserver(() => patchBrand());
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  setTimeout(() => { patchBrand(); observer.disconnect(); }, 6000);
})();
</script>`

export async function GET() {
  const response = await getConcept()
  if (!response.ok) return response

  let html = await response.text()
  html = html.split(OLD_COPY).join(NEW_COPY)
  html = html.replace('</body>', `${SPLIT_TEXT_PATCH}${BRAND_PATCH}</body>`)

  const headers = new Headers(response.headers)
  headers.set('Content-Type', 'text/html; charset=utf-8')
  headers.set('Cache-Control', 'no-store')

  return new Response(html, { status: response.status, headers })
}
