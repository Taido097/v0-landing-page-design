import { GET as getHandbookDemo } from "./route-handbook-live"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  return getHandbookDemo()
}
