---
context_version: 2
id: AICK-EX-SW-BUDGET
type: example
status: active
authority: reference
visibility: public
updated: 2026-08-12
---

# Context Budget

Purpose: protect ExampleApp from filling the AI context window before useful implementation starts.

## 1. Budget Goal

- Keep active chat focused on the current auth redirect task.
- Keep durable memory in `ai-context/AI_CONTEXT.md`, `ai-context/CONTEXT_PLAN.md`, and `ai-context/maps/RETRIEVAL_INDEX.md`.
- Avoid loading unrelated routes, generated files, dependencies, build output, and old logs.

## 2. Startup Read Budget

At session start, read only:

- `ai-context/AI_CONTEXT.md`
- `ai-context/maps/RETRIEVAL_INDEX.md`
- `package.json`
- `AGENTS.md` if present

Do not read:

- `node_modules/`
- build output,
- unrelated feature directories,
- full test logs.

## 3. First Read List

For the current task, inspect only:

- `src/auth/`
- `src/routes/`
- `tests/auth/`

Before expanding beyond this list, explain why.

## 4. Handoff Trigger

Create a handoff or suggest a fresh session when:

- the task changes,
- more than one unrelated subsystem becomes involved,
- validation output becomes too large to summarize cleanly.
