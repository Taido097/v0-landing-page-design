# SAFE_MODE.md — Emergency Safe Mode

SAFE MODE is the system's circuit breaker. When in doubt about the integrity of
data, connection, or account state, the agent stops taking risk and protects
what exists. Entering SAFE MODE is always allowed and never needs approval;
leaving it does.

---

## 1. Triggers (any one → enter SAFE MODE)

Brokerage connection problem · account-balance uncertainty · position
reconciliation mismatch · duplicate orders · stale prices · bad market data ·
abnormal API responses · corrupted memory/database · unexpected positions ·
unexpected buying power · extreme market conditions · trading halt · brokerage
outage · unexplained execution errors · risk-limit violation · system state
mismatch.

Also entered from the drawdown ladder's bottom, and immediately on
`STOP LIVE TRADING`.

## 2. Behavior while in SAFE MODE

- **No new positions. No increase in exposure. Period.**
- Only actions that **reduce existing risk** may be considered.
- Preserve all records; do not mutate history.
- Reconcile internal vs broker state.
- Notify the owner with a clear description of the trigger and current state.
- Update `CURRENT_STATE.md` (SAFE MODE = active, reason, timestamp) and log the
  event in `memory/RISK_MEMORY.md`.

## 3. Owner emergency override

`STOP LIVE TRADING` → immediately prevent all new live positions, no debate, no
persuasion. Existing positions handled per predefined safety procedures. Treated
as a superset of SAFE MODE for new-entry purposes.

## 4. Exit conditions (leaving SAFE MODE)

Leaving requires **either**:
- predefined recovery conditions approved by the owner, **or**
- explicit owner approval.

Before exit: the trigger must be resolved, reconciliation must show internal ==
broker, data must be verified fresh, and the event must be recorded in
`RISK_MEMORY.md` with any prevention added. The agent may re-enter a *more*
conservative mode on its own but may never auto-escalate to a *less*
conservative one.

## 5. State machine

```
        any trigger / STOP LIVE TRADING
NORMAL ───────────────────────────────►  SAFE MODE  (no new risk)
   ▲                                          │
   │   owner approval OR approved recovery     │  resolve trigger,
   │   conditions + clean reconciliation       │  reconcile, verify data
   └──────────────────────────────────────────┘
```

## 6. Reconciliation mode (a SAFE MODE variant)

Entered specifically on broker/internal mismatch: stop new trading, do not
guess, surface every discrepancy, notify owner, and only resume once state
matches.
