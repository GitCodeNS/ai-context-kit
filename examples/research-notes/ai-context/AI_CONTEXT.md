---
context_version: 2
id: AICK-EX-RESEARCH-BOOTSTRAP
type: example
status: active
authority: reference
visibility: public
updated: 2026-08-12
---

# AI Context

Purpose: short handoff memory for a research notes workspace. This file is not a full research history.

## 1. Binding

This context system is bound to:

- Work object: ExampleResearch notes workspace
- Location: `/path/to/example-research`
- Domain: research and academic work
- Domain document: `ai-context/domains/active-domain.md`
- Context plan: `ai-context/CONTEXT_PLAN.md`

## 2. Core Rules

- Use the chat window for current reasoning.
- Store durable research state in files under `ai-context/`.
- Keep source claims tied to source identifiers.
- Do not treat unsupported summaries as evidence.
- Load full source documents only when the active task requires close reading.

## 3. Current State

Current phase:
- Phase 1: organize sources and stabilize the research question.

Current task:
- Compare three high-priority sources for claims about long-context AI workflow failure modes.

Next recommended task:
- Update `ai-context/research/CLAIMS_AND_EVIDENCE.md` with supported claims and source references.

Known blockers:
- Source C has not been checked for publication date and author reliability.

## 4. Reading Map

For project rules:
- `ai-context/CONTEXT_PLAN.md`
- `ai-context/research/SOURCES.md`

For current task:
- `sources/source-a-notes.md`
- `sources/source-b-notes.md`
- `sources/source-c-notes.md`
- `ai-context/research/CLAIMS_AND_EVIDENCE.md`

For validation:
- `ai-context/research/SOURCES.md`
- source metadata in the original source folder

For decisions/history:
- `ai-context/decisions/`
- `ai-context/research/OPEN_QUESTIONS.md`

## 5. Recent Changes

- Initial source list was split from claim tracking.
- Open questions were separated from supported claims.
- The research question was narrowed to context efficiency in long-running AI collaboration.

## 6. Validation State

- Source A metadata checked.
- Source B metadata checked.
- Source C metadata pending.
- No claims should be marked as supported unless tied to a source identifier.

## 7. Handoff Prompt

```text
Continue ExampleResearch. First read ai-context/AI_CONTEXT.md. Follow its reading map and context management rules. Focus on comparing the three high-priority sources without loading unrelated notes.
```
