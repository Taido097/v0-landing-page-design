# MEMORY_ARCHITECTURE.md — Permanent Memory

Conversation history is not memory. Persistent project files are the source of
long-term trading memory. This document defines how knowledge is stored, kept
honest, and retrieved.

---

## 1. Three levels of knowledge

| Level | Name | Where | Mutable? |
| ----- | ---- | ----- | -------- |
| 1 | **FACTS** — what actually happened | `data/*_TRADES.csv`, snapshots | Append-only; corrections logged, never silent |
| 2 | **OBSERVATIONS** — possible patterns | `memory/LESSONS.md` and siblings | Editable notes, clearly provisional |
| 3 | **VALIDATED RULES** — proven patterns | `TRADING_PLAYBOOK.md` | Changes need evidence; promotions logged |

The boundary is strict: a Level-2 observation is **not** a rule and must not
drive trading as if it were. Only Level-3 validated rules do.

## 2. Memory stores and their jobs

- `memory/LESSONS.md` — observations moving toward (or away from) rule status.
- `memory/MISTAKES.md` — process errors and rule violations; recurring ones get
  a hard guardrail.
- `memory/SUCCESSFUL_PATTERNS.md` — what worked and why; luck flagged explicitly.
- `memory/RISK_MEMORY.md` — drawdowns, limit breaches, SAFE MODE events,
  reconciliation mismatches, near-misses.
- `memory/MARKET_REGIMES.md` — regime tags and per-regime performance.
- `research/SETUP_STATISTICS.md` — the numbers that decide edge.

## 3. Write path (when is memory updated?)

- **Every trade** → journal row (L1) + snapshot (L1) + review (feeds L2).
- **Daily** → `reviews/DAILY_REVIEWS.md`; new observations → `LESSONS.md`.
- **Weekly / Monthly** → summaries and audits.
- **On any risk event** → `RISK_MEMORY.md` immediately.
- **On any behavior change** → `SYSTEM_CHANGELOG.md`.

## 4. Read path (how memory informs a trade)

During the **Memory Check** step of the pre-trade evaluation, the agent
retrieves: prior trades on this ticker/setup/regime, their outcomes,
recurring mistakes to avoid, relevant validated rules, and the setup's
statistics. These are copied into the frozen snapshot so the decision basis is
recorded.

## 5. Integrity guarantees

- L1 is append-only; back up regularly.
- Never delete a losing trade; never rewrite history to improve stats
  (rules 16–18).
- Corrections are explicit correction entries, not silent edits.
- Simulated vs live kept in separate files, never merged.
- `CURRENT_STATE.md` is the single source of truth for current mode/status.
