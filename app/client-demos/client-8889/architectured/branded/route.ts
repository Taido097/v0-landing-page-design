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

export async function GET() {
  const response = await getOptimized()
  if (!response.ok) return response

  let html = await response.text()
  html = html.replace("</body>", `${PROJECT_IMAGE_RUNTIME}</body>`)

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
