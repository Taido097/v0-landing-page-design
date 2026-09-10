import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"

const routeSource = readFileSync(
  new URL("../app/client-demos/client-8889/arcsphere-socal/route.ts", import.meta.url),
  "utf8",
)

const heroImagePatch = routeSource.match(
  /const HERO_IMAGE_PATCH = `([\s\S]*?)`\n\n\/\/ Route hero/,
)?.[1]

test("homepage hero has a scoped self-hosted image repair for mobile", () => {
  assert.ok(heroImagePatch, "expected to find HERO_IMAGE_PATCH")
  assert.match(heroImagePatch, /nguyen-socal-hero-image-patch/)
  assert.match(heroImagePatch, /header\[data-framer-name="hero-section"\]/)
  assert.match(heroImagePatch, /\/client-8889\/residential\/footer-main-1728\.jpg/)
})

test("hero image repair removes responsive Framer sources and forces the layer visible", () => {
  assert.ok(heroImagePatch, "expected to find HERO_IMAGE_PATCH")
  assert.match(heroImagePatch, /removeAttribute\('srcset'\)/)
  assert.match(heroImagePatch, /removeAttribute\('sizes'\)/)
  assert.match(heroImagePatch, /opacity', '1', 'important'/)
  assert.match(heroImagePatch, /objectFit = 'cover'/)
})

test("hero image repair paints the visible mobile hero container, not only hidden image tags", () => {
  assert.ok(heroImagePatch, "expected to find HERO_IMAGE_PATCH")
  assert.match(heroImagePatch, /nguyen-socal-hero-mobile-image-style/)
  assert.match(heroImagePatch, /@media \(max-width: 809px\)/)
  assert.match(heroImagePatch, /\[data-framer-name="hero_img-box"\]/)
  assert.match(heroImagePatch, /linear-gradient/)
})

test("hero image repair loads before hero CTA routing", () => {
  assert.match(routeSource, /TESTIMONIAL_PATCH\}\$\{HERO_IMAGE_PATCH\}\$\{HERO_CTA_PATCH\}/)
})

