import { GET as getFullDemo } from "../arcsphere-socal/route"

const INTERACTION_ONLY_SCRIPT_IDS = [
  "nguyen-socal-card-routing",
  "nguyen-socal-hero-cta-patch",
] as const

function stripScriptById(html: string, id: string) {
  const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  return html.replace(
    new RegExp(`<script\\s+id=["']${escapedId}["'][^>]*>[\\s\\S]*?<\\/script>`, "gi"),
    "",
  )
}

export async function GET() {
  const response = await getFullDemo()
  if (!response.ok) return response

  let html = await response.text()
  for (const id of INTERACTION_ONLY_SCRIPT_IDS) html = stripScriptById(html, id)

  html = html.replace(
    "</head>",
    `<style id="nguyen-socal-preview-performance">
html, body { scroll-behavior: auto !important; }
html { background: #fff; }
</style></head>`,
  )

  const headers = new Headers(response.headers)
  headers.set("Content-Type", "text/html; charset=utf-8")
  headers.set("Cache-Control", "public, max-age=30, s-maxage=300, stale-while-revalidate=300")
  headers.set("X-Robots-Tag", "noindex, nofollow")

  return new Response(html, { status: response.status, headers })
}
