import { createHash } from "node:crypto"

export const runtime = "nodejs"
export const dynamic = "force-static"

const SOURCE_URL = "https://designedbytd.com/client-8889/residential/house-2-custom-4k.webp?v=custom-home-4k-seed-20260828"
const EXPECTED_LENGTH = 1116206
const EXPECTED_SHA256 = "a09a773a311cd8c2e153263a569a561f066d221a82e430d30df91fc171701431"

async function getImage() {
  const response = await fetch(SOURCE_URL, { cache: "no-store" })
  if (!response.ok) {
    throw new Error(`4K Custom Home source fetch failed: ${response.status}`)
  }

  const image = Buffer.from(await response.arrayBuffer())
  const digest = createHash("sha256").update(image).digest("hex")

  if (image.byteLength !== EXPECTED_LENGTH || digest !== EXPECTED_SHA256) {
    throw new Error(`4K Custom Home image integrity check failed: ${image.byteLength} bytes / ${digest}`)
  }

  return image
}

export async function GET() {
  const image = await getImage()

  return new Response(new Uint8Array(image), {
    status: 200,
    headers: {
      "Content-Type": "image/webp",
      "Content-Length": String(EXPECTED_LENGTH),
      "Cache-Control": "public, max-age=31536000, immutable",
      ETag: `\"${EXPECTED_SHA256}\"`,
      "X-Image-SHA256": EXPECTED_SHA256,
      "X-Image-Width": "3840",
      "X-Image-Height": "2841",
    },
  })
}
