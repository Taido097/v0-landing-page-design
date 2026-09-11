# ROBINHOOD_INTEGRATION.md — Execution & Reconciliation Layer

**Status: DESIGN ONLY. Not connected. No credentials stored. No orders.**

The eventual goal is to connect through Robinhood's **official supported
agentic / MCP infrastructure** — not unofficial browser automation or
credential sharing. This document specifies how that connection behaves so it is
safe by construction.

---

## 1. Principles

- Use official, supported authentication only. Never bypass Robinhood security.
- **Never** store brokerage passwords or secrets in these memory files.
  Authentication and trading knowledge stay separate (see §6).
- The broker is the **highest** authority on account truth (data-source
  hierarchy below). When broker and internal state disagree, the broker wins and
  trading stops.

## 2. Data-source hierarchy

1. Brokerage/account truth (positions, cash, buying power, fills)
2. Official exchange / market data
3. Official company filings / announcements
4. High-quality financial news
5. Other research
6. Social media / community discussion (never a sole basis for a trade)

Never trade on an unverified rumor. Never invent prices or account info.

## 3. Connection lifecycle

```
Phase 8a  Connect READ-ONLY. Verify identity of account, read equity/positions.
Phase 8b  Reconciliation dry-runs (no orders). Confirm internal == broker.
Phase 9   Micro-capital live: smallest possible size, one position, tight gate.
Phase 10  Autonomous within hard approved limits.
```
Each phase requires owner approval to advance.

## 4. Order placement flow (once live-authorized)

```
pre-trade gate PASSED (design/PRE_TRADE_RISK_GATE.md)
  → snapshot frozen
    → duplicate-order guard re-checked immediately before send
      → verify: correct account, ticker, action, size, order type, market state,
        risk limits, existing orders, account status
        → place order
          → confirm acknowledgement / fill
            → reconcile immediately (see §5)
              → write journal row
```
Any unresolved discrepancy at any step **blocks new trading**.

## 5. Reconciliation (after every order + periodically)

Compare broker vs internal for: actual position, expected position, open orders,
filled orders, canceled orders, cash, buying power, realized P&L, unrealized P&L.

```
if internal_state != broker_state:
    stop new trading
    enter reconciliation mode (a SAFE MODE variant)
    do NOT guess; surface the discrepancy; notify owner
```
Track: last reconciliation time, match/mismatch, open discrepancies — mirrored
in `CURRENT_STATE.md`.

## 6. Duplicate-order protection

Before sending, check: identical order already exists? open position already?
entry already pending? stop already active? same `trade_id` already executed?
Any yes → do not send.

## 7. Security boundary

- Secrets live only in the official auth mechanism / environment, never in the
  repo. `.gitignore` must exclude any credential material.
- These files may reference *that a connection exists*, never *how to
  authenticate*.

## 8. Failure handling

Abnormal API responses, outages, halts, unexplained execution errors, or
unexpected positions/buying power → **SAFE MODE** (see `SAFE_MODE.md`). Only
risk-reducing actions are considered while degraded.
