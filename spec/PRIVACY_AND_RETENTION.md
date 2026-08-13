---
context_version: 2
id: AICK-SPEC-PRIVACY
type: specification
status: active
authority: canonical
visibility: public
updated: 2026-08-12
related: [AICK-SPEC-PROTOCOL, AICK-SPEC-METADATA]
---

# Privacy And Retention

## Data Minimization

Store the minimum durable information needed for future work. Prefer stable identifiers, paths, redacted summaries, and source references over copied personal data, credentials, client records, or private conversations.

## Visibility

- `public`: may appear in public repositories and examples.
- `internal`: ordinary project working context.
- `sensitive`: access-controlled context with an explicit purpose and review need.

Secrets, authentication tokens, private keys, passwords, session cookies, and regulated identifiers MUST NOT be stored in context documents.

## Sensitive Context Requirements

Sensitive context SHOULD record:

- purpose and owner;
- source and confirmation status;
- minimum necessary content;
- retention or review date;
- permitted audience;
- redaction or deletion path.

## Examples And Reports

Public examples MUST use synthetic data. Migration reports MUST avoid embedding raw sensitive content or terminal output. Validators SHOULD report paths and rule names without echoing secret values.

## Retention

Projects SHOULD define retention by category. Temporary derived indexes may be regenerated; obsolete sensitive context should be deleted or irreversibly redacted after required provenance is preserved.
