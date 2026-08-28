import { NextRequest, NextResponse } from "next/server"

const NGUYEN_CONCEPT01 = "/client-demos/client-8889/arcsphere"
const NGUYEN_CONCEPT01_DESKTOP = "/client-demos/client-8889/arcsphere-targetfix"
const NGUYEN_CONCEPT01_MOBILE = "/client-demos/client-8889/arcsphere-mobile"
const NGUYEN_CONCEPT04 = "/client-demos/client-8889/architectured"

function isMobileRequest(request: NextRequest) {
  const userAgent = request.headers.get("user-agent") || ""
  return /Android|iPhone|iPad|iPod|Mobile|IEMobile|Opera Mini/i.test(userAgent)
}

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === NGUYEN_CONCEPT01) {
    const url = request.nextUrl.clone()
    url.pathname = isMobileRequest(request)
      ? NGUYEN_CONCEPT01_MOBILE
      : NGUYEN_CONCEPT01_DESKTOP
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
