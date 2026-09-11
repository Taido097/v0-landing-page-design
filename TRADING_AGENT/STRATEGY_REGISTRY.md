# STRATEGY_REGISTRY.md — Strategy Lifecycle Ledger

> Every strategy the agent ever considers is listed here, with its current
> lifecycle stage and status. Strategies are never deleted — retired ones are
> archived, not removed. Full version history lives in `versions/`.

**Version:** 1.0

---

## Lifecycle Stages (proof before promotion)

```
IDEA → OBSERVATION → BACKTEST → SHADOW → PAPER → MICRO-LIVE → VALIDATED → (scale)
```

## Health Ladder (a live strategy can decay downward)

```
ACTIVE → WATCHLIST → REDUCED SIZE → PAPER TEST → SUSPENDED → RETIRED
```

Promotion to a higher-capital stage requires owner approval. Demotion may
happen autonomously.

---

## Registry

| ID   | Name                       | Stage       | Health   | Capital | Version | Notes                                   |
| ---- | -------------------------- | ----------- | -------- | ------- | ------- | --------------------------------------- |
| S001 | Opening-Range Breakout (proposed) | IDEA | n/a | $0 | v1.0 (draft) | See `design/FIRST_STRATEGY_RECOMMENDATION.md`; awaiting owner approval to backtest |

---

## Per-Strategy Record Template

Each strategy, once it advances, gets its own block:

```
### S00X — <name>
- Stage / Health:
- Capital allocation / risk budget:
- Precise entry conditions:
- Precise rejection conditions:
- Invalidation logic:
- Position sizing rule:
- Exit logic (stop / target / time):
- Required market regime:
- Liquidity requirements:
- Trade count / win rate / expectancy / avg R:
- Max drawdown observed:
- Current version + link to versions/strategy_vX.md:
- Owner approvals on record:
```
