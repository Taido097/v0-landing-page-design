# RISK_RULES.md — Risk Framework

> **STATUS: PROVISIONAL — requires owner approval before any live deployment.**
> All numbers below are conservative starting points, not final settings.
> Per `CORE_RULES.md`, the agent may tighten any of these autonomously but may
> NEVER loosen them without owner approval logged in `SYSTEM_CHANGELOG.md`.

**Version:** 1.0 (provisional)
**Status:** NOT approved for live capital

---

## 1. Position-Level Risk (provisional)

| Parameter                     | Starting value        | Notes                              |
| ----------------------------- | --------------------- | ---------------------------------- |
| Risk per trade                | 0.10% – 0.20% equity  | Start at the floor (0.10%)         |
| Max simultaneous positions    | 1 – 2                 | Start at 1                         |
| Min reward/risk to consider   | 2.0 : 1               | Below this → PASS                  |

## 2. Account-Level Risk (provisional)

| Parameter                     | Starting value        | Action on breach                   |
| ----------------------------- | --------------------- | ---------------------------------- |
| Max daily loss                | ~0.50% equity         | Stop new trades for the day        |
| Max weekly drawdown           | ~1.5% – 2.0% equity   | Drop one drawdown mode             |
| Consecutive losses            | 2 – 3                 | Pause new trading, reassess        |

## 3. Position Sizing — Risk-First, Always

Sizing is derived from the loss taken at the invalidation point. The desired
dollar position size is **never** the input; it is always the output.

```
risk_dollars   = account_equity * risk_per_trade_pct
risk_per_share = abs(entry_price - stop_price)      # must be > 0
raw_shares     = floor(risk_dollars / risk_per_share)
shares         = min(raw_shares, liquidity_cap, buying_power_cap)
```

**Worked example** (from spec):
- Account = $10,000; risk = 0.20% → risk_dollars = $20
- Entry = $50.00; stop = $49.50 → risk_per_share = $0.50
- shares = floor($20 / $0.50) = **40 shares** (position = $2,000)

**Never** start with "I want a $2,000 position" and invent a stop to fit.
Determine invalidation FIRST, then size.

If `risk_per_share == 0`, or entry/stop are uncertain, or the resulting share
count is 0 → **PASS**.

## 4. Drawdown-Mode Ladder

The agent may move DOWN autonomously. Moving UP requires predefined
owner-approved recovery conditions or explicit owner approval.

```
NORMAL     → normal approved risk
   │ (drawdown / consecutive losses trip a threshold)
   ▼
CAUTION    → risk per trade halved, max 1 position
   │
   ▼
DEFENSIVE  → very small exposure, only A+ setups
   │
   ▼
PAPER-ONLY → no real capital, continue logging as paper
   │
   ▼
SAFE MODE  → no new trades at all (see design/SAFE_MODE.md)
```

Provisional downscale triggers (owner to finalize):
| From → To            | Trigger (provisional)                        |
| -------------------- | -------------------------------------------- |
| NORMAL → CAUTION     | daily loss ≥ 0.25% OR 2 consecutive losses   |
| CAUTION → DEFENSIVE  | weekly DD ≥ 1.0% OR 3 consecutive losses     |
| DEFENSIVE → PAPER    | weekly DD ≥ 1.5%                             |
| any → SAFE MODE      | any SAFE MODE trigger (see below)            |

## 5. Portfolio-Level Risk

Evaluate total exposure, not trades in isolation:
- Sector concentration (e.g. several semiconductor names = one tech bet).
- Correlated positions / direction concentration.
- Aggregate open risk (sum of all planned losses) must stay within the
  daily/weekly limits above.
- Total portfolio risk must remain within owner-approved limits.

## 6. Event-Risk Reduction

Unless an approved strategy specifically trades event volatility, reduce
exposure or avoid initiating around: FOMC decisions, CPI, PPI, employment
reports, other major economic releases, company earnings/guidance, major
regulatory announcements, major unexpected news.

## 7. Instrument Restrictions (initial)

**Allowed:** liquid U.S. equities only.
**Excluded until separately tested + owner-approved:** options, leveraged/inverse
products, penny stocks, illiquid securities, wide-spread names, anything the
agent does not understand.

## 8. Automatic Downscaling of Capital

Risk reduction is allowed automatically; risk expansion is not. Illustrative
(owner to finalize): 0.20% → 0.10% → 0.05% → paper-only as evidence
deteriorates.

---

**Approval block (to be completed before live):**
- [ ] Owner has reviewed all numbers above
- [ ] Account size confirmed
- [ ] Final per-trade / daily / weekly limits set
- [ ] Recovery (mode-up) conditions defined
- [ ] Signed off in `SYSTEM_CHANGELOG.md`
