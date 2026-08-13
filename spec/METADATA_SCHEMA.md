---
context_version: 2
id: AICK-SPEC-METADATA
type: specification
status: active
authority: canonical
visibility: public
updated: 2026-08-12
related: [AICK-SPEC-PROTOCOL, AICK-SPEC-LIFECYCLE]
---

# Metadata Schema

## Required Fields For Managed Context

```yaml
---
context_version: 2
id: PROJECT-TYPE-NAME
type: policy
status: active
authority: canonical
visibility: internal
updated: 2026-08-12
related: []
---
```

| Field | Meaning |
| --- | --- |
| `context_version` | Protocol major version used by the document |
| `id` | Stable identifier, unique inside the work object |
| `type` | Document responsibility |
| `status` | Lifecycle state |
| `authority` | Whether it owns, derives, or merely references facts |
| `visibility` | Intended disclosure boundary |
| `updated` | Last durable semantic update, `YYYY-MM-DD` |
| `related` | Optional list of stable document IDs |

## Types

Allowed core types:

```text
profile policy plan decision map report handoff domain template
example specification repair_plan archive index
```

Extensions MAY define additional types using a project prefix. Validators SHOULD warn, rather than fail, on declared extensions.

## Statuses

Allowed statuses:

```text
active proposed accepted blocked completed rejected superseded archived
```

Not every status applies to every type. Decisions normally use proposed, accepted, rejected, or superseded. Plans normally use active, blocked, completed, or archived.

## Authority

- `canonical`: owns the current truth for its category.
- `derived`: generated or summarized from canonical sources.
- `reference`: historical, external, illustrative, or non-owning material.

## Visibility

- `public`: safe and intended for public distribution.
- `internal`: project working context not intended as a public artifact.
- `sensitive`: requires explicit need, controlled access, and retention review.

## Optional Fields

Projects MAY use `source`, `replaces`, `expires`, `review_after`, `sensitivity`, or namespaced extension fields. Optional fields MUST NOT contradict required fields.

## Templates

Templates MAY contain placeholders and are not active project documents. A copied template MUST replace placeholders before it can pass a Managed-level strict check.
