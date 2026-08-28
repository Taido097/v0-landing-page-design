# Demo 8889 Concept 1 Residential Services Page — Design Spec

## Scope

Build a new dedicated Residential services page only inside **Demo 8889 → Concept 1**.

The main DesignedbyTD website and the other demo concepts must remain unchanged.

Phase 1 delivers the Residential page as the master service-page design. The same visual system will later be reused for dedicated Commercial, ADU, and Land Development pages with service-specific content and imagery.

## Approved Visual Direction

The approved reference is the warm editorial architecture layout shown in the conversation: a warm off-white page, restrained warm-gray typography, large rounded architectural photography, generous whitespace, thin borders, quiet uppercase labels, and a large cream CTA/footer panel.

The Residential page must feel like a native continuation of the existing NGUYEN Concept 1 site, not a separate template.

### Visual tokens

Use these reference-derived tokens unless the live Concept 1 stylesheet provides an exact equivalent that should be inherited instead:

- Page background: `#EDE9E4`
- Elevated cream surface / footer panel: `#E4DCD3`
- Primary text: `#4E4842`
- Strong text / dark button: `#4A443E`
- White-on-image text: `#F7F4F0`
- Hairline border: `rgba(78, 72, 66, 0.18)`
- Muted text: `rgba(78, 72, 66, 0.72)`
- Image overlay on hero: subtle bottom-weighted black gradient, approximately `rgba(0,0,0,0.52)` at the bottom fading toward transparent above
- Card radius: 8–10px
- Hero/footer image radius: 8–10px
- Shadows: none by default; rely on borders, spacing, and image contrast

Typography should inherit the exact font family already rendered by Concept 1 wherever possible. Preserve the existing NGUYEN hierarchy: uppercase micro-labels and navigation, clean modern display headings, restrained body copy, tight heading line-height, and slightly increased letter-spacing on labels.

## Route Structure

Phase 1 route:

- `/client-demos/client-8889/arcsphere/residential`

Existing Concept 1 home remains:

- `/client-demos/client-8889/arcsphere`

Future service routes will follow the same hierarchy:

- `/client-demos/client-8889/arcsphere/commercial`
- `/client-demos/client-8889/arcsphere/adu`
- `/client-demos/client-8889/arcsphere/land-development`

Only the Residential route is built in Phase 1.

## Navigation Behavior

On Demo 8889 Concept 1 only:

- Clicking the `RESIDENTIAL` navigation item opens the dedicated Residential page as a full-page navigation.
- It must not open a dropdown or modal.
- The Residential page header retains the same NGUYEN brand treatment and navigation style as Concept 1.
- `RESIDENTIAL` is visually marked active on the Residential page.
- The NGUYEN brand/home affordance returns to the Concept 1 home route.
- Other service navigation items remain unchanged in Phase 1 until their dedicated pages are implemented.

## Residential Page Structure

### 1. Header

Match the current Concept 1 navigation proportions and placement.

Desktop structure:

- Left: Home / Residential / Commercial
- Center: `NGUYEN` with `ARCHITECTURE & ENGINEERING` treatment
- Right: About / Projects / Contact Us

Residential receives the same understated active-state underline used in the approved visual reference.

Mobile uses the existing Concept 1 mobile navigation behavior, with minimum 44px touch targets.

### 2. Residential Hero

Large rounded architectural photograph directly below the header.

Use a strong residential exterior image from the Demo 8889 asset set, favoring the approved high-resolution home imagery already stored under `public/client-8889/residential/`.

Overlay content near the lower-left:

- Large title: `RESIDENTIAL`
- Bottom metadata row:
  - `RESIDENTIAL SERVICES`
  - `ARCHITECTURE + ENGINEERING`
  - `SOUTHERN CALIFORNIA`

The hero should be visually dominant but not full viewport height. It should resemble the proportions in the approved reference.

Interaction: a subtle load-in fade/scale and restrained image movement only. No aggressive parallax.

### 3. Residential Introduction

Two-column editorial split.

Left:

- Large residential interior or exterior supporting image

Right:

Heading:

`Thoughtful Residential Design Rooted in Beauty, Function, and Everyday Living.`

Body copy:

`We design and engineer homes that reflect how people live — combining thoughtful architecture with coordinated engineering, permitting, and practical project support from concept through approval.`

Two compact supporting principles beneath the copy:

- `DESIGN WITH PURPOSE` — spaces shaped around how the home is used, not only how it looks.
- `BUILT TO LAST` — coordinated architecture and engineering focused on performance, clarity, and long-term value.

Use simple line icons or small architectural symbols consistent with the approved reference.

### 4. Residential Service Cards

Section label:

`OUR RESIDENTIAL SERVICES`

Desktop: two-column grid.

Mobile: one-column stack.

Each service card combines representative imagery, service number, title, short description, and a small directional arrow. Cards should match the approved reference with image and copy sharing one bordered horizontal card rather than floating SaaS-style tiles.

Residential offerings:

1. `CUSTOM HOMES`
   - Bespoke homes designed around lifestyle, site, and long-term goals.

2. `ADDITIONS & MAJOR REMODELS`
   - Thoughtful expansions and transformations coordinated with the existing home.

3. `ADUs`
   - Detached, attached, garage conversion, JADU, and other accessory dwelling unit solutions.

4. `MULTIFAMILY / TOWNHOMES / CONDOS`
   - Residential projects balancing livability, density, efficiency, and community requirements.

5. `STRUCTURAL ENGINEERING`
   - Structural coordination for new homes, additions, remodels, and residential modifications.

6. `MEP + TITLE 24`
   - Mechanical, electrical, plumbing, and California energy-code coordination where applicable.

7. `PERMITTING`
   - Permit-document coordination and city submittal support from design through review.

8. `PLAN-CHECK SUPPORT`
   - Responsive support for agency comments, corrections, and approval coordination.

Service cards in Phase 1 are informative sections of the Residential overview. They do not create eight additional detail pages.

Hover behavior on pointer devices:

- Image scale approximately 1.02–1.04
- Arrow shifts 4–6px
- Border darkens subtly

No dramatic card lift or heavy shadows.

### 5. Residential Services / Process / Scope Summary

Use the same compact lower-page structure shown in the approved reference.

Left editorial statement:

`Our Process. Your Vision. Delivered With Care.`

Supporting copy explains that NGUYEN combines architectural design, coordinated engineering, and permitting support to keep residential projects clear and buildable.

Three information columns:

#### Services

- Custom Homes
- Additions & Remodels
- ADUs
- Multifamily / Townhomes / Condos
- Structural Engineering
- MEP + Title 24
- Permitting
- Plan-Check Support

#### Our Process

1. Discovery & Site Review
2. Design & Engineering
3. Documentation
4. Permitting
5. Plan-Check & Approval
6. Construction Support

#### Scope

- Architecture
- Structural Engineering
- MEP Engineering
- Title 24 Coordination
- Permitting
- Plan-Check Support

### 6. Residential Work Strip

Section label:

`EXPLORE MORE RESIDENTIAL WORK`

A five-item project-image strip matching the approved reference.

Use existing Demo 8889 residential/project assets where they are visually appropriate. Do not invent client names, project budgets, ratings, awards, or completion claims.

If project names are not supported by existing site content, use neutral descriptive labels such as:

- Custom Residence
- Major Remodel
- Residential Addition
- Garden ADU
- Multifamily Residence

Right-aligned text link:

`VIEW ALL PROJECTS →`

The link may point to the existing Concept 1 project experience until a dedicated project index is added.

### 7. CTA / Footer Panel

Large cream rounded panel matching the approved reference.

Primary message:

`OPEN TO NEW PROJECTS AND COLLABORATIONS THAT SHAPE MEANINGFUL SPACES.`

CTA:

`GET IN TOUCH`

Reuse the existing Concept 1 footer/navigation language and contact affordances where available. Do not add unsupported addresses, license numbers, customer ratings, years of experience, guarantees, or social profiles.

### 8. Bottom Architectural Image

Finish the page with a wide rounded residential architectural image directly beneath the CTA/footer panel, matching the approved reference composition.

## Tracking

Normal Residential navigation should use the clean route with no required query string.

When a future campaign or promotional section needs source attribution, use an optional query parameter:

- `?source=residential-section`

The page must render identically with or without this parameter.

No user-facing tracking text is displayed.

## Mobile Behavior

At mobile widths:

- Keep the same warm editorial visual identity.
- Hero retains rounded corners and readable overlay text.
- Service cards become one-column cards.
- Images remain above or beside text based on available width, without horizontal overflow.
- Minimum interactive target size: 44×44px.
- Typography scales down without changing the hierarchy.
- Avoid `100vh` dependencies for critical content.
- No element should rely on hover to expose required information.
- Motion should respect `prefers-reduced-motion`.

## Asset Rules

- Prefer existing static assets already stored in the Demo 8889 repository.
- Use the high-resolution residential asset `public/client-8889/residential/house-2-custom-4k.webp` where appropriate.
- Reuse existing `public/nguyen-service-images/` assets for structural, MEP, permitting, site-planning, and code/energy-support cards where appropriate.
- Never replace a valid static image with sprite/canvas reconstruction unless the static source is proven unavailable.
- New image assets, if required later, must be committed as real files under `public/` and cache-busted only when needed.

## Isolation Requirements

Implementation must not modify the visible behavior or styling of:

- DesignedbyTD main website
- Demo 8889 Concept 2+
- Existing Custom Home detail-page layout or image fixes
- Commercial, ADU, or Land Development navigation behavior until their dedicated pages are explicitly implemented

Any Concept 1 navigation patch must be scoped so that only the Residential item is redirected in Phase 1.

## Acceptance Criteria

The Phase 1 Residential work is complete when all of the following are true:

1. Demo 8889 Concept 1 `RESIDENTIAL` opens a standalone full page rather than a dropdown/modal.
2. The destination route is `/client-demos/client-8889/arcsphere/residential`.
3. The page visually follows the approved reference: warm off-white palette, editorial spacing, rounded architectural imagery, two-column service-card grid, compact process section, project strip, and cream CTA/footer panel.
4. Residential content uses NGUYEN-relevant architecture, engineering, Title 24, permitting, and plan-check services rather than generic home-maintenance services.
5. No unsupported trust claims are invented.
6. Desktop and mobile layouts are functional and visually consistent.
7. Existing Concept 1 Custom Home image fixes remain intact.
8. The DesignedbyTD main site and all other demo concepts are unchanged.
9. Production verification confirms the new Residential route loads successfully and Concept 1 navigation reaches it.
