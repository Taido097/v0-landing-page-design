# ARCHITECTURE.md — System Overview

This document is the map. It explains what the system is, how the pieces fit,
and the order in which we build them. **No live trading happens until the owner
explicitly approves it.** Our first job is to build a system that is hard to
destroy.

---

## 1. What this is

A **single** autonomous trading agent (not a company of personas) that
preserves capital first and seeks positive risk-adjusted returns second. It
monitors markets, finds setups, checks memory, calculates risk, decides
**TRADE / WATCH / PASS**, executes only approved rules, monitors and exits
positions, reconciles with the broker, reviews every trade, and learns — all
inside hard, owner-approved risk limits.

## 2. File map

```
TRADING_AGENT/
├── CORE_RULES.md          # 28 immutable rules (owner approval to change)
├── RISK_RULES.md          # provisional risk framework (owner approval to loosen)
├── TRADING_PLAYBOOK.md    # Level-3 validated rules only
├── CURRENT_STATE.md       # live mode / status / counters (source of truth)
├── STRATEGY_REGISTRY.md   # strategy lifecycle ledger
├── SYSTEM_CHANGELOG.md    # append-only log of every behavior-affecting change
├── data/
│   ├── ALL_TRADES.csv     # append-only master journal (all modes)
│   ├── LIVE_TRADES.csv    # live only
│   ├── PAPER_TRADES.csv   # simulated only (never blended with live)
│   └── REJECTED_TRADES.csv# the no-trade log
├── memory/
│   ├── LESSONS.md         # Level-2 observations
│   ├── MISTAKES.md        # process errors / rule violations
│   ├── SUCCESSFUL_PATTERNS.md
│   ├── RISK_MEMORY.md     # risk events & near-misses
│   └── MARKET_REGIMES.md  # regime tracking + per-regime performance
├── reviews/
│   ├── TRADE_REVIEWS.md   DAILY_REVIEWS.md  WEEKLY_REVIEWS.md  MONTHLY_AUDITS.md
├── research/
│   ├── SETUP_STATISTICS.md  STRATEGY_RESEARCH.md  BACKTEST_RESULTS.md
├── versions/
│   └── strategy_v1.md     # versioned strategy specs (never overwritten)
└── design/
    ├── ARCHITECTURE.md            (this file)
    ├── TRADE_SCHEMA.md            # trade DB + frozen pre-trade snapshot
    ├── MEMORY_ARCHITECTURE.md     # 3-level memory model
    ├── LEARNING_PIPELINE.md       # observation → validated rule
    ├── PRE_TRADE_RISK_GATE.md     # the gate every order must pass + checklist
    ├── ROBINHOOD_INTEGRATION.md   # execution + reconciliation layer
    ├── SAFE_MODE.md               # emergency safe mode
    └── FIRST_STRATEGY_RECOMMENDATION.md
```

## 3. The decision loop (target end-state)

```
 monitor markets
   → detect approved setup
     → MEMORY CHECK (similar trades, mistakes)
       → PRE-TRADE RISK GATE (checklist + sizing + reconciliation)
         → decide TRADE / WATCH / PASS      ← PASS is common
           → (if TRADE) freeze snapshot, place order via Robinhood
             → monitor position (honor original invalidation)
               → exit per plan
                 → reconcile broker vs internal
                   → review + classify the trade
                     → update memory (Level 2), maybe promote (Level 3)
                       → improve future decisions
```

Any uncertainty at any step → PASS or SAFE MODE. Cash is a valid position.

## 4. Control-flow guarantees (safety invariants)

- The **Asymmetry Rule**: autonomy can only reduce risk, never raise it.
- Every order passes the **Pre-Trade Risk Gate** or it is not sent.
- **Reconciliation** must agree before new trades; disagreement → SAFE MODE.
- **`STOP LIVE TRADING`** halts all new live positions immediately.
- **Append-only** trade history; corrections are logged as corrections.
- Simulated and live records are **never** blended.

## 5. Build order (phases)

1. **Phase 1 — Memory & file architecture** ← *we are here*
2. Phase 2 — Trade schema & journaling
3. Phase 3 — Risk engine (sizing, limits, drawdown ladder)
4. Phase 4 — Market analysis & setup framework (+ regime engine)
5. Phase 5 — Backtesting
6. Phase 6 — Shadow trading
7. Phase 7 — Paper trading
8. Phase 8 — Robinhood connection verification (read-only first)
9. Phase 9 — Micro-capital live testing
10. Phase 10 — Autonomous live trading within hard approved limits

We do not skip to Phase 10. Each phase gates the next; live phases need owner
approval.

## 6. What is intentionally NOT built yet

Executable code, live data feeds, and the broker connection are **design-only**
at Phase 1. This is deliberate: the architecture and its safety properties are
reviewed by the owner before any implementation that can touch money.
