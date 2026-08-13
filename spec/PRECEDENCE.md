---
context_version: 2
id: AICK-SPEC-PRECEDENCE
type: specification
status: active
authority: canonical
visibility: public
updated: 2026-08-12
related: [AICK-SPEC-PROTOCOL, AICK-MAP-SOURCE-OF-TRUTH]
---

# Precedence And Conflict Resolution

## External Instruction Boundary

AIContextKit does not replace the host system's instruction hierarchy. System, developer, user, repository, and nested project instructions are resolved by the host before project fact precedence is applied.

## Project Fact Precedence

For the same fact category, use this order:

1. current explicit user or authorized stakeholder confirmation;
2. canonical owner named by the source-of-truth map;
3. accepted decision governing that owner;
4. current active plan;
5. current profile or router;
6. current report with direct evidence;
7. derived index or summary;
8. example, template, old handoff, or archive.

Freshness breaks ties only between sources with equal authority. A newer non-canonical note does not silently override an older accepted decision.

## Conflict Procedure

When authoritative sources conflict:

1. stop propagating the disputed fact;
2. identify both sources and their authority;
3. check whether one supersedes the other;
4. request the missing decision when authority is equal;
5. update the canonical owner and dependent routes after resolution;
6. preserve the conflict outcome in a decision or change record when material.

## Assumptions

An assumption MUST be marked as such and MUST NOT be restated as confirmed fact. External confirmations SHOULD record source, date, scope, and reviewer when the work requires auditability.
