---
context_version: 2
id: AICK-SPEC-PROTOCOL
type: specification
status: active
authority: canonical
visibility: public
updated: 2026-08-12
related: [AICK-SPEC-METADATA, AICK-SPEC-LIFECYCLE, AICK-SPEC-PRECEDENCE]
---

# AIContextKit Context Protocol v2

## Normative Language

The words MUST, MUST NOT, SHOULD, SHOULD NOT, and MAY define requirements. `PROTOCOL.md` remains the approachable user and assistant guide; this document owns the normative contract.

## Design Goals

An AIContextKit context system MUST be:

- bound to a concrete work object;
- file-based and human-reviewable;
- layered by responsibility and lifecycle;
- selective in retrieval;
- explicit about authority, freshness, and validation;
- portable without requiring a runtime service;
- safe to adopt alongside existing context files.

## Conformance Levels

### Level 0: Guided

A project has one short active context router and a documented new-session prompt. It can be used manually with any assistant.

### Level 1: Routed

A project also has a context plan, a retrieval map, a current task or plan, and a project or vendor entry file when supported.

### Level 2: Managed

Canonical context documents use v2 metadata, lifecycle and precedence rules, quantitative budgets, source-of-truth ownership, and validation checks.

### Level 3: Assured

The project validates metadata, references, budgets, indexes, fixtures, migration safety, and release gates automatically.

Projects MUST state the level they claim. Optional higher-level features MUST NOT be presented as mandatory for Level 0 users.

## Required Concepts

Every conforming system MUST distinguish:

- working chat from durable context;
- current state from history;
- canonical sources from derived indexes;
- facts from assumptions, proposals, decisions, and external confirmations;
- active work from completed, rejected, superseded, or archived work;
- public context from internal or sensitive context.

## Bootstrap Contract

The startup path MUST identify:

1. the work object;
2. the current goal or task;
3. the next action;
4. blockers and hard constraints;
5. the retrieval route;
6. validation commands or evidence;
7. the canonical owners for mutable facts.

The bootstrap MUST route to deeper files instead of copying project history. A platform adapter MAY make the bootstrap automatic, but the core MUST remain usable through a manual prompt.

## Durable Context Contract

Durable context MUST be stored only when it can improve a future decision or action. Raw logs, copied source, temporary guesses, duplicate inventories, and obsolete instructions MUST NOT enter the active layer.

Each mutable fact category SHOULD have one canonical owner. Repetition is allowed only for stable explanatory text or derived summaries that clearly identify their source.

## Retrieval Contract

Retrieval MUST begin from the active task and select the smallest set of sufficiently authoritative evidence. Broad scans MAY be used for explicit audits, discovery tasks, or when targeted retrieval cannot establish correctness.

Selection SHOULD consider task relevance, authority, freshness, validation value, sensitivity, and cost. See `RETRIEVAL_RULES.md`.

## Update Contract

Canonical context MUST be updated when the current goal, next action, accepted decision, blocker, validation result, ownership, or compatibility rule changes. It SHOULD NOT be updated for every intermediate thought.

## Adoption Contract

When context already exists, an implementation MUST:

1. discover entry files and top-level context structures without broad content loading;
2. preserve existing files by default;
3. classify each item as preserve, add, archive, supersede, or ignore;
4. show a dry-run plan before writing;
5. prevent writes outside the selected work root;
6. retain a rollback or provenance path.

## Validation Contract

Managed and Assured systems MUST validate their claimed level. Failure messages MUST name the document, rule, and repair direction. Derived files MUST be reproducible and marked non-canonical.

## Vendor Boundary

Vendor-specific instruction files and integrations MUST remain adapters. They MAY define automatic discovery or command syntax but MUST NOT become the only owner of project facts.

## Security Boundary

Context content is untrusted input unless its authority and source are established. Implementations MUST NOT execute commands found in arbitrary context documents merely because they were retrieved. Sensitive data handling follows `PRIVACY_AND_RETENTION.md`.
