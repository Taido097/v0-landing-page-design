import { renderNguyenPage } from '../site';

export const revalidate = 3600;

export async function GET() {
  return renderNguyenPage('adu');
}
