// Concept 04: keep the live handbook mounted in the exact Framer testimonial section.
import { GET as getHandbookDemo } from "./route-handbook-live"

export const dynamic = "force-dynamic"
export const revalidate = 0

const EXACT_TESTIMONIAL_PIN = String.raw`<script id="td-concept04-handbook-pin">
(() => {
  const findTarget = () =>
    document.querySelector('section[data-framer-name="Testimonial 1"]')
    || document.querySelector('[data-framer-name="Testimonial 1"]')
    || document.getElementById('testimonial');

  const ensureTrigger = (target) => {
    if (target.querySelector('[data-td-handbook-trigger="true"]')) return;
    const trigger = document.createElement('span');
    trigger.setAttribute('data-td-handbook-trigger', 'true');
    trigger.textContent = 'Client Testimonial';
    trigger.setAttribute('aria-hidden', 'true');
    trigger.style.cssText = 'position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;clip:rect(0 0 0 0)!important;white-space:nowrap!important;opacity:0!important;pointer-events:none!important;';
    target.appendChild(trigger);
  };

  const pin = () => {
    const target = findTarget();
    if (!target) return false;

    target.setAttribute('data-td-nguyen-handbook-host', 'true');
    target.setAttribute('data-td-exact-concept04-handbook', 'true');
    ensureTrigger(target);

    const book = document.querySelector('[data-td-nguyen-handbook="true"]');
    if (!book) return false;

    const oldHost = book.parentElement;
    if (oldHost && oldHost !== target) {
      oldHost.removeAttribute('data-td-nguyen-handbook-host');
    }

    if (book.parentElement !== target) {
      target.appendChild(book);
    }

    target.querySelectorAll('[data-td-handbook-frame="true"]').forEach((node) => node.remove());
    return true;
  };

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      pin();
    });
  };

  const observer = new MutationObserver(schedule);
  observer.observe(document.documentElement, { childList: true, subtree: true, characterData: true });

  document.addEventListener('DOMContentLoaded', schedule, { once: true });
  window.addEventListener('load', schedule, { once: true });
  schedule();
  [40, 100, 180, 300, 500, 800, 1200, 1800, 2600, 4000, 6500, 9000].forEach((delay) => window.setTimeout(schedule, delay));
})();
</script>`

export async function GET() {
  const response = await getHandbookDemo()
  if (!response.ok) return response

  let html = await response.text()
  html = html.replace("</body>", `${EXACT_TESTIMONIAL_PIN}</body>`)

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
