import type { Metadata } from 'next'
import styles from './residential.module.css'
import { processSteps, projectStrip, residentialServices, scopeItems } from './content'

export const metadata: Metadata = {
  title: 'Residential | NGUYEN Architecture & Engineering',
  description: 'Residential architecture, engineering, permitting, and plan-check support for Southern California projects.',
  robots: { index: false, follow: false },
}

const conceptHome = '/client-demos/client-8889/arcsphere-socal'
const residentialRoute = '/client-demos/client-8889/arcsphere/residential'

export default function ResidentialServicesPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.shell}>
          <nav aria-label="Primary navigation" className={styles.nav}>
            <div className={styles.navLeft}>
              <a href={conceptHome}>HOME</a>
              <a href={residentialRoute} aria-current="page">RESIDENTIAL</a>
              <a href={conceptHome}>COMMERCIAL</a>
            </div>

            <a href={conceptHome} className={styles.brand} aria-label="NGUYEN Architecture & Engineering home">
              <strong>NGUYEN</strong>
              <span>ARCHITECTURE & ENGINEERING</span>
            </a>

            <div className={styles.navRight}>
              <a href={conceptHome}>ABOUT</a>
              <a href={conceptHome}>PROJECTS</a>
              <a href={conceptHome} className={styles.contactButton}>CONTACT US</a>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <section className={`${styles.shell} ${styles.heroSection}`}>
          <div className={styles.hero}>
            <img className={styles.heroImage} src="/client-8889/residential/house-2-custom-4k.webp" alt="Modern residential architecture" />
            <div className={styles.heroContent}>
              <p className={styles.eyebrowOnImage}>RESIDENTIAL SERVICES</p>
              <h1>RESIDENTIAL</h1>
              <div className={styles.heroMeta}>
                <span>RESIDENTIAL SERVICES</span>
                <span>ARCHITECTURE + ENGINEERING</span>
                <span>SOUTHERN CALIFORNIA</span>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.shell} ${styles.introSection}`}>
          <div className={styles.introGrid}>
            <div className={styles.introVisual}>
              <img className={styles.introImage} src="/client-8889/projects/minimalist-apartment-interior.webp" alt="Residential interior design" />
            </div>

            <div className={styles.introCopy}>
              <p className={styles.sectionLabel}>RESIDENTIAL DESIGN + ENGINEERING</p>
              <h2>Thoughtful Residential Design Rooted in Beauty, Function, and Everyday Living.</h2>
              <p className={styles.lead}>
                We design and engineer homes that reflect how people live — combining thoughtful architecture with coordinated engineering, permitting, and practical project support from concept through approval.
              </p>

              <div className={styles.principles}>
                <article>
                  <span className={styles.symbol}>⌁</span>
                  <h3>DESIGN WITH PURPOSE</h3>
                  <p>Spaces shaped around how the home is used, not only how it looks.</p>
                </article>
                <article>
                  <span className={styles.symbol}>◇</span>
                  <h3>BUILT TO LAST</h3>
                  <p>Coordinated architecture and engineering focused on performance, clarity, and long-term value.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.shell} ${styles.servicesSection}`}>
          <div className={styles.sectionHeadingRow}>
            <div>
              <p className={styles.sectionLabel}>OUR RESIDENTIAL SERVICES</p>
              <h2 className={styles.sectionTitle}>Architecture, engineering, and permit support for homes of every scale.</h2>
            </div>
            <p className={styles.sectionIntro}>
              From custom homes and major remodels to ADUs and multifamily work, each project is coordinated as one clear residential design process.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {residentialServices.map((service) => (
              <article className={styles.serviceCard} key={service.number}>
                <div className={styles.serviceVisual}>
                  <img className={styles.cardImage} src={service.image} alt="" aria-hidden="true" />
                </div>
                <div className={styles.serviceCopy}>
                  <div className={styles.cardTopline}>
                    <span>{service.number}</span>
                    <span aria-hidden="true" className={styles.cardArrow}>→</span>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.shell} ${styles.summarySection}`}>
          <div className={styles.summaryIntro}>
            <p className={styles.sectionLabel}>RESIDENTIAL SERVICES</p>
            <h2>Our Process. Your Vision. Delivered With Care.</h2>
            <p>
              NGUYEN combines architectural design, coordinated engineering, and permitting support to keep residential projects clear, buildable, and moving toward approval.
            </p>
          </div>

          <div className={styles.summaryGrid}>
            <div className={styles.summaryColumn}>
              <h3>SERVICES</h3>
              <ul>{residentialServices.map((service) => <li key={service.number}>{service.title}</li>)}</ul>
            </div>

            <div className={styles.summaryColumn}>
              <h3>OUR PROCESS</h3>
              <ol>
                {processSteps.map((step) => (
                  <li key={step.number}><span>{step.number}</span><strong>{step.title}</strong></li>
                ))}
              </ol>
            </div>

            <div className={styles.summaryColumn}>
              <h3>SCOPE</h3>
              <ul>{scopeItems.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
        </section>

        <section className={`${styles.shell} ${styles.projectsSection}`}>
          <div className={styles.projectHeading}>
            <p className={styles.sectionLabel}>EXPLORE MORE RESIDENTIAL WORK</p>
            <a href={conceptHome}>VIEW ALL PROJECTS <span aria-hidden="true">→</span></a>
          </div>

          <div className={styles.projectStrip}>
            {projectStrip.map((project) => (
              <article className={styles.projectCard} key={project.title}>
                <div className={styles.projectVisual}>
                  <img className={styles.projectImage} src={project.image} alt="" aria-hidden="true" />
                </div>
                <h3>{project.title}</h3>
              </article>
            ))}
          </div>
        </section>

        <footer className={`${styles.shell} ${styles.footerSection}`}>
          <div className={styles.footerPanel}>
            <div className={styles.footerLead}>
              <h2>OPEN TO NEW PROJECTS<br />AND COLLABORATIONS THAT<br />SHAPE MEANINGFUL SPACES.</h2>
              <a href={conceptHome} className={styles.footerContact}>GET IN TOUCH</a>
            </div>

            <div className={styles.footerLinks}>
              <div>
                <a href={conceptHome}>HOME</a>
                <a href={conceptHome}>ABOUT</a>
                <a href={conceptHome}>SERVICES</a>
                <a href={conceptHome}>PROJECTS</a>
                <a href={conceptHome}>PROCESS</a>
                <a href={conceptHome}>CONTACT</a>
              </div>
              <div>
                <a href={conceptHome}>LINKEDIN</a>
                <a href={conceptHome}>INSTAGRAM</a>
                <a href={conceptHome}>BEHANCE</a>
              </div>
              <div>
                <a href={conceptHome}>PRIVACY POLICY</a>
                <a href={conceptHome}>COOKIE POLICY</a>
                <a href={conceptHome}>TERMS & CONDITIONS</a>
              </div>
            </div>

            <div className={styles.footerBottom}>
              <div className={styles.footerIcons} aria-label="Contact links">
                <a href="mailto:info@nguyenarchitecture.com" aria-label="Email">✉</a>
                <a href="tel:12092338888" aria-label="Phone">⌕</a>
                <a href={conceptHome} aria-label="Location">⌖</a>
              </div>
              <p>© 2026 NGUYEN Architecture & Engineering. All rights reserved.</p>
            </div>
          </div>
        </footer>

        <section className={`${styles.shell} ${styles.bottomImageSection}`}>
          <div className={styles.bottomImageWrap}>
            <img className={styles.bottomImage} src="/client-8889/residential/house-1.webp" alt="Residential architecture project" />
          </div>
        </section>
      </main>
    </div>
  )
}
