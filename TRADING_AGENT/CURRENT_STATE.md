# CURRENT_STATE.md — Live System State

> Single source of truth for "what mode are we in right now." Updated at the
> start/end of every session and on every mode transition. This file describes
> intent and status; it is NOT the brokerage record (that comes from
> reconciliation).

**Last updated:** 2026-09-15 (Robinhood connected — read-only verification)

---

## Operating Status

| Field                     | Value                                             |
| ------------------------- | ------------------------------------------------- |
| Development phase         | **Phase 9 — MICRO-LIVE** (real $20) + shadow in parallel |
| Trading mode              | **MICRO-LIVE ARMED** — go live on next valid setup (tomorrow's open) |
| Simulation equity         | **$20,000** (paper/shadow sizing basis; owner-set)   |
| Live authorization        | **YES — micro-live approved 2026-09-15**; $20 fully at-risk (owner) |
| Drawdown mode             | n/a (no capital deployed)                          |
| SAFE MODE                 | Inactive                                          |
| Robinhood connection      | **Connected — READ-ONLY** via Robin MCP connector |
| Tradable account          | "Agentic" ••••4713 (individual, limited_margin)   |
| Live trading authorized?  | **NO** — owner approval not given                 |
| `STOP LIVE TRADING` flag  | Not set                                           |

## Capital (Agentic account ••••4713, as of 2026-09-15)

| Field                     | Value                     |
| ------------------------- | ------------------------- |
| Account total value       | $0.01                     |
| Account equity            | $0.00                     |
| Cash                      | $20.01 ($20 deposit)      |
| Buying power              | $20.01                    |
| Open positions            | 0                         |
| Open orders               | 0                         |
| Status                    | **FUNDED — armed for micro-live** on next valid setup |

## Active Strategies

| Strategy         | Status        | Capital | Notes                        |
| ---------------- | ------------- | ------- | ---------------------------- |
| (none yet)       | —             | —       | First strategy proposed in `design/FIRST_STRATEGY_RECOMMENDATION.md` |

## Risk Counters (session)

| Counter                    | Value |
| -------------------------- | ----- |
| Trades today               | 0     |
| Realized P&L today         | $0.00 |
| Consecutive losses         | 0     |
| Daily loss used            | 0.00% |
| Weekly drawdown used        | 0.00% |

## Outstanding Owner Approvals Needed

- [ ] Approve final risk numbers in `RISK_RULES.md`
- [ ] Approve first strategy for backtesting
- [ ] Approve Robinhood connection method
- [ ] Approve progression from paper → micro-live

## Reconciliation

| Field                     | Value              |
| ------------------------- | ------------------ |
| Last reconciliation       | 2026-09-15 (read-only) |
| Internal vs broker match? | **Yes** — both empty (0 positions, 0 orders); internal journals empty |
| Discrepancies open        | 0                  |
| Notes                     | Account is limited_margin; per RISK_RULES we operate cash-only, no margin/leverage, until owner approves otherwise |
