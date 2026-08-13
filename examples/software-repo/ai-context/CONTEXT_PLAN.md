---
context_version: 2
id: AICK-EX-SW-CONTEXT-PLAN
type: example
status: active
authority: reference
visibility: public
updated: 2026-08-12
---

# Context Plan

Purpose: describe how ExampleApp should manage AI context efficiently.

## 1. Binding

This context plan is bound to:

- Work object: ExampleApp software repository
- Location: `/path/to/example-app`
- Domain: software development
- Source AIContextKit document: `domains/software-development.md`

## 2. Context Budget Goal

- Keep the active chat focused on the current auth redirect task.
- Store stable handoff state in `ai-context/AI_CONTEXT.md`.
- Store accepted architecture or behavior decisions in `ai-context/decisions/`.
- Load source files only when the active task needs them.
- Avoid loading the whole repository at session start.

## 3. Recommended Local Context Folder

```text
ai-context/
  AI_CONTEXT.md
  CONTEXT_PLAN.md
  CONTEXT_BUDGET.md
  domains/
    active-domain.md
  decisions/
  handoffs/
  maps/
    RETRIEVAL_INDEX.md
```

## 4. File Responsibilities

`AI_CONTEXT.md`:
- current phase, current task, next task, reading map, validation state, handoff prompt.

`CONTEXT_PLAN.md`:
- local rules for managing context budget in this repository.

`CONTEXT_BUDGET.md`:
- startup read budget, avoid list, and expansion rules.

`domains/active-domain.md`:
- software development rules adapted from AIContextKit.

`decisions/`:
- accepted decisions that should survive session compression.

`handoffs/`:
- optional detailed handoff notes for long sessions.

`maps/`:
- optional source maps or task-specific file maps.

`maps/RETRIEVAL_INDEX.md`:
- compact index of decisions, files, validation checks, and risks relevant to the active task.

## 5. Reading Rules

At session start:
- Read `ai-context/AI_CONTEXT.md`.
- Read `ai-context/CONTEXT_BUDGET.md`.
- Read `ai-context/maps/RETRIEVAL_INDEX.md`.
- Read `ai-context/CONTEXT_PLAN.md` only if the task touches context structure.
- Read project rules such as `AGENTS.md` if present.

For active implementation:
- Use targeted search before opening broad files.
- Read only the source files named by the active task.

For validation:
- Read `package.json`.
- Use the validation commands listed in `AI_CONTEXT.md`.

## 6. Update Rules

Update durable context when:
- active task or next task changes,
- validation state changes,
- a decision is accepted,
- a blocker appears or is resolved.

Do not update durable context for:
- raw logs,
- temporary guesses,
- unrelated file exploration,
- failed approaches with no reusable lesson.
