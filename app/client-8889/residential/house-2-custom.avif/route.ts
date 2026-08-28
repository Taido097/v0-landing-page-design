import { createHash } from "node:crypto"
import sharp from "sharp"
import chunk0 from "../../../../lib/client8889-house2-avif/chunk0"
import chunk1 from "../../../../lib/client8889-house2-avif/chunk1"
import chunk2 from "../../../../lib/client8889-house2-avif/chunk2"
import chunk3 from "../../../../lib/client8889-house2-avif/chunk3"
import chunk4 from "../../../../lib/client8889-house2-avif/chunk4"

export const runtime = "nodejs"
export const dynamic = "force-static"

const SOURCE_LENGTH = 20628
const SOURCE_SHA256 = "aaa18508f3ea5a28203db6032c6ca2c7c4c9f7ba605030ce4e7d0a87e89f8cd5"
const sourceImage = Buffer.from([chunk0, chunk1, chunk2, chunk3, chunk4].join(""), "base64")
const sourceDigest = createHash("sha256").update(sourceImage).digest("hex")

if (sourceImage.byteLength !== SOURCE_LENGTH || sourceDigest !== SOURCE_SHA256) {
  throw new Error(`Custom Home source integrity check failed: ${sourceImage.byteLength} bytes / ${sourceDigest}`)
}

const fourKImagePromise = sharp(sourceImage)
  .resize({ width: 3840, kernel: sharp.kernel.lanczos3, withoutEnlargement: false })
  .sharpen({ sigma: 1.15 })
  .avif({ quality: 90, effort: 4, chromaSubsampling: "4:4:4" })
  .toBuffer()

export async function GET() {
  const image = await fourKImagePromise
  const digest = createHash("sha256").update(image).digest("hex")

  return new Response(new Uint8Array(image), {
    status: 200,
    headers: {
      "Content-Type": "image/avif",
      "Content-Length": String(image.byteLength),
      "Cache-Control": "public, max-age=31536000, immutable",
      ETag: `"${digest}"`,
      "X-Image-SHA256": digest,
      "X-Image-Width": "3840",
      "X-Image-Source-SHA256": SOURCE_SHA256,
    },
  })
}
