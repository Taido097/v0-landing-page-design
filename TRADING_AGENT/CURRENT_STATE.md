# CURRENT_STATE.md — Live System State

> Single source of truth for "what mode are we in right now." Updated at the
> start/end of every session and on every mode transition. This file describes
> intent and status; it is NOT the brokerage record (that comes from
> reconciliation).

**Last updated:** 2026-09-11 (initial scaffold)

---

## Operating Status

| Field                     | Value                                             |
| ------------------------- | ------------------------------------------------- |
| Development phase         | **Phase 1 — architecture & memory (in progress)** |
| Trading mode              | **NOT TRADING** (no live, no paper yet)           |
| Drawdown mode             | n/a (no capital deployed)                          |
| SAFE MODE                 | Inactive                                          |
| Robinhood connection      | **Not connected** (design stage only)             |
| Live trading authorized?  | **NO** — owner approval not given                 |
| `STOP LIVE TRADING` flag  | Not set                                           |

## Capital

| Field                     | Value                     |
| ------------------------- | ------------------------- |
| Account equity            | Unknown (not connected)   |
| Buying power              | Unknown                   |
| Open positions            | 0                         |
| Open orders               | 0                         |
| Cash                      | Unknown                   |

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
| Last reconciliation       | Never (not connected) |
| Internal vs broker match? | n/a                |
| Discrepancies open        | 0                  |
