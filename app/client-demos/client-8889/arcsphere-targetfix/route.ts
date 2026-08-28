import { GET as getConcept } from "../arcsphere-imagefix/route"

const TARGET_IMAGE_PATCH = `
<script id="nguyen-custom-home-target-image-patch-v3">
(() => {
  // This exact-target patch is desktop-only. The mobile layout stacks the gallery,
  // so the desktop geometry scan is unnecessary and was expensive enough to stall
  // mobile Safari when combined with Framer DOM mutations.
  if (window.matchMedia('(max-width: 767px)').matches) return;

  const TARGET_SRC = window.location.origin + '/client-8889/residential/house-2.webp?v=custom-home-text-anchor-20260827-4';
  const compact = (value) => (value || '').replace(/\\s+/g, '').trim().toLowerCase();
  let queued = null;

  function isCustomHomeDetail() {
    const text = compact(document.body?.textContent);
    return text.includes(compact('CUSTOM HOME')) && text.includes(compact('Project Details'));
  }

  function findLeafByText(text) {
    const key = compact(text);
    return Array.from(document.body.querySelectorAll('*')).find((node) => {
      if (compact(node.textContent) !== key) return false;
      return !Array.from(node.children || []).some((child) => compact(child.textContent) === key);
    }) || null;
  }

  function isVisibleBox(element) {
    const rect = element.getBoundingClientRect();
    if (rect.width < 180 || rect.height < 140) return false;
    const style = window.getComputedStyle(element);
    return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity || 1) !== 0;
  }

  function mediaCandidates() {
    const nodes = Array.from(document.querySelectorAll('img, picture, div, figure'));
    return nodes.filter((node) => {
      if (node.hasAttribute('data-nguyen-custom-home-target-box')) return false;
      if (node.closest('[data-nguyen-custom-home-target-box]')) return false;
      if (!isVisibleBox(node)) return false;

      if (node.tagName === 'IMG' || node.tagName === 'PICTURE') return true;
      const style = window.getComputedStyle(node);
      return style.backgroundImage && style.backgroundImage !== 'none';
    });
  }

  function dedupeNestedMedia(nodes) {
    return nodes.filter((node) => {
      const rect = node.getBoundingClientRect();
      return !nodes.some((other) => {
        if (other === node || !other.contains(node)) return false;
        const otherRect = other.getBoundingClientRect();
        return Math.abs(otherRect.left - rect.left) < 3 &&
          Math.abs(otherRect.top - rect.top) < 3 &&
          Math.abs(otherRect.width - rect.width) < 6 &&
          Math.abs(otherRect.height - rect.height) < 6;
      });
    });
  }

  function findTargetBox() {
    const details = findLeafByText('Project Details');
    if (!details) return null;

    const detailsRect = details.getBoundingClientRect();
    const media = dedupeNestedMedia(mediaCandidates());

    const candidates = media.filter((node) => {
      const rect = node.getBoundingClientRect();
      const overlapsDetailsColumn = rect.right >= detailsRect.left - 40;
      const isAboveDetails = rect.bottom <= detailsRect.top + 35;
      const isRightSide = rect.left + rect.width / 2 > window.innerWidth * 0.52;
      return overlapsDetailsColumn && isAboveDetails && isRightSide;
    });

    candidates.sort((a, b) => {
      const ar = a.getBoundingClientRect();
      const br = b.getBoundingClientRect();
      const aGap = Math.max(0, detailsRect.top - ar.bottom);
      const bGap = Math.max(0, detailsRect.top - br.bottom);
      if (Math.abs(aGap - bGap) > 8) return aGap - bGap;
      const areaDiff = (br.width * br.height) - (ar.width * ar.height);
      if (Math.abs(areaDiff) > 500) return areaDiff;
      return br.left - ar.left;
    });

    return candidates[0] || null;
  }

  function overlayTarget(target) {
    if (!target) return false;

    let box = target;
    if (target.tagName === 'IMG') box = target.parentElement || target;
    if (target.tagName === 'PICTURE') box = target;

    if (window.getComputedStyle(box).position === 'static') {
      box.style.setProperty('position', 'relative', 'important');
    }
    box.style.setProperty('overflow', 'hidden', 'important');

    let overlay = box.querySelector(':scope > img[data-nguyen-custom-home-target-box="true"]');
    if (!overlay) {
      overlay = document.createElement('img');
      overlay.setAttribute('data-nguyen-custom-home-target-box', 'true');
      overlay.setAttribute('alt', 'Custom Home exterior');
      overlay.style.setProperty('position', 'absolute', 'important');
      overlay.style.setProperty('inset', '0', 'important');
      overlay.style.setProperty('width', '100%', 'important');
      overlay.style.setProperty('height', '100%', 'important');
      overlay.style.setProperty('object-fit', 'cover', 'important');
      overlay.style.setProperty('object-position', 'center', 'important');
      overlay.style.setProperty('display', 'block', 'important');
      overlay.style.setProperty('opacity', '1', 'important');
      overlay.style.setProperty('visibility', 'visible', 'important');
      overlay.style.setProperty('filter', 'none', 'important');
      overlay.style.setProperty('z-index', '2147483646', 'important');
      overlay.style.setProperty('pointer-events', 'none', 'important');
      box.appendChild(overlay);
    }
    if (overlay.getAttribute('src') !== TARGET_SRC) overlay.setAttribute('src', TARGET_SRC);

    if (target.tagName === 'IMG' && target.getAttribute('src') !== TARGET_SRC) {
      target.setAttribute('src', TARGET_SRC);
      target.removeAttribute('srcset');
      target.removeAttribute('sizes');
      const picture = target.closest('picture');
      picture?.querySelectorAll('source').forEach((source) => {
        source.setAttribute('srcset', TARGET_SRC);
        source.removeAttribute('sizes');
      });
    }

    return true;
  }

  function run() {
    if (!isCustomHomeDetail()) return;
    overlayTarget(findTargetBox());
  }

  function queue() {
    clearTimeout(queued);
    queued = setTimeout(run, 120);
  }

  run();
  window.addEventListener('load', run, { once: true });
  [250, 700, 1500, 3000, 5000].forEach((delay) => setTimeout(run, delay));

  // Watch only structural/text changes. Watching src/style/class made the patch
  // observe its own writes and continuously retrigger expensive layout scans.
  const observer = new MutationObserver((mutations) => {
    if (mutations.some((mutation) => mutation.type === 'characterData' || mutation.addedNodes.length)) queue();
  });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  setTimeout(() => { run(); observer.disconnect(); }, 6000);
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
