---
context_version: 2
id: AICK-TOOLS-CONTEXT
type: policy
status: active
authority: canonical
visibility: public
updated: 2026-08-12
related: [AICK-SPEC-PROTOCOL, AICK-MAP-VALIDATION]
---

# Context Tools

Zero-dependency Node.js helpers for Managed and Assured AIContextKit projects.

```powershell
node tools/context/check.mjs --strict
node tools/context/index.mjs
node tools/context/index.mjs --check
node tools/context/sync.mjs
node tools/context/status.mjs
node tools/context/init.mjs --root <project>
node tools/context/adopt.mjs --root <project>
```

`init` is a dry-run planner; automatic apply is intentionally disabled. `adopt` is read-only and lists only known context entry paths. Index writes require an existing, non-linked `ai-context/maps/` directory and only update a verified generated artifact through its already-open file handle. The Markdown protocol remains usable without these tools.
