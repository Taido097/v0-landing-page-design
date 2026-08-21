import { GET as getProjects } from '../route';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const PROJECTS_MOTION_FIX = `
<style id="nguyen-projects-motion-fix">
  [data-nguyen-project-motion="true"].nguyen-project-enter,
  [data-nguyen-project-motion="true"].nguyen-project-visible,
  [data-nguyen-project-motion="true"] {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
    backface-visibility: hidden;
  }

  [data-nguyen-project-motion="true"] [data-nguyen-project-media="true"] {
    position: relative !important;
    overflow: hidden !important;
    isolation: isolate;
  }

  [data-nguyen-project-motion="true"] [data-nguyen-project-media="true"] img {
    transform: scale(1) !important;
    transition: transform .85s cubic-bezier(.22,1,.36,1), filter .85s cubic-bezier(.22,1,.36,1) !important;
    will-change: transform;
  }

  [data-nguyen-project-motion="true"]:hover [data-nguyen-project-media="true"] img {
    transform: scale(1.075) !important;
  }

  .nguyen-project-view-state {
    position: absolute;
    right: 18px;
    bottom: 18px;
    z-index: 12;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 42px;
    padding: 10px 15px;
    border-radius: 999px;
    background: #d99a2b;
    color: #061b36;
    font: 700 12px/1 Geist, Arial, sans-serif;
    letter-spacing: .04em;
    white-space: nowrap;
    opacity: 0;
    transform: translateY(14px) scale(.94);
    transition: opacity .42s cubic-bezier(.22,1,.36,1), transform .55s cubic-bezier(.22,1,.36,1);
    pointer-events: none;
    box-shadow: 0 8px 30px rgba(6,27,54,.18);
  }

  [data-nguyen-project-motion="true"]:hover .nguyen-project-view-state {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  [data-nguyen-project-motion="true"] [data-nguyen-project-title="true"] {
    transition: transform .55s cubic-bezier(.22,1,.36,1) !important;
    will-change: transform;
  }

  [data-nguyen-project-motion="true"]:hover [data-nguyen-project-title="true"] {
    transform: translateX(7px) !important;
  }

  @media (max-width: 767px) {
    .nguyen-project-view-state {
      right: 12px;
      bottom: 12px;
      min-height: 36px;
      padding: 8px 12px;
      font-size: 10px;
    }
  }

  @media (hover: none) {
    .nguyen-project-view-state {
      opacity: 1;
      transform: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    [data-nguyen-project-motion="true"] [data-nguyen-project-media="true"] img,
    [data-nguyen-project-motion="true"] [data-nguyen-project-title="true"],
    .nguyen-project-view-state {
      transition: none !important;
    }
  }
</style>
<script id="nguyen-projects-motion-fix-script">
(() => {
  const TITLES = [
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
  const revealed = new WeakSet();

  const revealObserver = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting || revealed.has(entry.target)) return;
      revealed.add(entry.target);
      revealObserver.unobserve(entry.target);
      revealCard(entry.target);
    });
  }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }) : null;

  function findCard(title) {
    const candidates = document.querySelectorAll('h1,h2,h3,h4,h5,h6,p,span,div');
    for (const node of candidates) {
      if (normalize(node.textContent) !== title) continue;
      const link = node.closest('a');
      if (link && link.querySelector('img')) return { card: link, titleNode: node };

      let card = node;
      for (let depth = 0; depth < 10 && card && card !== document.body; depth += 1) {
        if (card.querySelector && card.querySelector('img')) return { card, titleNode: node };
        card = card.parentElement;
      }
    }
    return null;
  }

  function getMediaRoot(card) {
    const image = card.querySelector('img');
    if (!image) return null;
    let media = image.closest('picture') || image.parentElement;
    if (!media) return null;

    let parent = media.parentElement;
    for (let depth = 0; depth < 3 && parent && parent !== card; depth += 1) {
      const rect = parent.getBoundingClientRect();
      const mediaRect = media.getBoundingClientRect();
      if (rect.width >= mediaRect.width && rect.height >= mediaRect.height && rect.height > 120) media = parent;
      parent = parent.parentElement;
    }
    return media;
  }

  function revealCard(card) {
    if (reducedMotion || !card.animate) return;
    const index = Number(card.dataset.nguyenProjectMotionIndex || 0);
    const delay = Math.min(index % 4, 3) * 90;

    const animation = card.animate([
      { opacity: 0, transform: 'translateY(58px)', clipPath: 'inset(10% 0 0 0)' },
      { opacity: 1, transform: 'translateY(0px)', clipPath: 'inset(0% 0 0 0)' }
    ], {
      duration: 900,
      delay,
      easing: 'cubic-bezier(.22,1,.36,1)',
      fill: 'both'
    });

    animation.onfinish = () => animation.cancel();

    const image = card.querySelector('img');
    if (image && image.animate) {
      const imageAnimation = image.animate([
        { transform: 'scale(1.09)' },
        { transform: 'scale(1)' }
      ], {
        duration: 1150,
        delay: delay + 40,
        easing: 'cubic-bezier(.22,1,.36,1)',
        fill: 'both'
      });
      imageAnimation.onfinish = () => imageAnimation.cancel();
    }
  }

  function bindCard(title, index) {
    const found = findCard(title);
    if (!found) return;

    const { card, titleNode } = found;
    card.dataset.nguyenProjectMotion = 'true';
    card.dataset.nguyenProjectMotionIndex = String(index);
    card.classList.remove('nguyen-project-enter', 'nguyen-project-visible');
    card.dataset.nguyenAnimated = 'true';

    if (titleNode) titleNode.dataset.nguyenProjectTitle = 'true';

    const media = getMediaRoot(card);
    if (media) {
      media.dataset.nguyenProjectMedia = 'true';
      if (!media.querySelector(':scope > .nguyen-project-view-state')) {
        const view = document.createElement('span');
        view.className = 'nguyen-project-view-state';
        view.textContent = 'View Project ↗';
        media.appendChild(view);
      }
    }

    if (observed.has(card)) return;
    observed.add(card);

    if (revealObserver) revealObserver.observe(card);
    else {
      revealed.add(card);
      revealCard(card);
    }
  }

  function scan() {
    TITLES.forEach(bindCard);
  }

  scan();
  document.addEventListener('DOMContentLoaded', scan, { once: true });

  const mutationObserver = new MutationObserver(scan);
  mutationObserver.observe(document.documentElement, { childList: true, subtree: true });

  let runs = 0;
  const timer = setInterval(() => {
    scan();
    runs += 1;
    if (runs >= 64) clearInterval(timer);
  }, 200);
})();
</script>`;

export async function GET() {
  const response = await getProjects();
  let html = await response.text();

  if (/<\\/body>/i.test(html)) html = html.replace(/<\\/body>/i, `${PROJECTS_MOTION_FIX}</body>`);
  else html += PROJECTS_MOTION_FIX;

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
