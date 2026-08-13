---
context_version: 2
id: AICK-TEMPLATE-CONTEXT-BUDGET
type: template
status: active
authority: reference
visibility: public
updated: 2026-08-12
---

# Context Budget

Purpose: define how this project keeps AI context quality high while reading only the amount of material needed for the active task.

Use this file to say what the assistant should read first, what it should avoid, and when it is allowed to expand. This is a quality control document, not just a restriction list.

## 1. Budget Goal

- Keep active chat focused on:
  - `<current task or workstream>`

- Keep durable memory in:
  - `ai-context/AI_CONTEXT.md`
  - `ai-context/maps/RETRIEVAL_INDEX.md`

- Avoid loading:
  - `<large dependencies, generated files, unrelated modules, old logs>`

- Preserve context quality by prioritizing:
  - `<authoritative docs, task-owned files, validation commands, recent decisions>`

## 2. Startup Read Budget

At session start, read only:

- `ai-context/AI_CONTEXT.md`
- `ai-context/maps/RETRIEVAL_INDEX.md`
- `<one project rules file, if present>`
- `<one build or package metadata file, if relevant>`

Do not read:

- `<dependency folders>`
- `<build output>`
- `<unrelated feature areas>`

## 3. First Read List

For the current task, inspect only:

- `<file or folder needed for the active task>`
- `<test or validation file tied to the task>`
- `<design or decision file tied to the task>`

Before expanding beyond this list, explain why.

## 4. Expansion Rules

The AI may read more files when:

- the active task cannot be understood from the first read list,
- a called function, imported module, or failing test points to another file,
- validation requires checking a related configuration or test path.

The AI should stop and ask or hand off when:

- the task changes,
- more than one unrelated subsystem becomes involved,
- the session is mostly storing history instead of reasoning about the current task.

## 5. Compression Rules

Summarize:

- decisions,
- source paths and why they matter,
- validation results,
- next action.

Do not store:

- raw terminal logs,
- copied source code,
- temporary guesses,
- unrelated file lists.

## 6. Handoff Trigger

Create a handoff or suggest a fresh session when:

- the context window is getting crowded,
- the task cannot be completed in the current session,
- the next assistant needs a short restart path.
