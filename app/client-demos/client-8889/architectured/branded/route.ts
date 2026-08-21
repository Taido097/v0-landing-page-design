import { GET as getHandbookDemo } from "./route-handbook-live"

export const dynamic = "force-dynamic"
export const revalidate = 0

const EXACT_TESTIMONIAL_REPLACEMENT = String.raw`<script id="td-exact-concept04-handbook-replacement">
(() => {
  const compact = (value) => (value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '');

  const QUOTE = 'exceededourexpectations';
  const BRAND = 'nguyenarchitectureengineering';

  function findCurrentTestimonialSection() {
    const all = Array.from(document.querySelectorAll('body *'));
    const matches = [];

    all.forEach((element) => {
      if (!(element instanceof HTMLElement)) return;
      const text = compact(element.innerText || element.textContent);
      if (!text.includes(QUOTE)) return;
      const rect = element.getBoundingClientRect();
      if (rect.width < 260 || rect.height < 180) return;
      matches.push(element);
    });

    if (!matches.length) return null;

    matches.sort((a, b) => {
      const ar = a.getBoundingClientRect();
      const br = b.getBoundingClientRect();
      const aText = compact(a.innerText || a.textContent);
      const bText = compact(b.innerText || b.textContent);
      const aBrand = aText.includes(BRAND) ? 0 : 1;
      const bBrand = bText.includes(BRAND) ? 0 : 1;
      if (aBrand !== bBrand) return aBrand - bBrand;
      return ar.width * ar.height - br.width * br.height;
    });

    let host = matches[0];
    const viewport = Math.max(window.innerWidth || 0, 320);

    for (let depth = 0; host.parentElement && depth < 12; depth += 1) {
      const parent = host.parentElement;
      const text = compact(parent.innerText || parent.textContent);
      if (!text.includes(QUOTE)) break;

      const rect = parent.getBoundingClientRect();
      host = parent;

      if (
        rect.width >= viewport * 0.72 &&
        rect.height >= 430 &&
        rect.height <= 1150
      ) {
        break;
      }
    }

    return host;
  }

  function mount() {
    if (document.querySelector('[data-td-exact-concept04-handbook="true"]')) return true;

    const host = findCurrentTestimonialSection();
    if (!host) return false;

    host.removeAttribute('data-td-nguyen-handbook-host');
    host.innerHTML = '';
    host.setAttribute('data-td-exact-concept04-handbook', 'true');

    host.style.setProperty('display', 'block', 'important');
    host.style.setProperty('position', 'relative', 'important');
    host.style.setProperty('width', '100%', 'important');
    host.style.setProperty('max-width', 'none', 'important');
    host.style.setProperty('height', 'auto', 'important');
    host.style.setProperty('min-height', '700px', 'important');
    host.style.setProperty('margin', '0', 'important');
    host.style.setProperty('padding', '0', 'important');
    host.style.setProperty('overflow', 'hidden', 'important');
    host.style.setProperty('background', '#1d1b18', 'important');
    host.style.setProperty('visibility', 'visible', 'important');
    host.style.setProperty('opacity', '1', 'important');

    const frame = document.createElement('iframe');
    frame.src = '/client-demos/client-8889/architectured/handbook';
    frame.title = 'NGUYEN Architecture & Engineering Project Handbook';
    frame.setAttribute('loading', 'eager');
    frame.style.setProperty('display', 'block', 'important');
    frame.style.setProperty('width', '100%', 'important');
    frame.style.setProperty('height', '700px', 'important');
    frame.style.setProperty('border', '0', 'important');
    frame.style.setProperty('background', '#1d1b18', 'important');
    frame.style.setProperty('visibility', 'visible', 'important');
    frame.style.setProperty('opacity', '1', 'important');

    host.appendChild(frame);
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
    if (!document.querySelector('[data-td-exact-concept04-handbook="true"]')) schedule();
  });

  observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true });
  document.addEventListener('DOMContentLoaded', schedule, { once: true });
  window.addEventListener('load', schedule, { once: true });
  window.addEventListener('resize', schedule, { passive: true });
  schedule();
  [50, 120, 250, 500, 900, 1500, 2500, 4000, 7000].forEach((delay) => window.setTimeout(schedule, delay));
})();
</script>`

export async function GET() {
  const response = await getHandbookDemo()
  if (!response.ok) return response

  let html = await response.text()
  html = html.replace("</body>", `${EXACT_TESTIMONIAL_REPLACEMENT}</body>`)

  const headers = new Headers(response.headers)
  headers.set("Content-Type", "text/html; charset=utf-8")
  headers.set("Cache-Control", "no-store, max-age=0, must-revalidate")
  headers.set("Pragma", "no-cache")
  headers.set("Expires", "0")
  headers.delete("Content-Encoding")
  headers.delete("Content-Length")

  return new Response(html, {
    status: response.status,
    headers,
  })
}
