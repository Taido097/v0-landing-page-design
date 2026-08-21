import { NextRequest, NextResponse } from 'next/server';

const NGUYEN_CONCEPT04 = '/client-demos/client-8889/architectured';
const NGUYEN_CONCEPT04_FIXED = '/client-demos/client-8889/architectured/fixed';

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname !== NGUYEN_CONCEPT04) return NextResponse.next();

  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = NGUYEN_CONCEPT04_FIXED;
  return NextResponse.rewrite(rewriteUrl);
}

export const config = {
  matcher: ['/client-demos/client-8889/architectured'],
};
