# TRADING_AGENT

An autonomous, **capital-preservation-first** trading agent. One professional
trading agent — no CEO/CFO/manager personas.

> **Current status: Phase 1 (architecture). NOT trading. Not connected to any
> broker. No credentials stored. No live or paper orders.**
> Our first job is not to make money — it is to build a system that is hard to
> destroy.

## Read in this order

1. **`CORE_RULES.md`** — the 28 immutable rules + the Asymmetry Rule. Start here.
2. **`RISK_RULES.md`** — provisional risk framework (needs owner approval).
3. **`design/ARCHITECTURE.md`** — the map: components, decision loop, build phases.
4. `design/PRE_TRADE_RISK_GATE.md` — what every order must pass.
5. `design/TRADE_SCHEMA.md` · `design/MEMORY_ARCHITECTURE.md` ·
   `design/LEARNING_PIPELINE.md` — data, memory, and how it learns.
6. `design/ROBINHOOD_INTEGRATION.md` · `design/SAFE_MODE.md` — execution,
   reconciliation, and the circuit breaker.
7. `design/FIRST_STRATEGY_RECOMMENDATION.md` — the proposed first strategy.

## Live state

`CURRENT_STATE.md` is the single source of truth for the current mode and status.

## The rules that never bend

- Preserve capital first; profit second. Cash is a valid position.
- Uncertainty → PASS. A zero-trade day can be a good day.
- Autonomy can only **reduce** risk, never raise it (owner approval required to
  raise any risk limit).
- `STOP LIVE TRADING` halts all new live positions immediately.
- Trade history is append-only; losses are never hidden or deleted.

## Owner controls

Live deployment, higher risk limits, new instruments, and mode-up transitions
all require explicit owner approval, logged in `SYSTEM_CHANGELOG.md`.
