# TRADE_REVIEWS.md — Per-Trade Post-Mortems

> **Every** trade is reviewed — wins, losses, and breakevens. Do not learn only
> from losers. Post-trade reasoning is kept separate from the frozen pre-trade
> snapshot to prevent hindsight bias.

Each trade is classified:
- **GOOD DECISION + WIN** — evidence the process may work (don't overweight one).
- **GOOD DECISION + LOSS** — normal trading loss; do not auto-change strategy.
- **BAD DECISION + WIN** — dangerous; log the luck, do NOT reinforce.
- **BAD DECISION + LOSS** — investigate what failed.

---

## Review Template

```
### Trade <ID> — <ticker> <date>
Snapshot ref (frozen, pre-outcome): design/TRADE_SCHEMA.md snapshot #<ID>
Result: <pnl, R>
Classification: GOOD/BAD DECISION + WIN/LOSS
Loss class (if loss): STRATEGY / EXECUTION / RISK / SYSTEM / BEHAVIORAL / REGIME

For losses — investigate (not "price went down"):
- What assumption was wrong?
- Was the setup valid? regime right? entry late? liquidity/spread OK?
- Was the stop appropriate? sizing correct? did news change?
- Normal variance or avoidable? rule violation? seen before?

For winners — do not assume good just because profitable:
- Setup valid? rules followed? risk appropriate?
- Did it work for the expected reason, or luck?
- Would repeating this behavior be rational?

Counterfactuals (no hindsight bias):
- What if no trade? entry at plan? stop unchanged? target taken? rejected?

Actions:
- Observation to log (memory/LESSONS.md)?
- Mistake to log (memory/MISTAKES.md)?
- Any change needs owner approval?
```

---

## Reviews

_(none yet — no trades taken)_
