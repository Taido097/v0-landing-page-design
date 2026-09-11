# TRADE_SCHEMA.md — Trade Database & Frozen Snapshot

Defines how trades are recorded. Two artifacts per trade:
1. an **immutable pre-trade snapshot** (what we knew BEFORE the outcome), and
2. an **append-only journal row** (facts, updated only with logged corrections).

Post-trade reasoning lives separately in `reviews/TRADE_REVIEWS.md`. This
separation is what prevents hindsight bias.

---

## 1. Journal schema (`data/*_TRADES.csv`)

All journals share one column set so they can be concatenated by tool later.
`ALL_TRADES.csv` is the master; `LIVE_` / `PAPER_` are filtered mirrors kept
separate so simulated and real performance are never blended.

| Column | Meaning |
| ------ | ------- |
| trade_id | unique id, e.g. `T-2026-0001` |
| date | trade date (YYYY-MM-DD) |
| account | broker account id / label |
| mode | live \| paper \| shadow |
| ticker | symbol |
| direction | long \| short |
| strategy | strategy id (e.g. S001) |
| setup | setup name |
| market_regime | regime tag at entry |
| entry_time / entry_price | actual fill time / price |
| exit_time / exit_price | actual exit time / price |
| position_size | shares |
| stop / target | planned levels |
| planned_risk_usd / planned_risk_pct | risk at invalidation |
| actual_pnl_usd | realized P&L |
| return_r | P&L in R (multiples of planned risk) |
| mfe / mae | max favorable / adverse excursion |
| slippage | expected vs actual fill |
| fees | commissions/fees |
| reason_entered / reason_exited | short text |
| rule_compliance | compliant \| violation:<which> |
| classification | GOOD/BAD DECISION + WIN/LOSS/BE |
| loss_class | STRATEGY \| EXECUTION \| RISK \| SYSTEM \| BEHAVIORAL \| REGIME \| n/a |
| notes | free text |

**Append-only rule:** never silently edit or delete a row. A correction is a
new, clearly-marked correction entry that references the original `trade_id`,
plus a note in `SYSTEM_CHANGELOG.md`.

## 2. Frozen pre-trade snapshot (immutable)

Created the instant a TRADE decision is made, **before** the order's outcome is
known. Stored one file per trade (proposed path once code exists:
`data/snapshots/<trade_id>.json`). Never modified after creation.

Fields:
```
trade_id, ticker, timestamp, strategy, setup, market_regime,
market_price, price_timestamp,
entry, stop, target, position_size, planned_max_loss_usd, planned_max_loss_pct,
expected_reward_risk,
volume, relative_volume, spread, volatility,
catalyst, news_summary,
reason_for_trade, reason_it_could_fail,
historical_setup_stats (win%, avg R, n),
relevant_lessons (ids from memory/),
confidence_score (evidence-based, see §4),
gate_result (all pre-trade checks passed: yes)
```

The snapshot is the answer to "what did the agent know and believe before the
result?" Reviews compare outcome against this, never rewriting it.

## 3. Trade ID & lifecycle

```
proposal → snapshot frozen → order placed → fill(s) → open (monitored)
  → exit → reconciled → journal row finalized → reviewed & classified
```
`trade_id` is assigned at snapshot time and used everywhere (snapshot, journal,
review, memory references, duplicate-order checks).

## 4. Confidence score (evidence, not emotion)

A number derived from: historical performance of the setup, setup quality,
regime fit, liquidity/volume, execution quality expectation, reward/risk,
news/event conditions, similarity to past winners vs losers, and data quality.
**A high confidence score never permits violating a risk limit.**

## 5. Data integrity

- Master journal append-only; back up important data.
- Corrections recorded as corrections, never silent changes.
- Realized gains/losses tracked separately from owner deposits/withdrawals
  (do not confuse performance with added capital).
- Records kept in a form useful for later tax/accounting reconciliation; no
  false certainty about tax consequences.
