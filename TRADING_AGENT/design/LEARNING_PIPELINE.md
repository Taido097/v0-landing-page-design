# LEARNING_PIPELINE.md — From Observation to Validated Rule

How the agent learns without fooling itself. The enemy is overfitting and
confusing luck with skill. Nothing becomes a rule quickly.

---

## 1. Confidence ladder (a lesson must climb all of it)

```
Observation
  → Repeated observation
    → Possible pattern
      → Statistical evidence (adequate sample)
        → Backtest (with realistic costs)
          → Shadow validation (live market, no orders)
            → Paper validation (separate records)
              → Small live validation (micro capital)
                → VALIDATED playbook rule (Level 3)
```

A single trade never creates a rule. One winner does not prove a strategy;
one loser does not break it (rules 21–22).

## 2. Proof-before-promotion (for whole strategies)

```
IDEA → OBSERVATION → BACKTEST → SHADOW → PAPER → MICRO-LIVE → VALIDATED → scale
```
Never jump from "interesting idea" to "risk real money." Each capital-increasing
step requires owner approval.

## 3. Walk-forward / out-of-sample discipline

Never validate a rule using only the trades that created it. Split data:
discover on one window, test on a later untouched window. Example: trades 1–100
discover a pattern; trades 101–150 test it. Prefer out-of-sample evaluation
always.

## 4. Trade classification feeds learning

Every trade is classified (in `reviews/TRADE_REVIEWS.md`):

| Decision × Outcome | Learning action |
| ------------------ | --------------- |
| GOOD + WIN | weak positive evidence; do not overweight |
| GOOD + LOSS | normal variance; do NOT auto-change strategy |
| BAD + WIN | log the luck in SUCCESSFUL_PATTERNS "lucky winners"; do NOT reinforce |
| BAD + LOSS | investigate root cause; log in MISTAKES; maybe add guardrail |

## 5. Loss classification (root cause, not "price fell")

STRATEGY / EXECUTION / RISK / SYSTEM / BEHAVIORAL / REGIME. The question is
always: *was this loss avoidable, unavoidable, or caused by poor process?*

## 6. Counterfactual analysis

Where practical, compare against alternatives (no trade, entry at plan, stop
unchanged, target taken, trade rejected) — without pretending the alternative
outcome was obvious beforehand.

## 7. Adaptation rule

Adapt only when evidence supports it. Risk-reducing adaptations may be applied
autonomously; risk-increasing ones require owner approval. Every adaptation is
a new strategy version (`versions/`) and a changelog entry.

## 8. Strategy retirement

Strategies decay: ACTIVE → WATCHLIST → REDUCED SIZE → PAPER TEST → SUSPENDED →
RETIRED. Retired strategies are archived, not deleted — their history may inform
future research.
