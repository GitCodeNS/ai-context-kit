---
context_version: 2
id: AICK-EX-RESEARCH-CONTEXT-PLAN
type: example
status: active
authority: reference
visibility: public
updated: 2026-08-12
---

# Context Plan

Purpose: describe how ExampleResearch should manage AI context efficiently.

## 1. Binding

This context plan is bound to:

- Work object: ExampleResearch notes workspace
- Location: `/path/to/example-research`
- Domain: research and academic work
- Source AIContextKit document: `domains/research-academic.md`

## 2. Context Budget Goal

- Keep the active chat focused on the current research question.
- Store stable handoff state in `ai-context/AI_CONTEXT.md`.
- Store source metadata in `ai-context/research/SOURCES.md`.
- Store supported claims in `ai-context/research/CLAIMS_AND_EVIDENCE.md`.
- Store uncertain or unresolved issues in `ai-context/research/OPEN_QUESTIONS.md`.
- Avoid loading entire source documents unless close reading is required.

## 3. Recommended Local Context Folder

```text
ai-context/
  AI_CONTEXT.md
  CONTEXT_PLAN.md
  domains/
    active-domain.md
  research/
    SOURCES.md
    LITERATURE_MAP.md
    OPEN_QUESTIONS.md
    CLAIMS_AND_EVIDENCE.md
  decisions/
  handoffs/
  maps/
```

## 4. File Responsibilities

`AI_CONTEXT.md`:
- current research phase, current task, next task, reading map, validation state, handoff prompt.

`CONTEXT_PLAN.md`:
- local rules for managing context budget in this research workspace.

`domains/active-domain.md`:
- research-domain rules adapted from AIContextKit.

`research/SOURCES.md`:
- source identifiers, metadata, reliability notes, and citation status.

`research/LITERATURE_MAP.md`:
- compact map of source clusters and how they relate to the research question.

`research/CLAIMS_AND_EVIDENCE.md`:
- claims, supporting sources, evidence strength, and caveats.

`research/OPEN_QUESTIONS.md`:
- unresolved questions, missing sources, and rejected or uncertain hypotheses.

## 5. Reading Rules

At session start:
- Read `ai-context/AI_CONTEXT.md`.
- Read `ai-context/CONTEXT_PLAN.md` only if context structure or reading rules are relevant.

For source comparison:
- Read only the source notes named in the current reading map.
- Check `research/SOURCES.md` before treating a source as reliable.
- Update claims only with source identifiers.

For writing:
- Read `research/CLAIMS_AND_EVIDENCE.md`.
- Read `research/LITERATURE_MAP.md`.
- Load original source material only for exact verification or close interpretation.

## 6. Update Rules

Update durable context when:
- the research question changes,
- a source is added, rejected, or reclassified,
- a claim gains or loses evidence,
- an open question is resolved,
- the next reading or writing task changes.

Do not update durable context for:
- vague summaries without source references,
- raw copied source text,
- temporary hypotheses with no future value,
- unsupported claims.
