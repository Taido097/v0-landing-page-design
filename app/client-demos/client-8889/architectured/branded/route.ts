import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
export const revalidate = 0

export function GET(request: Request) {
  const url = new URL(request.url)
  url.pathname = "/client-demos/client-8889/architectured"
  url.search = ""
  return NextResponse.redirect(url, 307)
}
