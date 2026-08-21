import { GET as getOptimized } from "../optimized/route"
import { BOBA_PROJECT_IMAGE } from "./project-image-boba"
import { RESTAURANT_PROJECT_IMAGE } from "./project-image-restaurant"
import { COMMERCIAL_PROJECT_IMAGE } from "./project-image-commercial"

export const dynamic = "force-dynamic"
export const revalidate = 0

const PROJECT_IMAGE_RUNTIME = String.raw`<script id="nguyen-project-image-runtime">
(() => {
  const PROJECTS = [
    {
      titles: ['Skyline Corporate Hub', 'Boba Shops & Cafés', 'Boba Shops & Cafes'],
      src: '${BOBA_PROJECT_IMAGE}',
      label: 'Boba Shop & Café'
    },
    {
      titles: ['LuxeHaven Villa', 'Restaurants'],
      src: '${RESTAURANT_PROJECT_IMAGE}',
      label: 'Restaurant'
    },
    {
      titles: ['Celestial Towers Condominiums', 'New Commercial Buildings'],
      src: '${COMMERCIAL_PROJECT_IMAGE}',
      label: 'New Commercial Building'
    }
  ];

  const normalize = (value) => (value || '')
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

  function containsProjectTitle(el, titles) {
    const text = normalize(el && el.textContent);
    if (!text) return false;
    return titles.some((title) => text === normalize(title));
  }

  function findCardRoot(titleEl) {
    if (!(titleEl instanceof HTMLElement)) return null;

    const link = titleEl.closest('a');
    if (link && link.querySelector('img')) return link;

    let node = titleEl.parentElement;
    for (let depth = 0; node && depth < 9; depth += 1, node = node.parentElement) {
      const images = node.querySelectorAll('img');
      if (!images.length) continue;

      const rect = node.getBoundingClientRect();
      const viewportWidth = Math.max(window.innerWidth, 320);
      if (rect.width > viewportWidth * 0.95 && depth > 4) continue;
      return node;
    }

    return null;
  }

  function imageScore(img) {
    const rect = img.getBoundingClientRect();
    const rendered = Math.max(0, rect.width) * Math.max(0, rect.height);
    const intrinsic = (img.naturalWidth || 0) * (img.naturalHeight || 0);
    return rendered > 0 ? rendered : intrinsic;
  }

  function replaceCardImage(card, project) {
    if (!(card instanceof HTMLElement)) return false;

    const images = Array.from(card.querySelectorAll('img'));
    if (!images.length) return false;

    images.sort((a, b) => imageScore(b) - imageScore(a));
    const image = images[0];
    if (!(image instanceof HTMLImageElement)) return false;

    let changed = false;
    if (image.getAttribute('src') !== project.src) {
      image.setAttribute('src', project.src);
      changed = true;
    }
    if (image.getAttribute('srcset') !== project.src) {
      image.setAttribute('srcset', project.src);
      changed = true;
    }

    image.dataset.nguyenProjectImage = project.label;
    image.setAttribute('data-nguyen-project-source', 'brochure-reference');
    return changed;
  }

  function replaceProjectImages() {
    const textElements = Array.from(document.querySelectorAll(
      'h1,h2,h3,h4,h5,h6,p,span,a,div'
    ));

    PROJECTS.forEach((project) => {
      const cards = new Set();

      textElements.forEach((el) => {
        if (!containsProjectTitle(el, project.titles)) return;
        const card = findCardRoot(el);
        if (card) cards.add(card);
      });

      cards.forEach((card) => replaceCardImage(card, project));
    });
  }

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      replaceProjectImages();
    });
  };

  const observer = new MutationObserver(schedule);
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true,
    attributes: true,
    attributeFilter: ['src', 'srcset']
  });

  replaceProjectImages();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', schedule, { once: true });
  }
  window.addEventListener('load', schedule, { once: true });
  window.addEventListener('resize', schedule, { passive: true });

  [50, 120, 250, 500, 900, 1500, 2500, 4000, 7000].forEach((delay) => {
    window.setTimeout(schedule, delay);
  });
})();
</script>`

const HANDBOOK_RUNTIME = String.raw`<style id="nguyen-handbook-css">
  [data-td-nguyen-handbook-host="true"] {
    box-sizing: border-box !important;
    width: 100% !important;
    max-width: none !important;
    height: auto !important;
    min-height: clamp(500px, 58vw, 760px) !important;
    padding: clamp(32px, 5vw, 72px) 20px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    overflow: visible !important;
  }

  [data-td-nguyen-handbook-host="true"] > :not([data-td-nguyen-handbook]) {
    display: none !important;
  }

  [data-td-nguyen-handbook] {
    box-sizing: border-box;
    position: relative;
    width: min(82vw, 680px);
    aspect-ratio: 678 / 480;
    flex: 0 0 auto;
    perspective: 1200px;
    transform-style: preserve-3d;
    transition: transform 420ms ease;
    touch-action: pan-y;
    user-select: none;
    -webkit-user-select: none;
    cursor: pointer;
    isolation: isolate;
  }

  [data-td-nguyen-handbook]::after {
    content: "";
    position: absolute;
    top: 1%;
    bottom: 1%;
    left: 50%;
    width: 2px;
    transform: translateX(-50%);
    background: linear-gradient(180deg, rgba(255,255,255,.30), rgba(0,0,0,.34), rgba(255,255,255,.16));
    opacity: .62;
    z-index: 150;
    pointer-events: none;
  }

  .td-handbook-sheet {
    position: absolute;
    left: 50%;
    top: 0;
    width: 50%;
    height: 100%;
    transform-origin: left center;
    transform-style: preserve-3d;
    transition: transform 600ms cubic-bezier(.20,.72,.12,1);
    will-change: transform;
  }

  .td-handbook-sheet.is-flipped {
    transform: rotateY(-180deg);
  }

  .td-handbook-face {
    position: absolute;
    inset: 0;
    overflow: hidden;
    background: #fff;
    backface-visibility: hidden;
    -webkit-backface-visibility: hidden;
    box-shadow: 0 20px 55px rgba(0,0,0,.28);
  }

  .td-handbook-front {
    transform: rotateY(0deg);
  }

  .td-handbook-back {
    transform: rotateY(180deg);
  }

  .td-handbook-face img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    pointer-events: none;
    -webkit-user-drag: none;
  }

  .td-handbook-face::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(90deg, rgba(0,0,0,.15), rgba(255,255,255,.08) 18%, transparent 50%, rgba(0,0,0,.08));
    mix-blend-mode: soft-light;
  }

  @media (max-width: 700px) {
    [data-td-nguyen-handbook-host="true"] {
      min-height: 390px !important;
      padding: 28px 10px !important;
    }

    [data-td-nguyen-handbook] {
      width: min(94vw, 560px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    [data-td-nguyen-handbook],
    .td-handbook-sheet {
      transition-duration: 1ms !important;
    }
  }
</style>
<script id="nguyen-handbook-runtime" data-td-nguyen-handbook-runtime>
(() => {
  const PAGE_URLS = [
    'https://framerusercontent.com/images/QDQKylWWIf9VYDvFE8d8MTxUJ1o.png',
    'https://framerusercontent.com/images/cwOkVnjxy6x4U3eWGZEKmj7BBgo.jpg?scale-down-to=512&width=768&height=1086',
    'https://framerusercontent.com/images/OhGj99mJnab8DPy2PMfd98jhF6I.jpg?scale-down-to=1024&width=768&height=1086',
    'https://framerusercontent.com/images/lAU1MDwSV1dq0S6amUC8jsOg.jpg?scale-down-to=512&width=768&height=1086',
    'https://framerusercontent.com/images/hv0I9A0DXUdvIK6c42B46rsfzg.jpg?scale-down-to=512&width=768&height=1086',
    'https://framerusercontent.com/images/cKChIxjzaNsc5t2NxVN78mx8Q.png?scale-down-to=512&width=768&height=1086',
    'https://framerusercontent.com/images/hFP2svt3lNsx1A9P1zA6bFzdWM.png?scale-down-to=512&width=768&height=1086',
    'https://framerusercontent.com/images/7q3XJntgf3apOgAI7m0Yai1Mz0.png?scale-down-to=512&width=768&height=1086'
  ];

  const TOKENS = [
    'deliverexceptionalservice',
    'exceededourexpectations',
    'nguyenarchitectureengineering'
  ];

  const normalize = (value) => (value || '')
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

  const compact = (value) => normalize(value).replace(/[^a-z0-9]+/g, '');

  function hasQuote(el) {
    const text = compact(el && el.textContent);
    return TOKENS.some((token) => text.includes(token));
  }

  function findTestimonialHost() {
    const nodes = Array.from(document.querySelectorAll('p,h1,h2,h3,h4,h5,h6,span,div'))
      .filter((node) => node instanceof HTMLElement && hasQuote(node));
    if (!nodes.length) return null;

    nodes.sort((a, b) => {
      const aText = compact(a.textContent).length;
      const bText = compact(b.textContent).length;
      if (aText !== bText) return aText - bText;
      const aRect = a.getBoundingClientRect();
      const bRect = b.getBoundingClientRect();
      return (aRect.width * aRect.height) - (bRect.width * bRect.height);
    });

    const quoteNode = nodes[0];
    const candidates = [];
    let node = quoteNode;
    for (let depth = 0; node && depth < 14; depth += 1, node = node.parentElement) {
      if (!hasQuote(node)) continue;
      const rect = node.getBoundingClientRect();
      const imageCount = node.querySelectorAll('img').length;
      if (imageCount < 1 || rect.width < 260 || rect.height < 160) continue;
      candidates.push({ node, imageCount, area: Math.max(1, rect.width * rect.height) });
    }

    if (!candidates.length) return null;

    const carouselCandidates = candidates.filter((candidate) => candidate.imageCount >= 3);
    const pool = carouselCandidates.length ? carouselCandidates : candidates;
    pool.sort((a, b) => a.area - b.area);
    return pool[0].node;
  }

  function buildBook() {
    const book = document.createElement('div');
    book.setAttribute('data-td-nguyen-handbook', 'true');
    book.setAttribute('role', 'group');
    book.setAttribute('aria-label', 'Interactive handbook. Click the right side for the next page and the left side for the previous page.');

    for (let index = 0; index < PAGE_URLS.length; index += 2) {
      const sheet = document.createElement('div');
      sheet.className = 'td-handbook-sheet';

      const front = document.createElement('div');
      front.className = 'td-handbook-face td-handbook-front';
      const frontImage = document.createElement('img');
      frontImage.src = PAGE_URLS[index];
      frontImage.alt = '';
      frontImage.draggable = false;
      front.appendChild(frontImage);

      const back = document.createElement('div');
      back.className = 'td-handbook-face td-handbook-back';
      const backImage = document.createElement('img');
      backImage.src = PAGE_URLS[index + 1];
      backImage.alt = '';
      backImage.draggable = false;
      back.appendChild(backImage);

      sheet.appendChild(front);
      sheet.appendChild(back);
      book.appendChild(sheet);
    }

    return book;
  }

  function initializeBook(book) {
    if (!(book instanceof HTMLElement) || book.dataset.tdHandbookReady === 'true') return;
    book.dataset.tdHandbookReady = 'true';

    const sheets = Array.from(book.querySelectorAll('.td-handbook-sheet'));
    let page = 0;
    let pointerDownX = null;
    let suppressClickUntil = 0;

    const render = () => {
      sheets.forEach((sheet, index) => {
        const flipped = index < page;
        sheet.classList.toggle('is-flipped', flipped);
        sheet.style.zIndex = String(flipped ? index + 1 : 100 - index);
      });

      if (page === 0) {
        book.style.transform = 'translateX(-25%)';
      } else if (page === sheets.length) {
        book.style.transform = 'translateX(25%)';
      } else {
        book.style.transform = 'translateX(0)';
      }
    };

    const next = () => {
      page = Math.min(sheets.length, page + 1);
      render();
    };

    const previous = () => {
      page = Math.max(0, page - 1);
      render();
    };

    book.addEventListener('click', (event) => {
      if (Date.now() < suppressClickUntil) return;
      const rect = book.getBoundingClientRect();
      const midpoint = rect.left + rect.width / 2;
      if (event.clientX < midpoint) previous();
      else next();
    });

    book.addEventListener('pointerdown', (event) => {
      pointerDownX = event.clientX;
      if (book.setPointerCapture) {
        try { book.setPointerCapture(event.pointerId); } catch (_) {}
      }
    });

    book.addEventListener('pointerup', (event) => {
      if (pointerDownX === null) return;
      const delta = event.clientX - pointerDownX;
      pointerDownX = null;
      if (Math.abs(delta) < 35) return;
      if (delta < 0) next();
      else previous();
      suppressClickUntil = Date.now() + 250;
    });

    book.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        next();
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        previous();
      }
    });

    book.tabIndex = 0;
    render();
  }

  function mountHandbook() {
    const existing = document.querySelector('[data-td-nguyen-handbook]');
    if (existing instanceof HTMLElement) {
      initializeBook(existing);
      return true;
    }

    const host = findTestimonialHost();
    if (!(host instanceof HTMLElement)) return false;

    host.setAttribute('data-td-nguyen-handbook-host', 'true');
    const book = buildBook();
    host.appendChild(book);
    initializeBook(book);
    return true;
  }

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      mountHandbook();
    });
  };

  const observer = new MutationObserver(() => {
    if (!document.querySelector('[data-td-nguyen-handbook]')) schedule();
  });
  observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true });

  mountHandbook();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', schedule, { once: true });
  }
  window.addEventListener('load', schedule, { once: true });
  window.addEventListener('resize', schedule, { passive: true });
  [50, 120, 250, 500, 900, 1500, 2500, 4000, 7000].forEach((delay) => window.setTimeout(schedule, delay));
})();
</script>`

export async function GET() {
  const response = await getOptimized()
  if (!response.ok) return response

  let html = await response.text()
  html = html.replace("</body>", `${PROJECT_IMAGE_RUNTIME}${HANDBOOK_RUNTIME}</body>`)

  const headers = new Headers(response.headers)
  headers.set("Content-Type", "text/html; charset=utf-8")
  headers.set("Cache-Control", "no-store, no-cache, max-age=0, must-revalidate")
  headers.set("Pragma", "no-cache")
  headers.set("Expires", "0")

  return new Response(html, {
    status: response.status,
    headers,
  })
}
