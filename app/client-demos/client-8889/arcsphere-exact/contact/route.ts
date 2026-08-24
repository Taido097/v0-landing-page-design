import { renderExactNguyenPage } from '../exact';

export const revalidate = 3600;

export async function GET() {
  return renderExactNguyenPage('contact');
}
