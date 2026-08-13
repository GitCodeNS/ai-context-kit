---
context_version: 2
id: AICK-DOMAIN-ACTIVE
type: domain
status: active
authority: canonical
visibility: internal
updated: 2026-08-12
related: [AICK-POLICY-CONTEXT, AICK-DOMAIN-SOFTWARE]
---

# Active Domain Document: AIContextKit Development

This domain document adapts AIContextKit to its own development work.

## Bind To

Bind context management to the current AIContextKit repository root.

## Remember

- current project goal,
- public protocol decisions,
- local context structure decisions,
- user-approved design principles,
- low-coupling boundaries,
- changed files,
- validation state,
- next recommended task.

## Do Not Remember

- raw terminal logs,
- temporary naming ideas after rejection,
- broad file trees unless structure is the active task,
- repeated summaries already present in README, protocol, or docs,
- private conversation details that do not affect the project.

## Required Evidence

- File paths for project structure changes.
- Short rationale for durable design decisions.
- Validation commands or checks used.
- Clear distinction between public project docs and local working context.

## Suggested Files

```text
ai-context/
  AI_CONTEXT.md
  CONTEXT_PLAN.md
  domains/
    active-domain.md
  decisions/
  handoffs/
  maps/
```

## Context Efficiency Rules

- Start from `ai-context/AI_CONTEXT.md`, not from a full repository scan.
- Read only the files needed for the current task.
- Use `rg` for targeted searches.
- Store accepted durable decisions in `ai-context/decisions/`.
- Keep public docs clean and user-facing; keep local working state in `ai-context/`.

## Common Failure Modes

- Letting the protocol manage itself instead of serving real users.
- Turning README, PROTOCOL, domains, and templates into tightly coupled duplicates.
- Updating many files for a concept that belongs in one layer.
- Loading all domain documents when only one domain document is relevant.
