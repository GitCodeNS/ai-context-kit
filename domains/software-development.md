---
context_version: 2
id: AICK-DOMAIN-SOFTWARE
type: domain
status: active
authority: canonical
visibility: public
updated: 2026-08-12
related: [AICK-SPEC-PROTOCOL, AICK-SPEC-RETRIEVAL]
---

# Software Development Domain Document

This domain document adapts AIContextKit for software projects.

It is intentionally strict because software repositories can fill an AI context window quickly. The goal is not "read fewer files" as an end in itself. The goal is to keep context quality high by reading a small, relevant, well-routed set of materials first, then expanding only when the active task needs more evidence.

## User Entry Paths

- The user downloads this file into a real repository and asks an AI assistant to read it.
- The user sends a GitHub link to this file and tells the AI which repository to manage.

In both cases, the AI should bind this domain document to the real repository, propose a local context management plan, and only create files after the user approves the plan.

## Bind To

Bind the context system to a real repository or project folder.

Do not manage AIContextKit separately from the codebase being worked on.

## Existing Context Adoption

Many real repositories already have context files before AIContextKit is introduced. The AI assistant must treat existing memory as user-owned project state.

Before creating or changing context files:
- check whether `ai-context/` or `.ai-context/` already exists,
- list only the top-level structure and key filenames first,
- read only core entry files such as `AI_CONTEXT.md`, `CONTEXT_PLAN.md`, `CONTEXT_BUDGET.md`, `maps/RETRIEVAL_INDEX.md`, and `domains/active-domain.md` if present,
- detect other context schemes by filename only unless the task requires reading them.

Common context schemes to detect:
- `AGENTS.md`
- `CLAUDE.md`
- `.cursor/rules`
- `.windsurf/rules`
- `memory-bank/`
- `docs/handoff/` or `docs/handoffs/`

Do not overwrite, delete, rename, or move existing context files without explicit user approval.

If the existing context is useful but incomplete, propose a small adoption plan:
- preserve useful files,
- add missing routing files such as `CONTEXT_BUDGET.md` or `maps/RETRIEVAL_INDEX.md`,
- mark stale entries as historical instead of deleting them immediately,
- keep other assistant-specific files in compatibility roles rather than making them the main source of truth.

For messy or partially migrated projects, the assistant may propose an optional `ai-context/repair-plans/` directory. Use it for temporary repair or migration plans, not for normal daily memory.

## First Response Requirement

Before reading broad project files, the AI assistant must answer:

1. Which repository or project folder am I binding to?
2. What is the user's current task?
3. What context quality do I need to preserve for this task?
4. What is the smallest high-signal file set I need to inspect first?
5. What files or folders should I avoid reading unless needed?
6. What local `ai-context/` structure do I propose?

If the current task is unclear, ask for it before scanning the repository.

## Hard Context Budget Rules

The AI assistant should treat context as a quality budget, not only a size limit.

Quality goal:
- keep the active chat focused on the current task,
- keep durable facts and decisions in files the user can inspect,
- prefer authoritative project files over broad summaries,
- keep source paths and validation commands available without copying large code or logs,
- expand reading when it improves correctness, not when it merely increases coverage.

At session start:
- Do not read the whole repository.
- Do not summarize the whole repository.
- Do not open large dependency, build, cache, generated, or virtual environment folders.
- Do not paste broad directory trees into chat.
- Prefer `rg`, file names, package metadata, and short targeted snippets.

Default startup budget:
- Read at most one existing project rules file if present.
- Read build metadata such as `package.json`, `pyproject.toml`, or equivalent.
- Read at most one architecture or README file before proposing the context plan.
- Read no implementation files until the active task is known.

During work:
- Read files because the active task needs them, not because they exist.
- Prefer files that improve task understanding, decision quality, or validation confidence.
- Before opening more than five source files, explain why the current task needs that expansion.
- Summarize long command output instead of storing or repeating it.
- If the session begins to drift into a new task, create a handoff and ask to start a fresh session.

## Manual Memory Lifecycle

AIContextKit does not provide a runtime memory server in v1. The AI should manually follow this lifecycle:

1. Capture only durable facts, decisions, source paths, validation state, and next actions.
2. Compress noisy work into short structured notes.
3. Index important memory in `ai-context/maps/RETRIEVAL_INDEX.md`.
4. Retrieve only relevant entries at session start.
5. Inject only the small amount of context needed for the active task.
6. Prune stale or misleading notes during handoff.

## Remember

- current development goal,
- active task,
- architecture constraints,
- coding style,
- build/test commands,
- changed files,
- validation status,
- known bugs,
- performance or resource limits,
- user-approved decisions,
- next action.

## Do Not Remember

- raw terminal logs,
- full dependency output,
- temporary failed guesses,
- unrelated code paths,
- stale branch status,
- broad file trees unless they are project structure docs,
- source code copied into memory files when a path reference is enough.

## Suggested Files

```text
ai-context/
  AI_CONTEXT.md
  CONTEXT_PLAN.md
  CONTEXT_BUDGET.md
  domains/
    active-domain.md
  decisions/
  handoffs/
  maps/
    RETRIEVAL_INDEX.md
    CODE_MAP.md
    VALIDATION_MAP.md
  repair-plans/        # optional; only for context repair or migration work
```

Use existing project files as source material when relevant:

```text
AGENTS.md
CLAUDE.md
package.json / pyproject.toml / other build metadata
docs/
  ARCHITECTURE.md
  ROADMAP.md
  VALIDATION.md
  DECISIONS.md
```

## Session Start

1. Read `ai-context/AI_CONTEXT.md`.
2. Read `ai-context/CONTEXT_BUDGET.md` if present.
3. Read `ai-context/maps/RETRIEVAL_INDEX.md` and retrieve only entries relevant to the current task.
4. Read `ai-context/CONTEXT_PLAN.md` only when context structure or reading rules are relevant.
5. Read project rules such as `AGENTS.md` if present.
6. Read only the docs and files named for the active task.
7. Inspect code with targeted search.
8. Run tests or validation appropriate to the task.

If `CONTEXT_BUDGET.md` or `maps/RETRIEVAL_INDEX.md` is missing in an existing `ai-context/`, do not treat that as failure. Propose the smallest useful addition and wait for user approval before writing it.

## Context Efficiency Rules

- Do not read the whole repository at session start.
- Start from the active context, context budget, retrieval index, project rules, build metadata, and targeted search.
- Optimize for context signal quality: task relevance, source authority, freshness, and validation value.
- Prefer file paths, source maps, retrieval indexes, and validation commands over long prose summaries.
- Store accepted decisions in `ai-context/decisions/` instead of repeating them in every handoff.
- Keep `ai-context/AI_CONTEXT.md` short enough to read at the start of every session.
- Keep `ai-context/maps/RETRIEVAL_INDEX.md` short enough to scan quickly.
- Never use `ai-context/` as a dumping ground for copied source files.

## Context Pressure Rules

When the conversation becomes too large or noisy:

- Stop expanding the task.
- Update `ai-context/AI_CONTEXT.md`.
- Add or update a handoff note only if the task cannot be summarized in the active context.
- Tell the user that a fresh session should start from `ai-context/AI_CONTEXT.md`.

If the user says the context window filled too quickly, diagnose:

- Did the AI read too many files before the task was clear?
- Did the AI omit `CONTEXT_BUDGET.md`?
- Did the AI fail to use `RETRIEVAL_INDEX.md`?
- Did summaries become too long?
- Did one session contain multiple unrelated tasks?

## Common Failure Modes

- Treating `ai-context/` as a documentation archive instead of a routing layer.
- Reading the repository broadly before identifying the active task.
- Replacing existing context files instead of adopting them carefully.
- Forcing every project to use every optional folder.
- Repeating decisions in multiple files instead of linking to one decision record.
- Storing source code in context files instead of storing paths and reasons.
- Continuing a bloated session instead of handing off to a fresh one.
- Letting `AI_CONTEXT.md` grow into a full project history.

## First Local Trial Prompt

```text
Use AIContextKit on this local software project. Read this domain document, bind it to the current repository, and preserve high context quality with a small high-signal first read. Before reading implementation files, show me your context quality goal, context budget, and first read list, then propose an ai-context/ plan.
```

## Required Evidence

- Cite source paths for architecture and behavior claims.
- Record focused and full validation commands with their latest result.
- Distinguish observed code behavior, accepted design, and proposed change.
