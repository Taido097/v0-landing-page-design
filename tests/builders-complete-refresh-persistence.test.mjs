import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const src = readFileSync(
  new URL('../app/client-demos/client-8889/arcsphere-fixed/builders-complete-patch.ts', import.meta.url),
  'utf8',
)
const baseRoute = readFileSync(
  new URL('../app/client-demos/client-8889/arcsphere/route.ts', import.meta.url),
  'utf8',
)
const socalRoute = readFileSync(
  new URL('../app/client-demos/client-8889/arcsphere-socal/route.ts', import.meta.url),
  'utf8',
)

test('Builders Complete repairs only hidden display state after hydration', () => {
  assert.match(src, /function revealBuildersVisibility\(card\)/)
  assert.match(src, /getPropertyValue\('display'\) === 'none'/)
  assert.match(src, /removeProperty\('display'\)/)
  assert.doesNotMatch(src, /data-nguyen-builders-complete[^\n]*display[^\n]*flex/i)
})

test('a style-only re-hide of the marked Builders row is observed and repaired', () => {
  assert.match(src, /attributeFilter: \['style'\]/)
  assert.match(src, /closest\(BUILDERS_SELECTOR\)/)
  assert.match(src, /querySelector\(BUILDERS_SELECTOR\)/)
})

test('the Builders marker is installed before visibility repair', () => {
  const markerIndex = src.indexOf("card.setAttribute(BUILDERS_MARKER, 'true')")
  const revealIndex = src.indexOf('revealBuildersVisibility(card)')
  assert.ok(markerIndex >= 0, 'expected Builders marker assignment')
  assert.ok(revealIndex > markerIndex, 'expected visibility repair after marking the card')
})

test('the base layer no longer hides the source row reused by Builders Complete', () => {
  const extraDescriptions = baseRoute.match(/const extraServiceDescriptions = \[([\s\S]*?)\];/)?.[1] || ''
  assert.doesNotMatch(
    extraDescriptions,
    /Professional guidance during construction to ensure the design vision is executed correctly\./,
  )
})

test('Concept 1 no longer injects the legacy extra-card cleanup that collapses Builders', () => {
  const responsePatch = socalRoute.match(/html = html\.replace\('<\/body>', `([\s\S]*?)<\/body>`\)/)?.[1] || ''
  assert.doesNotMatch(responsePatch, /\$\{EXTRA_CARD_CLEANUP_PATCH\}/)
})
