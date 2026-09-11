import assert from 'node:assert/strict'
import { existsSync, readFileSync, statSync } from 'node:fs'
import test from 'node:test'

const routeSource = readFileSync(
  new URL('../app/client-demos/client-8889/arcsphere-socal/route.ts', import.meta.url),
  'utf8',
)
const heroPath = new URL(
  '../public/client-8889/homepage-hero-courtyard-morning.webp',
  import.meta.url,
)

test('homepage hero uses the selected morning courtyard asset on every breakpoint', () => {
  assert.match(routeSource, /const HOMEPAGE_HERO_IMAGE = '\/client-8889\/homepage-hero-courtyard-morning\.webp'/)
  assert.match(routeSource, /vVqkA2phwOpc7kzAHksLgpPasxY\.png/)
  assert.match(routeSource, /for \(const source of HOMEPAGE_HERO_SOURCES\) html = html\.split\(source\)\.join\(HOMEPAGE_HERO_IMAGE\)/)
  assert.doesNotMatch(routeSource, /matchMedia[^\n]+homepage-hero-courtyard-morning/)
})

test('hero lock survives Framer hydration without revealing or restyling side images', () => {
  assert.match(routeSource, /const HOMEPAGE_HERO_LOCK_PATCH = `/)
  assert.match(routeSource, /header\[data-framer-name="hero-section"\] img/)
  assert.match(routeSource, /data-nguyen-homepage-hero/)
  assert.match(routeSource, /removeAttribute\('srcset'\)/)
  assert.match(routeSource, /removeAttribute\('sizes'\)/)
  assert.doesNotMatch(routeSource, /HOMEPAGE_HERO_LOCK_PATCH[\s\S]*?img-left/)
  assert.doesNotMatch(routeSource, /HOMEPAGE_HERO_LOCK_PATCH[\s\S]*?img-right/)
  assert.doesNotMatch(routeSource, /HOMEPAGE_HERO_LOCK_PATCH[\s\S]*?forceVisible/)
  assert.match(routeSource, /TESTIMONIAL_PATCH\}\$\{HOMEPAGE_HERO_LOCK_PATCH\}\$\{HERO_CTA_PATCH\}/)
})

test('selected homepage hero image is present and non-empty', () => {
  assert.equal(existsSync(heroPath), true)
  assert.ok(statSync(heroPath).size > 100_000)
})
