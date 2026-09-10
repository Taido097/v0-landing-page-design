import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

const routeSource = readFileSync(
  new URL("../app/client-demos/client-8889/arcsphere-socal/route.ts", import.meta.url),
  "utf8",
)

const engineeringPatch = routeSource.match(
  /const ENGINEERING_SERVICE_PATCH = `([\s\S]*?)`\n\nconst PROJECT_CARDS_PATCH/,
)?.[1]

test("phone-width hiding is limited to media explicitly marked on the Engineering card", () => {
  assert.ok(engineeringPatch, "expected to find ENGINEERING_SERVICE_PATCH")
  assert.match(
    engineeringPatch,
    /\[data-nguyen-engineering-service="true"\] \[data-nguyen-engineering-media="true"\] \{/,
  )
  // Blanket descendant selectors turned a mis-scoped card marker into a site-wide image blackout.
  assert.doesNotMatch(engineeringPatch, /\[data-nguyen-engineering-service="true"\] img/)
  assert.doesNotMatch(engineeringPatch, /\[data-nguyen-engineering-service="true"\] picture/)
})

test("the card search refuses containers broader than a single service card", () => {
  assert.ok(engineeringPatch, "expected to find ENGINEERING_SERVICE_PATCH")
  assert.match(engineeringPatch, /function isTooBroad/)
  assert.match(engineeringPatch, /body, main, header, footer, nav/)
  assert.match(engineeringPatch, /h1, h2, h3, h4, h5, h6'\) \|\| \[\]\)\.length > 1/)
  assert.match(engineeringPatch, /img'\) \|\| \[\]\)\.length > 2/)
  assert.match(engineeringPatch, /if \(isTooBroad\(card\)\) break/)
})

test("breadth is judged by content, not by the section and article tags", () => {
  assert.ok(engineeringPatch, "expected to find ENGINEERING_SERVICE_PATCH")
  // The services list renders each row as a section/article. Rejecting those by tag stopped the climb
  // short of the row, so the description converted but the title stayed as the original copy.
  assert.doesNotMatch(engineeringPatch, /body, main, header, footer, nav, section, article/)
})

test("the card search anchors on the card title rather than on finding an image", () => {
  assert.ok(engineeringPatch, "expected to find ENGINEERING_SERVICE_PATCH")
  assert.match(engineeringPatch, /function containsTitle/)
  assert.match(engineeringPatch, /if \(!containsTitle\(card\)\) continue/)
  // The phone copy of the card has no image, so an img-seeking climb always overshot the card.
  assert.doesNotMatch(engineeringPatch, /if \(!card\.querySelector\?\.\('img'\)\) continue/)
})

test("title matching requires an exact leaf so the description cannot match itself", () => {
  assert.ok(engineeringPatch, "expected to find ENGINEERING_SERVICE_PATCH")
  // "ENGINEERING" is a substring of "Structural engineering, MEP, ..." in the replacement copy.
  assert.match(engineeringPatch, /if \(!titleKeys\.has\(key\)\) continue/)
  assert.match(engineeringPatch, /compact\(child\.textContent\) === key/)
})

test("markers left on a container by an earlier render are cleared", () => {
  assert.ok(engineeringPatch, "expected to find ENGINEERING_SERVICE_PATCH")
  assert.match(engineeringPatch, /function dropStaleMarkers/)
  assert.match(engineeringPatch, /removeAttribute\('data-nguyen-engineering-service'\)/)
  assert.match(engineeringPatch, /removeAttribute\('data-nguyen-engineering-media'\)/)
})
