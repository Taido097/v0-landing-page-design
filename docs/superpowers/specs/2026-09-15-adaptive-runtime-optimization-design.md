# Adaptive Runtime Optimization Design

## Goal

Improve DesignedbyTD runtime performance on weaker computers without changing the website's visual design, content, links, pricing, interactions, demo order, animations, videos, blur effects, or user-facing behavior.

## Scope

This is an optimization-only change. The site must look and behave the same to visitors. Performance improvements happen behind the scenes by reducing unnecessary concurrent browser work.

The optimization applies to:

- Homepage hero preview runtime
- Homepage Selected Demos runtime
- `/demos` live preview runtime
- NGUYEN embedded preview runtime
- Video/iframe/animation lifecycle management
- Off-screen and hidden-tab work
- Repeated layout reads and animation-frame work
- Preview mounting, preloading, and cleanup

## Non-Goals

The implementation must not:

- Change layout, spacing, typography, colors, shadows, blur appearance, imagery, copy, pricing, navigation, or links
- Remove or visually simplify animations, videos, or effects
- Replace live previews with permanent static screenshots
- Change demo ordering or categories
- Change click/tap behavior
- Change the full NGUYEN demo behavior
- Introduce a visible performance-mode control or badge

## Adaptive Runtime Strategy

Use a shared client-side runtime policy that chooses how much work may run concurrently based on browser/device signals and recent frame timing. The policy affects scheduling and resource concurrency only, not the visual result.

### Initial Signals

The controller may consider:

- `navigator.hardwareConcurrency`
- `navigator.deviceMemory` when available
- `document.visibilityState`
- `prefers-reduced-motion` only as a scheduling hint, not as permission to change the site's visible design
- viewport size/mobile state

These signals produce a conservative initial runtime budget. They are hints, not permanent labels.

### Runtime Frame Monitoring

While the page is visible, sample `requestAnimationFrame` timing over short windows. If sustained frame timing shows the browser is under load, lower only the amount of concurrent background work. Do not constantly oscillate between levels during one visit.

The controller exposes a small runtime budget such as:

- maximum concurrent live preview iframes
- preview prefetch distance
- background animation-frame cadence for auto-scroll scheduling
- whether a non-visible preview should stay mounted

The controller never changes CSS appearance, removes effects, changes content, or disables the currently visible demo.

## Resource Scheduling Rules

### Live Iframes

- A visible live preview always remains eligible to run.
- Off-screen previews must pause embedded videos/animations immediately.
- Far-off previews must unmount so their JavaScript, media, and layout work stop entirely.
- Near-view previews may preload only when the current runtime budget has capacity.
- Never keep extra live previews mounted solely for convenience on a constrained device.

### Auto-Scroll

- Preserve the same apparent auto-scroll timing and path.
- Avoid layout reads on every animation frame.
- Cache scroll targets and refresh them at bounded intervals.
- Skip work when the iframe is not visible, not painted, the tab is hidden, or the preview is not the active runnable preview.
- Coalesce animation work so multiple preview components do not independently consume unnecessary frame callbacks while off-screen.

### Video and Animation Lifecycle

- Pause videos and embedded animations when their preview is not active or the document becomes hidden.
- Resume them when that preview becomes active again.
- Do not change which videos or animations are visible to the user.

### Hidden Browser Tabs

When `document.visibilityState !== 'visible'`:

- stop preview auto-scroll loops
- pause preview videos/animations
- avoid preloading additional iframes

When the tab becomes visible again, resume only the previews that are currently eligible under the runtime budget.

## Component Integration

### Shared Runtime Controller

Create a focused client utility/hook responsible only for runtime scheduling state. It should expose a stable policy to consumers and avoid triggering frequent React re-renders from every frame sample.

### Homepage Hero

Keep the current hero visual behavior. Optimize only lifecycle work:

- avoid unnecessary iframe/video work for non-active or off-screen content
- stop pointer/preview frame work when the section or document is not visible
- retain the same visible video, carousel, and live preview behavior

### Selected Demos

Keep current sticky layout and live preview behavior. Integrate the shared runtime budget so only the previews needed for current/near-current rendering remain mounted, with stronger cleanup when the device is constrained.

### All Demos

Keep the current cards, screenshots, live iframe transition, and auto-scroll. Replace fixed preload assumptions with the shared runtime budget and ensure far-off cards fully release iframe resources.

### NGUYEN Preview

Keep the existing dedicated lightweight preview route and caching. Apply the same scheduling and visibility lifecycle rules to its iframe; do not alter the full client demo.

## Stability Rules

- Once the runtime controller lowers its concurrency budget during a visit because of sustained slow frame timing, do not raise it again during that visit.
- A visible active demo must never disappear because of a budget downgrade.
- Snapshot fallbacks remain available while an iframe is mounting or remounting.
- Cross-origin or restricted iframe access must fail safely without breaking navigation or rendering.

## Testing

Add source-level regression checks for the architectural guarantees and preserve the existing preview regression checks.

Verification must include:

- production build succeeds
- current live-preview regression checks still pass
- adaptive runtime regression checks pass
- homepage still contains the same public sections and selected demo entries
- `/demos` still contains the same demo entries and categories
- NGUYEN links still open the full demo while preview embedding uses its preview route
- no visible copy/layout classes are intentionally changed as part of this performance pass

## Success Criteria

The change is successful when weaker computers execute less concurrent iframe/video/animation work while visitors see the same website and the same interactive/live-demo behavior.