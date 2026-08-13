---
context_version: 2
id: AICK-SPEC-LIFECYCLE
type: specification
status: active
authority: canonical
visibility: public
updated: 2026-08-12
related: [AICK-SPEC-METADATA, AICK-SPEC-PRECEDENCE]
---

# Context Lifecycle

## Core Flow

```text
capture → classify → validate → activate → maintain → supersede/archive → prune
```

## State Rules

- `proposed` material cannot override accepted or active canonical state.
- `active` means currently operative, not merely unfinished.
- `accepted` records a decision or conclusion that governs current work.
- `blocked` plans remain current but cannot advance until the blocker changes.
- `completed` plans no longer drive startup and SHOULD move to an archive path.
- `rejected` proposals remain traceable but non-operative.
- `superseded` documents MUST identify or link to their replacement.
- `archived` material is provenance-only and excluded from startup.

## Active Plan Invariant

A Managed project MUST have no more than one canonical active plan per declared planning scope. A simple project normally has exactly one repository-wide active plan.

## Freshness

Documents whose mutable content changes MUST update the `updated` field. Projects SHOULD define review dates for long-lived risks, assumptions, external sources, and sensitive data.

## Handoffs

A handoff is created only when a short router cannot preserve a complex incomplete task. After intake, its durable decisions and state move to canonical owners, then the handoff becomes archived.

## Pruning

Pruning MAY delete low-value derived or temporary context after its sources and required provenance are safe. Canonical decisions, external confirmations, and migration baselines MUST follow explicit retention policy.
