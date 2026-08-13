---
context_version: 2
id: AICK-TEMPLATE-CONTEXT-PLAN
type: template
status: active
authority: reference
visibility: public
updated: 2026-08-12
---

# Context Plan

Purpose: describe how this project should manage AI context efficiently.

## 1. Binding

This context plan is bound to:

- Work object:
- Location:
- Domain:
- Source AIContextKit document:

## 2. Context Budget Goal

- What should stay in active chat:
- What should move into durable files:
- What should be loaded only on demand:
- What should not be remembered:

## 3. Recommended Local Context Folder

Folder:

```text
ai-context/
```

Structure:

```text
ai-context/
  AI_CONTEXT.md
  CONTEXT_PLAN.md
  CONTEXT_BUDGET.md
  domains/
  decisions/
  handoffs/
  maps/
    RETRIEVAL_INDEX.md
  repair-plans/        # optional
```

## 4. File Responsibilities

`AI_CONTEXT.md`:
-

`CONTEXT_PLAN.md`:
-

`CONTEXT_BUDGET.md`:
-

`domains/`:
-

`decisions/`:
-

`handoffs/`:
-

`maps/`:
-

`maps/RETRIEVAL_INDEX.md`:
-

`repair-plans/`:
- optional place for proposed context repair, cleanup, or migration plans.
- do not use for normal daily memory.

## 5. Reading Rules

At session start:
-

For active implementation or task work:
-

For validation:
-

For decisions or history:
-

## 6. Update Rules

Update durable context when:
-

Do not update durable context for:
-

## 7. User Approval Notes

Before creating or changing context files, tell the user:
-

If existing context files are present:
- what will be preserved:
- what will be added:
- what will be archived or marked stale:
- what will be ignored:
