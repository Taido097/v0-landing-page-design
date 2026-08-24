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

function topDeclarations(html: string, property: string) {
  const expression = new RegExp(`${property}\\s*:[^;}]+`, 'gi');
  const frequency = new Map<string, number>();
  for (const match of html.match(expression) || []) {
    const normalized = match.replace(/\\s+/g, ' ').trim().toLowerCase();
    frequency.set(normalized, (frequency.get(normalized) || 0) + 1);
  }
  return [...frequency.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12);
}

function profileRenderComplexity(html: string) {
  const count = (pattern: RegExp) => (html.match(pattern) || []).length;
  console.log('[concept1-profile]', JSON.stringify({
    bytes: Buffer.byteLength(html, 'utf8'),
    images: count(/<img\b/gi),
    spans: count(/<span\b/gi),
    scripts: count(/<script\b/gi),
    framerAppearNodes: count(/data-framer-appear-id/gi),
    transforms: count(/transform\s*:/gi),
    willChange: count(/will-change\s*:/gi),
    filters: count(/filter\s*:/gi),
    blurFunctions: count(/blur\s*\(/gi),
    brightnessFunctions: count(/brightness\s*\(/gi),
    backdropFilters: count(/backdrop-filter\s*:/gi),
    fixedPositions: count(/position\s*:\s*fixed/gi),
    stickyPositions: count(/position\s*:\s*sticky/gi),
    animations: count(/animation\s*:/gi),
    transitions: count(/transition\s*:/gi),
    topFilters: topDeclarations(html, 'filter'),
    topWillChange: topDeclarations(html, 'will-change'),
  }));
}

export async function stabilizeFramerPreview(response: Response) {
  let html = await response.text();

  profileRenderComplexity(html);
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
