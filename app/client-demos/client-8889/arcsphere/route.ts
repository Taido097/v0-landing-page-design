import { renderNguyenPage } from './site';

// Fresh restore commit so Vercel redeploys the last working Concept 1 build.
export const revalidate = 3600;

export async function GET() {
  return renderNguyenPage('home');
}
