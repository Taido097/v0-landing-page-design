import { GET as getOptimized } from "../optimized/route"
import { BOBA_PROJECT_IMAGE } from "./project-image-boba"
import { RESTAURANT_PROJECT_IMAGE } from "./project-image-restaurant"
import { COMMERCIAL_PROJECT_IMAGE } from "./project-image-commercial"

export const dynamic = "force-dynamic"
export const revalidate = 0

const PROJECT_IMAGE_RUNTIME = String.raw`<script id="nguyen-project-image-runtime">
(() => {
  const PROJECTS = [
    { titles: ['Skyline Corporate Hub', 'Boba Shops & Cafés', 'Boba Shops & Cafes'], src: '${BOBA_PROJECT_IMAGE}', label: 'Boba Shop & Café' },
    { titles: ['LuxeHaven Villa', 'Restaurants'], src: '${RESTAURANT_PROJECT_IMAGE}', label: 'Restaurant' },
    { titles: ['Celestial Towers Condominiums', 'New Commercial Buildings'], src: '${COMMERCIAL_PROJECT_IMAGE}', label: 'New Commercial Building' }
  ];

  const normalize = (value) => (value || '')
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

  function findCardRoot(titleEl) {
    if (!(titleEl instanceof HTMLElement)) return null;
    const link = titleEl.closest('a');
    if (link && link.querySelector('img')) return link;

    let node = titleEl.parentElement;
    for (let depth = 0; node && depth < 9; depth += 1, node = node.parentElement) {
      if (!node.querySelector('img')) continue;
      const rect = node.getBoundingClientRect();
      if (rect.width > Math.max(window.innerWidth, 320) * .95 && depth > 4) continue;
      return node;
    }
    return null;
  }

  function imageScore(img) {
    const rect = img.getBoundingClientRect();
    const rendered = Math.max(0, rect.width) * Math.max(0, rect.height);
    return rendered || (img.naturalWidth || 0) * (img.naturalHeight || 0);
  }

  function replaceProjectImages() {
    const textElements = Array.from(document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,a,div'));

    PROJECTS.forEach((project) => {
      const wanted = project.titles.map(normalize);
      const cards = new Set();

      textElements.forEach((el) => {
        if (!wanted.includes(normalize(el.textContent))) return;
        const card = findCardRoot(el);
        if (card) cards.add(card);
      });

      cards.forEach((card) => {
        const images = Array.from(card.querySelectorAll('img')).sort((a, b) => imageScore(b) - imageScore(a));
        const image = images[0];
        if (!(image instanceof HTMLImageElement)) return;
        if (image.getAttribute('src') !== project.src) image.setAttribute('src', project.src);
        if (image.getAttribute('srcset') !== project.src) image.setAttribute('srcset', project.src);
        image.dataset.nguyenProjectImage = project.label;
        image.setAttribute('data-nguyen-project-source', 'brochure-reference');
      });
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
  document.addEventListener('DOMContentLoaded', schedule, { once: true });
  window.addEventListener('load', schedule, { once: true });
  window.addEventListener('resize', schedule, { passive: true });
  [50, 120, 250, 500, 900, 1500, 2500, 4000, 7000].forEach((delay) => window.setTimeout(schedule, delay));
})();
</script>`

const HANDBOOK_RUNTIME = String.raw`<style id="nguyen-live-handbook-css">
  [data-td-nguyen-handbook-host="true"] {
    position: relative !important;
    box-sizing: border-box !important;
    width: 100% !important;
    max-width: none !important;
    min-height: clamp(520px, 55vw, 760px) !important;
    margin: 0 !important;
    padding: clamp(28px, 4vw, 58px) clamp(8px, 2vw, 28px) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    overflow: hidden !important;
  }

  [data-td-nguyen-handbook-host="true"] > :not([data-td-nguyen-handbook="true"]) {
    display: none !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }

  [data-td-nguyen-handbook="true"] {
    position: relative !important;
    z-index: 1000 !important;
    width: min(1080px, 96vw) !important;
    height: auto !important;
    margin: 0 auto !important;
    box-sizing: border-box !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    visibility: visible !important;
    opacity: 1 !important;
  }

  .td-nguyen-flipbook-shell {
    position: relative !important;
    width: 100% !important;
    min-height: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    perspective: 2000px !important;
    -webkit-perspective: 2000px !important;
    user-select: none !important;
    -webkit-user-select: none !important;
  }

  .td-nguyen-live-book {
    position: relative !important;
    width: 100% !important;
    max-width: 90% !important;
    aspect-ratio: 10 / 7 !important;
    display: flex !important;
    gap: 0 !important;
    transform-style: preserve-3d !important;
    -webkit-transform-style: preserve-3d !important;
    transition: transform .7s cubic-bezier(.44,0,.56,1) !important;
    touch-action: pan-y !important;
    cursor: pointer !important;
    outline: none !important;
  }

  .td-nguyen-live-book::after {
    content: "";
    position: absolute;
    z-index: 1000;
    left: 50%;
    top: 1.5%;
    bottom: 1.5%;
    width: 1px;
    transform: translateX(-50%);
    pointer-events: none;
    background: linear-gradient(180deg, rgba(255,255,255,.18), rgba(0,0,0,.42), rgba(255,255,255,.12));
    box-shadow: 0 0 14px rgba(0,0,0,.18);
  }

  .td-nguyen-live-sheet {
    position: absolute !important;
    left: 50% !important;
    top: 0 !important;
    width: 50% !important;
    height: 100% !important;
    transform-origin: left center !important;
    transform-style: preserve-3d !important;
    -webkit-transform-style: preserve-3d !important;
    transition: transform .7s cubic-bezier(.44,0,.56,1) !important;
    will-change: transform !important;
  }

  .td-nguyen-live-sheet.is-flipped {
    transform: rotateY(-180deg) !important;
  }

  .td-nguyen-live-face {
    position: absolute !important;
    inset: 0 !important;
    overflow: hidden !important;
    backface-visibility: hidden !important;
    -webkit-backface-visibility: hidden !important;
    background: #f8f8f8 !important;
    box-shadow: 0 20px 55px rgba(0,0,0,.28) !important;
  }

  .td-nguyen-live-front {
    transform: rotateY(0deg) translateZ(.1px) !important;
    border-radius: 2px 8px 8px 2px !important;
  }

  .td-nguyen-live-back {
    transform: rotateY(180deg) translateZ(.1px) !important;
    border-radius: 8px 2px 2px 8px !important;
  }

  .td-nguyen-live-face img {
    display: block !important;
    width: 100% !important;
    height: 100% !important;
    min-width: 100% !important;
    min-height: 100% !important;
    object-fit: cover !important;
    object-position: center center !important;
    opacity: 1 !important;
    visibility: visible !important;
    pointer-events: none !important;
    -webkit-user-drag: none !important;
  }

  .td-nguyen-live-control {
    position: absolute !important;
    z-index: 1200 !important;
    top: 50% !important;
    width: 40px !important;
    height: 40px !important;
    padding: 0 !important;
    transform: translateY(-50%) !important;
    border: 0 !important;
    border-radius: 50% !important;
    background: rgba(255,255,255,.92) !important;
    color: #000 !important;
    box-shadow: 0 2px 8px rgba(0,0,0,.15) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    font: 500 22px/1 Arial, sans-serif !important;
    cursor: pointer !important;
    transition: opacity 200ms ease !important;
  }

  .td-nguyen-live-prev { left: 20px !important; }
  .td-nguyen-live-next { right: 20px !important; }

  .td-nguyen-live-control:disabled {
    opacity: 0 !important;
    pointer-events: none !important;
  }

  .td-nguyen-live-indicator {
    position: absolute !important;
    z-index: 1200 !important;
    bottom: 20px !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    padding: 8px 16px !important;
    border-radius: 20px !important;
    background: rgba(0,0,0,.62) !important;
    color: #fff !important;
    font: 500 12px/1 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif !important;
    white-space: nowrap !important;
    pointer-events: none !important;
  }

  @media (max-width: 700px) {
    [data-td-nguyen-handbook-host="true"] {
      min-height: 390px !important;
      padding: 32px 0 !important;
    }

    [data-td-nguyen-handbook="true"] {
      width: 100vw !important;
    }

    .td-nguyen-live-book {
      max-width: 96% !important;
    }

    .td-nguyen-live-control {
      width: 36px !important;
      height: 36px !important;
      font-size: 19px !important;
    }

    .td-nguyen-live-prev { left: 8px !important; }
    .td-nguyen-live-next { right: 8px !important; }
    .td-nguyen-live-indicator { bottom: 10px !important; }
  }

  @media (prefers-reduced-motion: reduce) {
    .td-nguyen-live-book,
    .td-nguyen-live-sheet {
      transition-duration: .01ms !important;
    }
  }
</style>
<script id="nguyen-live-handbook-runtime">
(() => {
  const PAGE_URLS = [
    'https://framerusercontent.com/images/QDQKylWWIf9VYDvFE8d8MTxUJ1o.png',
    'https://framerusercontent.com/images/cwOkVnjxy6x4U3eWGZEKmj7BBgo.jpg?scale-down-to=1024&width=768&height=1086',
    'https://framerusercontent.com/images/OhGj99mJnab8DPy2PMfd98jhF6I.jpg?scale-down-to=1024&width=768&height=1086',
    'https://framerusercontent.com/images/lAU1MDwSV1dq0S6amUC8jsOg.jpg?scale-down-to=1024&width=768&height=1086',
    'https://framerusercontent.com/images/hv0I9A0DXUdvIK6c42B46rsfzg.jpg?scale-down-to=1024&width=768&height=1086',
    'https://framerusercontent.com/images/cKChIxjzaNsc5t2NxVN78mx8Q.png?scale-down-to=1024&width=768&height=1086',
    'https://framerusercontent.com/images/hFP2svt3lNsx1A9P1zA6bFzdWM.png?scale-down-to=1024&width=768&height=1086',
    'https://framerusercontent.com/images/7q3XJntgf3apOgAI7m0Yai1Mz0.png?scale-down-to=1024&width=768&height=1086'
  ];

  const normalize = (value) => (value || '')
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

  function findTargetHost() {
    const viewportWidth = Math.max(window.innerWidth || 0, 320);
    const all = Array.from(document.querySelectorAll('button,a,p,span,div,h1,h2,h3,h4,h5,h6'));
    const anchors = all.filter((element) => {
      const text = normalize(element.textContent);
      return text === 'client testimonial' || text.includes('client testimonial');
    });

    const fallbackAnchors = anchors.length
      ? anchors
      : all.filter((element) => normalize(element.textContent).includes('nguyen architecture'));

    for (const anchor of fallbackAnchors) {
      let node = anchor instanceof HTMLElement ? anchor : null;
      let compactCandidate = null;

      for (let depth = 0; node && depth < 16; depth += 1, node = node.parentElement) {
        if (!(node instanceof HTMLElement)) continue;
        const text = normalize(node.textContent);
        if (!text.includes('client testimonial') && !text.includes('nguyen architecture')) continue;

        const rect = node.getBoundingClientRect();
        if (rect.width >= 320 && rect.height >= 260 && rect.height <= 1100 && !compactCandidate) {
          compactCandidate = node;
        }

        if (
          rect.width >= viewportWidth * .72 &&
          rect.height >= 360 &&
          rect.height <= 1100
        ) {
          return node;
        }
      }

      if (compactCandidate) return compactCandidate;
    }

    return null;
  }

  function createBook(host) {
    host.setAttribute('data-td-nguyen-handbook-host', 'true');

    const existing = host.querySelector('[data-td-nguyen-handbook="true"]');
    if (existing) return existing;

    const root = document.createElement('div');
    root.setAttribute('data-td-nguyen-handbook', 'true');
    root.innerHTML =
      '<div class="td-nguyen-flipbook-shell">' +
        '<div class="td-nguyen-live-book" tabindex="0" role="group" aria-label="Interactive 3D handbook"></div>' +
        '<button class="td-nguyen-live-control td-nguyen-live-prev" type="button" aria-label="Previous page">‹</button>' +
        '<button class="td-nguyen-live-control td-nguyen-live-next" type="button" aria-label="Next page">›</button>' +
        '<div class="td-nguyen-live-indicator">Cover 1 / ' + PAGE_URLS.length + '</div>' +
      '</div>';

    host.appendChild(root);

    const stage = root.querySelector('.td-nguyen-live-book');
    const indicator = root.querySelector('.td-nguyen-live-indicator');
    const previousButton = root.querySelector('.td-nguyen-live-prev');
    const nextButton = root.querySelector('.td-nguyen-live-next');
    const sheets = [];

    if (!(stage instanceof HTMLElement)) return root;
    if (!(indicator instanceof HTMLElement)) return root;
    if (!(previousButton instanceof HTMLButtonElement)) return root;
    if (!(nextButton instanceof HTMLButtonElement)) return root;

    PAGE_URLS.forEach((url) => {
      const image = new Image();
      image.src = url;
    });

    for (let index = 0; index < PAGE_URLS.length; index += 2) {
      const sheet = document.createElement('div');
      sheet.className = 'td-nguyen-live-sheet';
      sheet.innerHTML =
        '<div class="td-nguyen-live-face td-nguyen-live-front"><img src="' + PAGE_URLS[index] + '" alt="Handbook page ' + (index + 1) + '" draggable="false"></div>' +
        '<div class="td-nguyen-live-face td-nguyen-live-back"><img src="' + PAGE_URLS[index + 1] + '" alt="Handbook page ' + (index + 2) + '" draggable="false"></div>';
      stage.appendChild(sheet);
      sheets.push(sheet);
    }

    let page = 0;
    let pointerStart = null;
    let suppressClickUntil = 0;

    const render = () => {
      sheets.forEach((sheet, index) => {
        const flipped = index < page;
        sheet.classList.toggle('is-flipped', flipped);
        sheet.style.zIndex = String(flipped ? index + 1 : 100 - index);
      });

      stage.style.transform = page === 0
        ? 'translateX(-25%)'
        : page === sheets.length
          ? 'translateX(25%)'
          : 'translateX(0)';

      indicator.textContent = page === 0
        ? 'Cover 1 / ' + PAGE_URLS.length
        : page === sheets.length
          ? PAGE_URLS.length + '-' + PAGE_URLS.length + ' / ' + PAGE_URLS.length
          : (page * 2) + '-' + (page * 2 + 1) + ' / ' + PAGE_URLS.length;

      previousButton.disabled = page === 0;
      nextButton.disabled = page === sheets.length;
    };

    const next = () => {
      page = Math.min(sheets.length, page + 1);
      render();
    };

    const previous = () => {
      page = Math.max(0, page - 1);
      render();
    };

    previousButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      previous();
    });

    nextButton.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      next();
    });

    stage.addEventListener('click', (event) => {
      if (Date.now() < suppressClickUntil) return;
      const rect = stage.getBoundingClientRect();
      if (event.clientX < rect.left + rect.width / 2) previous();
      else next();
    });

    stage.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        previous();
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        next();
      }
    });

    stage.addEventListener('pointerdown', (event) => {
      pointerStart = event.clientX;
    });

    stage.addEventListener('pointerup', (event) => {
      if (pointerStart === null) return;
      const delta = event.clientX - pointerStart;
      pointerStart = null;
      if (Math.abs(delta) < 35) return;
      if (delta < 0) next();
      else previous();
      suppressClickUntil = Date.now() + 250;
    });

    render();
    return root;
  }

  function mount() {
    if (document.querySelector('[data-td-nguyen-handbook="true"]')) return true;
    const host = findTargetHost();
    if (!host) return false;
    createBook(host);
    return true;
  }

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      mount();
    });
  };

  const observer = new MutationObserver(() => {
    if (!document.querySelector('[data-td-nguyen-handbook="true"]')) schedule();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true
  });

  mount();
  document.addEventListener('DOMContentLoaded', schedule, { once: true });
  window.addEventListener('load', schedule, { once: true });
  window.addEventListener('resize', schedule, { passive: true });
  [50, 120, 250, 500, 900, 1500, 2500, 4000, 7000].forEach((delay) => window.setTimeout(schedule, delay));
})();
</script>`

export async function GET() {
  const optimizedResponse = await getOptimized()
  if (!optimizedResponse.ok) return optimizedResponse

  let html = await optimizedResponse.text()
  html = html.replace("</body>", `${PROJECT_IMAGE_RUNTIME}${HANDBOOK_RUNTIME}</body>`)

  const headers = new Headers(optimizedResponse.headers)
  headers.set("Content-Type", "text/html; charset=utf-8")
  headers.set("Cache-Control", "no-store, max-age=0, must-revalidate")
  headers.set("Pragma", "no-cache")
  headers.set("Expires", "0")
  headers.delete("Content-Encoding")
  headers.delete("Content-Length")

  return new Response(html, {
    status: optimizedResponse.status,
    headers,
  })
}
