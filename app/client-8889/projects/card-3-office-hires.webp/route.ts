import part1 from "./chunks/part1"
import part2a from "./chunks/part2a"
import part2b from "./chunks/part2b"
import part2c from "./chunks/part2c"
import part3 from "./chunks/part3"
import part4a from "./chunks/part4a"
import part4b from "./chunks/part4b"
import part4c from "./chunks/part4c"
import part5 from "./chunks/part5"
import part6 from "./chunks/part6"
import part7 from "./chunks/part7"

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET() {
  const base64 = part1 + part2a + part2b + part2c + part3 + part4a + part4b + part4c + part5 + part6 + part7
  const bytes = Buffer.from(base64, "base64")

  return new Response(bytes, {
    status: 200,
    headers: {
      "Content-Type": "image/webp",
      "Content-Length": String(bytes.byteLength),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  })
}
