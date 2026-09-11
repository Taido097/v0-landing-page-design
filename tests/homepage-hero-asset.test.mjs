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

test('selected homepage hero image is present and non-empty', () => {
  assert.equal(existsSync(heroPath), true)
  assert.ok(statSync(heroPath).size > 100_000)
})
