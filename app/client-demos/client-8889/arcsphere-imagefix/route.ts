import { GET as getConcept } from "../arcsphere-fixed/route"

const BRAND_LINK_PATCH = `
<script id="nguyen-custom-home-brand-link-patch">
(() => {
  const TARGET_TEXT = 'NGUYEN ARCHITECTURE & ENGINEERING';
  const TARGET_URL = 'https://nguyen-studio.framer.website/';
  const normalize = (value) => (value || '').replace(/\s+/g, ' ').trim();

  function patchBrand(root = document.body) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const matches = [];
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const text = normalize(node.nodeValue);
      if (text === 'ArcSphere Studio' || text === TARGET_TEXT) matches.push(node);
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
  setTimeout(() => observer.disconnect(), 6000);
})();
</script>`

const DETAIL_IMAGE_PATCH = `
<script id="nguyen-custom-home-detail-image-patch">
(() => {
  const compact = (value) => (value || '').replace(/\\s+/g, '').trim().toLowerCase();
  const house1 = window.location.origin + '/client-8889/residential/house-1.webp';
  const house2 = window.location.origin + '/client-8889/residential/house-2.webp';
  const spriteChunks = [0, 1, 2, 3].map((index) => window.location.origin + '/client-8889/residential/sprite-' + index + '.txt');
  let cropPromise = null;
  let applying = false;
  let queued = null;

  function isCustomHomeDetail() {
    const body = compact(document.body && document.body.textContent);
    return body.includes(compact('Project Details')) && body.includes(compact('CUSTOM HOME'));
  }

  function loadSpriteCrops() {
    if (cropPromise) return cropPromise;
    cropPromise = Promise.all(spriteChunks.map((url) => fetch(url, { cache: 'force-cache' }).then((response) => {
      if (!response.ok) throw new Error('Residential image asset failed to load');
      return response.text();
    }))).then((parts) => new Promise((resolve, reject) => {
      const source = new Image();
      source.onload = () => {
        const width = Math.floor(source.naturalWidth / 3);
        const height = source.naturalHeight;
        const crops = [0, 1, 2].map((index) => {
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const context = canvas.getContext('2d');
          if (!context) return '';
          context.drawImage(source, index * width, 0, width, height, 0, 0, width, height);
          return canvas.toDataURL('image/webp', 0.94);
        });
        resolve(crops);
      };
      source.onerror = reject;
      source.src = 'data:image/webp;base64,' + parts.join('');
    }));
    return cropPromise;
  }

  function setImage(img, src, slot) {
    if (!img || !src) return;
    if (img.dataset.nguyenCustomHomeSlot === String(slot) && img.getAttribute('src') === src) return;
    img.dataset.nguyenCustomHomeSlot = String(slot);
    img.setAttribute('src', src);
    img.removeAttribute('srcset');
    img.removeAttribute('sizes');
    const picture = img.closest('picture');
    if (picture) picture.querySelectorAll('source').forEach((source) => {
      source.setAttribute('srcset', src);
      source.removeAttribute('sizes');
    });
  }

  function visibleProjectImages() {
    return Array.from(document.images).filter((img) => {
      const rect = img.getBoundingClientRect();
      if (rect.width < 140 || rect.height < 100) return false;
      const style = window.getComputedStyle(img);
      return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity || 1) !== 0;
    }).sort((a, b) => {
      const ar = a.getBoundingClientRect();
      const br = b.getBoundingClientRect();
      if (Math.abs(ar.top - br.top) > 8) return ar.top - br.top;
      return ar.left - br.left;
    });
  }

  function findLivingRoomImage() {
    const images = visibleProjectImages();
    if (images.length < 2) return null;

    const heroRect = images[0].getBoundingClientRect();
    const candidates = images.slice(1).filter((img) => {
      const rect = img.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      return rect.top >= heroRect.bottom - 40 &&
        centerX > window.innerWidth * 0.52 &&
        rect.width >= Math.max(280, window.innerWidth * 0.28) &&
        rect.height >= 220;
    });

    candidates.sort((a, b) => {
      const ar = a.getBoundingClientRect();
      const br = b.getBoundingClientRect();
      if (Math.abs(ar.top - br.top) > 8) return ar.top - br.top;
      return (br.width * br.height) - (ar.width * ar.height);
    });

    return candidates[0] || null;
  }

  function patchLivingRoomImage() {
    if (!isCustomHomeDetail()) return;
    const target = findLivingRoomImage();
    if (target) setImage(target, house2, 'living-room');
  }

  async function patchImages() {
    if (applying || !isCustomHomeDetail()) return;
    applying = true;
    try {
      const images = visibleProjectImages();
      if (images.length < 5) return;
      const crops = await loadSpriteCrops();
      const replacements = [house1, house2, crops[0], crops[1]];
      images.slice(1, 5).forEach((img, index) => setImage(img, replacements[index], index + 1));
      patchLivingRoomImage();
    } catch (error) {
      console.warn('Custom Home image patch:', error);
    } finally {
      applying = false;
    }
  }

  function runPatch() {
    patchImages();
    patchLivingRoomImage();
  }

  function queuePatch() {
    clearTimeout(queued);
    queued = setTimeout(runPatch, 120);
  }

  runPatch();
  window.addEventListener('load', runPatch, { once: true });
  [400, 1200, 2600, 4800].forEach((delay) => setTimeout(runPatch, delay));
  const observer = new MutationObserver((mutations) => {
    if (mutations.some((mutation) => mutation.type === 'characterData' || mutation.addedNodes.length)) queuePatch();
  });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
})();
</script>`

export async function GET() {
  const response = await getConcept()
  if (!response.ok) return response

  let html = await response.text()
  html = html.replace('</body>', `${BRAND_LINK_PATCH}${DETAIL_IMAGE_PATCH}</body>`)

  const headers = new Headers(response.headers)
  headers.set('Content-Type', 'text/html; charset=utf-8')
  headers.set('Cache-Control', 'no-store')

  return new Response(html, { status: response.status, headers })
}
