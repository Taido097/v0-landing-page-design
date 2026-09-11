# SYSTEM_CHANGELOG.md — Change Log

> Record EVERY change to anything that could affect behavior or performance:
> Claude model, system prompt, tools, market-data source, broker connection,
> strategy, memory structure, risk engine, execution logic. Without this,
> performance could shift with no explanation. Append-only.

Format:
```
## YYYY-MM-DD — <short title>
- Type: [model | prompt | tools | data-source | broker | strategy | memory | risk-engine | execution | rules]
- Change:
- Reason:
- Evidence / trigger:
- Risk impact:
- Owner approval: [yes/no + reference, or "n/a"]
```

---

## 2026-09-11 — Initial architecture scaffold (Phase 1)
- Type: memory, rules, execution (design only)
- Change: Created `TRADING_AGENT/` structure — CORE_RULES, RISK_RULES,
  TRADING_PLAYBOOK, CURRENT_STATE, STRATEGY_REGISTRY, this changelog; `data/`
  journals (CSV schemas), `memory/`, `reviews/`, `research/`, `versions/`, and
  `design/` documents (architecture, trade schema, memory architecture, learning
  pipeline, pre-trade risk gate, Robinhood integration, SAFE MODE, first-strategy
  recommendation).
- Reason: Begin Phase 1 per project spec — build a capital-preserving
  architecture before any trading.
- Evidence / trigger: Owner project kickoff.
- Risk impact: None — no capital at risk; documentation and schema only.
- Owner approval: n/a (scaffolding); live deployment items remain UNAPPROVED.
