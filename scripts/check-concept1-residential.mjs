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
