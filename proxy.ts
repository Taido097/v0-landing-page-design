import { NextRequest, NextResponse } from "next/server"

const NGUYEN_CONCEPT04 = "/client-demos/client-8889/architectured"
const NGUYEN_CARD3_IMAGE = "/nguyen-commercial-building.svg"
const NGUYEN_CARD3_HIRES = "/client-8889/projects/minimalist-apartment-interior-hires"

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === NGUYEN_CARD3_IMAGE) {
    const url = request.nextUrl.clone()
    url.pathname = NGUYEN_CARD3_HIRES
    url.search = ""
    return NextResponse.rewrite(url)
  }

  if (request.nextUrl.pathname === NGUYEN_CONCEPT04) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/client-demos/client-8889/architectured",
    "/nguyen-commercial-building.svg",
  ],
}
