# strategy_v1.0 — Opening-Range Breakout (DRAFT / PROPOSED)

> **Status: DRAFT — IDEA stage. Not approved. Not backtested. Not tradeable.**
> This is the first proposed strategy specification. It exists so we have one
> simple, fully-measurable strategy to research first (spec §57). Full rationale
> in `../design/FIRST_STRATEGY_RECOMMENDATION.md`.

**Strategy ID:** S001
**Version:** 1.0 (draft)
**Created:** 2026-09-11
**Owner approval:** none

---

## Concept

Trade the resolution of the first-N-minutes trading range ("opening range") on
a small universe of highly liquid, large-cap U.S. equities. One direction,
long-only to start. Chosen because entry, invalidation, and exit are all
precise and measurable, and the setup is well documented.

## Draft Rules (to be tuned during backtest, not during live trading)

- **Universe:** 5–10 highly liquid large-caps (e.g. mega-cap ETFs/stocks with
  tight spreads and high average volume). Exact list defined at backtest.
- **Opening range:** high/low of the first 15 minutes after the open.
- **Entry (long):** price breaks and holds above the opening-range high with
  above-average relative volume.
- **Rejection conditions (PASS):** wide spread, below-average volume, price
  already extended, major event risk that day (earnings/FOMC/CPI/etc.),
  regime not supportive, or any pre-trade gate failure.
- **Invalidation:** back below the opening-range midpoint (or a defined level);
  determined FIRST, before sizing.
- **Stop:** at the invalidation level. Never widened to avoid a loss (rule 14).
- **Target:** initial reward/risk ≥ 2:1; partial/trail rules defined at backtest.
- **Time stop:** exit by a fixed cutoff (e.g. no new entries after a set time;
  flat before close) — no overnight risk initially.
- **Sizing:** risk-first per `RISK_RULES.md` (0.10–0.20% at invalidation).
- **Max positions:** 1 to start.

## Required Market Regime

Prefer trending / normal-to-elevated volatility opens. Avoid dead low-volume
sessions and known event days unless the strategy is later specialized for them.

## Measurement Plan

Backtest with realistic costs → walk-forward out-of-sample → shadow → paper →
micro-live. Record everything in `research/BACKTEST_RESULTS.md` and
`research/SETUP_STATISTICS.md`.

## Change History

| Version | Date | Change | Reason | Owner approval |
| ------- | ---- | ------ | ------ | -------------- |
| 1.0 (draft) | 2026-09-11 | Initial proposal | Need one simple first strategy | none |
