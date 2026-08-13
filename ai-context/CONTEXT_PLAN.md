---
context_version: 2
id: AICK-POLICY-CONTEXT
type: policy
status: active
authority: canonical
visibility: internal
updated: 2026-08-12
related: [AICK-BOOTSTRAP, AICK-POLICY-BUDGET, AICK-MAP-SOURCE-OF-TRUTH]
---

# AIContextKit Context Plan

## Purpose

Define how this repository manages its own context while keeping public protocol assets independent and reusable.

## Layers

1. Entry: `AGENTS.md` routes supported agents into the local startup packet.
2. Hot context: bootstrap, budget, retrieval index, and exactly one active plan.
3. Canonical context: specifications, decisions, policies, maps, and current reports.
4. Task context: files selected by the retrieval route for the active task.
5. History: completed plans, old handoffs, raw baselines, and superseded material.
6. Derived context: generated indexes and status output; never authoritative.

## Ownership Rules

- Every durable fact category has one canonical owner listed in `maps/SOURCE_OF_TRUTH_MAP.md`.
- Other files link to the owner instead of copying mutable facts.
- Public files explain the product; internal `ai-context/` files control this repository's current work.
- Examples are executable fixtures, not sources of truth.
- Adapters contain routing instructions only.

## Update Triggers

Update durable context when a goal, next action, decision, blocker, validation result, canonical path, or compatibility rule changes.

Do not store raw logs, copied source, temporary guesses, redundant inventories, or abandoned reasoning without a reusable lesson.

## Lifecycle

- New decisions start as `proposed` and become `accepted`, `rejected`, or `superseded`.
- Current work lives only in `plans/active/current-plan.md`.
- Completed plans and obsolete handoffs move to archive paths with provenance retained.
- Derived indexes are regenerated; they are never edited as canonical memory.
- Sensitive material must follow `spec/PRIVACY_AND_RETENTION.md`.

## Maintenance Loop

1. Capture durable state in its canonical owner.
2. Compress it to the smallest actionable form.
3. Index it through the retrieval map.
4. Retrieve only the task-relevant route.
5. Validate metadata, references, budgets, and lifecycle.
6. Archive or supersede stale state.

## Compatibility

The Markdown core does not depend on an adapter or validator. Platform-specific files under `adapters/` and generated root instructions may point to the same canonical startup packet without owning project state.
