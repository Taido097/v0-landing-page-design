import part1 from './chunks/part1';
import part2 from './chunks/part2';
import part3 from './chunks/part3';
import part4 from './chunks/part4';
import part5 from './chunks/part5';
import part6 from './chunks/part6';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  const base64 = part1 + part2 + part3 + part4 + part5 + part6;
  const bytes = Buffer.from(base64, 'base64');

  return new Response(bytes, {
    status: 200,
    headers: {
      'Content-Type': 'image/webp',
      'Content-Length': String(bytes.byteLength),
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
