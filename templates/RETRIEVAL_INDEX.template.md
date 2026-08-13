---
context_version: 2
id: AICK-TEMPLATE-RETRIEVAL-INDEX
type: template
status: active
authority: reference
visibility: public
updated: 2026-08-12
---

# Retrieval Index

Purpose: help future AI sessions retrieve the smallest set of memory that preserves high context quality for the active task.

Keep this file short. It is an index, not a knowledge dump. Each entry should answer: when should this be read, and what quality does it add?

## Active Task Keys

| Key | When To Read | Source |
| --- | --- | --- |
| `<task-key>` | `<when this task or workstream is active>` | `<file or folder to read>` |

## Decisions

| Topic | File | When Relevant |
| --- | --- | --- |
| `<decision topic>` | `ai-context/decisions/<file>.md` | `<when this decision changes the assistant's choices>` |

## Code Or Source Maps

| Area | Files Or Docs | When Relevant |
| --- | --- | --- |
| `<area>` | `<paths or docs>` | `<task condition that makes this source useful>` |

## Validation

| Check | Command Or File | When Relevant |
| --- | --- | --- |
| `<focused check>` | `<command or validation file>` | `<when to run or inspect it>` |

## Known Risks

| Risk | Source | When Relevant |
| --- | --- | --- |
| `<risk>` | `<source or decision file>` | `<when this risk affects the task>` |

## Prune Candidates

Entries that may be stale or low value:

- `<entry and reason it may be removed>`
