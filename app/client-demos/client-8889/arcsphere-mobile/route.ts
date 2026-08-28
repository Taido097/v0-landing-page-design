import { GET as getBaseConcept } from "../arcsphere/route"

export async function GET() {
  return getBaseConcept()
}
