---
context_version: 2
id: AICK-MAP-SOURCE-OF-TRUTH
type: map
status: active
authority: canonical
visibility: internal
updated: 2026-08-12
related: [AICK-POLICY-CONTEXT, AICK-SPEC-PRECEDENCE]
---

# Source Of Truth Map

| Fact category | Canonical owner | Notes |
| --- | --- | --- |
| Product identity and public promise | `README.md` | Public-facing description |
| Universal behavior | `PROTOCOL.md` and `spec/CONTEXT_PROTOCOL.md` | Friendly guide and normative contract |
| Metadata contract | `spec/METADATA_SCHEMA.md` | Types, statuses, authority, visibility |
| Lifecycle | `spec/LIFECYCLE.md` | State transitions and archive rules |
| Conflict precedence | `spec/PRECEDENCE.md` | Resolves instruction and fact conflicts |
| Privacy and retention | `spec/PRIVACY_AND_RETENTION.md` | Sensitivity and retention controls |
| Current repository state | `ai-context/AI_CONTEXT.md` | Short router only |
| Current execution | `ai-context/plans/active/current-plan.md` | Exactly one active plan |
| Context governance | `ai-context/CONTEXT_PLAN.md` | Internal maintenance rules |
| Startup and route budget | `ai-context/CONTEXT_BUDGET.md` | Quantitative limits |
| Task retrieval routes | `ai-context/maps/RETRIEVAL_INDEX.md` | Curated routing |
| Generated inventory | `ai-context/maps/CONTEXT_INDEX.md` | Derived, never canonical |
| Accepted architecture decisions | `ai-context/decisions/` | One decision per file |
| Release readiness | `docs/RELEASE_CRITERIA.md` | Public release gate |

When facts conflict, follow `spec/PRECEDENCE.md`. A derived index, example, archived handoff, or template never overrides a canonical owner.
