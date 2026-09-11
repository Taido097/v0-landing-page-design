# MARKET_REGIMES.md — Regime Tracking & Per-Regime Performance

> Different strategies work in different environments. Never assume one strategy
> works in all markets. Tag every trade with the regime it was taken in, then
> analyze performance by regime.

---

## Regime Taxonomy

- Strong uptrend / Weak uptrend
- Strong downtrend / Weak downtrend
- Range-bound
- High volatility / Low volatility
- High-volume event day / Low-volume session

## How the Regime Is Determined (define before live)

Placeholder method (to be finalized in `research/`): classify daily using
index trend vs a moving average, and a volatility gauge (e.g. VIX level /
ATR percentile). Recorded in each trade's snapshot.

## Current Regime Read

| Field            | Value                 |
| ---------------- | --------------------- |
| Date             | 2026-09-11            |
| Trend            | Not assessed (no live monitoring yet) |
| Volatility       | Not assessed          |
| Risk on/off      | Not assessed          |
| Notes            | Regime engine not yet built (Phase 4) |

## Performance by Regime

| Regime           | Trades | Win rate | Avg R | Expectancy | Best strategy | Notes |
| ---------------- | ------ | -------- | ----- | ---------- | ------------- | ----- |
| (all)            | 0      | —        | —     | —          | —             | new system |
