export const dynamic = 'force-dynamic'
export const revalidate = 0

const SOURCE_URL = 'https://architectured.framer.website/'

function snippetsAround(html: string, needle: string, radius = 5000) {
  const out: Array<{ index: number; snippet: string }> = []
  let start = 0
  while (out.length < 8) {
    const index = html.indexOf(needle, start)
    if (index < 0) break
    out.push({
      index,
      snippet: html.slice(Math.max(0, index - radius), Math.min(html.length, index + needle.length + radius)),
    })
    start = index + needle.length
  }
  return out
}

export async function GET() {
  const response = await fetch(SOURCE_URL, {
    cache: 'no-store',
    headers: { 'User-Agent': 'Mozilla/5.0' },
  })
  const html = await response.text()

  const colorMatches = html.match(/#[0-9a-fA-F]{6}\b/g) || []
  const colors = Array.from(
    colorMatches.reduce((map, value) => {
      const key = value.toLowerCase()
      map.set(key, (map.get(key) || 0) + 1)
      return map
    }, new Map<string, number>()),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 50)

  return Response.json({
    status: response.status,
    length: html.length,
    architecturalDesign: snippetsAround(html, 'Architectural Design'),
    sitePlanning: snippetsAround(html, 'Site Planning'),
    showDetails: snippetsAround(html, 'Show Details'),
    colors,
  })
}
