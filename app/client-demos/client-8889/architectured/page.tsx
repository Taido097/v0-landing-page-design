"use client"

import { useCallback, useEffect, useRef } from "react"

const PAGES = [
  "https://framerusercontent.com/images/QDQKylWWIf9VYDvFE8d8MTxUJ1o.png",
  "https://framerusercontent.com/images/cwOkVnjxy6x4U3eWGZEKmj7BBgo.jpg?scale-down-to=1024&width=768&height=1086",
  "https://framerusercontent.com/images/OhGj99mJnab8DPy2PMfd98jhF6I.jpg?scale-down-to=1024&width=768&height=1086",
  "https://framerusercontent.com/images/lAU1MDwSV1dq0S6amUC8jsOg.jpg?scale-down-to=1024&width=768&height=1086",
  "https://framerusercontent.com/images/hv0I9A0DXUdvIK6c42B46rsfzg.jpg?scale-down-to=1024&width=768&height=1086",
  "https://framerusercontent.com/images/cKChIxjzaNsc5t2NxVN78mx8Q.png?scale-down-to=1024&width=768&height=1086",
  "https://framerusercontent.com/images/hFP2svt3lNsx1A9P1zA6bFzdWM.png?scale-down-to=1024&width=768&height=1086",
  "https://framerusercontent.com/images/7q3XJntgf3apOgAI7m0Yai1Mz0.png?scale-down-to=1024&width=768&height=1086",
]

const STYLE_ID = "td-live-handbook-style"
const HOST_ATTR = "data-td-live-handbook-host"
const ROOT_ATTR = "data-td-live-handbook"

const HANDBOOK_CSS = `
  [${HOST_ATTR}="true"] {
    position: relative !important;
    width: 100% !important;
    max-width: none !important;
    min-height: clamp(560px, 61vw, 800px) !important;
    margin: 0 !important;
    padding: clamp(48px, 6vw, 82px) clamp(12px, 3vw, 42px) !important;
    box-sizing: border-box !important;
    overflow: hidden !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  [${HOST_ATTR}="true"] > *:not([${ROOT_ATTR}="true"]) {
    display: none !important;
    visibility: hidden !important;
    pointer-events: none !important;
  }

  [${ROOT_ATTR}="true"] {
    position: relative !important;
    z-index: 2147483000 !important;
    width: min(920px, 90vw) !important;
    margin: 0 auto !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: center !important;
    visibility: visible !important;
    opacity: 1 !important;
    box-sizing: border-box !important;
  }

  .td-live-book {
    position: relative !important;
    width: 100% !important;
    aspect-ratio: 10 / 7 !important;
    perspective: 2000px !important;
    transform-style: preserve-3d !important;
    transition: transform .7s cubic-bezier(.44,0,.56,1) !important;
    touch-action: pan-y !important;
    user-select: none !important;
    cursor: pointer !important;
    outline: none !important;
    visibility: visible !important;
  }

  .td-live-book::after {
    content: "" !important;
    position: absolute !important;
    z-index: 1000 !important;
    left: 50% !important;
    top: 1.5% !important;
    bottom: 1.5% !important;
    width: 2px !important;
    transform: translateX(-50%) !important;
    pointer-events: none !important;
    background: linear-gradient(180deg, rgba(255,255,255,.22), rgba(0,0,0,.54), rgba(255,255,255,.16)) !important;
    box-shadow: 0 0 18px rgba(0,0,0,.25) !important;
  }

  .td-live-sheet {
    position: absolute !important;
    left: 50% !important;
    top: 0 !important;
    width: 50% !important;
    height: 100% !important;
    transform-origin: left center !important;
    transform-style: preserve-3d !important;
    transition: transform .7s cubic-bezier(.44,0,.56,1) !important;
    will-change: transform !important;
    visibility: visible !important;
  }

  .td-live-sheet.is-flipped {
    transform: rotateY(-180deg) !important;
  }

  .td-live-face {
    position: absolute !important;
    inset: 0 !important;
    overflow: hidden !important;
    backface-visibility: hidden !important;
    -webkit-backface-visibility: hidden !important;
    background: #fff !important;
    box-shadow: 0 24px 64px rgba(0,0,0,.34) !important;
    visibility: visible !important;
  }

  .td-live-face.front {
    transform: rotateY(0deg) !important;
    border-radius: 2px 8px 8px 2px !important;
  }

  .td-live-face.back {
    transform: rotateY(180deg) !important;
    border-radius: 8px 2px 2px 8px !important;
  }

  .td-live-face img {
    display: block !important;
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    opacity: 1 !important;
    visibility: visible !important;
    pointer-events: none !important;
  }

  .td-live-controls {
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 18px !important;
    margin-top: 28px !important;
    visibility: visible !important;
  }

  .td-live-control {
    width: 48px !important;
    height: 48px !important;
    padding: 0 !important;
    border: 1px solid currentColor !important;
    border-radius: 999px !important;
    background: transparent !important;
    color: inherit !important;
    display: grid !important;
    place-items: center !important;
    font: 400 21px/1 Arial, sans-serif !important;
    cursor: pointer !important;
    opacity: .78 !important;
    visibility: visible !important;
  }

  .td-live-control:disabled {
    opacity: .25 !important;
    cursor: default !important;
  }

  .td-live-indicator {
    min-width: 94px !important;
    color: inherit !important;
    font: 500 11px/1 Arial, sans-serif !important;
    letter-spacing: .12em !important;
    text-align: center !important;
    text-transform: uppercase !important;
    opacity: .75 !important;
    visibility: visible !important;
  }

  @media (max-width: 700px) {
    [${HOST_ATTR}="true"] {
      min-height: 470px !important;
      padding: 48px 8px !important;
    }

    [${ROOT_ATTR}="true"] {
      width: min(96vw, 620px) !important;
    }

    .td-live-controls {
      margin-top: 20px !important;
    }

    .td-live-control {
      width: 42px !important;
      height: 42px !important;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .td-live-book,
    .td-live-sheet {
      transition-duration: .01ms !important;
    }
  }
`

function normalize(value: string | null | undefined) {
  return (value || "").toLowerCase().replace(/\s+/g, " ").trim()
}

function findTestimonialHost(doc: Document) {
  const quoteNeedle = "pinterest board full of ideas"
  const authorNeedle = "orion caldwell"
  const all = Array.from(doc.querySelectorAll<HTMLElement>("body *"))

  const authorAnchors = all.filter((element) =>
    normalize(element.innerText || element.textContent).includes(authorNeedle),
  )

  const candidates = new Set<HTMLElement>()

  authorAnchors.forEach((anchor) => {
    let node: HTMLElement | null = anchor
    for (let depth = 0; node && depth < 18; depth += 1, node = node.parentElement) {
      const text = normalize(node.innerText || node.textContent)
      if (!text.includes(authorNeedle) || !text.includes(quoteNeedle)) continue

      const rect = node.getBoundingClientRect()
      if (rect.width >= 280 && rect.height >= 220) candidates.add(node)
    }
  })

  if (!candidates.size) {
    const quoteAnchors = all.filter((element) =>
      normalize(element.innerText || element.textContent).includes(quoteNeedle),
    )
    quoteAnchors.forEach((anchor) => {
      let node: HTMLElement | null = anchor
      for (let depth = 0; node && depth < 18; depth += 1, node = node.parentElement) {
        const text = normalize(node.innerText || node.textContent)
        if (!text.includes(quoteNeedle)) continue
        const rect = node.getBoundingClientRect()
        if (rect.width >= 280 && rect.height >= 260) candidates.add(node)
      }
    })
  }

  const ranked = Array.from(candidates).sort((a, b) => {
    const ar = a.getBoundingClientRect()
    const br = b.getBoundingClientRect()
    return ar.width * ar.height - br.width * br.height
  })

  if (!ranked.length) return null

  let host = ranked[0]
  const viewportWidth = doc.defaultView?.innerWidth || 1200

  for (let step = 0; step < 6 && host.parentElement; step += 1) {
    const parent = host.parentElement
    const text = normalize(parent.innerText || parent.textContent)
    if (!text.includes(quoteNeedle)) break

    const rect = parent.getBoundingClientRect()
    host = parent

    if (
      rect.width >= Math.min(760, viewportWidth * 0.68) &&
      rect.height >= 420
    ) {
      break
    }
  }

  return host
}

function buildHandbook(doc: Document, host: HTMLElement) {
  if (!doc.getElementById(STYLE_ID)) {
    const style = doc.createElement("style")
    style.id = STYLE_ID
    style.textContent = HANDBOOK_CSS
    doc.head.appendChild(style)
  }

  host.setAttribute(HOST_ATTR, "true")
  host.querySelector(`[${ROOT_ATTR}="true"]`)?.remove()

  const root = doc.createElement("div")
  root.setAttribute(ROOT_ATTR, "true")
  root.innerHTML = `
    <div class="td-live-book" tabindex="0" role="group" aria-label="Interactive 3D handbook"></div>
    <div class="td-live-controls">
      <button class="td-live-control td-live-prev" type="button" aria-label="Previous pages">←</button>
      <div class="td-live-indicator">Cover · 1 / ${PAGES.length}</div>
      <button class="td-live-control td-live-next" type="button" aria-label="Next pages">→</button>
    </div>
  `
  host.appendChild(root)

  const stage = root.querySelector<HTMLElement>(".td-live-book")!
  const indicator = root.querySelector<HTMLElement>(".td-live-indicator")!
  const previousButton = root.querySelector<HTMLButtonElement>(".td-live-prev")!
  const nextButton = root.querySelector<HTMLButtonElement>(".td-live-next")!
  const sheets: HTMLElement[] = []

  for (let index = 0; index < PAGES.length; index += 2) {
    const sheet = doc.createElement("div")
    sheet.className = "td-live-sheet"
    sheet.innerHTML = `
      <div class="td-live-face front"><img src="${PAGES[index]}" alt="Handbook page ${index + 1}" draggable="false"></div>
      <div class="td-live-face back"><img src="${PAGES[index + 1]}" alt="Handbook page ${index + 2}" draggable="false"></div>
    `
    stage.appendChild(sheet)
    sheets.push(sheet)
  }

  let spread = 0
  let pointerStart: number | null = null

  const render = () => {
    sheets.forEach((sheet, index) => {
      const flipped = index < spread
      sheet.classList.toggle("is-flipped", flipped)
      sheet.style.zIndex = flipped ? String(index + 1) : String(100 - index)
    })

    stage.style.transform = spread === 0
      ? "translateX(-25%)"
      : spread === sheets.length
        ? "translateX(25%)"
        : "translateX(0)"

    if (spread === 0) indicator.textContent = `Cover · 1 / ${PAGES.length}`
    else if (spread === sheets.length) indicator.textContent = `Back · ${PAGES.length} / ${PAGES.length}`
    else indicator.textContent = `${spread * 2}–${spread * 2 + 1} / ${PAGES.length}`

    previousButton.disabled = spread === 0
    nextButton.disabled = spread === sheets.length
  }

  const next = () => {
    spread = Math.min(sheets.length, spread + 1)
    render()
  }

  const previous = () => {
    spread = Math.max(0, spread - 1)
    render()
  }

  previousButton.addEventListener("click", (event) => {
    event.preventDefault()
    event.stopPropagation()
    previous()
  })

  nextButton.addEventListener("click", (event) => {
    event.preventDefault()
    event.stopPropagation()
    next()
  })

  stage.addEventListener("click", (event) => {
    const rect = stage.getBoundingClientRect()
    if ((event as MouseEvent).clientX < rect.left + rect.width / 2) previous()
    else next()
  })

  stage.addEventListener("keydown", (event) => {
    const keyboardEvent = event as KeyboardEvent
    if (keyboardEvent.key === "ArrowLeft") {
      keyboardEvent.preventDefault()
      previous()
    } else if (keyboardEvent.key === "ArrowRight") {
      keyboardEvent.preventDefault()
      next()
    }
  })

  stage.addEventListener("pointerdown", (event) => {
    pointerStart = (event as PointerEvent).clientX
  })

  stage.addEventListener("pointerup", (event) => {
    if (pointerStart === null) return
    const delta = (event as PointerEvent).clientX - pointerStart
    pointerStart = null
    if (Math.abs(delta) < 35) return
    if (delta < 0) next()
    else previous()
  })

  render()
  return root
}

function injectHandbook(frame: HTMLIFrameElement) {
  const doc = frame.contentDocument
  if (!doc?.body || !doc.head) return false

  if (doc.querySelector(`[${ROOT_ATTR}="true"]`)) return true

  const host = findTestimonialHost(doc)
  if (!host) return false

  buildHandbook(doc, host)
  return true
}

export default function NguyenConcept04() {
  const frameRef = useRef<HTMLIFrameElement>(null)
  const timersRef = useRef<number[]>([])
  const observerRef = useRef<MutationObserver | null>(null)

  const clearWatchers = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer))
    timersRef.current = []
    observerRef.current?.disconnect()
    observerRef.current = null
  }, [])

  const attemptInjection = useCallback(() => {
    const frame = frameRef.current
    if (!frame) return false

    try {
      return injectHandbook(frame)
    } catch {
      return false
    }
  }, [])

  const handleLoad = useCallback(() => {
    clearWatchers()

    const frame = frameRef.current
    if (!frame) return

    const delays = [0, 80, 180, 350, 700, 1200, 2000, 3500, 5500, 8000]
    delays.forEach((delay) => {
      timersRef.current.push(window.setTimeout(attemptInjection, delay))
    })

    try {
      const doc = frame.contentDocument
      if (doc?.body) {
        const observer = new MutationObserver(() => {
          if (!doc.querySelector(`[${ROOT_ATTR}="true"]`)) attemptInjection()
        })
        observer.observe(doc.body, { childList: true, subtree: true })
        observerRef.current = observer
      }
    } catch {
      // Same-origin route is expected; timed retries remain as fallback.
    }
  }, [attemptInjection, clearWatchers])

  useEffect(() => clearWatchers, [clearWatchers])

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
        background: "transparent",
        zIndex: 2147483000,
      }}
    />
  )
}
