import chunk0 from "@/lib/client8889-uploaded-house-small/chunk0"
import chunk1 from "@/lib/client8889-uploaded-house-small/chunk1"
import chunk2 from "@/lib/client8889-uploaded-house-small/chunk2"
import chunk3 from "@/lib/client8889-uploaded-house-small/chunk3"

export async function GET() {
  const body = Buffer.from(chunk0 + chunk1 + chunk2 + chunk3, "base64")

  return new Response(body, {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}
