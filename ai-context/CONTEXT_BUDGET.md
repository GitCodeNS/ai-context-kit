---
context_version: 2
id: AICK-POLICY-BUDGET
type: policy
status: active
authority: canonical
visibility: internal
updated: 2026-08-12
related: [AICK-BOOTSTRAP, AICK-MAP-RETRIEVAL]
---

# Context Budget

## Quality Goal

Preserve enough authoritative, fresh, task-relevant context for correct work while leaving most of the active window available for reasoning, editing, and validation.

## Startup Packet

Read only:

1. `ai-context/AI_CONTEXT.md`
2. `ai-context/CONTEXT_BUDGET.md`
3. `ai-context/maps/RETRIEVAL_INDEX.md`
4. `ai-context/plans/active/current-plan.md`

Then follow one task route. Do not preload the public protocol, all domains, all templates, all examples, archives, or generated indexes.

## Quantitative Limits

- Root agent entry: 2 KiB warning, 4 KiB hard limit.
- `AI_CONTEXT.md`: 6 KiB warning, 12 KiB hard limit.
- Startup packet: 24 KiB warning, 32 KiB hard limit.
- One task route: normally no more than 6 files or 80 KiB before explaining expansion.

Byte limits are portable enforcement signals. Token estimates may be reported when available but are not normative across vendors.

## Expansion Signals

Expand only when the active task cannot be completed correctly from the current route, a reference leads to another canonical source, a failing validation identifies another file, or the user requests broader review.

Stop expanding when the task changes, unrelated subsystems accumulate, sources conflict without a precedence rule, or outputs become mostly history rather than current reasoning.

## Exclusions

Do not read at startup:

```text
.git/
node_modules/
dist/
build/
coverage/
archive/
generated/
raw logs
```

## Handoff Trigger

Update canonical state and recommend a fresh session when the task changes materially, multiple unrelated branches are open, important decisions cannot fit in the current plan, or the current session can no longer validate its own conclusions cleanly.
