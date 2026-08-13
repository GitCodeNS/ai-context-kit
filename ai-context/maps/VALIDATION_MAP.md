---
context_version: 2
id: AICK-MAP-VALIDATION
type: map
status: active
authority: canonical
visibility: internal
updated: 2026-08-12
related: [AICK-PLAN-CURRENT, AICK-POLICY-BUDGET]
---

# Validation Map

## Context Contract

```powershell
node tools/context/check.mjs --strict
node tools/context/index.mjs --check
```

Checks metadata, unique IDs, valid lifecycle values, references, startup budgets, one active plan, example completeness, and generated-index freshness.

## Tool Tests

```powershell
node --test tools/context/tests/*.test.mjs
```

## Repository Hygiene

```powershell
git diff --check
git status --short --branch
```

## Security

Executable context tools must reject paths outside the selected project root, default migration operations to dry-run, avoid network access, and never print secrets from inspected files.

## Release Gate

The release gate requires zero strict errors and warnings, passing tests and fixtures, no broken internal references, exactly one active plan, no unresolved template placeholders in examples, and no unauthorized Git push.
