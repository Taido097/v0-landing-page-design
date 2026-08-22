import { HBX01 } from "../exact/hbx01"
import { HBX02 } from "../exact/hbx02"
import { HBX03 } from "../exact/hbx03"
import { HBX04 } from "../exact/hbx04"
import { HBX05 } from "../exact/hbx05"
import { HBX06 } from "../exact/hbx06"
import { HBX07 } from "../exact/hbx07"
import { HBX08 } from "../exact/hbx08"
import { HBX09 } from "../exact/hbx09"
import { HBX10 } from "../exact/hbx10"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const runtime = "nodejs"

export async function GET() {
  const base64 = `${HBX01}${HBX02}${HBX03}${HBX04}${HBX05}${HBX06}${HBX07}${HBX08}${HBX09}${HBX10}`
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
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Handbook-Bytes": String(bytes.length),
      "X-Handbook-Signature": "RIFF/WEBP",
    },
  })
}
