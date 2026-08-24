function removeFramerTelemetry(html: string) {
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

function removeRepeatedDomPolling(html: string) {
  // Full-page polling was competing with Framer's scroll/motion runtime.
  return html
    .replace(
      "  let runs = 0;\n  const timer = setInterval(() => {\n    rewriteLinks();\n    runs += 1;\n    if (runs > 16) clearInterval(timer);\n  }, 300);",
      "  window.addEventListener('load', () => requestAnimationFrame(rewriteLinks), { once: true });",
    )
    .replace(
      "  let runs = 0;\n  const timer = setInterval(() => { patch(); runs += 1; if (runs > 18) clearInterval(timer); }, 250);",
      "  window.addEventListener('load', () => requestAnimationFrame(patch), { once: true });",
    );
}

function deferInjectedPatchesUntilAfterHydration(html: string) {
  // The NGUYEN content/nav scripts are injected at the end of the body. Classic
  // scripts execute during parsing, before Framer's deferred module hydration.
  // Mutating Framer-owned text that early can trigger a large hydration rebuild
  // right as its scroll animations are starting. Wrap only our two patch scripts
  // so they run once after load, during browser idle time. Framer itself is left
  // completely untouched.
  return html.replace(
    /<script id="(nguyen-official-(?:content|nav)-patch)">([\s\S]*?)<\/script>/gi,
    (_match, id: string, body: string) => `
<script id="${id}">
window.addEventListener('load', () => {
  const runPatch = () => {
${body}
  };
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(runPatch);
  } else {
    window.setTimeout(runPatch, 120);
  }
}, { once: true });
</script>`,
  );
}

function optimizeImageDecoding(html: string) {
  let imageIndex = 0;

  return html.replace(/<img\b[^>]*>/gi, (tag) => {
    const currentIndex = imageIndex++;
    let optimized = tag;

    if (!/\bdecoding\s*=/i.test(optimized)) {
      optimized = optimized.replace(/<img\b/i, '<img decoding="async"');
    }

    // Preserve the exact initial hero behavior. Only lower-page images are lazy.
    if (currentIndex >= 6 && !/\bloading\s*=/i.test(optimized)) {
      optimized = optimized.replace(/<img\b/i, '<img loading="lazy"');
    }

    return optimized;
  });
}

function preserveApprovedUppercaseLabels(html: string) {
  html = html
    .replace(/>(\s*)services(\s*)</gi, '>$1SERVICES$2<')
    .replace(/NGUYEN Architecture &amp; Engineering/g, 'NGUYEN ARCHITECTURE &amp; ENGINEERING')
    .replace(/NGUYEN Architecture & Engineering/g, 'NGUYEN ARCHITECTURE & ENGINEERING');

  const uppercaseStyle = `<style id="nguyen-approved-uppercase">
    a[href*="#services"] { text-transform: uppercase !important; }
    a[href="https://arcsphere-studio.framer.website/"],
    a[href="https://arcsphere-studio.framer.website"] { text-transform: uppercase !important; }
  </style>`;

  return html.replace(/<\/head>/i, `${uppercaseStyle}</head>`);
}

export async function stabilizeFramerPreview(response: Response) {
  let html = await response.text();

  html = removeFramerTelemetry(html);
  html = removeRepeatedDomPolling(html);
  html = deferInjectedPatchesUntilAfterHydration(html);
  html = optimizeImageDecoding(html);
  html = preserveApprovedUppercaseLabels(html);

  const headers = new Headers(response.headers);
  headers.delete('content-length');

  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
