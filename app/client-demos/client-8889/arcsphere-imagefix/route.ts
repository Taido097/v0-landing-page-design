import { GET as getConcept } from "../arcsphere-fixed/route"

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
    const hasProjectTitle = body.includes(compact('CUSTOM HOME')) || body.includes(compact('SERENITY VILLA'));
    return body.includes(compact('Project Details')) && hasProjectTitle;
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

  async function patchImages() {
    if (applying || !isCustomHomeDetail()) return;
    applying = true;
    try {
      const images = visibleProjectImages();
      if (images.length < 6) return;
      const crops = await loadSpriteCrops();
      const replacements = [house1, house2, crops[0], crops[1]];
      images.slice(1, 5).forEach((img, index) => setImage(img, replacements[index], index + 1));
    } catch (error) {
      console.warn('Custom Home image patch:', error);
    } finally {
      applying = false;
    }
  }

  function queuePatch() {
    clearTimeout(queued);
    queued = setTimeout(patchImages, 120);
  }

  patchImages();
  window.addEventListener('load', patchImages, { once: true });
  [400, 1200, 2600, 4800].forEach((delay) => setTimeout(patchImages, delay));
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
  html = html.replace('</body>', `${DETAIL_IMAGE_PATCH}</body>`)

  const headers = new Headers(response.headers)
  headers.set('Content-Type', 'text/html; charset=utf-8')
  headers.set('Cache-Control', 'no-store')

  return new Response(html, { status: response.status, headers })
}
