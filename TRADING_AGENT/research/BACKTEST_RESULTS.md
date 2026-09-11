# BACKTEST_RESULTS.md — Backtest Records

> Every backtest recorded with enough detail to reproduce and to guard against
> overfitting. Use walk-forward / out-of-sample splits — never validate a rule
> only on the trades that created it.

Template:
```
## <Strategy vX.Y> — backtest YYYY-MM-DD
Data: source, symbols, date range, resolution, adjustments
Costs modeled: commission, slippage assumption, spread
Rules tested (exact entry/exit/invalidation/sizing):
In-sample window / result:
Out-of-sample window / result:
Metrics: n, win%, avg R, profit factor, expectancy, max DD
Sensitivity / robustness checks:
Overfitting assessment:
Conclusion: advance to shadow? / revise / drop
```

---

_(no backtests run yet)_
