---
context_version: 2
id: AICK-REPAIR-V2
type: repair_plan
status: completed
authority: reference
visibility: internal
updated: 2026-08-12
related: [AICK-PLAN-CURRENT, AICK-BASELINE-20260812, AICK-REPORT-V2-MIGRATION]
---

# Completed Context Protocol v2 Migration

## Scope Completed

- Protected the 46-file, 114,279-byte pre-v2 baseline in a verified external snapshot.
- Rebuilt repository-local startup routing, budgets, ownership maps, lifecycle, and current planning.
- Added the normative protocol specification and machine-readable metadata schema.
- Added zero-dependency assurance tools and security regression tests.
- Completed software and research examples.
- Added optional Codex, Claude, Cursor, and generic adapters.
- Added release, compatibility, security, line-ending, and CI governance.

## Preserved Principles

- Bind context to real work.
- Keep the core Markdown-first, portable, and low-coupling.
- Preserve existing context by default.
- Keep high-risk domains organization-only.
- Make automation optional by conformance level.

## Result

The migration implementation is complete. The repository is now waiting for user review and an explicit first-commit decision; no push has been performed.
