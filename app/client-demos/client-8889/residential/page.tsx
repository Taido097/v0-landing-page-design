"use client"

import { useEffect } from "react"
import styles from "./residential.module.css"

const HERO = "/client-8889/residential/hero-home.png"
const INTRO = "/client-8889/residential/intro-living-room.png"
const BOTTOM = "https://framerusercontent.com/images/NPECM2ziENhHhdNoAT3unXgBhD0.jpg?height=1600&width=2400"

const services = [
  { n: "01", title: "Custom Homes", copy: "Bespoke homes designed around your lifestyle, site, and long-term goals.", img: "/client-8889/residential/svc-01-custom-homes.png" },
  { n: "02", title: "Additions & Major Remodels", copy: "Seamlessly expand and transform your home with careful planning and detail.", img: "/client-8889/residential/svc-02-additions-remodels.png" },
  { n: "03", title: "ADUs", copy: "Beautiful, functional accessory dwelling units for family, rental income, or office use.", img: "/client-8889/residential/svc-03-adus.png" },
  { n: "04", title: "Multifamily / Townhomes / Condos", copy: "Well-designed residences that balance livability, efficiency, and community.", img: "/client-8889/residential/svc-04-multifamily.png" },
  { n: "05", title: "Structural Engineering", copy: "Safe, efficient, and code-compliant structural solutions for new and existing homes.", img: "/client-8889/residential/svc-05-structural.png" },
  { n: "06", title: "MEP + Title 24", copy: "Integrated MEP design and Title 24 compliance for comfort, efficiency, and energy performance.", img: "/client-8889/residential/svc-06-mep-title24.png" },
  { n: "07", title: "Permitting", copy: "We manage the permit process to keep your project moving forward with clarity.", img: "/client-8889/residential/svc-07-permitting.png" },
  { n: "08", title: "Plan-Check Support", copy: "Responsive plan-check support to address comments and accelerate approvals.", img: "/client-8889/residential/svc-08-plan-check.png" },
]

const scopeServices = ["Custom Homes", "Additions & Remodels", "ADUs", "Multifamily / Townhomes / Condos", "Structural Engineering", "MEP + Title 24", "Permitting", "Plan-Check Support"]
const processSteps = [
  ["01", "Discovery & Site Review"], ["02", "Design & Engineering"], ["03", "Documentation"],
  ["04", "Permitting"], ["05", "Plan-Check & Approval"], ["06", "Construction Support"],
]
const scope = ["Architecture", "Structural Engineering", "MEP Engineering", "Title 24 Compliance", "Permitting", "Plan-Check Support"]

const work = [
  { name: "Hillside Retreat", loc: "Bel Air, California", img: "/client-8889/residential/svc-01-custom-homes.png" },
  { name: "Serenity Villa", loc: "Newport Beach, California", img: "/client-8889/residential/svc-03-adus.png" },
  { name: "Coastal Modern Home", loc: "Laguna Beach, California", img: "/client-8889/residential/svc-04-multifamily.png" },
  { name: "Garden ADU", loc: "Pasadena, California", img: "/client-8889/residential/svc-02-additions-remodels.png" },
  { name: "Urban Townhomes", loc: "Santa Monica, California", img: "/client-8889/residential/work-urban-townhomes.png" },
]

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <div data-reveal className={`${styles.reveal} ${className}`} style={delay ? ({ ["--d" as string]: `${delay}ms` } as React.CSSProperties) : undefined}>{children}</div>
}

export default function ResidentialPage() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"))
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible)
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    nodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <main className={styles.page}>
      {/* Header */}
      <header className={styles.topbar}>
        <nav className={styles.navLeft}>
          <a href="/client-demos/client-8889/arcsphere-socal">Design Process</a>
          <a href="https://nguyen-studio.framer.website/">Projects</a>
          <a href="/client-demos/client-8889/residential">Services</a>
        </nav>
        <div className={styles.brand}>NGUYEN ARCHITECTURE &amp; ENGINEERING</div>
        <nav className={styles.navRight}>
          <a className={styles.contactBtn} href="mailto:info@nguyenarchitecture.com">Contact Us</a>
        </nav>
      </header>

      {/* Hero */}
      <section className={styles.hero}>
        <img className={styles.heroImg} src={HERO} alt="Modern residential architecture" />
        <div className={styles.heroScrim} />
        <div className={styles.heroBody}>
          <h1 className={styles.heroTitle}>RESIDENTIAL</h1>
          <div className={styles.heroBar}>
            <span>Residential</span>
            <span>Residential Architecture</span>
            <span>Los Angeles, 2025</span>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className={styles.section}>
        <div className={styles.shell}>
          <div className={styles.introGrid}>
            <Reveal className={styles.introMedia}>
              <img src={INTRO} alt="Residential interior" />
            </Reveal>
            <Reveal className={styles.introCopy}>
              <h2>Thoughtful Residential Design Rooted In Beauty, Function, And Everyday Living.</h2>
              <p className={styles.introLead}>
                We design and engineer homes that reflect how you live — blending timeless architecture with modern performance. From custom homes to additions and ADUs, our integrated approach ensures every detail supports your vision, lifestyle, and long-term value.
              </p>
              <div className={styles.featRow}>
                <div className={styles.feat}>
                  <span className={styles.featIcon}>◇</span>
                  <h4>Design With Purpose</h4>
                  <p>Spaces shaped around how you live, not just how they look.</p>
                </div>
                <div className={styles.feat}>
                  <span className={styles.featIcon}>◈</span>
                  <h4>Built To Last</h4>
                  <p>High-performance solutions that enhance comfort, efficiency, and enduring quality.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <div className={styles.shell}>
          <Reveal className={styles.blockHead}>
            <p className={styles.eyebrow}>Our Residential Services</p>
          </Reveal>
          <div className={styles.servicesGrid}>
            {services.map((s, i) => (
              <article
                key={s.n}
                data-reveal
                className={`${styles.svcCard} ${styles.reveal}`}
                style={{ ["--d" as string]: `${(i % 2) * 90}ms` } as React.CSSProperties}
              >
                <div className={styles.svcImg}><img src={s.img} alt={s.title} /></div>
                <div className={styles.svcBody}>
                  <p className={styles.svcNum}>{s.n}</p>
                  <span className={styles.svcArrow}>↗</span>
                  <h3 className={styles.svcTitle}>{s.title}</h3>
                  <p className={styles.svcCopy}>{s.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className={styles.section} style={{ background: "var(--paper2)" }}>
        <div className={styles.shell}>
          <div className={styles.processGrid}>
            <Reveal className={styles.processIntro}>
              <p className={styles.eyebrow}>Residential Services</p>
              <h2>Our Process. Your Vision. Delivered With Care.</h2>
              <p>We combine thoughtful design with technical expertise to create homes that are beautiful, functional, and built to perform.</p>
            </Reveal>
            <Reveal>
              <div className={styles.colGrid}>
                <div className={styles.col}>
                  <h5>Services</h5>
                  <ul>{scopeServices.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <div className={styles.col}>
                  <h5>Our Process</h5>
                  <ul>{processSteps.map(([n, item]) => <li key={n}><span>{n}</span>{item}</li>)}</ul>
                </div>
                <div className={styles.col}>
                  <h5>Scope</h5>
                  <ul>{scope.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Explore more work */}
      <section className={styles.section}>
        <div className={styles.shell}>
          <Reveal className={styles.workHead}>
            <p className={styles.eyebrow}>Explore More Residential Work</p>
            <a className={styles.viewAll} href="https://nguyen-studio.framer.website/">View All Projects →</a>
          </Reveal>
          <div className={styles.workRow}>
            {work.map((w, i) => (
              <Reveal className={styles.workCard} key={w.name} delay={i * 80}>
                <figure>
                  <div className={styles.workImg}><img src={w.img} alt={w.name} /></div>
                  <figcaption>
                    <p className={styles.workName}>{w.name}</p>
                    <p className={styles.workLoc}>{w.loc}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA + footer */}
      <section className={styles.ctaFooter}>
        <div className={styles.shell}>
          <div className={styles.ctaInner}>
            <div className={styles.ctaTop}>
              <h2>Open to new projects and collaborations that shape meaningful spaces.</h2>
              <a className={styles.getInTouch} href="mailto:info@nguyenarchitecture.com">Get In Touch ↗</a>
            </div>
            <div className={styles.footCols}>
              <div className={styles.footCol}>
                <div className={styles.footLead}>
                  <div className={styles.footIcons}>
                    <span>✉</span><span>☏</span><span>◍</span>
                  </div>
                </div>
              </div>
              <div className={styles.footCol}>
                <a href="https://nguyen-studio.framer.website/">Home</a>
                <a href="https://nguyen-studio.framer.website/">About</a>
                <a href="/client-demos/client-8889/residential">Services</a>
                <a href="https://nguyen-studio.framer.website/">Projects</a>
                <a href="mailto:info@nguyenarchitecture.com">Contact</a>
              </div>
              <div className={styles.footCol}>
                <a href="https://nguyen-studio.framer.website/">LinkedIn</a>
                <a href="https://nguyen-studio.framer.website/">Instagram</a>
                <a href="https://nguyen-studio.framer.website/">Behance</a>
              </div>
              <div className={styles.footCol}>
                <a href="https://nguyen-studio.framer.website/">Privacy Policy</a>
                <a href="https://nguyen-studio.framer.website/">Cookie Policy</a>
                <a href="https://nguyen-studio.framer.website/">Terms &amp; Conditions</a>
              </div>
            </div>
            <div className={styles.copyright}>© 2025 Nguyen Architecture &amp; Engineering. All rights reserved.</div>
          </div>
        </div>
        <div className={styles.bottomImg}><img src={BOTTOM} alt="Residential architecture at dusk" /></div>
      </section>
    </main>
  )
}
