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

## 2026-09-15 — Shadow trading enabled; $20,000 simulation basis
- Type: risk-engine, execution (simulation only)
- Change: Per owner direction, set a HARD separation between simulation equity
  ($20,000, for paper/shadow sizing & statistics) and real/live equity ($20 real
  broker). Live orders are ALWAYS sized from real broker equity; the $20,000
  figure may never size a live order. Entered SHADOW mode (Phase 6): find
  setups, freeze snapshots, log hypothetical results — no orders sent.
- Reason: Owner: "treat it like 20,000" and "use shadow trading."
- Evidence / trigger: Owner instruction.
- Risk impact: None to real capital — shadow is read-only, zero orders.
- Owner approval: Shadow trading + $20,000 simulation basis approved. Live
  trading still NOT approved.

## 2026-09-15 — Robinhood connected (read-only), Phase 8a verification
- Type: broker
- Change: Connected via the Robin MCP connector. Identified the single
  agent-tradable account ("Agentic" ••••4713, individual limited_margin).
  Performed read-only reconciliation: portfolio total value $0.01, cash $0.01,
  buying power $0.01, 0 equity positions, 0 open orders. Internal journals are
  empty → internal state matches broker state (both empty). Recorded in
  CURRENT_STATE.md.
- Reason: Owner connected the broker; begin Phase 8a (read-only connection
  verification) per design/ROBINHOOD_INTEGRATION.md.
- Evidence / trigger: Owner: "let use the robin connector."
- Risk impact: None — read-only. No orders placed. Account is UNFUNDED so no
  trade is possible regardless. No credentials stored in repo.
- Owner approval: Connection approved by owner. Live trading NOT approved;
  remain read-only. Margin/leverage NOT approved — operate cash-only.

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
