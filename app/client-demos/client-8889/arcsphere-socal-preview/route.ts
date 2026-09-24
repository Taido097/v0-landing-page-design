import { GET as getFullDemo } from "../arcsphere-socal/route"

const INTERACTION_ONLY_SCRIPT_IDS = [
  "nguyen-socal-card-routing",
  "nguyen-socal-hero-cta-patch",
] as const

const SELECTED_AUTOPLAY_PATCH = `
<script id="nguyen-socal-selected-autoplay">
(() => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('selectedAutoplay') !== '1') return;

  const holdAtTop = 450;
  const scrollDuration = 9800;
  const holdAtBottom = 750;
  const cycleDuration = holdAtTop + scrollDuration + holdAtBottom;
  const ease = (t) => 0.5 - Math.cos(Math.PI * t) / 2;

  let raf = 0;
  let startedAt = 0;
  let targetScroll = 0;
  let nextTargetRefreshAt = 0;
  let targetRefreshDeadline = 0;

  const getScroller = () => document.scrollingElement || document.documentElement;

  const refreshTarget = (now) => {
    const scroller = getScroller();
    const maxScroll = Math.max(
      0,
      scroller.scrollHeight - window.innerHeight,
      document.documentElement.scrollHeight - window.innerHeight,
      document.body ? document.body.scrollHeight - window.innerHeight : 0,
    );
    targetScroll = maxScroll * 0.5;
    nextTargetRefreshAt = now + 500;
  };

  const tick = (now) => {
    const scroller = getScroller();
    if (!scroller) {
      raf = requestAnimationFrame(tick);
      return;
    }

    if (!startedAt) {
      startedAt = now;
      targetRefreshDeadline = now + 6000;
      nextTargetRefreshAt = now;
      scroller.scrollTop = 0;
    }

    if (now <= targetRefreshDeadline && (targetScroll <= 1 || now >= nextTargetRefreshAt)) {
      refreshTarget(now);
    }

    const elapsed = (now - startedAt) % cycleDuration;
    if (elapsed < holdAtTop) {
      scroller.scrollTop = 0;
    } else if (elapsed < holdAtTop + scrollDuration) {
      const progress = (elapsed - holdAtTop) / scrollDuration;
      scroller.scrollTop = targetScroll * ease(progress);
    } else {
      scroller.scrollTop = targetScroll;
    }

    raf = requestAnimationFrame(tick);
  };

  const start = () => {
    cancelAnimationFrame(raf);
    startedAt = 0;
    targetScroll = 0;
    raf = requestAnimationFrame(tick);
  };

  if (document.readyState === 'complete') {
    window.setTimeout(start, 120);
  } else {
    window.addEventListener('load', () => window.setTimeout(start, 120), { once: true });
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(raf);
      raf = 0;
      return;
    }
    if (!raf) start();
  });
})();
</script>`

function stripScriptById(html: string, id: string) {
  const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  return html.replace(
    new RegExp(`<script\\s+id=["']${escapedId}["'][^>]*>[\\s\\S]*?<\\/script>`, "gi"),
    "",
  )
}

export async function GET() {
  const response = await getFullDemo()
  if (!response.ok) return response

  let html = await response.text()
  for (const id of INTERACTION_ONLY_SCRIPT_IDS) html = stripScriptById(html, id)

  html = html.replace(
    "</head>",
    `<style id="nguyen-socal-preview-performance">
html, body { scroll-behavior: auto !important; }
html { background: #fff; }
</style>${SELECTED_AUTOPLAY_PATCH}</head>`,
  )

  const headers = new Headers(response.headers)
  headers.set("Content-Type", "text/html; charset=utf-8")
  headers.set("Cache-Control", "public, max-age=30, s-maxage=300, stale-while-revalidate=300")
  headers.set("X-Robots-Tag", "noindex, nofollow")

  return new Response(html, { status: response.status, headers })
}
