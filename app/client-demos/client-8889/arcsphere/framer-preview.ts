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
  // Concept 1 already runs each patch immediately and once again on DOMContentLoaded.
  // The old implementation then rescanned the entire document every 250–300 ms
  // for several seconds. Those full-DOM scans compete with Framer's animation
  // runtime on the main thread while the user is scrolling. Replace the polling
  // loops with one final post-load pass so hydration changes are still captured.
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

function optimizeImageDecoding(html: string) {
  let imageIndex = 0;

  return html.replace(/<img\b[^>]*>/gi, (tag) => {
    const currentIndex = imageIndex++;
    let optimized = tag;

    // Async decoding avoids large image decodes blocking scroll frames while
    // preserving the same source, sizing, crop, and responsive image behavior.
    if (!/\bdecoding\s*=/i.test(optimized)) {
      optimized = optimized.replace(/<img\b/i, '<img decoding="async"');
    }

    // Keep the initial responsive/hero image set eager. Lower-page images can be
    // deferred until they approach the viewport, reducing initial decode pressure.
    if (currentIndex >= 6 && !/\bloading\s*=/i.test(optimized)) {
      optimized = optimized.replace(/<img\b/i, '<img loading="lazy"');
    }

    return optimized;
  });
}

function preserveApprovedUppercaseLabels(html: string) {
  // Keep these approved Concept 1 labels visually consistent in all caps.
  html = html
    .replace(/>(\s*)services(\s*)</gi, '>$1SERVICES$2<')
    .replace(/NGUYEN Architecture &amp; Engineering/g, 'NGUYEN ARCHITECTURE &amp; ENGINEERING')
    .replace(/NGUYEN Architecture & Engineering/g, 'NGUYEN ARCHITECTURE & ENGINEERING');

  // Framer can hydrate its original casing after the server response. CSS text
  // transformation preserves the requested display without another DOM polling loop.
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
