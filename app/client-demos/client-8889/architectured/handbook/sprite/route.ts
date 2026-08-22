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
import { HBX11a } from "../exact/hbx11a"
import { HBX11b } from "../exact/hbx11b"
import { HBX12a } from "../exact/hbx12a"
import { HBX12b } from "../exact/hbx12b"
import { HBX13a } from "../exact/hbx13a"
import { HBX13b } from "../exact/hbx13b"
import { HBX14a } from "../exact/hbx14a"
import { HBX14b } from "../exact/hbx14b"
import { HBX15a } from "../exact/hbx15a"
import { HBX15b } from "../exact/hbx15b"
import { HBX16 } from "../exact/hbx16"

export const dynamic = "force-dynamic"
export const revalidate = 0
export const runtime = "nodejs"

const EXPECTED_BYTES = 173522

export async function GET() {
  const base64 = `${HBX01}${HBX02}${HBX03}${HBX04}${HBX05}${HBX06}${HBX07}${HBX08}${HBX09}${HBX10}${HBX11a}${HBX11b}${HBX12a}${HBX12b}${HBX13a}${HBX13b}${HBX14a}${HBX14b}${HBX15a}${HBX15b}${HBX16}`
  const bytes = Buffer.from(base64, "base64")
  const riff = bytes.subarray(0, 4).toString("ascii")
  const webp = bytes.subarray(8, 12).toString("ascii")

  if (bytes.length !== EXPECTED_BYTES || riff !== "RIFF" || webp !== "WEBP") {
    return new Response("Invalid or incomplete handbook image payload", {
      status: 500,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Handbook-Bytes": String(bytes.length),
        "X-Handbook-Expected-Bytes": String(EXPECTED_BYTES),
        "X-Handbook-Signature": `${riff}/${webp}`,
      },
    })
  }

  return new Response(bytes, {
    status: 200,
    headers: {
      "Content-Type": "image/webp",
      "Content-Length": String(bytes.length),
      "Cache-Control": "no-store, max-age=0, must-revalidate",
      "X-Handbook-Bytes": String(bytes.length),
      "X-Handbook-Expected-Bytes": String(EXPECTED_BYTES),
      "X-Handbook-Signature": "RIFF/WEBP",
    },
  })
}
