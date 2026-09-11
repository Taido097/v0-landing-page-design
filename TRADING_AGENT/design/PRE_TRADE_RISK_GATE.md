# PRE_TRADE_RISK_GATE.md — The Gate Every Order Must Pass

No order is sent unless it passes this gate. Any unverifiable critical item, any
uncertainty, any state mismatch → **PASS** (or SAFE MODE). The gate is a
sequence of hard checks; failing one stops the process and logs a row in
`data/REJECTED_TRADES.csv`.

---

## Gate sequence

```
0. Mode check      → live trading authorized? not in SAFE MODE? STOP flag unset?
                     within drawdown-mode limits? consecutive-loss pause inactive?
1. Data validity   → price fresh (timestamp within tolerance)? market open?
                     data source trusted? no abnormal API responses?
2. Reconciliation  → broker state == internal state? (equity, positions, orders,
                     buying power) — mismatch → SAFE MODE, do not trade.
3. Setup validity  → an APPROVED setup is present, fully, per its version spec.
4. Event risk      → no elevated event risk (earnings/FOMC/CPI/etc.) unless the
                     approved strategy explicitly trades it.
5. Liquidity/exec  → spread, volume, relative volume acceptable; instrument allowed.
6. Invalidation    → defined FIRST (rule 7). Then...
7. Sizing          → risk-first from RISK_RULES.md; shares > 0; within buying power.
8. Portfolio risk  → correlation/sector/direction/aggregate-open-risk within limits.
9. Duplicate guard → no identical order, no existing position/pending entry/active
                     stop, no already-executed trade_id.
10. Reward/risk    → ≥ minimum (provisional 2:1), else PASS.
11. Snapshot       → freeze immutable pre-trade snapshot (design/TRADE_SCHEMA.md).
12. Decision       → TRADE / WATCH / PASS.
```

If any of steps 0–10 fail: **do not trade.** Log the rejection with the failed
gate so we can later tell if filters are useful or over-restrictive.

---

## Full pre-trade checklist (verify before any live order)

Ticker · current price · price timestamp · market status · account equity ·
buying power · existing positions · open orders · pending orders ·
duplicate-order risk · liquidity · bid/ask spread · volume · relative volume ·
volatility · market regime · sector conditions · upcoming earnings · scheduled
economic releases · relevant company news · entry price · invalidation level ·
stop level · profit objectives · position size · maximum planned loss ·
reward/risk · correlation with existing positions · strategy name · historical
performance of similar setups · relevant lessons from memory · reason for trade
· reason trade could fail.

**If critical information cannot be verified → PASS.**

---

## The seven internal lenses (recorded in the snapshot)

Market Read → Setup Detection → Memory Check → Risk Check →
Devil's Advocate (strongest argument AGAINST) → Execution Check → Final Decision.

## Position sizing (authoritative reference)

```
risk_dollars   = equity * risk_per_trade_pct       # from RISK_RULES.md
risk_per_share = abs(entry - stop)                 # invalidation defined first
shares         = floor(risk_dollars / risk_per_share)
shares         = min(shares, liquidity_cap, buying_power_cap)
if shares == 0 or risk_per_share == 0 or inputs uncertain → PASS
```

## Execution-quality tracking (feeds strategy evaluation)

Record spread, slippage, partial fills, delays, rejects, order type, expected vs
actual fill. A strategy profitable before costs can be unprofitable after them;
execution quality is part of every strategy's evaluation.
