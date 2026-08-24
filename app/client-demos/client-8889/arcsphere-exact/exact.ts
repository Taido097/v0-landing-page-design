import { renderNguyenPage, type NguyenPage } from '../arcsphere/site';

const CURRENT_BASE = '/client-demos/client-8889/arcsphere';
const EXACT_BASE = '/client-demos/client-8889/arcsphere-exact';

export async function renderExactNguyenPage(page: NguyenPage) {
  const response = await renderNguyenPage(page);
  let html = await response.text();

  // Preserve the original Framer output and motion runtime exactly. The only
  // change in this version is keeping internal navigation inside this copy.
  html = html.replaceAll(CURRENT_BASE, EXACT_BASE);

  const headers = new Headers(response.headers);
  headers.delete('content-length');

  return new Response(html, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
