import { GET as getConcept04 } from '../route';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const HOME_PATH = '/client-demos/client-8889/architectured';

const CONCEPT04_FIX = `
<style id="nguyen-concept04-main-fix">
  [data-nguyen-project-anim-fixed="true"] {
    backface-visibility: hidden;
    -webkit-font-smoothing: antialiased;
  }

  [data-nguyen-project-anim-fixed="true"] .framer-18gaxbb {
    overflow: hidden !important;
  }

  [data-nguyen-project-anim-fixed="true"] .framer-dxdd0d {
    transform-origin: 50% 50%;
    will-change: height, transform;
  }

  [data-nguyen-project-anim-fixed="true"] img {
    transition: none !important;
  }

  [data-nguyen-project-anim-fixed="true"]:hover img {
    transform: none !important;
  }

  @media (prefers-reduced-motion: reduce) {
    [data-nguyen-project-anim-fixed="true"] .framer-dxdd0d {
      transform: none !important;
    }
  }
</style>
<script id="nguyen-concept04-main-fix-script">
(() => {
  const HOME_PATH = '${HOME_PATH}';
  const SOURCE_ORIGIN = 'https://architectured.framer.website';
  const PROJECT_TITLES = [
    'Boba Shops & Cafés',
    'Restaurants',
    'Nail & Beauty Salons',
    'Retail Stores',
    'Office & Tenant Improvement',
    'Commercial Remodel & Renovation',
    'New Commercial Buildings',
    'Tenant Improvement (TI)'
  ];

  // Values recovered from the original Framer Card - Projects component.
  const DESKTOP_MIN_WIDTH = 810;
  const IMAGE_ASPECT = 1.5034843205574913;
  const HOVER_IMAGE_HEIGHT = 133;
  const SPRING_STIFFNESS = 500;
  const SPRING_DAMPING = 60;
  const SPRING_MASS = 1;
  const SPRING_DURATION_MS = 650;
  const SCROLL_ZOOM_DURATION_MS = 4000;

  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const boundCards = new WeakSet();
  const zoomedFrames = new WeakSet();
  const heightAnimations = new WeakMap();

  function findCardByTitle(title) {
    const candidates = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,div');
    for (const node of candidates) {
      if (normalize(node.textContent) !== title) continue;
      const link = node.closest('a');
      if (link && link.querySelector('.framer-dxdd0d, img')) return link;

      let card = node;
      for (let depth = 0; depth < 9 && card && card !== document.body; depth += 1) {
        if (card.querySelector && card.querySelector('.framer-dxdd0d, img')) return card;
        card = card.parentElement;
      }
    }
    return null;
  }

  function springProgress(seconds) {
    const k = SPRING_STIFFNESS;
    const c = SPRING_DAMPING;
    const m = SPRING_MASS;
    const disc = c * c - 4 * m * k;

    if (disc > 0) {
      const root = Math.sqrt(disc);
      const r1 = (-c + root) / (2 * m);
      const r2 = (-c - root) / (2 * m);
      const c1 = -r2 / (r1 - r2);
      const c2 = r1 / (r1 - r2);
      return 1 - (c1 * Math.exp(r1 * seconds) + c2 * Math.exp(r2 * seconds));
    }

    return 1 - Math.exp(-10 * seconds);
  }

  function animateFrameHeight(frame, targetHeight) {
    const existing = heightAnimations.get(frame);
    if (existing) existing.cancel();

    const startHeight = parseFloat(getComputedStyle(frame).height) || frame.getBoundingClientRect().height;
    if (!startHeight || Math.abs(startHeight - targetHeight) < 0.5 || reducedMotion || !frame.animate) {
      frame.style.setProperty('height', targetHeight + 'px', 'important');
      return;
    }

    const samples = 34;
    const keyframes = [];
    for (let i = 0; i <= samples; i += 1) {
      const fraction = i / samples;
      const seconds = (SPRING_DURATION_MS / 1000) * fraction;
      const progress = Math.max(0, Math.min(1, springProgress(seconds)));
      keyframes.push({ height: (startHeight + (targetHeight - startHeight) * progress) + 'px', offset: fraction });
    }
    keyframes[keyframes.length - 1].height = targetHeight + 'px';

    const animation = frame.animate(keyframes, {
      duration: SPRING_DURATION_MS,
      easing: 'linear',
      fill: 'forwards'
    });
    heightAnimations.set(frame, animation);

    animation.onfinish = () => {
      frame.style.setProperty('height', targetHeight + 'px', 'important');
      heightAnimations.delete(frame);
      animation.cancel();
    };
  }

  function getExpandedImageHeight(frame) {
    const width = frame.getBoundingClientRect().width;
    return width > 0 ? width / IMAGE_ASPECT : parseFloat(frame.dataset.nguyenExpandedHeight || '595');
  }

  function enterCard(card, frame) {
    if (window.innerWidth < DESKTOP_MIN_WIDTH) return;
    const expanded = getExpandedImageHeight(frame);
    if (expanded > HOVER_IMAGE_HEIGHT) frame.dataset.nguyenExpandedHeight = String(expanded);
    card.dataset.nguyenProjectHover = 'true';
    animateFrameHeight(frame, HOVER_IMAGE_HEIGHT);
  }

  function leaveCard(card, frame) {
    if (window.innerWidth < DESKTOP_MIN_WIDTH) return;
    card.dataset.nguyenProjectHover = 'false';
    const stored = parseFloat(frame.dataset.nguyenExpandedHeight || '0');
    const expanded = stored > HOVER_IMAGE_HEIGHT ? stored : getExpandedImageHeight(frame);
    animateFrameHeight(frame, expanded);
  }

  const zoomObserver = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || zoomedFrames.has(entry.target)) return;
      zoomedFrames.add(entry.target);
      zoomObserver.unobserve(entry.target);
      if (reducedMotion || !entry.target.animate) return;

      const animation = entry.target.animate(
        [
          { transform: 'scale(1.5)' },
          { transform: 'scale(1)' }
        ],
        {
          duration: SCROLL_ZOOM_DURATION_MS,
          easing: 'cubic-bezier(.16,1,.3,1)',
          fill: 'both'
        }
      );
      animation.onfinish = () => {
        entry.target.style.transform = 'scale(1)';
        animation.cancel();
      };
    });
  }, { threshold: 0.5 }) : null;

  function bindProjectAnimation() {
    PROJECT_TITLES.forEach((title, index) => {
      const card = findCardByTitle(title);
      if (!card) return;
      const frame = card.querySelector('.framer-dxdd0d');
      if (!frame) return;

      card.dataset.nguyenProjectAnimFixed = 'true';
      card.dataset.nguyenProjectIndex = String(index);

      if (!frame.dataset.nguyenExpandedHeight && window.innerWidth >= DESKTOP_MIN_WIDTH) {
        const expanded = getExpandedImageHeight(frame);
        if (expanded > HOVER_IMAGE_HEIGHT) frame.dataset.nguyenExpandedHeight = String(expanded);
      }

      if (!zoomedFrames.has(frame)) {
        if (zoomObserver) zoomObserver.observe(frame);
        else zoomedFrames.add(frame);
      }

      if (boundCards.has(card)) return;
      boundCards.add(card);

      card.addEventListener('pointerenter', () => enterCard(card, frame));
      card.addEventListener('pointerleave', () => leaveCard(card, frame));
      card.addEventListener('focusin', () => enterCard(card, frame));
      card.addEventListener('focusout', () => leaveCard(card, frame));
    });
  }

  function patchHomeLinks() {
    document.querySelectorAll('a[aria-label="Company Logo"]').forEach((logo) => {
      logo.setAttribute('href', HOME_PATH);
    });

    document.querySelectorAll('a').forEach((anchor) => {
      const label = normalize(anchor.textContent);
      const href = anchor.getAttribute('href') || '';
      let url = null;
      try { url = new URL(href, window.location.href); } catch {}

      const sourceHomepage = url && url.origin === SOURCE_ORIGIN && url.pathname === '/';
      if (label === 'Home' || sourceHomepage) anchor.setAttribute('href', HOME_PATH);
    });
  }

  function scan() {
    patchHomeLinks();
    bindProjectAnimation();
  }

  if (!document.documentElement.dataset.nguyenConcept04HomeCapture) {
    document.documentElement.dataset.nguyenConcept04HomeCapture = 'true';
    document.addEventListener('click', (event) => {
      const target = event.target instanceof Element ? event.target : null;
      const anchor = target && target.closest('a');
      if (!anchor) return;

      const label = normalize(anchor.textContent);
      const href = anchor.getAttribute('href') || '';
      let url = null;
      try { url = new URL(href, window.location.href); } catch {}

      const isLogo = anchor.matches('a[aria-label="Company Logo"]');
      const isHomeLabel = label === 'Home';
      const isOriginalHome = url && url.origin === SOURCE_ORIGIN && url.pathname === '/';

      if (!isLogo && !isHomeLabel && !isOriginalHome) return;

      event.preventDefault();
      event.stopPropagation();
      if (typeof event.stopImmediatePropagation === 'function') event.stopImmediatePropagation();
      window.location.assign(HOME_PATH);
    }, true);
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth < DESKTOP_MIN_WIDTH) return;
    document.querySelectorAll('[data-nguyen-project-anim-fixed="true"]').forEach((card) => {
      const frame = card.querySelector('.framer-dxdd0d');
      if (!frame || card.dataset.nguyenProjectHover === 'true') return;
      frame.style.removeProperty('height');
      const expanded = getExpandedImageHeight(frame);
      if (expanded > HOVER_IMAGE_HEIGHT) frame.dataset.nguyenExpandedHeight = String(expanded);
    });
  });

  scan();
  document.addEventListener('DOMContentLoaded', scan, { once: true });

  const mutationObserver = new MutationObserver(() => scan());
  mutationObserver.observe(document.documentElement, { childList: true, subtree: true });

  let runs = 0;
  const timer = setInterval(() => {
    scan();
    runs += 1;
    if (runs >= 48) clearInterval(timer);
  }, 250);
})();
</script>`;

export async function GET() {
  const response = await getConcept04();
  let html = await response.text();

  if (/<\/body>/i.test(html)) html = html.replace(/<\/body>/i, `${CONCEPT04_FIX}</body>`);
  else html += CONCEPT04_FIX;

  const headers = new Headers(response.headers);
  headers.delete('content-length');
  headers.set('Content-Type', 'text/html; charset=utf-8');
  headers.set('Cache-Control', 'no-store, max-age=0');
  headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');

  return new Response(html, {
    status: response.status,
    headers,
  });
}
