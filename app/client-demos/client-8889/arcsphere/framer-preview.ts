export async function stabilizeFramerPreview(response: Response) {
  let html = await response.text();

  // Framer's analytics script is not required for rendering or motion. Inside
  // protected Vercel previews it can emit opaque browser error events such as
  // { isTrusted: true }, which Vercel surfaces as runtime errors.
  html = html
    .replace(
      /<script\b(?=[^>]*\bsrc=["']https:\/\/events\.framer\.com\/script(?:\?[^"']*)?["'])[^>]*>\s*<\/script>/gi,
      '',
    )
    .replace(
      /<link\b(?=[^>]*\bhref=["']https:\/\/events\.framer\.com\/[^"']*["'])[^>]*>/gi,
      '',
    );

  // Keep these approved Concept 1 labels visually consistent in all caps.
  html = html
    .replace(/>(\s*)services(\s*)</gi, '>$1SERVICES$2<')
    .replace(/NGUYEN Architecture &amp; Engineering/g, 'NGUYEN ARCHITECTURE &amp; ENGINEERING')
    .replace(/NGUYEN Architecture & Engineering/g, 'NGUYEN ARCHITECTURE & ENGINEERING');

  // Framer can restore its original text casing during hydration. Force the
  // two requested navigation/brand links to remain uppercase visually.
  const uppercaseStyle = `<style id="nguyen-uppercase-labels">
    a[href="https://arcsphere-studio.framer.website/#services"],
    a[href="#services"],
    a[href$="#services"],
    a[href="https://arcsphere-studio.framer.website/"],
    a[href="/"] {
      text-transform: uppercase !important;
    }
  </style>`;
  html = html.replace(/<\/head>/i, `${uppercaseStyle}</head>`);

  const headers = new Headers(response.headers);
  headers.delete('content-length');

  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
