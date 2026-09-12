import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const src = readFileSync(
  new URL('../app/client-demos/client-8889/arcsphere-fixed/builders-complete-patch.ts', import.meta.url),
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
