---
context_version: 2
id: AICK-BOOTSTRAP
type: profile
status: active
authority: canonical
visibility: internal
updated: 2026-08-12
related: [AICK-PLAN-CURRENT, AICK-MAP-RETRIEVAL, AICK-POLICY-BUDGET]
---

# AIContextKit AI Context

## Project

- Name: AIContextKit
- Repository: the current repository root
- Remote: `https://github.com/GitCodeNS/ai-context-kit.git`
- Purpose: a portable, file-based protocol kit for high-quality AI context persistence, retrieval, maintenance, and handoff.
- Product shape: Markdown-first core, optional validators and adapters, no required runtime service.

## Current Stage

Context Protocol v2 migration is complete. The repository is a release candidate awaiting user review and an explicit first local commit decision.

## Current Goal

Review the completed v2 implementation, preserve its passing release gates, and decide whether to create the repository's first local commit.

## Hard Constraints

- Preserve existing user-authored material and migration provenance.
- Core Markdown workflows must remain usable without Node.js or a specific AI vendor.
- Vendor adapters may route to canonical context but must not duplicate project facts.
- `ai-context/AI_CONTEXT.md` is a router, not a history archive.
- Facts, assumptions, decisions, plans, reports, and derived indexes must remain distinguishable.
- Adoption and migration operations default to dry-run and must not overwrite existing context silently.
- No Git commit or push without explicit user authorization.

## Startup Read Order

1. `ai-context/AI_CONTEXT.md`
2. `ai-context/CONTEXT_BUDGET.md`
3. `ai-context/maps/RETRIEVAL_INDEX.md`
4. `ai-context/plans/active/current-plan.md`
5. task-routed files only

## Source Of Truth

- Ownership and precedence: `ai-context/maps/SOURCE_OF_TRUTH_MAP.md`
- Active execution plan: `ai-context/plans/active/current-plan.md`
- Context governance: `ai-context/CONTEXT_PLAN.md`
- Protocol specification: `spec/CONTEXT_PROTOCOL.md`
- Public positioning: `README.md`
- Generated inventory: `ai-context/maps/CONTEXT_INDEX.md` (derived)

## Current Execution State

- Safety snapshot: created and verified.
- Context v2 structure and specification: completed.
- Validator, indexer, fixtures, and security regression tests: completed.
- Templates, examples, domains, adapters, and release governance: completed.
- Strict release gates: passing.
- Commit/push: not authorized.

## Next Action

Follow `ai-context/plans/active/current-plan.md`. Review the migration and security reports before deciding whether to authorize the first local commit.

## Validation

```powershell
node tools/context/sync.mjs
node tools/context/check.mjs --strict
node --test tools/context/tests/*.test.mjs
git diff --check
```
