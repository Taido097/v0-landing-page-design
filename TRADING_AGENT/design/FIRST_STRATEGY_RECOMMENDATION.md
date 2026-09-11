# FIRST_STRATEGY_RECOMMENDATION.md — The Simplest First Strategy

Per spec §57, we start with **one** simple, fully-measurable strategy — not many
at once. This document makes a recommendation for the owner to approve *for
research and backtesting only*. Nothing here is tradeable.

---

## Recommendation: Opening-Range Breakout (ORB), long-only, liquid large-caps

**Why this one first.** It scores highest on the qualities that matter for a
*first* strategy — the point is to exercise and validate the whole system
(gate → snapshot → journal → review → learning), not to find the world's best
edge:

| Requirement (spec §57) | How ORB satisfies it |
| ---------------------- | -------------------- |
| Precise entry | break/hold above the first-15-min range high |
| Precise rejection | thin volume, wide spread, extended price, event day |
| Precise invalidation | back below range midpoint/level — objective |
| Position sizing | risk-first from the invalidation distance |
| Exit logic | fixed reward/risk target + time stop, flat by close |
| Regime requirement | prefers trending / normal-to-elevated-vol opens |
| Liquidity requirement | restricted to a few very liquid large-caps |
| Measurable results | every parameter is numeric and backtestable |

Long-only and intraday-only (flat before close) removes overnight gap risk and
short-borrow complexity for the first strategy.

## Alternatives considered (and why not first)

- **Moving-average pullback / trend continuation** — good, but entry timing is
  fuzzier and regime-dependent; harder to specify a crisp invalidation.
- **Mean reversion (fade extremes)** — attractive stats but fights the trend;
  tail risk and "catching a falling knife" make it a poor *first* teacher.
- **Gap-and-go / news momentum** — deliberately excluded early: it lives on
  event risk and thin, fast tape — the opposite of a conservative starter.
- **Options / leveraged products** — excluded by `RISK_RULES.md` until
  separately tested and owner-approved.

## Draft spec

Full draft in `../versions/strategy_v1.md` (registered as **S001** in
`../STRATEGY_REGISTRY.md`, stage = IDEA).

## Proposed next steps (each needs owner OK to proceed)

1. Owner approves ORB as the first research strategy.
2. Finalize the universe (5–10 symbols), opening-range length, target/time-stop.
3. Backtest with realistic costs → walk-forward out-of-sample
   (`../research/BACKTEST_RESULTS.md`).
4. If it survives: shadow → paper → micro-live, per `LEARNING_PIPELINE.md`.

## What I need from the owner now

- [ ] Approve (or redirect) ORB as the first strategy to research.
- [ ] Confirm account size so `RISK_RULES.md` numbers can be finalized.
- [ ] Confirm we proceed to Phase 2 (trade schema/journaling implementation) or
      pause for architecture review first.

*Reminder: approval here authorizes research only — not any live or paper
order.*
