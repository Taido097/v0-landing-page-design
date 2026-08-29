"use client"

import { useEffect } from "react"
import styles from "./serenity.module.css"

const HOME = "/client-demos/client-8889/arcsphere-socal"
const RESIDENTIAL = "/client-demos/client-8889/residential"

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <div data-reveal className={`${styles.reveal} ${className}`} style={delay ? ({ ["--d" as string]: `${delay}ms` } as React.CSSProperties) : undefined}>{children}</div>
}

export default function SerenityVillaPage() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"))
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <main className={styles.page}>
      <header className={styles.topbar}>
        <nav className={styles.navLeft}>
          <a href={HOME}>Design Process</a>
          <a href={HOME}>Projects</a>
          <a href={RESIDENTIAL}>Services</a>
        </nav>
        <a className={styles.brand} href={HOME}>NGUYEN ARCHITECTURE &amp; ENGINEERING</a>
        <nav className={styles.navRight}>
          <a className={styles.contactBtn} href="mailto:info@nguyenarchitecture.com">Contact Us</a>
        </nav>
      </header>

      <section className={styles.hero}>
        <img className={styles.heroImg} src="/client-8889/serenity-villa/hero.webp" alt="Serenity Villa exterior" />
        <div className={styles.heroScrim} />
        <div className={styles.heroBody}>
          <h1>Serenity Villa</h1>
          <div className={styles.heroBar}>
            <span>Serenity Villa</span>
            <span>Residential Architecture</span>
            <span>Dubai, 2025</span>
          </div>
        </div>
      </section>

      <section className={styles.introSection}>
        <div className={styles.shell}>
          <Reveal className={styles.introCopy}>
            <h2>A Tranquil Residential Sanctuary Blending Natural Beauty With Luxury.</h2>
            <p>Dubai&apos;s Serenity Villa Emphasizes Calm, Minimalist Living, Open Interiors, Light-Filled Rooms, And Natural Textures Create A Serene Home That Perfectly Aligns With The Owners&apos; Vision Of Peaceful Luxury.</p>
          </Reveal>

          <div className={styles.introGallery}>
            <Reveal className={styles.smallImage}>
              <img src="/client-8889/serenity-villa/dining.webp" alt="Serenity Villa dining room" />
            </Reveal>
            <Reveal className={styles.largeImage} delay={100}>
              <img src="/client-8889/residential/intro-living-room.png" alt="Serenity Villa living room" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className={styles.detailsSection}>
        <div className={styles.shell}>
          <div className={styles.detailsGrid}>
            <div>
              <div className={styles.detailImages}>
                <Reveal><img src="/client-8889/projects/minimalist-apartment-interior.webp" alt="Serenity Villa study" /></Reveal>
                <Reveal delay={90}><img src="/client-8889/residential/svc-02-additions-remodels.png" alt="Serenity Villa bedroom" /></Reveal>
              </div>
              <Reveal><h2 className={styles.detailsTitle}>Project Details</h2></Reveal>
            </div>

            <Reveal className={styles.detailsCopy}>
              <p className={styles.summary}>Serenity Villa, Completed In 2025 In Dubai, is A Tranquil Residential Project That Highlights Minimalism And Natural Harmony — Designed To Create A Peaceful And Elegant Living Atmosphere.</p>
              <div className={styles.rule} />
              <dl className={styles.facts}>
                <div><dt>Project Owners</dt><dd>Khalid A. Fatima Al-Mansoori</dd></div>
                <div><dt>Budget</dt><dd>€4 million</dd></div>
                <div><dt>Services</dt><dd>Residential Architecture</dd></div>
                <div><dt>Surface</dt><dd>680 m²</dd></div>
                <div><dt>Address</dt><dd>Dubai, 2025</dd></div>
              </dl>
            </Reveal>
          </div>

          <Reveal><h2 className={styles.otherTitle}>Other Project</h2></Reveal>
        </div>
      </section>

      <section className={styles.ctaFooter}>
        <div className={styles.shell}>
          <div className={styles.ctaInner}>
            <div className={styles.ctaTop}>
              <h2>Open to new projects and collaborations that shape meaningful spaces.</h2>
              <a className={styles.getInTouch} href="mailto:info@nguyenarchitecture.com">Get In Touch ↗</a>
            </div>
            <div className={styles.footCols}>
              <div className={styles.footCol}><div className={styles.footIcons}><span>✉</span><span>☏</span><span>◍</span></div></div>
              <div className={styles.footCol}><a href={HOME}>Home</a><a href={HOME}>About</a><a href={RESIDENTIAL}>Services</a><a href={HOME}>Projects</a><a href="mailto:info@nguyenarchitecture.com">Contact</a></div>
              <div className={styles.footCol}><a href={HOME}>LinkedIn</a><a href={HOME}>Instagram</a><a href={HOME}>Behance</a></div>
              <div className={styles.footCol}><a href={HOME}>Privacy Policy</a><a href={HOME}>Cookie Policy</a><a href={HOME}>Terms &amp; Conditions</a></div>
            </div>
            <div className={styles.copyright}>© 2025 Nguyen Architecture &amp; Engineering. All rights reserved.</div>
          </div>
        </div>
        <div className={styles.bottomImg}><img src="https://framerusercontent.com/images/NPECM2ziENhHhdNoAT3unXgBhD0.jpg?height=1600&width=2400" alt="Modern residential architecture" /></div>
      </section>
    </main>
  )
}
