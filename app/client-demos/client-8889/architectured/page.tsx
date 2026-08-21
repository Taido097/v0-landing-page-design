"use client"

import { useCallback, useRef } from "react"

const HANDBOOK_SRC = "/client-demos/client-8889/architectured/handbook"

export default function ArchitecturedClientDemoPage() {
  const cleanupRef = useRef<(() => void) | null>(null)

  const mountHandbook = useCallback((frame: HTMLIFrameElement) => {
    cleanupRef.current?.()
    cleanupRef.current = null

    const doc = frame.contentDocument
    if (!doc?.documentElement) return

    let mounting = false

    const findTestimonial = () =>
      doc.querySelector<HTMLElement>('section[data-framer-name="Testimonial 1"]') ||
      doc.querySelector<HTMLElement>('[data-framer-name="Testimonial 1"]') ||
      doc.getElementById("testimonial")

    const replaceTestimonial = () => {
      if (mounting) return
      mounting = true

      try {
        const host = findTestimonial()
        if (!host) return

        const existing = host.querySelector<HTMLIFrameElement>(
          'iframe[data-td-handbook-frame="true"]',
        )
        if (existing) return

        host.replaceChildren()
        host.setAttribute("data-td-exact-concept04-handbook", "true")

        const styles: Partial<CSSStyleDeclaration> = {
          display: "block",
          position: "relative",
          width: "100%",
          maxWidth: "none",
          height: "auto",
          minHeight: "760px",
          margin: "0",
          padding: "0",
          overflow: "hidden",
          background: "#1d1b18",
          visibility: "visible",
          opacity: "1",
        }

        Object.entries(styles).forEach(([property, value]) => {
          if (value != null) {
            host.style.setProperty(
              property.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`),
              String(value),
              "important",
            )
          }
        })

        const handbook = doc.createElement("iframe")
        handbook.src = HANDBOOK_SRC
        handbook.title = "NGUYEN Architecture & Engineering Project Handbook"
        handbook.setAttribute("data-td-handbook-frame", "true")
        handbook.setAttribute("loading", "eager")
        handbook.style.setProperty("display", "block", "important")
        handbook.style.setProperty("width", "100%", "important")
        handbook.style.setProperty("height", "760px", "important")
        handbook.style.setProperty("border", "0", "important")
        handbook.style.setProperty("margin", "0", "important")
        handbook.style.setProperty("padding", "0", "important")
        handbook.style.setProperty("background", "#1d1b18", "important")
        handbook.style.setProperty("visibility", "visible", "important")
        handbook.style.setProperty("opacity", "1", "important")

        host.appendChild(handbook)
      } finally {
        mounting = false
      }
    }

    replaceTestimonial()

    const observer = new MutationObserver(() => replaceTestimonial())
    observer.observe(doc.documentElement, {
      childList: true,
      subtree: true,
    })

    const timers = [50, 150, 350, 700, 1200, 2200, 4000].map((delay) =>
      window.setTimeout(replaceTestimonial, delay),
    )

    cleanupRef.current = () => {
      observer.disconnect()
      timers.forEach((timer) => window.clearTimeout(timer))
    }
  }, [])

  return (
    <main
      style={{
        margin: 0,
        width: "100%",
        minHeight: "100vh",
        overflow: "hidden",
        background: "#1d1b18",
      }}
    >
      <iframe
        src="/client-demos/client-8889/architectured/branded"
        title="NGUYEN Architecture & Engineering — Concept 04"
        onLoad={(event) => mountHandbook(event.currentTarget)}
        style={{
          display: "block",
          width: "100%",
          height: "100vh",
          minHeight: "100vh",
          border: 0,
          margin: 0,
          padding: 0,
          background: "#1d1b18",
        }}
        allow="autoplay; fullscreen"
      />
    </main>
  )
}
