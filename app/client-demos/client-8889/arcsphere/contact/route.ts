import { renderNguyenLaunchPage } from '../launch';

export const revalidate = 3600;

export async function GET() {
  return renderNguyenLaunchPage('contact');
}
