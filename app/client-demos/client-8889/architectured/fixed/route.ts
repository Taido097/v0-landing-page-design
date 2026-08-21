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

  [data-nguyen-project-anim-fixed="true"] img {
    transition: transform .7s cubic-bezier(.22,.61,.36,1), filter .7s cubic-bezier(.22,.61,.36,1) !important;
    will-change: transform;
  }

  [data-nguyen-project-anim-fixed="true"]:hover img {
    transform: scale(1.035) !important;
  }

  @media (prefers-reduced-motion: reduce) {
    [data-nguyen-project-anim-fixed="true"] img {
      transition: none !important;
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

  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const observed = new WeakSet();
  const animated = new WeakSet();

  const observer = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || animated.has(entry.target)) return;
      animated.add(entry.target);
      observer.unobserve(entry.target);

      if (reducedMotion || !entry.target.animate) return;
      const index = Number(entry.target.dataset.nguyenProjectIndex || 0);
      const animation = entry.target.animate(
        [
          { opacity: 0.15, clipPath: 'inset(0 0 14% 0)' },
          { opacity: 1, clipPath: 'inset(0 0 0% 0)' }
        ],
        {
          duration: 760,
          delay: Math.min(index, 3) * 85,
          easing: 'cubic-bezier(.22,.61,.36,1)',
          fill: 'both'
        }
      );
      animation.onfinish = () => animation.cancel();
    });
  }, { threshold: 0.18, rootMargin: '0px 0px -7% 0px' }) : null;

  function findCardByTitle(title) {
    const candidates = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,div');
    for (const node of candidates) {
      if (normalize(node.textContent) !== title) continue;
      const link = node.closest('a');
      if (link && link.querySelector('img')) return link;

      let card = node;
      for (let depth = 0; depth < 9 && card && card !== document.body; depth += 1) {
        if (card.querySelector && card.querySelector('img')) return card;
        card = card.parentElement;
      }
    }
    return null;
  }

  function bindProjectAnimation() {
    PROJECT_TITLES.forEach((title, index) => {
      const card = findCardByTitle(title);
      if (!card) return;
      card.dataset.nguyenProjectAnimFixed = 'true';
      card.dataset.nguyenProjectIndex = String(index);

      if (observed.has(card)) return;
      observed.add(card);
      if (observer) observer.observe(card);
      else if (!reducedMotion && card.animate) {
        const animation = card.animate(
          [{ opacity: 0.2 }, { opacity: 1 }],
          { duration: 600, easing: 'ease-out', fill: 'both' }
        );
        animation.onfinish = () => animation.cancel();
      }
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
