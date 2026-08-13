# AIContextKit

AIContextKit is a universal, file-based context management kit for long-running AI collaboration.

Current development line: Context Protocol v2 (`0.2.0`, unreleased).

Start here:

- [Universal guide](PROTOCOL.md)
- [Normative Context Protocol v2](spec/CONTEXT_PROTOCOL.md)
- [User workflow](docs/USER_WORKFLOW.md)
- [Platform compatibility](docs/COMPATIBILITY.md)
- [Templates](templates/)
- [Examples](examples/)
- [Release criteria](docs/RELEASE_CRITERIA.md)

It helps users and AI assistants decide:

- what belongs in the current chat,
- what should become durable project memory,
- what should be compressed, cleaned, or forgotten,
- what should be loaded only when needed,
- how to hand off work to a new AI session without losing direction.

Core principle:

> The context window is for current reasoning. Long-term memory must be file-based, layered, reviewable, cleanable, and portable.

## What This Is

AIContextKit is not a prompt collection and not a private memory database.

It is a practical protocol for keeping AI collaboration grounded in files that users can inspect, edit, version, move, and delete. The protocol treats the active chat as short-term working memory and stores durable state near the real work being done.

Its main goal is to help a user's AI assistant stay effective under a limited context window. Instead of filling the chat with every file, log, decision, and old discussion, the assistant learns to keep only the right working context active and move durable memory into efficient project files.

AIContextKit is experimental. It is a context organization kit, not a source of professional legal, medical, financial, security, or safety-critical advice.

This project is provided for learning, research, and experimentation. It is provided as-is, without any guarantee that it will improve AI assistant behavior or prevent context loss. Users are responsible for reviewing, adapting, and validating any files or workflows created from it.

The kit is designed for software projects, research, writing, education, business planning, legal/compliance review, health information organization, personal knowledge management, and other long-running workflows.

## Why This Exists

Long AI conversations often drift because the chat window becomes overloaded with old logs, stale assumptions, temporary hypotheses, and half-remembered decisions.

In development work, this can happen before the real task even starts. An assistant may read a repository, load too much source and documentation, fill a large part of the context window, and then have little room left for reasoning, editing, testing, and follow-up.

Larger context windows help, but they do not solve memory quality. AIContextKit focuses on memory hygiene:

- short active context,
- layered durable files,
- explicit reading maps,
- reviewable decisions,
- task-specific loading,
- clean handoffs between sessions.

The result should be an AI assistant that spends context on useful reasoning instead of carrying a heavy pile of poorly organized memory.

## How It Works

When a user gives this protocol to an AI, the AI should not manage the protocol in isolation.

The AI must first bind the context system to the user's real work object, such as:

- a software repository,
- a research folder,
- a book or story project,
- a business plan,
- a course or tutoring plan,
- a client case folder,
- a personal knowledge base.

Then it creates or updates the appropriate context files around that real work.

For most projects, the AI should propose a local context management folder before creating files. The recommended default is `ai-context/`, with `AI_CONTEXT.md` as the first file a new AI session reads.

The most important file is usually `ai-context/AI_CONTEXT.md`. It is a short router for the next AI session: current state, active task, reading map, validation status, blockers, and handoff prompt.

## Quick Start For Users

There are two common ways to use AIContextKit.

### Option 1: Download A Domain Document

1. Download the relevant domain document, such as `domains/software-development.md`.
2. Put it in your real project folder.
3. Ask your AI assistant to read that local document.
4. Ask it to bind the rules to the real project and propose a local context management plan.
5. After you approve the plan, let it create the local `ai-context/` folder.

### Option 2: Share A GitHub Link

1. Copy the GitHub link for the relevant domain document.
2. Send the link to your AI assistant.
3. Tell the assistant which real project, folder, or body of data should be managed.
4. Ask it to design the best local context management plan for that work.
5. After you approve the plan, let it create the local `ai-context/` folder.

Recommended prompt:

```text
Read this AIContextKit domain document. Bind it to my actual project or task, then design the most efficient local context management plan for that work. Tell me the plan before creating files.
```

New-session prompt:

```text
Continue this project. First read ai-context/AI_CONTEXT.md. Follow its reading map and context management rules. Then continue the current task.
```

## Quick Start For AI Assistants

If you are an AI assistant reading this repository:

1. Read `PROTOCOL.md`.
2. Identify the user's real work object.
3. If the work object is unclear, ask for it before creating memory files.
4. Read the relevant domain document.
5. Propose a local context management plan before creating files.
6. Create or update `ai-context/AI_CONTEXT.md` near the real work after user approval.
7. Load deeper docs only when the active task requires them.
8. Keep durable memory short, structured, and user-reviewable.

For hosts with automatic project instructions, copy the appropriate optional file from `adapters/`. The adapter only routes to canonical files under the user's local `ai-context/` folder.

## Repository Layout

```text
AIContextKit/
  AGENTS.md
  README.md
  LICENSE
  CONTRIBUTING.md
  PROTOCOL.md
  spec/
    CONTEXT_PROTOCOL.md
    METADATA_SCHEMA.md
    DOCUMENT_TYPES.md
    LIFECYCLE.md
    PRECEDENCE.md
    RETRIEVAL_RULES.md
    PRIVACY_AND_RETENTION.md
    context.schema.json
  ai-context/
    AI_CONTEXT.md
    CONTEXT_PLAN.md
    CONTEXT_BUDGET.md
    maps/
    plans/
    decisions/
    archive/
  docs/
  domains/
  templates/
  adapters/
  examples/
  tools/context/
```

## Main Files

- `PROTOCOL.md`: the universal protocol an AI can read and follow.
- `spec/`: normative Context Protocol v2 contracts and machine-readable metadata schema.
- `ai-context/`: this repository's local working context while the project dogfoods its own rules.
- `docs/USER_WORKFLOW.md`: the user-facing adoption flow.
- `templates/AI_CONTEXT.template.md`: the default handoff file for a real project or task.
- `templates/CONTEXT_PLAN.template.md`: the default plan for a local context management folder.
- `templates/CONTEXT_BUDGET.template.md`: a quality budget for small, high-signal startup reads and controlled expansion.
- `templates/RETRIEVAL_INDEX.template.md`: an index for retrieving only the memory that improves current context quality.
- `templates/REPAIR_PLAN.template.md`: an optional plan for safely adopting, repairing, or migrating existing context files.
- `domains/`: domain-specific adaptations for different kinds of work.
- `examples/software-repo/`: a minimal software project handoff example.
- `examples/research-notes/`: a source-heavy research context example.
- `adapters/`: optional host-specific startup routing that never owns project facts.
- `tools/context/`: optional zero-dependency checks, indexing, status, initialization, and adoption analysis.
- `docs/DESIGN_NOTES.md`: design rationale and major decisions.
- `docs/ROADMAP.md`: planned phases.
- `docs/REFERENCE_SCAN.md`: adjacent projects and design lessons.
- `docs/RELEASE_CRITERIA.md`: first GitHub push readiness checklist.
- `docs/SAFETY_AND_SCOPE.md`: high-risk domain boundaries and project scope.

## Design Commitments

- Bind context management to real work, not to the protocol itself.
- Prefer small layered files over one giant memory file.
- Treat context capacity as a limited performance budget.
- Load the smallest useful set of files for the active task.
- Keep memory portable across AI tools.
- Make memory reviewable and cleanable by the user.
- Separate facts, assumptions, decisions, and open questions.
- Keep protocol, domains, templates, examples, docs, and local project context loosely coupled.
- Treat high-risk domains as context organization only, not professional advice.
- Update durable files at handoff points, not after every thought.

## Status

The conceptual foundation is complete and the repository is undergoing its Context Protocol v2 assurance pass. The Markdown core, normative specification, metadata lifecycle, validation tools, complete examples, and optional platform adapters are present. Version `0.2.0` remains unreleased until all local release gates pass and the user authorizes the first commit and push.

## Disclaimer

AIContextKit is an experimental learning and research project. It is provided as-is, without warranty or guarantee of fitness for any specific purpose. Use it at your own discretion and review all generated context files before relying on them.
