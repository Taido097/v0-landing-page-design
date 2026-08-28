import { NextRequest, NextResponse } from "next/server"

const NGUYEN_CONCEPT01 = "/client-demos/client-8889/arcsphere"
const NGUYEN_CONCEPT01_CORRECTED = "/client-demos/client-8889/arcsphere-targetfix"
const NGUYEN_CONCEPT04 = "/client-demos/client-8889/architectured"

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === NGUYEN_CONCEPT01) {
    const url = request.nextUrl.clone()
    url.pathname = NGUYEN_CONCEPT01_CORRECTED
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
    "/client-demos/client-8889/architectured",
  ],
}
