import { createHash } from "node:crypto"

export const runtime = "nodejs"
export const dynamic = "force-static"

const SOURCE_URL = "https://sdmntprwestus3.oaiusercontent.com/files/00000000-9828-81fd-bc3c-1512eaed2dad/raw?se=2026-08-28T19%3A42%3A29Z&sp=r&sv=2026-02-06&sr=b&scid=dc2710f5-f51b-510f-bdf6-908001e38151&skoid=b9a47e8b-72a2-4ed3-8028-a2a98c1a6142&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2026-08-28T15%3A43%3A03Z&ske=2026-08-29T15%3A43%3A03Z&sks=b&skv=2026-02-06&sig=R8tHYK43f2EW/bSOSL4DWDYnVcIZby6NZSDzOs2Hgsw%3D"
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
