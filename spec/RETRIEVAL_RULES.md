---
context_version: 2
id: AICK-SPEC-RETRIEVAL
type: specification
status: active
authority: canonical
visibility: public
updated: 2026-08-12
related: [AICK-SPEC-PROTOCOL, AICK-POLICY-BUDGET]
---

# Retrieval Rules

## Selection Model

Retrieve files that improve the active task along these dimensions:

1. relevance to the requested outcome;
2. authority for the fact or rule needed;
3. freshness for mutable state;
4. evidence or validation value;
5. acceptable sensitivity and disclosure scope;
6. context cost proportional to expected value.

## Default Sequence

1. Read the short bootstrap packet.
2. Select one task route.
3. Search before broad reading.
4. Open authoritative sections or files.
5. Follow explicit references only as needed.
6. Validate conclusions against source or executable evidence.

## Broad Review Exception

Repository-wide audits, migrations, security reviews, inventory generation, and explicit user requests MAY require broad discovery. Even then, tools SHOULD summarize metadata before full content is loaded into the reasoning context.

## Observable Pressure Signals

Because vendors may not expose token usage, hand off or narrow scope when:

- the active task has split into unrelated objectives;
- more sources are being summarized than used;
- old decisions repeatedly re-enter reasoning;
- validation output cannot be summarized safely;
- the next action is no longer clear from the active plan;
- conflicting instructions cannot be resolved locally.

Vendor token percentages MAY supplement these signals but MUST NOT be required by the universal core.
