import { GET as getConcept } from "../arcsphere-imagefix/route"

const TARGET_IMAGE_PATCH = `
<script id="nguyen-custom-home-target-image-patch">
(() => {
  const TARGET_SRC = window.location.origin + '/client-8889/residential/house-2.webp?v=custom-home-exact-target-20260827-2';
  const compact = (value) => (value || '').replace(/\\s+/g, '').trim().toLowerCase();
  let queued = null;

  function isCustomHomeDetail() {
    const text = compact(document.body?.textContent);
    return text.includes(compact('CUSTOM HOME')) && text.includes(compact('Project Details'));
  }

  function findLeafByText(text) {
    const key = compact(text);
    const nodes = [document.body, ...document.body.querySelectorAll('*')];
    return nodes.find((node) => {
      if (compact(node.textContent) !== key) return false;
      return !Array.from(node.children || []).some((child) => compact(child.textContent) === key);
    }) || null;
  }

  function visibleImages() {
    return Array.from(document.images).filter((img) => {
      if (img.hasAttribute('data-nguyen-custom-home-exact-target')) return false;
      const rect = img.getBoundingClientRect();
      if (rect.width < 120 || rect.height < 90) return false;
      const style = window.getComputedStyle(img);
      return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity || 1) !== 0;
    });
  }

  function findTarget() {
    const details = findLeafByText('Project Details');
    if (!details) return null;
    const detailsTop = details.getBoundingClientRect().top;
    const images = visibleImages();
    if (!images.length) return null;

    const hero = images
      .filter((img) => img.getBoundingClientRect().top < detailsTop)
      .sort((a, b) => {
        const ar = a.getBoundingClientRect();
        const br = b.getBoundingClientRect();
        return ar.top - br.top || (br.width * br.height) - (ar.width * ar.height);
      })[0];
    const heroBottom = hero ? hero.getBoundingClientRect().bottom : -Infinity;

    const candidates = images.filter((img) => {
      const rect = img.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      return rect.top > heroBottom - 20 &&
        rect.bottom < detailsTop + 20 &&
        centerX > window.innerWidth * 0.5;
    });

    candidates.sort((a, b) => {
      const ar = a.getBoundingClientRect();
      const br = b.getBoundingClientRect();
      const areaDiff = (br.width * br.height) - (ar.width * ar.height);
      if (Math.abs(areaDiff) > 1000) return areaDiff;
      return br.left - ar.left;
    });
    return candidates[0] || null;
  }

  function forceImage(img) {
    if (!img) return false;
    img.setAttribute('src', TARGET_SRC);
    img.removeAttribute('srcset');
    img.removeAttribute('sizes');
    img.style.setProperty('filter', 'none', 'important');
    img.style.setProperty('opacity', '1', 'important');
    img.style.setProperty('visibility', 'visible', 'important');

    const picture = img.closest('picture');
    picture?.querySelectorAll('source').forEach((source) => {
      source.setAttribute('srcset', TARGET_SRC);
      source.removeAttribute('sizes');
    });

    const parent = img.parentElement;
    if (!parent) return true;
    let overlay = parent.querySelector(':scope > img[data-nguyen-custom-home-exact-target="true"]');
    if (!overlay) {
      overlay = img.cloneNode(false);
      overlay.setAttribute('data-nguyen-custom-home-exact-target', 'true');
      overlay.removeAttribute('srcset');
      overlay.removeAttribute('sizes');
      const computed = window.getComputedStyle(img);
      overlay.style.setProperty('position', 'absolute', 'important');
      overlay.style.setProperty('inset', '0', 'important');
      overlay.style.setProperty('width', '100%', 'important');
      overlay.style.setProperty('height', '100%', 'important');
      overlay.style.setProperty('object-fit', computed.objectFit || 'cover', 'important');
      overlay.style.setProperty('object-position', computed.objectPosition || 'center', 'important');
      overlay.style.setProperty('filter', 'none', 'important');
      overlay.style.setProperty('opacity', '1', 'important');
      overlay.style.setProperty('visibility', 'visible', 'important');
      overlay.style.setProperty('z-index', '999', 'important');
      overlay.style.setProperty('pointer-events', 'none', 'important');
      if (window.getComputedStyle(parent).position === 'static') {
        parent.style.setProperty('position', 'relative', 'important');
      }
      parent.appendChild(overlay);
    }
    overlay.setAttribute('src', TARGET_SRC);
    return true;
  }

  function run() {
    if (!isCustomHomeDetail()) return;
    forceImage(findTarget());
  }

  function queue() {
    clearTimeout(queued);
    queued = setTimeout(run, 80);
  }

  run();
  window.addEventListener('load', run, { once: true });
  [150, 400, 800, 1400, 2500, 4000, 6500].forEach((delay) => setTimeout(run, delay));
  const observer = new MutationObserver(queue);
  observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['src', 'srcset', 'style'] });
  setTimeout(() => { run(); observer.disconnect(); }, 9000);
})();
</script>`

export async function GET() {
  const response = await getConcept()
  if (!response.ok) return response

  const html = (await response.text()).replace('</body>', `${TARGET_IMAGE_PATCH}</body>`)
  const headers = new Headers(response.headers)
  headers.set('Content-Type', 'text/html; charset=utf-8')
  headers.set('Cache-Control', 'no-store')
  return new Response(html, { status: response.status, headers })
}
