import { NextRequest, NextResponse } from 'next/server';

const NGUYEN_CONCEPT04 = '/client-demos/client-8889/architectured';
const NGUYEN_CONCEPT04_STABLE = '/client-demos/client-8889/architectured/stable';
const NGUYEN_PROJECTS = '/client-demos/client-8889/architectured/projects';
const NGUYEN_PROJECTS_FIXED = '/client-demos/client-8889/architectured/projects/fixed';

export function proxy(request: NextRequest) {
  const rewriteUrl = request.nextUrl.clone();

  if (request.nextUrl.pathname === NGUYEN_CONCEPT04) {
    rewriteUrl.pathname = NGUYEN_CONCEPT04_STABLE;
    return NextResponse.rewrite(rewriteUrl);
  }

  if (request.nextUrl.pathname === NGUYEN_PROJECTS) {
    rewriteUrl.pathname = NGUYEN_PROJECTS_FIXED;
    return NextResponse.rewrite(rewriteUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/client-demos/client-8889/architectured',
    '/client-demos/client-8889/architectured/projects',
  ],
};
