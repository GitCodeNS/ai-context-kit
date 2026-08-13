---
context_version: 2
id: AICK-EX-SW-BOOTSTRAP
type: example
status: active
authority: reference
visibility: public
updated: 2026-08-12
---

# AI Context

Purpose: short handoff memory for a software repository. This file is not a full project history.

## 1. Binding

This context system is bound to:

- Work object: ExampleApp software repository
- Location: `/path/to/example-app`
- Domain: software development
- Domain document: `ai-context/domains/active-domain.md`
- Context plan: `ai-context/CONTEXT_PLAN.md`
- Context budget: `ai-context/CONTEXT_BUDGET.md`

## 2. Core Rules

- Use the chat window for current reasoning.
- Store durable state in files under `ai-context/`.
- Keep this file short, current, and action-oriented.
- Load deeper docs only when the active task needs them.
- Do not treat temporary debugging guesses as facts.

## 3. Current State

Current phase:
- Phase 1: stabilize authentication and project setup.

Current task:
- Fix failing login redirect tests after the route refactor.

Next recommended task:
- Inspect the route guard and test expectations, then run the focused auth test suite.

Known blockers:
- None confirmed.

## 4. Reading Map

For project rules:
- `AGENTS.md`
- `package.json`
- `ai-context/CONTEXT_BUDGET.md`
- `ai-context/maps/RETRIEVAL_INDEX.md`

For current task:
- `docs/ARCHITECTURE.md`
- `src/auth/`
- `src/routes/`
- `tests/auth/`

For validation:
- `package.json`
- `docs/VALIDATION.md`

For decisions/history:
- `docs/DECISIONS.md`
- `ai-context/decisions/`

## 5. Recent Changes

- Route guard was moved from page components into middleware.
- Login redirect behavior changed from query-string return paths to session-backed return paths.

## 6. Validation State

- Last known failing check: focused auth redirect test suite.
- Validation command: `npm test -- tests/auth`
- Full validation command: `npm test`

## 7. Handoff Prompt

```text
Continue ExampleApp. First read ai-context/AI_CONTEXT.md. Follow its reading map and context management rules. Focus on the current auth redirect test failure.
```
