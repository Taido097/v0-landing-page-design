import { renderNguyenPage, type NguyenPage } from './site';

const PERFORMANCE_HEAD = `
<link rel="preconnect" href="https://framerusercontent.com" crossorigin>
<link rel="dns-prefetch" href="https://framerusercontent.com">
<style id="nguyen-performance-tuning">
  .nguyen-service-card,
  .nguyen-process > div,
  .nguyen-contact-card iframe {
    content-visibility: auto;
    contain-intrinsic-size: auto 320px;
  }
  img { image-rendering: auto; }
  @media (max-width: 850px) {
    body { overflow-x: clip; }
    .nguyen-official-detail { contain: layout style; }
  }
</style>`;

function optimizeImages(html: string) {
  let index = 0;
  return html.replace(/<img\b[^>]*>/gi, (tag) => {
    const current = index++;
    let next = tag;

    if (!/\bdecoding=/i.test(next)) next = next.replace(/<img\b/i, '<img decoding="async"');
    if (current > 1 && !/\bloading=/i.test(next)) next = next.replace(/<img\b/i, '<img loading="lazy"');
    if (current === 0 && !/\bfetchpriority=/i.test(next)) next = next.replace(/<img\b/i, '<img fetchpriority="high"');

    return next;
  });
}

function reduceStartupWork(html: string) {
  return html
    .replace('if (runs > 16) clearInterval(timer);', 'if (runs > 6) clearInterval(timer);')
    .replace('if (runs > 18) clearInterval(timer);', 'if (runs > 7) clearInterval(timer);');
}

function addPerformanceHints(html: string) {
  if (html.includes('id="nguyen-performance-tuning"')) return html;
  return html.replace(/<\/head>/i, `${PERFORMANCE_HEAD}</head>`);
}

export async function renderNguyenLaunchPage(page: NguyenPage) {
  const original = await renderNguyenPage(page);
  let html = await original.text();

  html = addPerformanceHints(html);
  html = optimizeImages(html);
  html = reduceStartupWork(html);

  const headers = new Headers(original.headers);
  headers.set('Content-Type', 'text/html; charset=utf-8');
  headers.set('Cache-Control', 'public, max-age=60, s-maxage=3600, stale-while-revalidate=86400');
  headers.set('CDN-Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  headers.set('X-Content-Type-Options', 'nosniff');

  return new Response(html, {
    status: original.status,
    headers,
  });
}
