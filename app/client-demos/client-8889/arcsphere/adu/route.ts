import { renderNguyenLaunchPage } from '../launch';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  return renderNguyenLaunchPage('adu');
}
