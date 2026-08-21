"use client"

import { useCallback, useEffect, useRef } from "react"

const PAGE_URLS = [
  "https://framerusercontent.com/images/QDQKylWWIf9VYDvFE8d8MTxUJ1o.png",
  "https://framerusercontent.com/images/cwOkVnjxy6x4U3eWGZEKmj7BBgo.jpg?scale-down-to=512&width=768&height=1086",
  "https://framerusercontent.com/images/OhGj99mJnab8DPy2PMfd98jhF6I.jpg?scale-down-to=1024&width=768&height=1086",
  "https://framerusercontent.com/images/lAU1MDwSV1dq0S6amUC8jsOg.jpg?scale-down-to=512&width=768&height=1086",
  "https://framerusercontent.com/images/hv0I9A0DXUdvIK6c42B46rsfzg.jpg?scale-down-to=512&width=768&height=1086",
  "https://framerusercontent.com/images/cKChIxjzaNsc5t2NxVN78mx8Q.png?scale-down-to=512&width=768&height=1086",
  "https://framerusercontent.com/images/hFP2svt3lNsx1A9P1zA6bFzdWM.png?scale-down-to=512&width=768&height=1086",
  "https://framerusercontent.com/images/7q3XJntgf3apOgAI7m0Yai1Mz0.png?scale-down-to=512&width=768&height=1086",
]

const HANDBOOK_CSS = `
[data-td-handbook-host="true"] {
  box-sizing: border-box !important;
  width: 100% !important;
  max-width: none !important;
  min-height: clamp(520px, 62vw, 790px) !important;
  padding: clamp(36px, 5vw, 76px) 20px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  overflow: visible !important;
}
[data-td-handbook-host="true"] > :not([data-td-handbook]) {
  display: none !important;
}
[data-td-handbook] {
  box-sizing: border-box !important;
  position: relative !important;
  width: min(84vw, 760px) !important;
  aspect-ratio: 678 / 480 !important;
  flex: 0 0 auto !important;
  perspective: 1400px !important;
  transform-style: preserve-3d !important;
  transition: transform 420ms ease !important;
  cursor: pointer !important;
  user-select: none !important;
  -webkit-user-select: none !important;
  touch-action: pan-y !important;
  isolation: isolate !important;
}
[data-td-handbook]::after {
  content: "";
  position: absolute;
  top: 1%;
  bottom: 1%;
  left: 50%;
  width: 2px;
  transform: translateX(-50%);
  background: linear-gradient(180deg, rgba(255,255,255,.28), rgba(0,0,0,.36), rgba(255,255,255,.16));
  opacity: .65;
  z-index: 250;
  pointer-events: none;
}
.td-hb-sheet {
  position: absolute !important;
  left: 50% !important;
  top: 0 !important;
  width: 50% !important;
  height: 100% !important;
  transform-origin: left center !important;
  transform-style: preserve-3d !important;
  transition: transform 620ms cubic-bezier(.20,.72,.12,1) !important;
  will-change: transform !important;
}
.td-hb-sheet.is-flipped {
  transform: rotateY(-180deg) !important;
}
.td-hb-face {
  position: absolute !important;
  inset: 0 !important;
  overflow: hidden !important;
  background: #fff !important;
  backface-visibility: hidden !important;
  -webkit-backface-visibility: hidden !important;
  box-shadow: 0 20px 55px rgba(0,0,0,.28) !important;
}
.td-hb-front { transform: rotateY(0deg) !important; }
.td-hb-back { transform: rotateY(180deg) !important; }
.td-hb-face img {
  display: block !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  object-position: center !important;
  pointer-events: none !important;
  -webkit-user-drag: none !important;
}
@media (max-width: 700px) {
  [data-td-handbook-host="true"] {
    min-height: 410px !important;
    padding: 28px 8px !important;
  }
  [data-td-handbook] {
    width: min(95vw, 620px) !important;
  }
}
`

export default function NguyenConcept04() {
  const frameRef = useRef<HTMLIFrameElement>(null)
  const timerRef = useRef<number[]>([])

  const mountHandbook = useCallback(() => {
    const frame = frameRef.current
    const doc = frame?.contentDocument
    if (!doc?.body) return false
    if (doc.querySelector("[data-td-handbook]")) return true

    if (!doc.getElementById("td-handbook-parent-css")) {
      const style = doc.createElement("style")
      style.id = "td-handbook-parent-css"
      style.textContent = HANDBOOK_CSS
      doc.head.appendChild(style)
    }

    const all = Array.from(doc.querySelectorAll<HTMLElement>("div,section,article,p,h1,h2,h3,h4,h5,h6,span"))
    const anchors = all.filter((el) => {
      const text = (el.textContent || "").replace(/\s+/g, " ").trim().toLowerCase()
      return text.includes("pinterest board full of ideas") || text.includes("orion caldwell")
    })

    if (!anchors.length) return false

    const candidates: HTMLElement[] = []
    for (const anchor of anchors) {
      let node: HTMLElement | null = anchor
      for (let depth = 0; node && depth < 12; depth += 1, node = node.parentElement) {
        const text = (node.textContent || "").toLowerCase()
        if (!text.includes("pinterest board") && !text.includes("orion caldwell")) continue

        const rect = node.getBoundingClientRect()
        const imageCount = node.querySelectorAll("img").length
        if (imageCount >= 4 && rect.width >= 500 && rect.height >= 300) candidates.push(node)
      }
    }

    if (!candidates.length) return false

    candidates.sort((a, b) => {
      const ar = a.getBoundingClientRect()
      const br = b.getBoundingClientRect()
      return ar.width * ar.height - br.width * br.height
    })

    const host = candidates[0]
    host.setAttribute("data-td-handbook-host", "true")

    const book = doc.createElement("div")
    book.setAttribute("data-td-handbook", "true")
    book.setAttribute("role", "group")
    book.setAttribute("aria-label", "Interactive handbook. Click the right side for the next page and the left side for the previous page.")
    book.tabIndex = 0

    for (let index = 0; index < PAGE_URLS.length; index += 2) {
      const sheet = doc.createElement("div")
      sheet.className = "td-hb-sheet"

      const front = doc.createElement("div")
      front.className = "td-hb-face td-hb-front"
      const frontImage = doc.createElement("img")
      frontImage.src = PAGE_URLS[index]
      frontImage.alt = ""
      frontImage.draggable = false
      front.appendChild(frontImage)

      const back = doc.createElement("div")
      back.className = "td-hb-face td-hb-back"
      const backImage = doc.createElement("img")
      backImage.src = PAGE_URLS[index + 1]
      backImage.alt = ""
      backImage.draggable = false
      back.appendChild(backImage)

      sheet.append(front, back)
      book.appendChild(sheet)
    }

    host.appendChild(book)

    const sheets = Array.from(book.querySelectorAll<HTMLElement>(".td-hb-sheet"))
    let page = 0
    let pointerDownX: number | null = null
    let suppressClickUntil = 0

    const render = () => {
      sheets.forEach((sheet, index) => {
        const flipped = index < page
        sheet.classList.toggle("is-flipped", flipped)
        sheet.style.zIndex = String(flipped ? index + 1 : 100 - index)
      })

      if (page === 0) book.style.transform = "translateX(-25%)"
      else if (page === sheets.length) book.style.transform = "translateX(25%)"
      else book.style.transform = "translateX(0)"
    }

    const next = () => {
      page = Math.min(sheets.length, page + 1)
      render()
    }

    const previous = () => {
      page = Math.max(0, page - 1)
      render()
    }

    book.addEventListener("click", (event) => {
      if (Date.now() < suppressClickUntil) return
      const rect = book.getBoundingClientRect()
      if (event.clientX < rect.left + rect.width / 2) previous()
      else next()
    })

    book.addEventListener("pointerdown", (event) => {
      pointerDownX = event.clientX
    })

    book.addEventListener("pointerup", (event) => {
      if (pointerDownX === null) return
      const delta = event.clientX - pointerDownX
      pointerDownX = null
      if (Math.abs(delta) < 35) return
      if (delta < 0) next()
      else previous()
      suppressClickUntil = Date.now() + 250
    })

    book.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault()
        next()
      } else if (event.key === "ArrowLeft") {
        event.preventDefault()
        previous()
      }
    })

    render()
    return true
  }, [])

  const handleLoad = useCallback(() => {
    timerRef.current.forEach(window.clearTimeout)
    timerRef.current = []

    ;[0, 80, 180, 350, 700, 1200, 2000, 3500, 6000].forEach((delay) => {
      timerRef.current.push(window.setTimeout(mountHandbook, delay))
    })
  }, [mountHandbook])

  useEffect(() => {
    return () => timerRef.current.forEach(window.clearTimeout)
  }, [])

  return (
    <iframe
      ref={frameRef}
      src="/client-demos/client-8889/architectured/branded"
      title="NGUYEN Architecture & Engineering — Concept 04"
      onLoad={handleLoad}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100dvh",
        border: 0,
        background: "#021736",
        zIndex: 2147483000,
      }}
    />
  )
}
