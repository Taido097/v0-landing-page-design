import { NextRequest, NextResponse } from "next/server"

const NGUYEN_CONCEPT04 = "/client-demos/client-8889/architectured"

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === NGUYEN_CONCEPT04) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/client-demos/client-8889/architectured"],
}
