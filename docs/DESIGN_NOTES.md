# Design Notes

This file captures the initial design discussion for AIContextKit.

## Origin

The project started from a practical problem: long AI-assisted project sessions consume the context window quickly. After a few large documents, code reads, tool outputs, and design discussions, the active chat becomes crowded and can start steering the AI with stale or low-value memory.

The motivating software-development case is direct: when an assistant such as Codex works on a real repository, the single conversation window has a limited context budget. If the AI reads too much of the project before doing the task, the context can become crowded before useful implementation starts.

The proposed solution is not simply "use a larger context window." Larger context helps, but it does not solve memory quality.

AIContextKit focuses on context quality, context efficiency, and context budget management, not just context size.

## Core Insight

The context window should be treated as short-term working memory.

Long-term state should be:

- file-based,
- layered,
- reviewable,
- cleanable,
- portable across AI tools.

The goal is to help the user's AI assistant keep high-value working context active while moving durable, reusable memory into structured files.

## Key Design Decision

The kit should be universal, but not one huge universal file.

Chosen structure:

- one universal core protocol,
- multiple domain documents,
- reusable templates,
- practical examples,
- local `ai-context/` folders inside real user projects.

This gives the project a stable center while allowing different fields to adapt the system to their own risks and workflows.

## Low-Coupling Principle

AIContextKit should stay low-coupling.

This means:

- `PROTOCOL.md` defines universal behavior.
- `domains/` adapts the protocol to specific domains.
- `templates/` provides reusable file shapes.
- `examples/` demonstrates usage without becoming mandatory.
- `docs/` explains rationale, workflow, and structure.
- `ai-context/` stores this repository's own working memory.

No single file should become a giant owner of all context. Each layer should be understandable and useful on its own.

## Dogfooding Principle

AIContextKit should use its own emerging context-management pattern during development.

This repository keeps its local working memory in `ai-context/`. The root `AI_CONTEXT.md` was removed to avoid duplicate entry points and keep one source of truth for local working context.

## Why Domain Documents Are Needed

Different domains have different memory risks.

Software development:
- code paths,
- architecture boundaries,
- tests,
- build commands,
- performance constraints.

Academic research:
- source quality,
- citation status,
- hypotheses,
- excluded directions,
- evidence trails.

Writing and creative work:
- tone,
- characters,
- world rules,
- plot continuity,
- unresolved threads.

Legal and compliance:
- jurisdiction,
- source authority,
- facts versus opinions,
- risk level,
- no unsupported legal conclusions.

Medical and health:
- timeline,
- symptoms,
- test results,
- source dates,
- strict safety boundaries.

Business and product:
- strategy,
- metrics,
- customer segments,
- decisions,
- market assumptions.

Education:
- learner level,
- weak points,
- lesson history,
- next review topics.

Personal knowledge:
- goals,
- preferences,
- commitments,
- routines,
- personal archive structure.

## Important Warning

The protocol must not cause the AI to manage the protocol itself instead of the user's real work.

The AI must bind the context system to a real object:

- a repository,
- a folder,
- a document set,
- a research corpus,
- a writing project,
- a business task,
- or another concrete workflow.

## Planned Repository Identity

Project name:
- `AIContextKit`

Repository name:
- `ai-context-kit`

Chinese name:
- `AI 上下文管理套件`

Positioning:
- A universal, file-based context management kit for keeping AI assistants effective under limited context windows during long-running collaboration.

## Context Protocol v2 Evolution

The first draft established the right conceptual layers but relied mainly on assistant discipline. Context Protocol v2 adds a normative contract, metadata, lifecycle, precedence, source ownership, privacy rules, complete fixtures, optional adapters, and zero-dependency assurance tools. These additions remain optional by conformance level so small projects do not inherit enterprise complexity.
