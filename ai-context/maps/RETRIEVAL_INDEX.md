---
context_version: 2
id: AICK-MAP-RETRIEVAL
type: map
status: active
authority: canonical
visibility: internal
updated: 2026-08-12
related: [AICK-BOOTSTRAP, AICK-PLAN-CURRENT]
---

# Retrieval Index

## Always Read

1. `ai-context/AI_CONTEXT.md`
2. `ai-context/CONTEXT_BUDGET.md`
3. `ai-context/maps/RETRIEVAL_INDEX.md`
4. `ai-context/plans/active/current-plan.md`

## Context Governance Or Migration

- `ai-context/CONTEXT_PLAN.md`
- `ai-context/maps/SOURCE_OF_TRUTH_MAP.md`
- `ai-context/reports/CONTEXT_PROTOCOL_V2_MIGRATION_REPORT.md`
- `spec/CONTEXT_PROTOCOL.md`
- `spec/LIFECYCLE.md`
- `spec/PRECEDENCE.md`

## Public Protocol Or Positioning

- `PROTOCOL.md`
- `README.md`
- `docs/USER_WORKFLOW.md`
- `docs/DESIGN_NOTES.md` only when rationale is needed

## Templates And Domains

- The specific file under `templates/` or `domains/` being changed
- `spec/METADATA_SCHEMA.md`
- `templates/DOMAIN_DOCUMENT.template.md` when harmonizing domain contracts

Do not load every domain unless the task is cross-domain consistency.

## Examples And Fixtures

- The selected example directory
- `examples/README.md`
- `ai-context/maps/VALIDATION_MAP.md`

## Tooling And Validation

- `tools/context/README.md`
- Relevant files under `tools/context/lib/`
- Relevant test fixture only
- `ai-context/maps/VALIDATION_MAP.md`

## Historical Trace

Read `ai-context/archive/` only for provenance, rollback, or migration verification. Historical files do not override active canonical state.
