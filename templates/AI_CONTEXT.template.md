---
context_version: 2
id: AICK-TEMPLATE-AI-CONTEXT
type: template
status: active
authority: reference
visibility: public
updated: 2026-08-12
---

# AI Context Template

When copying, replace this asset metadata with a project-unique `profile` document as explained in `templates/README.md`.

## Binding

- Work object:
- Location:
- Domain:
- Claimed conformance level:

## Current State

- Current phase:
- Current task:
- Next action:
- Blockers:

## Hard Constraints

-

## Startup Read Order

1. `ai-context/AI_CONTEXT.md`
2. `ai-context/CONTEXT_BUDGET.md` when present
3. `ai-context/maps/RETRIEVAL_INDEX.md` when present
4. `ai-context/plans/active/current-plan.md` when present
5. task-routed files only

## Canonical Owners

- Current plan:
- Decisions:
- Validation:
- Source-of-truth map:

## Validation State

- Last focused check:
- Last full check:

## New-Session Prompt

```text
Continue this project. Start from ai-context/AI_CONTEXT.md, follow its budget and retrieval route, and continue the current plan.
```
