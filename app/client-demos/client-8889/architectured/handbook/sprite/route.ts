import { HB240_1 } from "../../branded/handbook-image-1"
import { HB240_2 } from "../../branded/handbook-image-2"
import { HB240_3 } from "../../branded/handbook-image-3"
import { HB240_4 } from "../../branded/handbook-image-4"
import { HB240_5 } from "../../branded/handbook-image-5"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const runtime = "nodejs"

export async function GET() {
  const dataUrl = HB240_1 + HB240_2 + HB240_3 + HB240_4 + HB240_5
  const base64 = dataUrl.replace(/^data:image\/webp;base64,/, "")
  const bytes = Buffer.from(base64, "base64")
  const riff = bytes.subarray(0, 4).toString("ascii")
  const webp = bytes.subarray(8, 12).toString("ascii")

  if (riff !== "RIFF" || webp !== "WEBP") {
    return new Response("Invalid handbook image payload", {
      status: 500,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Handbook-Bytes": String(bytes.length),
        "X-Handbook-Signature": `${riff}/${webp}`,
      },
    })
  }

  return new Response(bytes, {
    status: 200,
    headers: {
      "Content-Type": "image/webp",
      "Content-Length": String(bytes.length),
      "Cache-Control": "public, max-age=0, must-revalidate",
      "X-Handbook-Bytes": String(bytes.length),
      "X-Handbook-Signature": "RIFF/WEBP",
    },
  })
}
