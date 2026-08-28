# Concept 1 Residential Services Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dedicated Residential services page only for Demo 8889 Concept 1, and make the existing Concept 1 `RESIDENTIAL` navigation item open that full page instead of the current Framer behavior.

**Architecture:** Keep the existing Concept 1 proxy route (`arcsphere-socal`) intact for the main demo. Add a new native Next.js page at `/client-demos/client-8889/arcsphere/residential` with isolated CSS and content data, then inject one narrowly scoped navigation patch into `arcsphere-socal/route.ts` so only the `RESIDENTIAL` nav item points to the new page. Reuse existing static Demo 8889 assets from `public/`; do not introduce sprite/canvas image reconstruction.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS Modules, existing static assets under `public/`, Node.js source-contract check, Vercel production deployment.

**Spec:** `docs/superpowers/specs/2026-08-29-concept1-residential-services-design.md`

## Global Constraints

- Scope is **Demo 8889 → Concept 1 only**.
- Do not change the DesignedbyTD main website.
- Do not change Demo 8889 Concept 2, 3, or 4.
- Do not alter the existing Custom Home detail-page image patches.
- Phase 1 builds only the Residential standalone page; Commercial, ADU, and Land Development dedicated pages remain future work.
- Dedicated Residential route is exactly `/client-demos/client-8889/arcsphere/residential`.
- Normal Residential navigation uses the clean route with no required query string.
- Page must preserve the approved warm editorial architecture visual direction.
- Use NGUYEN-relevant architecture/engineering services, not generic home-maintenance categories.
- Do not invent ratings, guarantees, addresses, license numbers, awards, years of experience, budgets, or unsupported project claims.
- Reuse real static files in `public/`; `public/client-8889/residential/house-2-custom-4k.webp` is the preferred hero-quality asset.
- Minimum mobile interactive target is 44×44px.
- Required information must not depend on hover.
- Motion must respect `prefers-reduced-motion`.
- No critical layout may depend on `100vh`.

---

## File Structure

- Create `app/client-demos/client-8889/arcsphere/residential/content.ts`
  - Owns Residential service cards, process steps, scope items, and project-strip labels/assets.
- Create `app/client-demos/client-8889/arcsphere/residential/page.tsx`
  - Owns the semantic standalone Residential page, page metadata, header, hero, sections, CTA/footer panel, and bottom image.
- Create `app/client-demos/client-8889/arcsphere/residential/residential.module.css`
  - Owns all Residential-page-only visual tokens, layout, responsive behavior, hover states, and reduced-motion behavior.
- Modify `app/client-demos/client-8889/arcsphere-socal/route.ts`
  - Adds one injected client-side patch that rewrites only the Concept 1 `RESIDENTIAL` navigation anchor to the dedicated route.
- Create `scripts/check-concept1-residential.mjs`
  - Source-contract test for route isolation, required content, forbidden generic services/claims, and the nav target.
- Modify `package.json`
  - Adds `check:concept1-residential` script with no new dependency.

---

### Task 1: Add a fail-first Concept 1 Residential contract check

**Files:**
- Create: `scripts/check-concept1-residential.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: repository files only.
- Produces: `npm run check:concept1-residential`, which exits non-zero until the dedicated page and nav patch satisfy the approved contract.

- [ ] **Step 1: Create the source-contract check before the page exists**

Create `scripts/check-concept1-residential.mjs` with this content:

```js
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const pagePath = resolve(root, 'app/client-demos/client-8889/arcsphere/residential/page.tsx')
const contentPath = resolve(root, 'app/client-demos/client-8889/arcsphere/residential/content.ts')
const cssPath = resolve(root, 'app/client-demos/client-8889/arcsphere/residential/residential.module.css')
const conceptRoutePath = resolve(root, 'app/client-demos/client-8889/arcsphere-socal/route.ts')
const heroAssetPath = resolve(root, 'public/client-8889/residential/house-2-custom-4k.webp')

const requiredFiles = [pagePath, contentPath, cssPath, conceptRoutePath, heroAssetPath]
for (const path of requiredFiles) {
  if (!existsSync(path)) throw new Error(`Missing required Concept 1 Residential file: ${path}`)
}

const page = readFileSync(pagePath, 'utf8')
const content = readFileSync(contentPath, 'utf8')
const css = readFileSync(cssPath, 'utf8')
const conceptRoute = readFileSync(conceptRoutePath, 'utf8')
const combined = `${page}\n${content}`

const requiredText = [
  'RESIDENTIAL',
  'CUSTOM HOMES',
  'ADDITIONS & MAJOR REMODELS',
  'ADUs',
  'MULTIFAMILY / TOWNHOMES / CONDOS',
  'STRUCTURAL ENGINEERING',
  'MEP + TITLE 24',
  'PERMITTING',
  'PLAN-CHECK SUPPORT',
  'Our Process. Your Vision. Delivered With Care.',
  'OPEN TO NEW PROJECTS AND COLLABORATIONS THAT SHAPE MEANINGFUL SPACES.',
]
for (const text of requiredText) {
  if (!combined.includes(text)) throw new Error(`Missing approved Residential copy: ${text}`)
}

const forbiddenGeneric = /\b(plumbing service|hvac service|landscaping service|cleaning service)\b/i
if (forbiddenGeneric.test(combined)) throw new Error('Generic home-maintenance service copy leaked into NGUYEN Residential page')

const forbiddenClaims = /\b(5[- ]star|customer rating|service guarantee|licensed since|years of experience)\b/i
if (forbiddenClaims.test(combined)) throw new Error('Unsupported trust claim found in Residential page')

const targetRoute = '/client-demos/client-8889/arcsphere/residential'
if (!conceptRoute.includes(targetRoute)) throw new Error('Concept 1 Residential nav target is not wired to the dedicated route')
if (!conceptRoute.includes('RESIDENTIAL')) throw new Error('Concept 1 Residential nav patch is not scoped by label')

if (!css.includes('@media (prefers-reduced-motion: reduce)')) throw new Error('Residential CSS must honor reduced-motion preference')
if (/100vh/.test(css)) throw new Error('Residential page must not depend on 100vh')

console.log('Concept 1 Residential contract check passed')
```

- [ ] **Step 2: Add the npm script**

In `package.json`, add exactly:

```json
"check:concept1-residential": "node scripts/check-concept1-residential.mjs"
```

The scripts block becomes:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "eslint .",
  "check:concept1-residential": "node scripts/check-concept1-residential.mjs"
}
```

- [ ] **Step 3: Run the contract check and verify it fails for the correct reason**

Run:

```bash
npm run check:concept1-residential
```

Expected: FAIL because `app/client-demos/client-8889/arcsphere/residential/page.tsx` does not exist yet.

- [ ] **Step 4: Commit the fail-first contract**

```bash
git add scripts/check-concept1-residential.mjs package.json
git commit -m "test: define Concept 1 Residential page contract"
```

---

### Task 2: Build the isolated Residential content model and native page

**Files:**
- Create: `app/client-demos/client-8889/arcsphere/residential/content.ts`
- Create: `app/client-demos/client-8889/arcsphere/residential/page.tsx`

**Interfaces:**
- Consumes: static images under `/client-8889/residential/`, `/client-8889/projects/`, and `/nguyen-service-images/`.
- Produces: a server-rendered page at `/client-demos/client-8889/arcsphere/residential` with all approved Residential sections and clean in-page semantics.

- [ ] **Step 1: Create Residential content data**

Create `content.ts` with typed data:

```ts
export type ResidentialService = {
  number: string
  title: string
  description: string
  image: string
}

export type ResidentialProcessStep = {
  number: string
  title: string
}

export const residentialServices: ResidentialService[] = [
  {
    number: '01',
    title: 'CUSTOM HOMES',
    description: 'Bespoke homes designed around lifestyle, site, and long-term goals.',
    image: '/client-8889/residential/house-2-custom-4k.webp',
  },
  {
    number: '02',
    title: 'ADDITIONS & MAJOR REMODELS',
    description: 'Thoughtful expansions and transformations coordinated with the existing home.',
    image: '/client-8889/projects/minimalist-apartment-interior.webp',
  },
  {
    number: '03',
    title: 'ADUs',
    description: 'Detached, attached, garage conversion, JADU, and other accessory dwelling unit solutions.',
    image: '/nguyen-service-images/site-planning.jpg',
  },
  {
    number: '04',
    title: 'MULTIFAMILY / TOWNHOMES / CONDOS',
    description: 'Residential projects balancing livability, density, efficiency, and community requirements.',
    image: '/client-8889/residential/house-1.webp',
  },
  {
    number: '05',
    title: 'STRUCTURAL ENGINEERING',
    description: 'Structural coordination for new homes, additions, remodels, and residential modifications.',
    image: '/nguyen-service-images/structural-engineering.jpg',
  },
  {
    number: '06',
    title: 'MEP + TITLE 24',
    description: 'Mechanical, electrical, plumbing, and California energy-code coordination where applicable.',
    image: '/nguyen-service-images/mep-engineering.jpg',
  },
  {
    number: '07',
    title: 'PERMITTING',
    description: 'Permit-document coordination and city submittal support from design through review.',
    image: '/nguyen-service-images/permit-services.jpg',
  },
  {
    number: '08',
    title: 'PLAN-CHECK SUPPORT',
    description: 'Responsive support for agency comments, corrections, and approval coordination.',
    image: '/nguyen-service-images/code-energy-compliance.jpg',
  },
]

export const processSteps: ResidentialProcessStep[] = [
  { number: '01', title: 'Discovery & Site Review' },
  { number: '02', title: 'Design & Engineering' },
  { number: '03', title: 'Documentation' },
  { number: '04', title: 'Permitting' },
  { number: '05', title: 'Plan-Check & Approval' },
  { number: '06', title: 'Construction Support' },
]

export const scopeItems = [
  'Architecture',
  'Structural Engineering',
  'MEP Engineering',
  'Title 24 Coordination',
  'Permitting',
  'Plan-Check Support',
]

export const projectStrip = [
  { title: 'Custom Residence', image: '/client-8889/residential/house-2-custom-4k.webp' },
  { title: 'Major Remodel', image: '/client-8889/projects/minimalist-apartment-interior.webp' },
  { title: 'Residential Addition', image: '/nguyen-service-images/architectural-design.jpg' },
  { title: 'Garden ADU', image: '/nguyen-service-images/site-planning.jpg' },
  { title: 'Multifamily Residence', image: '/client-8889/residential/house-1.webp' },
]
```

- [ ] **Step 2: Create the server-rendered page shell and metadata**

Create `page.tsx` with no client directive. Use `Metadata` and explicitly keep the private demo out of search indexes:

```tsx
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
```

The page must render, in this order:

1. NGUYEN header with Residential active.
2. Rounded hero using `/client-8889/residential/house-2-custom-4k.webp`.
3. Editorial intro split.
4. `OUR RESIDENTIAL SERVICES` two-column card grid using `residentialServices`.
5. `Our Process. Your Vision. Delivered With Care.` summary with Services / Our Process / Scope columns.
6. `EXPLORE MORE RESIDENTIAL WORK` five-image strip.
7. Cream CTA/footer panel with `GET IN TOUCH` and existing supported navigation labels.
8. Wide rounded bottom architectural image.

Use ordinary `<a>` elements for navigation because the rest of Concept 1 is proxied HTML and the dedicated page should navigate cleanly between native and proxied routes.

- [ ] **Step 3: Use only supported links in the page header/footer**

Header structure:

```tsx
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
    <a href={`${conceptHome}#about`}>ABOUT</a>
    <a href={`${conceptHome}#projects`}>PROJECTS</a>
    <a href={`${conceptHome}#contact`} className={styles.contactButton}>CONTACT US</a>
  </div>
</nav>
```

If the proxied Concept 1 source does not expose stable `#about`, `#projects`, or `#contact` anchors during execution, replace those three `href` values with `conceptHome` rather than inventing unsupported fragment behavior. The contract is the label/style consistency; the Residential link is the only new routing behavior in Phase 1.

- [ ] **Step 4: Run the contract check and verify the remaining failure is the nav patch**

Run:

```bash
npm run check:concept1-residential
```

Expected: FAIL with `Concept 1 Residential nav target is not wired to the dedicated route` because `arcsphere-socal/route.ts` has not been patched yet.

- [ ] **Step 5: Commit the page structure/content**

```bash
git add app/client-demos/client-8889/arcsphere/residential/content.ts app/client-demos/client-8889/arcsphere/residential/page.tsx
git commit -m "feat: add Concept 1 Residential services page structure"
```

---

### Task 3: Match the approved warm editorial reference with isolated CSS

**Files:**
- Create: `app/client-demos/client-8889/arcsphere/residential/residential.module.css`

**Interfaces:**
- Consumes: class names from `page.tsx`.
- Produces: the approved page appearance without modifying global styles or other demos.

- [ ] **Step 1: Define Residential-only visual tokens**

At the top of `residential.module.css`:

```css
.page {
  --res-bg: #ede9e4;
  --res-panel: #e4dcd3;
  --res-text: #4e4842;
  --res-strong: #4a443e;
  --res-on-image: #f7f4f0;
  --res-border: rgba(78, 72, 66, 0.18);
  --res-muted: rgba(78, 72, 66, 0.72);
  min-height: 100%;
  background: var(--res-bg);
  color: var(--res-text);
  font-family: inherit;
}
```

Do not add a global font import. Let the page inherit the project/Concept 1 font environment and use CSS weight/letter-spacing to match the approved hierarchy.

- [ ] **Step 2: Implement the desktop editorial layout**

Required desktop rules:

```css
.shell {
  width: min(100% - 32px, 1440px);
  margin: 0 auto;
}

.hero {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  aspect-ratio: 16 / 7.8;
}

.hero::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.06) 58%, transparent 78%);
  pointer-events: none;
}

.heroImage,
.cardImage,
.projectImage,
.introImage,
.bottomImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.servicesGrid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.serviceCard {
  min-width: 0;
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(190px, .82fr);
  border: 1px solid var(--res-border);
  border-radius: 9px;
  overflow: hidden;
  background: transparent;
}

.serviceVisual {
  overflow: hidden;
  aspect-ratio: 1.28 / 1;
}

.serviceCopy {
  display: flex;
  min-height: 100%;
  flex-direction: column;
  padding: 24px 22px 20px;
}

.ctaPanel {
  border-radius: 10px;
  background: var(--res-panel);
}
```

Keep shadows absent by default.

- [ ] **Step 3: Add restrained interactions**

```css
.serviceCard .cardImage,
.serviceCard .cardArrow {
  transition: transform 420ms cubic-bezier(.2,.7,.2,1);
}

@media (hover: hover) and (pointer: fine) {
  .serviceCard:hover {
    border-color: rgba(78, 72, 66, 0.34);
  }

  .serviceCard:hover .cardImage {
    transform: scale(1.035);
  }

  .serviceCard:hover .cardArrow {
    transform: translateX(5px);
  }
}
```

- [ ] **Step 4: Add mobile behavior and 44px targets**

```css
@media (max-width: 767px) {
  .shell {
    width: min(100% - 20px, 1440px);
  }

  .hero {
    aspect-ratio: 4 / 3.8;
    border-radius: 8px;
  }

  .servicesGrid,
  .introGrid,
  .summaryGrid {
    grid-template-columns: 1fr;
  }

  .serviceCard {
    grid-template-columns: 1fr;
  }

  .serviceVisual {
    aspect-ratio: 4 / 3;
  }

  .nav a,
  .contactButton,
  .cardArrowLink,
  .ctaLink {
    min-height: 44px;
    min-width: 44px;
    display: inline-flex;
    align-items: center;
  }
}
```

The header may simplify on small screens, but `RESIDENTIAL`, brand/home, and contact affordances must remain available and tappable.

- [ ] **Step 5: Add reduced-motion handling**

```css
@media (prefers-reduced-motion: reduce) {
  .heroImage,
  .cardImage,
  .cardArrow,
  .serviceCard {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
}
```

- [ ] **Step 6: Run contract check**

```bash
npm run check:concept1-residential
```

Expected: still FAIL only on the Concept 1 nav route target until Task 4.

- [ ] **Step 7: Commit styling**

```bash
git add app/client-demos/client-8889/arcsphere/residential/residential.module.css
git commit -m "style: match Concept 1 Residential approved reference"
```

---

### Task 4: Redirect only the Concept 1 RESIDENTIAL nav item to the standalone page

**Files:**
- Modify: `app/client-demos/client-8889/arcsphere-socal/route.ts`

**Interfaces:**
- Consumes: proxied Concept 1 HTML from `arcsphere-fixed/route`.
- Produces: one scoped runtime patch that changes only the `RESIDENTIAL` nav anchor on the Concept 1 route.

- [ ] **Step 1: Add a narrowly scoped navigation patch constant**

Add this constant before `export async function GET()`:

```ts
const RESIDENTIAL_NAV_PATCH = `
<script id="nguyen-concept1-residential-nav-patch">
(() => {
  const TARGET_LABEL = 'RESIDENTIAL';
  const TARGET_HREF = '/client-demos/client-8889/arcsphere/residential';
  const normalize = (value) => (value || '').replace(/\\s+/g, ' ').trim().toUpperCase();

  function patchResidentialLink(root = document.body) {
    if (!root) return false;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const matches = [];

    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (normalize(node.nodeValue) === TARGET_LABEL) matches.push(node);
    }

    let patched = false;
    for (const node of matches) {
      const anchor = node.parentElement?.closest('a');
      if (!anchor) continue;
      anchor.setAttribute('href', TARGET_HREF);
      anchor.removeAttribute('target');
      anchor.removeAttribute('rel');
      anchor.dataset.nguyenResidentialStandalone = 'true';
      patched = true;
    }
    return patched;
  }

  patchResidentialLink();
  window.addEventListener('load', patchResidentialLink, { once: true });
  [250, 750, 1500, 3000].forEach((delay) => setTimeout(patchResidentialLink, delay));

  const observer = new MutationObserver(() => patchResidentialLink());
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  setTimeout(() => observer.disconnect(), 6000);
})();
</script>`
```

This deliberately does not patch `COMMERCIAL`, `ADU`, or `LAND DEVELOPMENT` in Phase 1.

- [ ] **Step 2: Inject the nav patch alongside existing Concept 1 patches**

Change the final body injection from:

```ts
html = html.replace('</body>', `${SPLIT_TEXT_PATCH}${BRAND_PATCH}${TARGET_IMAGE_PATCH}</body>`)
```

to:

```ts
html = html.replace('</body>', `${SPLIT_TEXT_PATCH}${BRAND_PATCH}${TARGET_IMAGE_PATCH}${RESIDENTIAL_NAV_PATCH}</body>`)
```

Do not modify `TARGET_IMAGE_PATCH`, `BRAND_PATCH`, or the Custom Home image selectors.

- [ ] **Step 3: Run the contract check and verify it passes**

```bash
npm run check:concept1-residential
```

Expected:

```text
Concept 1 Residential contract check passed
```

- [ ] **Step 4: Commit the navigation change**

```bash
git add app/client-demos/client-8889/arcsphere-socal/route.ts
git commit -m "feat: open Concept 1 Residential as standalone page"
```

---

### Task 5: Verify build, isolation, mobile behavior, and production routing

**Files:**
- No new files expected.
- Inspect diff only.

**Interfaces:**
- Consumes: completed implementation.
- Produces: evidence that the page builds, the nav reaches it, and unrelated sites/concepts were not changed.

- [ ] **Step 1: Run the dedicated contract check**

```bash
npm run check:concept1-residential
```

Expected: PASS.

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: exit code 0. If existing unrelated lint failures already exist, record them separately and verify no new failures are introduced by the Residential files.

- [ ] **Step 3: Run a production build**

```bash
npm run build
```

Expected: Next.js build succeeds and includes `/client-demos/client-8889/arcsphere/residential`.

- [ ] **Step 4: Review the final git diff for isolation**

Run:

```bash
git diff HEAD~4..HEAD -- \
  app/client-demos/client-8889/arcsphere/residential \
  app/client-demos/client-8889/arcsphere-socal/route.ts \
  scripts/check-concept1-residential.mjs \
  package.json
```

Confirm there are no changes to:

- `app/page.tsx`
- `components/header.tsx`
- `components/footer.tsx`
- `app/client-demos/client-8889/prismae/`
- `app/client-demos/client-8889/forma/`
- `app/client-demos/client-8889/architectured/`
- existing Custom Home target/image patch files

- [ ] **Step 5: Verify local desktop and mobile rendering**

Start the app:

```bash
npm run dev
```

Check the dedicated route at desktop width approximately 1440px and mobile width approximately 390px.

Desktop acceptance:

- warm off-white background
- NGUYEN header consistent with Concept 1
- rounded hero
- readable white hero overlay text
- editorial intro split
- 2-column service cards
- compact process/scope summary
- five-item project strip
- cream CTA/footer panel
- wide bottom image
- no horizontal overflow

Mobile acceptance:

- no blank/off-white rendering bug
- hero content remains visible
- one-column service stack
- no horizontal overflow
- no required hover-only content
- interactive targets at least 44px
- no `100vh` critical dependency

- [ ] **Step 6: Verify the Concept 1 navigation behavior locally**

Open:

```text
/client-demos/client-8889/arcsphere-socal
```

Click the visible `RESIDENTIAL` nav item.

Expected destination:

```text
/client-demos/client-8889/arcsphere/residential
```

Confirm `COMMERCIAL`, `ADU`, and `LAND DEVELOPMENT` retain their Phase 1 behavior.

- [ ] **Step 7: Verify the deployed Vercel production result after the GitHub push**

After the production deployment reaches `READY`, fetch both:

```text
https://designedbytd.com/client-demos/client-8889/arcsphere-socal
https://designedbytd.com/client-demos/client-8889/arcsphere/residential
```

Expected:

- both return HTTP 200
- Residential returns HTML, not an image/redirect/error
- the deployed Concept 1 source contains the Residential dedicated-route target
- Vercel production alias remains attached to `designedbytd.com`

- [ ] **Step 8: Final visual verification before claiming completion**

Use a real rendered-browser check or screenshot-capable browser against production at both desktop and mobile widths. Do not claim pixel-perfect completion based only on HTTP 200/source inspection.

Compare against the approved reference for:

- page proportions
- warm palette
- rounded image treatment
- heading hierarchy
- service-card structure
- spacing rhythm
- CTA/footer composition

If a mismatch is visual-only, fix only `residential.module.css` or the Residential page markup; do not alter the global site or existing Concept 1 proxy patches.

---

## Self-Review

- Spec coverage: every approved Phase 1 requirement is mapped to Tasks 1–5.
- Isolation: only the new nested Residential page, one scoped `arcsphere-socal` nav patch, and a local contract script/package entry are modified.
- Routing: the public destination is exactly `/client-demos/client-8889/arcsphere/residential`.
- Content: all eight approved Residential services are explicit; no generic plumbing/HVAC/cleaning/landscaping categories are introduced.
- Claims: no unsupported ratings, guarantees, budgets, licenses, or experience claims are added.
- Assets: the plan uses the verified static 4K residential WebP and existing repo images only.
- Mobile: one-column cards, 44px targets, reduced motion, and no `100vh` requirement are explicit.
- Custom Home safety: existing image replacement patches are explicitly preserved.
- Future pages: Commercial, ADU, and Land Development remain outside Phase 1 and are not accidentally wired by this plan.
