// Final Concept 04 handbook mount: targets the exact Framer Testimonial 1 section.
import { GET as getHandbookDemo } from "./route-handbook-live"

export const dynamic = "force-dynamic"
export const revalidate = 0

const EXACT_TESTIMONIAL_REPLACEMENT = String.raw`<script id="td-exact-concept04-handbook-replacement">
(() => {
  function findCurrentTestimonialSection() {
    return document.querySelector('section[data-framer-name="Testimonial 1"]')
      || document.querySelector('[data-framer-name="Testimonial 1"]')
      || document.getElementById('testimonial');
  }

  function mount() {
    const host = findCurrentTestimonialSection();
    if (!host) return false;
    if (host.getAttribute('data-td-exact-concept04-handbook') === 'true') return true;

    host.innerHTML = '';
    host.setAttribute('data-td-exact-concept04-handbook', 'true');
    host.removeAttribute('data-td-nguyen-handbook-host');

    host.style.setProperty('display', 'block', 'important');
    host.style.setProperty('position', 'relative', 'important');
    host.style.setProperty('width', '100%', 'important');
    host.style.setProperty('max-width', 'none', 'important');
    host.style.setProperty('height', 'auto', 'important');
    host.style.setProperty('min-height', '760px', 'important');
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
    frame.setAttribute('data-td-handbook-frame', 'true');
    frame.style.setProperty('display', 'block', 'important');
    frame.style.setProperty('width', '100%', 'important');
    frame.style.setProperty('height', '760px', 'important');
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
    const host = findCurrentTestimonialSection();
    if (!host || host.getAttribute('data-td-exact-concept04-handbook') !== 'true') schedule();
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener('DOMContentLoaded', schedule, { once: true });
  window.addEventListener('load', schedule, { once: true });
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
