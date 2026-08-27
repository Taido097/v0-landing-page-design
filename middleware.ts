import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/client-demos/client-8889/arcsphere') {
    const url = request.nextUrl.clone()
    url.pathname = '/client-demos/client-8889/arcsphere-imagefix'
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/client-demos/client-8889/arcsphere'],
}
