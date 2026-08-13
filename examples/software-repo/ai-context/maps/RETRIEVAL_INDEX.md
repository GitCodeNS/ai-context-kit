---
context_version: 2
id: AICK-EX-SW-RETRIEVAL
type: example
status: active
authority: reference
visibility: public
updated: 2026-08-12
---

# Retrieval Index

Purpose: retrieve only memory relevant to the current auth redirect task.

## Active Task Keys

| Key | When To Read | Source |
| --- | --- | --- |
| auth-redirect | Login redirect behavior changes | `ai-context/AI_CONTEXT.md` |
| route-guard | Middleware route guard behavior | `src/routes/`, `src/auth/` |

## Decisions

| Topic | File | When Relevant |
| --- | --- | --- |
| Return path handling | `docs/DECISIONS.md` | When redirect behavior is unclear |

## Validation

| Check | Command Or File | When Relevant |
| --- | --- | --- |
| Focused auth tests | `npm test -- tests/auth` | Before and after auth redirect edits |

## Known Risks

| Risk | Source | When Relevant |
| --- | --- | --- |
| Reading unrelated routes | `src/routes/` | When route guard appears broad |
