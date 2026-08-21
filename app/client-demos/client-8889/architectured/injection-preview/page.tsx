"use client"

import { useCallback, useRef, useState } from "react"

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

const INJECTION_CSS = `
  section[aria-label="NGUYEN handbook"] {
    min-height: 900px !important;
    padding: 110px 24px 72px !important;
    background: #001b46 !important;
    color: #f3f0e9 !important;
    overflow: hidden !important;
    position: relative !important;
  }
  section[aria-label="NGUYEN handbook"] > *:not(.td-injected-handbook) {
    display: none !important;
  }
  .td-injected-handbook {
    width: 100%;
    min-height: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 10;
    font-family: Arial, Helvetica, sans-serif;
  }
  .td-injected-title {
    width: min(1120px, 94vw);
    margin: 0 auto 52px;
    font-size: clamp(34px, 4.2vw, 64px);
    line-height: .95;
    letter-spacing: -.05em;
    font-weight: 700;
    color: #f3f0e9;
  }
  .td-book-stage {
    width: min(900px, 86vw);
    aspect-ratio: 10 / 7;
    position: relative;
    perspective: 2000px;
    transform-style: preserve-3d;
    transition: transform .7s cubic-bezier(.44,0,.56,1);
    touch-action: pan-y;
    user-select: none;
  }
  .td-book-stage::after {
    content: "";
    position: absolute;
    z-index: 500;
    left: 50%;
    top: .7%;
    bottom: .7%;
    width: 2px;
    transform: translateX(-50%);
    background: linear-gradient(180deg, rgba(255,255,255,.22), rgba(0,0,0,.52), rgba(255,255,255,.18));
    box-shadow: 0 0 14px rgba(0,0,0,.22);
    pointer-events: none;
  }
  .td-sheet {
    position: absolute;
    left: 50%;
    top: 0;
    width: 50%;
    height: 100%;
    transform-origin: left center;
    transform-style: preserve-3d;
    transition: transform .7s cubic-bezier(.44,0,.56,1);
    will-change: transform;
  }
  .td-sheet.is-flipped { transform: rotateY(-180deg); }
  .td-face {
    position: absolute;
    inset: 0;
    overflow: hidden;
    backface-visibility: hidden;
    background: #fff;
    border-radius: 2px 8px 8px 2px;
    box-shadow: 0 30px 70px rgba(0,0,0,.34);
  }
  .td-face.back {
    transform: rotateY(180deg);
    border-radius: 8px 2px 2px 8px;
  }
  .td-face img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    pointer-events: none;
  }
  .td-controls {
    margin-top: 30px;
    display: flex;
    align-items: center;
    gap: 18px;
    color: #f3f0e9;
  }
  .td-control {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid rgba(243,240,233,.5);
    background: transparent;
    color: #f3f0e9;
    display: grid;
    place-items: center;
    font-size: 22px;
    cursor: pointer;
    transition: .2s ease;
  }
  .td-control:hover { background: #f3f0e9; color: #001b46; }
  .td-page-indicator {
    min-width: 84px;
    text-align: center;
    font-size: 11px;
    letter-spacing: .14em;
    text-transform: uppercase;
  }
  .td-injected-note {
    margin-top: 16px;
    font-size: 10px;
    letter-spacing: .14em;
    text-transform: uppercase;
    opacity: .62;
  }
  @media (max-width: 700px) {
    section[aria-label="NGUYEN handbook"] { min-height: 690px !important; padding: 88px 14px 56px !important; }
    .td-injected-handbook { min-height: 540px; }
    .td-injected-title { margin-bottom: 34px; }
    .td-book-stage { width: min(96vw, 620px); }
  }
`

function injectHandbook(frame: HTMLIFrameElement) {
  const doc = frame.contentDocument
  const win = frame.contentWindow
  if (!doc || !win) return false

  const host = doc.querySelector<HTMLElement>('section[aria-label="NGUYEN handbook"]')
  if (!host) return false

  doc.getElementById("td-handbook-preview-style")?.remove()
  host.querySelector(".td-injected-handbook")?.remove()

  const style = doc.createElement("style")
  style.id = "td-handbook-preview-style"
  style.textContent = INJECTION_CSS
  doc.head.appendChild(style)

  const root = doc.createElement("div")
  root.className = "td-injected-handbook"
  root.innerHTML = `
    <div class="td-injected-title">Interactive Handbook</div>
    <div class="td-book-stage" tabindex="0" role="group" aria-label="Interactive handbook preview"></div>
    <div class="td-controls">
      <button class="td-control td-prev" aria-label="Previous page">←</button>
      <div class="td-page-indicator">1 / ${PAGES.length}</div>
      <button class="td-control td-next" aria-label="Next page">→</button>
    </div>
    <div class="td-injected-note">Code-injection preview · click, swipe, or use arrows</div>
  `

  host.appendChild(root)
  const stage = root.querySelector<HTMLElement>(".td-book-stage")!
  const indicator = root.querySelector<HTMLElement>(".td-page-indicator")!
  const prev = root.querySelector<HTMLButtonElement>(".td-prev")!
  const next = root.querySelector<HTMLButtonElement>(".td-next")!

  const sheets: HTMLElement[] = []
  for (let i = 0; i < PAGES.length; i += 2) {
    const sheet = doc.createElement("div")
    sheet.className = "td-sheet"
    sheet.innerHTML = `
      <div class="td-face front"><img src="${PAGES[i]}" alt="Handbook page ${i + 1}" draggable="false" /></div>
      <div class="td-face back"><img src="${PAGES[i + 1]}" alt="Handbook page ${i + 2}" draggable="false" /></div>
    `
    stage.appendChild(sheet)
    sheets.push(sheet)
  }

  let page = 0
  let pointerX: number | null = null

  const render = () => {
    sheets.forEach((sheet, index) => {
      const flipped = index < page
      sheet.classList.toggle("is-flipped", flipped)
      sheet.style.zIndex = flipped ? String(index + 1) : String(100 - index)
    })
    stage.style.transform = page === 0 ? "translateX(-25%)" : page === sheets.length ? "translateX(25%)" : "translateX(0)"
    const visiblePage = Math.min(PAGES.length, Math.max(1, page * 2 + (page === 0 ? 0 : 1)))
    indicator.textContent = `${visiblePage} / ${PAGES.length}`
    prev.disabled = page === 0
    next.disabled = page === sheets.length
    prev.style.opacity = page === 0 ? ".35" : "1"
    next.style.opacity = page === sheets.length ? ".35" : "1"
  }

  const goNext = () => { page = Math.min(sheets.length, page + 1); render() }
  const goPrev = () => { page = Math.max(0, page - 1); render() }

  prev.addEventListener("click", (event) => { event.stopPropagation(); goPrev() })
  next.addEventListener("click", (event) => { event.stopPropagation(); goNext() })
  stage.addEventListener("click", (event) => {
    const rect = stage.getBoundingClientRect()
    if ((event as MouseEvent).clientX < rect.left + rect.width / 2) goPrev()
    else goNext()
  })
  stage.addEventListener("keydown", (event) => {
    if ((event as KeyboardEvent).key === "ArrowLeft") goPrev()
    if ((event as KeyboardEvent).key === "ArrowRight") goNext()
  })
  stage.addEventListener("pointerdown", (event) => { pointerX = (event as PointerEvent).clientX })
  stage.addEventListener("pointerup", (event) => {
    if (pointerX === null) return
    const delta = (event as PointerEvent).clientX - pointerX
    pointerX = null
    if (Math.abs(delta) < 35) return
    if (delta < 0) goNext()
    else goPrev()
  })

  render()
  host.scrollIntoView({ behavior: "smooth", block: "center" })
  return true
}

export default function InjectionPreviewPage() {
  const frameRef = useRef<HTMLIFrameElement>(null)
  const [status, setStatus] = useState("Loading Concept 04…")

  const runInjection = useCallback(() => {
    const frame = frameRef.current
    if (!frame) return
    const ok = injectHandbook(frame)
    setStatus(ok ? "Injected preview active" : "Waiting for handbook section…")
    if (!ok) {
      window.setTimeout(() => {
        if (frameRef.current && injectHandbook(frameRef.current)) setStatus("Injected preview active")
      }, 900)
    }
  }, [])

  return (
    <main style={{ margin: 0, width: "100vw", height: "100vh", overflow: "hidden", background: "#111" }}>
      <div style={{ position: "fixed", zIndex: 99999, top: 14, left: "50%", transform: "translateX(-50%)", padding: "10px 16px", borderRadius: 999, background: "rgba(0,0,0,.82)", color: "white", font: "600 12px/1 Arial, sans-serif", letterSpacing: ".04em", boxShadow: "0 8px 30px rgba(0,0,0,.3)" }}>
        {status} · preview only
      </div>
      <iframe
        ref={frameRef}
        title="Concept 04 handbook code injection preview"
        src="/client-demos/client-8889/architectured"
        onLoad={() => window.setTimeout(runInjection, 350)}
        style={{ display: "block", width: "100%", height: "100%", border: 0, background: "white" }}
      />
    </main>
  )
}
