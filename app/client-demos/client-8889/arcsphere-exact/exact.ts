import { renderNguyenPage, type NguyenPage } from '../arcsphere/site';

const CURRENT_BASE = '/client-demos/client-8889/arcsphere';
const EXACT_BASE = '/client-demos/client-8889/arcsphere-exact';

function removeNonVisualTelemetry(html: string) {
  return html
    .replace(
      /<script\b(?=[^>]*\bsrc=["']https:\/\/events\.framer\.com\/script(?:\?[^"']*)?["'])[^>]*>\s*<\/script>/gi,
      '',
    )
    .replace(
      /<link\b(?=[^>]*\bhref=["']https:\/\/events\.framer\.com\/[^"']*["'])[^>]*>/gi,
      '',
    );
}

function removeNguyenPollingLoops(html: string) {
  // These loops belong to our content/navigation adaptation layer, not Framer.
  // Keep a single patch pass so the visible result stays identical, but stop
  // repeatedly walking the full document while Framer animates.
  return html
    .replace(
      "  let runs = 0;\n  const timer = setInterval(() => {\n    rewriteLinks();\n    runs += 1;\n    if (runs > 16) clearInterval(timer);\n  }, 300);",
      '',
    )
    .replace(
      "  let runs = 0;\n  const timer = setInterval(() => { patch(); runs += 1; if (runs > 18) clearInterval(timer); }, 250);",
      '',
    );
}

function scheduleNguyenHelperWork(html: string) {
  // The adaptation scripts were doing one synchronous full-DOM pass and then a
  // second pass on DOMContentLoaded. Schedule exactly one pass on the browser's
  // next animation frame instead. This changes no Framer animation definition,
  // timing, easing, keyframe, transform, filter, motion path, or interaction.
  return html
    .replace(
      "  rewriteLinks();\n  document.addEventListener('DOMContentLoaded', rewriteLinks, { once: true });",
      "  const scheduleRewrite = () => requestAnimationFrame(rewriteLinks);\n  if (document.readyState === 'loading') {\n    document.addEventListener('DOMContentLoaded', scheduleRewrite, { once: true });\n  } else {\n    scheduleRewrite();\n  }",
    )
    .replace(
      "  patch();\n  document.addEventListener('DOMContentLoaded', patch, { once: true });",
      "  const schedulePatch = () => requestAnimationFrame(patch);\n  if (document.readyState === 'loading') {\n    document.addEventListener('DOMContentLoaded', schedulePatch, { once: true });\n  } else {\n    schedulePatch();\n  }",
    );
}

export async function renderExactNguyenPage(page: NguyenPage) {
  const response = await renderNguyenPage(page);
  let html = await response.text();

  // Keep the original Framer output and motion runtime unchanged. Only remove
  // non-visual background work added by our wrapper and keep navigation inside
  // this exact-animation copy.
  html = removeNonVisualTelemetry(html);
  html = removeNguyenPollingLoops(html);
  html = scheduleNguyenHelperWork(html);
  html = html.replaceAll(CURRENT_BASE, EXACT_BASE);

  const headers = new Headers(response.headers);
  headers.delete('content-length');

  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
