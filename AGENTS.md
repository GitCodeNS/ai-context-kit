# AIContextKit Repository Instructions

This repository dogfoods AIContextKit. At the start of a task, read in order:

1. `ai-context/AI_CONTEXT.md`
2. `ai-context/CONTEXT_BUDGET.md`
3. `ai-context/maps/RETRIEVAL_INDEX.md`
4. `ai-context/plans/active/current-plan.md`
5. Only the files selected by the task route

Do not scan the whole repository at startup. Keep public protocol content separate from this repository's internal working context. Treat generated indexes as derived artifacts, not sources of truth.

For context maintenance, also read `ai-context/CONTEXT_PLAN.md` and `ai-context/maps/SOURCE_OF_TRUTH_MAP.md`.

Validation commands:

```powershell
node tools/context/sync.mjs
node tools/context/check.mjs --strict
node --test tools/context/tests/*.test.mjs
```

Do not commit or push unless the user explicitly authorizes that Git action.
