---
context_version: 2
id: AICK-SPEC-DOCUMENT-TYPES
type: specification
status: active
authority: canonical
visibility: public
updated: 2026-08-12
related: [AICK-SPEC-METADATA, AICK-SPEC-PRECEDENCE]
---

# Document Types And Responsibilities

| Type | Owns | Must not become |
| --- | --- | --- |
| `profile` | Work identity and compact current router | Full history |
| `policy` | Stable governance or constraints | Task diary |
| `plan` | Current or bounded intended work | Accepted architecture decision |
| `decision` | Chosen option, rationale, consequences | Mutable task status |
| `map` | Curated ownership, retrieval, code, data, or validation routes | Duplicated source content |
| `report` | Evidence-backed result at a point in time | Current mutable truth without an owner |
| `handoff` | Temporary restart packet | Permanent second bootstrap |
| `domain` | Domain-specific extension rules | Universal core protocol |
| `template` | Copyable shape with placeholders | Active project state |
| `example` | Demonstration or test fixture | Normative contract |
| `specification` | Normative protocol contract | Product marketing |
| `repair_plan` | Safe adoption or migration proposal | Everyday work plan |
| `archive` | Preserved historical or raw material | Startup context |
| `index` | Derived inventory | Canonical fact source |

If one file repeatedly serves two mutable responsibilities, split it and keep a link from the higher-level router.
