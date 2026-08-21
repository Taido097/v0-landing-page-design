import { GET as getFixedConcept04 } from '../fixed/route';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const REFRESH_GUARD = `
<style id="nguyen-refresh-guard-style">
  html.nguyen-refresh-boot {
    background: #061b36 !important;
  }

  html.nguyen-refresh-boot body {
    opacity: 0 !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }

  html.nguyen-refresh-boot::before {
    content: 'NGUYEN Architecture & Engineering';
    position: fixed;
    inset: 0;
    z-index: 2147483647;
    display: grid;
    place-items: center;
    padding: 24px;
    background: #061b36;
    color: #d99a2b;
    font-family: Geist, Arial, sans-serif;
    font-size: clamp(18px, 3vw, 32px);
    font-weight: 800;
    letter-spacing: .04em;
    text-align: center;
  }

  html.nguyen-refresh-ready body {
    opacity: 1 !important;
    visibility: visible !important;
  }
</style>
<script id="nguyen-refresh-guard-start">
  document.documentElement.classList.add('nguyen-refresh-boot');
</script>`;

const REFRESH_UNLOCK = `
<script id="nguyen-refresh-guard-unlock">
(() => {
  const root = document.documentElement;
  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim();
  const targetProjectTitles = [
    'Boba Shops & Cafés',
    'Restaurants',
    'Nail & Beauty Salons',
    'Retail Stores',
    'Office & Tenant Improvement',
    'Commercial Remodel & Renovation',
    'New Commercial Buildings',
    'Tenant Improvement (TI)'
  ];

  const templateMarkers = [
    'Skyline Corporate Hub',
    'LuxeHaven Villa',
    'Celestial Towers Condominiums'
  ];

  let unlocked = false;
  let stableChecks = 0;

  function isNguyenReady() {
    const body = document.body;
    if (!body) return false;
    const text = normalize(body.textContent);
    const hasNguyen = !!document.querySelector('.nguyen-wordmark') || text.includes('NGUYEN Architecture & Engineering');
    const targetCount = targetProjectTitles.reduce((count, title) => count + (text.includes(title) ? 1 : 0), 0);
    const hasTemplateProject = templateMarkers.some((title) => text.includes(title));
    return hasNguyen && targetCount >= 3 && !hasTemplateProject;
  }

  function unlockWhenStable() {
    if (!isNguyenReady()) {
      stableChecks = 0;
      return false;
    }

    stableChecks += 1;
    if (stableChecks < 2) return false;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        root.classList.remove('nguyen-refresh-boot');
        root.classList.add('nguyen-refresh-ready');
        unlocked = true;
      });
    });
    return true;
  }

  unlockWhenStable();

  let checks = 0;
  const timer = setInterval(() => {
    checks += 1;
    if (unlockWhenStable() || checks >= 120) clearInterval(timer);
  }, 50);

  const observer = new MutationObserver(() => {
    if (!unlocked) {
      unlockWhenStable();
      return;
    }

    // If Framer briefly restores the source template during hydration,
    // conceal that frame until the NGUYEN patch has been restored.
    if (!isNguyenReady()) {
      unlocked = false;
      stableChecks = 0;
      root.classList.remove('nguyen-refresh-ready');
      root.classList.add('nguyen-refresh-boot');
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    characterData: true
  });
})();
</script>`;

export async function GET() {
  const response = await getFixedConcept04();
  let html = await response.text();

  if (/<head([^>]*)>/i.test(html)) {
    html = html.replace(/<head([^>]*)>/i, `<head$1>${REFRESH_GUARD}`);
  } else {
    html = REFRESH_GUARD + html;
  }

  const closingTag = '</body>';
  const closingIndex = html.toLowerCase().lastIndexOf(closingTag);
  if (closingIndex >= 0) {
    html = html.slice(0, closingIndex) + REFRESH_UNLOCK + html.slice(closingIndex);
  } else {
    html += REFRESH_UNLOCK;
  }

  const headers = new Headers(response.headers);
  headers.delete('content-length');
  headers.set('Content-Type', 'text/html; charset=utf-8');
  headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate');
  headers.set('Pragma', 'no-cache');
  headers.set('Expires', '0');
  headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');

  return new Response(html, {
    status: response.status,
    headers,
  });
}
