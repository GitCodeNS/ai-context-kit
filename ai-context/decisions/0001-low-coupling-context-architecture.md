---
context_version: 2
id: AICK-ADR-0001
type: decision
status: accepted
authority: canonical
visibility: internal
updated: 2026-08-12
related: [AICK-SPEC-PROTOCOL]
---

# Decision: Keep AIContextKit Low-Coupling

Date: 2026-05-11

## Decision

AIContextKit should be designed as a low-coupling kit. The universal protocol, domain documents, templates, examples, public docs, and local project context should each have clear responsibilities and should not require tight cross-file dependencies to be useful.

## Context

The user explicitly asked to keep the project low-coupling. The project is meant to help AI assistants manage context efficiently, so its own architecture should avoid bloated, duplicated, or tightly entangled context files.

## Boundaries

- `PROTOCOL.md`: universal AI behavior and context-management rules.
- `domains/`: domain-specific adaptations that can be used independently.
- `templates/`: copyable starting files, not project-specific instructions.
- `examples/`: illustrative usage, not mandatory structure.
- `docs/`: public rationale, workflow, roadmap, and structure explanation.
- `ai-context/`: local working memory for developing this repository.

## Consequences

- Domain documents should not require users to read every other domain document.
- Templates should avoid embedding domain-specific assumptions.
- Examples should not become the source of truth.
- Local development context should not pollute public protocol docs.
- Shared ideas can be referenced, but each layer should stay understandable on its own.

## Review Trigger

Review this decision if the project begins duplicating the same rules across many files, or if a user must read too many files before applying one domain document.
