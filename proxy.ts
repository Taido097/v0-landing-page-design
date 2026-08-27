import { NextRequest, NextResponse } from "next/server"

const NGUYEN_CONCEPT01 = "/client-demos/client-8889/arcsphere"
const NGUYEN_CONCEPT01_SOCAL = "/client-demos/client-8889/arcsphere-socal"
const NGUYEN_CONCEPT01_SAFE = "/client-demos/client-8889/arcsphere-imagefix"
const NGUYEN_CONCEPT04 = "/client-demos/client-8889/architectured"

export function proxy(request: NextRequest) {
  if (
    request.nextUrl.pathname === NGUYEN_CONCEPT01 ||
    request.nextUrl.pathname === NGUYEN_CONCEPT01_SOCAL
  ) {
    const url = request.nextUrl.clone()
    url.pathname = NGUYEN_CONCEPT01_SAFE
    return NextResponse.rewrite(url)
  }

  if (request.nextUrl.pathname === NGUYEN_CONCEPT04) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/client-demos/client-8889/arcsphere",
    "/client-demos/client-8889/arcsphere-socal",
    "/client-demos/client-8889/architectured",
  ],
}
