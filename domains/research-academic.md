---
context_version: 2
id: AICK-DOMAIN-RESEARCH
type: domain
status: active
authority: canonical
visibility: public
updated: 2026-08-12
related: [AICK-SPEC-PROTOCOL]
---

# Research And Academic Profile

This domain document adapts AIContextKit for literature reviews, research projects, papers, experiments, and academic notes.

## User Entry Paths

- The user downloads this file into a real research workspace and asks an AI assistant to read it.
- The user sends a GitHub link to this file and tells the AI which research project or source library to manage.

In both cases, the AI should bind this domain document to the real research work, propose a local context management plan, and only create files after the user approves the plan.

## Bind To

Bind the context system to a research folder, paper draft, source library, or experiment workspace.

## Remember

- research question,
- scope,
- source list,
- citation status,
- hypotheses,
- excluded directions,
- evidence strength,
- open questions,
- draft status,
- next reading or writing task.

## Do Not Remember

- unsupported claims,
- unverified citations,
- vague summaries without source references,
- obsolete hypotheses unless marked as rejected,
- entire papers pasted into context.

## Suggested Files

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
  handoffs/
  maps/
```

## Context Efficiency Rules

- Do not paste whole papers into active chat unless the task requires close reading.
- Prefer source maps, citation status, and claim/evidence tables over long summaries.
- Mark hypotheses, rejected directions, and citation uncertainty explicitly.
- Keep `ai-context/AI_CONTEXT.md` focused on the current research task and next reading or writing step.

## Required Evidence

- Give every source a stable identifier, bibliographic metadata, access date, and verification status.
- Connect claims to sources and distinguish quotation, paraphrase, inference, and hypothesis.

## Common Failure Modes

- Treating an unsupported summary as evidence.
- Losing provenance while compressing multiple sources.
- Loading the full corpus when only a claim-level verification is needed.
