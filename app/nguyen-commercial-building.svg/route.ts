export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(request: Request) {
  const url = new URL(request.url)
  return Response.redirect(new URL("/client-8889/projects/card-3-office-hires.webp?v=20260825-clean", url.origin), 307)
}
