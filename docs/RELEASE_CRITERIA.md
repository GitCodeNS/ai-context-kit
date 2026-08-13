# Release Criteria

## Product Coherence

- README, protocol, specification, templates, examples, and real paths agree.
- The Markdown core works without Node.js or a specific AI vendor.
- Adapters route to canonical state without duplicating mutable facts.
- Public assets contain only synthetic or intentionally public data.

## Context Contract

- Root project entry exists for repository dogfooding.
- Exactly one internal active plan exists.
- Metadata IDs are unique and lifecycle values are valid.
- Source-of-truth and precedence rules cover mutable facts.
- Startup and AI context files remain within budget.
- Generated indexes are reproducible and marked derived.

## Examples And Templates

- Software and research examples contain every path they claim internally.
- Examples contain no unresolved placeholders.
- Domain documents contain binding, evidence, retrieval, failure, and safety guidance where relevant.
- Templates explain which metadata and placeholders must be replaced after copying.

## Tooling

```powershell
npm test
npm run context:sync
npm run context:index:check
npm run context:check
git diff --check
```

All commands must pass with zero strict errors and warnings.

## Security And Migration

- Original pre-v2 content has a verified recovery path.
- Initialization and adoption cannot silently overwrite existing files.
- Write paths cannot escape the selected project root.
- Discovery skips symbolic links and dependency/build directories.
- Secret-pattern diagnostics do not print secret values.
- Security review has no unresolved high-severity finding.

## Git And Publication

- Worktree changes match the migration scope.
- The first local commit requires explicit user authorization.
- GitHub push requires a separate explicit user instruction.
- `CHANGELOG.md`, `VERSION`, license, security policy, and release report agree.
