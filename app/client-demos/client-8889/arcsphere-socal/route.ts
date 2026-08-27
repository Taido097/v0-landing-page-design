import { GET as getConcept } from "../arcsphere/route"

const OLD_COPY = 'Based in Orange County, we provide commercial architecture, engineering and permit support from existing-condition survey and business layout through plan check and approval.'
const NEW_COPY = 'Based in Southern California, we provide residential and commercial architecture, engineering, and permit support from concept through approval.'

export async function GET() {
  const response = await getConcept()
  if (!response.ok) return response

  const html = await response.text()
  const patched = html.split(OLD_COPY).join(NEW_COPY)

  const headers = new Headers(response.headers)
  headers.set('Content-Type', 'text/html; charset=utf-8')
  headers.set('Cache-Control', 'no-store')

  return new Response(patched, { status: response.status, headers })
}
