import { GET as getConcept } from "../arcsphere-socal/route"

const DETAIL_IMAGE_PATCH = `
<style id="nguyen-custom-home-approved-reference-style">
  #nguyen-custom-home-reference-layout {
    width: 100% !important;
    max-width: none !important;
    display: grid !important;
    grid-template-columns: repeat(12, minmax(0, 1fr)) !important;
    grid-template-rows: auto auto !important;
    column-gap: clamp(14px, 1.5vw, 24px) !important;
    row-gap: clamp(14px, 1.5vw, 24px) !important;
    margin: clamp(24px, 3vw, 44px) 0 clamp(36px, 4vw, 64px) !important;
    padding: 0 !important;
    box-sizing: border-box !important;
    align-items: start !important;
  }

  #nguyen-custom-home-reference-layout .nguyen-reference-frame {
    width: 100% !important;
    min-width: 0 !important;
    overflow: hidden !important;
    border-radius: 2px !important;
    background: transparent !important;
  }

  #nguyen-custom-home-reference-layout .nguyen-reference-frame:nth-child(1) {
    grid-column: 1 / 8 !important;
    grid-row: 1 !important;
    aspect-ratio: 16 / 10 !important;
  }

  #nguyen-custom-home-reference-layout .nguyen-reference-frame:nth-child(2) {
    grid-column: 8 / 13 !important;
    grid-row: 1 !important;
    aspect-ratio: 4 / 3 !important;
  }

  #nguyen-custom-home-reference-layout .nguyen-reference-frame:nth-child(3) {
    grid-column: 1 / 6 !important;
    grid-row: 2 !important;
    aspect-ratio: 16 / 10 !important;
  }

  #nguyen-custom-home-reference-layout .nguyen-reference-frame:nth-child(4) {
    grid-column: 6 / 10 !important;
    grid-row: 2 !important;
    aspect-ratio: 4 / 3 !important;
  }

  #nguyen-custom-home-reference-layout .nguyen-reference-frame img {
    width: 100% !important;
    height: 100% !important;
    max-width: none !important;
    display: block !important;
    object-fit: cover !important;
    object-position: center !important;
    image-rendering: auto !important;
    transform: translateZ(0) !important;
  }

  #nguyen-custom-home-reference-layout [data-nguyen-project-details="1"] {
    grid-column: 10 / 13 !important;
    grid-row: 2 !important;
    width: 100% !important;
    max-width: none !important;
    min-width: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    align-self: start !important;
  }

  [data-nguyen-original-image-frame="1"] {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
    min-height: 0 !important;
    margin: 0 !important;
    padding: 0 !important;
    overflow: hidden !important;
  }

  @media (max-width: 900px) {
    #nguyen-custom-home-reference-layout {
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
      gap: 14px !important;
      margin: 24px 0 40px !important;
    }

    #nguyen-custom-home-reference-layout .nguyen-reference-frame:nth-child(1),
    #nguyen-custom-home-reference-layout .nguyen-reference-frame:nth-child(2),
    #nguyen-custom-home-reference-layout .nguyen-reference-frame:nth-child(3),
    #nguyen-custom-home-reference-layout .nguyen-reference-frame:nth-child(4) {
      grid-column: auto !important;
      grid-row: auto !important;
      aspect-ratio: 4 / 3 !important;
    }

    #nguyen-custom-home-reference-layout [data-nguyen-project-details="1"] {
      grid-column: 1 / -1 !important;
      grid-row: auto !important;
      padding-top: 10px !important;
    }
  }

  @media (max-width: 620px) {
    #nguyen-custom-home-reference-layout {
      grid-template-columns: 1fr !important;
    }
  }
</style>
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
          context.imageSmoothingEnabled = true;
          context.imageSmoothingQuality = 'high';
          context.drawImage(source, index * width, 0, width, height, 0, 0, width, height);
          return canvas.toDataURL('image/webp', 0.96);
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
    img.dataset.nguyenCustomHomeSlot = String(slot);
    img.setAttribute('src', src);
    img.removeAttribute('srcset');
    img.removeAttribute('sizes');
    img.setAttribute('loading', 'eager');
    img.setAttribute('decoding', 'async');
    const picture = img.closest('picture');
    if (picture) picture.querySelectorAll('source').forEach((source) => {
      source.setAttribute('srcset', src);
      source.removeAttribute('sizes');
    });
  }

  function visibleProjectImages() {
    return Array.from(document.images).filter((img) => {
      if (img.closest('#nguyen-custom-home-reference-layout')) return false;
      if (img.dataset.nguyenCustomHomeSlot) return false;
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

  function findImageFrame(img) {
    let node = img.closest('picture') || img;
    let best = node;
    for (let depth = 0; node && node.parentElement && depth < 7; depth += 1) {
      const parent = node.parentElement;
      if (parent === document.body || parent === document.documentElement) break;
      const text = compact(parent.textContent);
      const imageCount = parent.querySelectorAll('img').length;
      const rect = parent.getBoundingClientRect();
      if (text.length > 0 || imageCount !== 1) break;
      if (rect.width > window.innerWidth * 0.72) break;
      best = parent;
      node = parent;
    }
    return best;
  }

  function findProjectDetailsBlock() {
    const candidates = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,div,span'));
    const exact = candidates.find((element) => compact(element.textContent) === compact('Project Details'));
    if (!exact) return null;

    let best = exact;
    let node = exact;
    for (let depth = 0; node && node.parentElement && depth < 6; depth += 1) {
      const parent = node.parentElement;
      if (!parent || parent === document.body || parent === document.documentElement) break;
      const text = compact(parent.textContent);
      if (!text.includes(compact('Project Details'))) break;
      if (parent.querySelectorAll('img').length > 0) break;
      if (text.length > 1800) break;
      best = parent;
      node = parent;
    }
    return best;
  }

  function buildReferenceLayout(targets, replacements) {
    const existing = document.getElementById('nguyen-custom-home-reference-layout');
    if (existing && existing.isConnected) return true;

    const detailsBlock = findProjectDetailsBlock();
    if (!detailsBlock || !detailsBlock.parentElement) return false;

    const layout = document.createElement('div');
    layout.id = 'nguyen-custom-home-reference-layout';
    layout.setAttribute('data-nguyen-approved-reference-layout', '1');
    layout.setAttribute('aria-label', 'Custom Home project gallery and details');

    targets.forEach((original, index) => {
      const frame = document.createElement('div');
      frame.className = 'nguyen-reference-frame';

      const image = document.createElement('img');
      image.src = replacements[index];
      image.alt = original.getAttribute('alt') || (index === 1 ? 'Custom Home interior' : 'Custom Home exterior');
      image.loading = 'eager';
      image.decoding = 'async';
      image.setAttribute('data-nguyen-gallery-slot', String(index + 1));

      frame.appendChild(image);
      layout.appendChild(frame);

      const originalFrame = findImageFrame(original);
      if (originalFrame) originalFrame.setAttribute('data-nguyen-original-image-frame', '1');
    });

    const parent = detailsBlock.parentElement;
    parent.insertBefore(layout, detailsBlock);
    detailsBlock.setAttribute('data-nguyen-project-details', '1');
    layout.appendChild(detailsBlock);
    return true;
  }

  async function patchImages() {
    if (applying || !isCustomHomeDetail()) return;
    if (document.getElementById('nguyen-custom-home-reference-layout')) return;
    applying = true;
    try {
      const images = visibleProjectImages();
      if (images.length < 5) return;
      const targets = images.slice(1, 5);
      const crops = await loadSpriteCrops();
      const replacements = [house1, house2, crops[0], crops[1]];
      targets.forEach((img, index) => setImage(img, replacements[index], index + 1));
      buildReferenceLayout(targets, replacements);
    } catch (error) {
      console.warn('Custom Home approved reference patch:', error);
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
    if (document.getElementById('nguyen-custom-home-reference-layout')) return;
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