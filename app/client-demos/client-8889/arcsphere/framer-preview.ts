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

  const headers = new Headers(response.headers);
  headers.delete('content-length');

  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
