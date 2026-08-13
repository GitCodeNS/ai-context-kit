---
context_version: 2
id: AICK-GUIDE-PROTOCOL
type: specification
status: active
authority: canonical
visibility: public
updated: 2026-08-12
related: [AICK-SPEC-PROTOCOL]
---

# Universal AI Context Management Protocol

This is the approachable guide. Normative conformance, metadata, lifecycle, precedence, retrieval, and privacy rules live under `spec/`, beginning with `spec/CONTEXT_PROTOCOL.md`.

This protocol teaches an AI assistant how to manage context for long-running work.

It is designed to be copied into any AI system and adapted to any domain.

## Principle 0: Bind To Real Work

Do not manage this protocol in isolation.

Before creating memory files, identify the user's real work object:

- software project,
- research corpus,
- writing project,
- business plan,
- learning plan,
- case folder,
- personal knowledge base,
- or another active workflow.

If the work object is unclear, ask the user:

```text
Which project, folder, task, or body of material should this context system manage?
```

All context files must serve that real work object.

## Core Principle

The context window is for current reasoning. Long-term memory must be file-based, layered, reviewable, cleanable, and portable.

This means:

- Current chat is short-term working memory.
- Context capacity is a limited performance budget.
- Durable state belongs in files.
- Files should be organized by responsibility.
- Users should be able to inspect and edit the AI's memory.
- Stale or low-value memory should be removed or compressed.
- The system should work across AI tools and sessions.

## Required AI Behavior

After reading this protocol, the AI must:

1. Bind the context system to the user's real work object.
2. Read the relevant domain document.
3. Propose a local context management plan before creating files.
4. Locate or create the active context file for that work after user approval.
5. Prefer a local `ai-context/` folder unless the user or project requires a different layout.
6. Use the active chat only for current reasoning and interaction.
7. Store durable state in structured files near the work object.
8. Load only the files needed for the current task.
9. Update durable context when decisions, state, validation, or blockers change.
10. Keep memory concise enough that a future AI can act on it quickly.
11. Protect the user's context budget by avoiding broad, low-value loading.

The AI should not create memory files just because this protocol exists. It should create them only when they help the user's real work continue across sessions.

## Memory Layers

Use layered memory instead of one large file.

### 1. Global User Rules

Purpose:
- stable user preferences,
- communication style,
- safety preferences,
- recurring workflow expectations.

Do not store project-specific facts here.

### 2. Project Rules

Purpose:
- stable project conventions,
- build/test commands,
- architecture constraints,
- domain rules,
- safety boundaries.

Examples:
- `AGENTS.md`
- `CLAUDE.md`
- `PROJECT_RULES.md`

### 3. Active Context

Purpose:
- binding to the real work object,
- current phase,
- active task,
- next task,
- reading map,
- validation state,
- current blockers,
- changed files or artifacts,
- handoff prompt.

Recommended file:
- `ai-context/AI_CONTEXT.md`

This should be the first file a new AI session reads.

Small projects may keep `AI_CONTEXT.md` at the project root, but the default recommendation is to keep context files together in `ai-context/`.

### 4. Domain Document

Purpose:
- domain-specific memory rules,
- domain-specific risks,
- required evidence,
- templates and workflow patterns.

Examples:
- software development domain document,
- academic research domain document,
- writing domain document,
- legal/compliance domain document.

### 5. Deep Docs

Purpose:
- architecture,
- source maps,
- decision records,
- task plans,
- research notes,
- worldbuilding notes,
- long-form project history.

These should be loaded only when the active task needs them.

## Session Start Workflow

At the start of a session, the AI should:

1. Read `ai-context/AI_CONTEXT.md`, or the project root `AI_CONTEXT.md` if that is the project's chosen layout.
2. Identify the active task and domain.
3. Read the listed domain document if present.
4. Read only task-specific docs and files.
5. Avoid broad scans unless the user asks for a full review.
6. Confirm the next action if the task direction is ambiguous.

If no active context file exists yet:

1. Identify the real work object.
2. Ask the user for the work object if it is unclear.
3. Read the relevant domain document.
4. Propose a local context management plan.
5. After user approval, create a short `ai-context/AI_CONTEXT.md` using the template.
6. Add a reading map instead of copying large project history into the file.

## User Adoption Paths

Users usually apply AIContextKit in one of two ways:

1. Download a domain document from AIContextKit, place it in the real project folder, and ask the AI assistant to read it.
2. Copy a GitHub link to a domain document and send that link to the AI assistant.

In both cases, the AI must bind the rules to the user's real project or data, then design a local context management system for that work.

The AI should tell the user:

- which real work object it is binding to,
- which domain document it is using,
- what local context folder it recommends,
- what each file or folder will store,
- how the plan protects the context window,
- what it will read next and what it will avoid reading.

The default local context folder is:

```text
ai-context/
```

Suggested first structure:

```text
ai-context/
  AI_CONTEXT.md
  CONTEXT_PLAN.md
  domains/
    active-domain.md
  decisions/
  handoffs/
  maps/
```

This structure is a starting point, not a requirement. The AI should simplify it for small projects and extend it for large projects only when there is a clear need.

## During Work

The AI should:

- keep the chat focused on the active task,
- use targeted file reads and searches,
- summarize noisy outputs instead of storing them verbatim,
- update durable docs when decisions or state change,
- avoid carrying stale assumptions forward,
- separate facts, assumptions, decisions, and open questions.

## Update Triggers

Update durable context when:

- the active goal changes,
- the next recommended task changes,
- a decision is accepted,
- validation succeeds or fails,
- a blocker appears or is resolved,
- important files or artifacts are created,
- a new reading map would help the next session.

Do not update durable context for:

- every intermediate thought,
- raw command output,
- temporary guesses,
- duplicate information already obvious from nearby files,
- abandoned details that no longer affect future work.

## Context Pressure Rules

When the host exposes reliable context usage, projects may define percentage thresholds. The portable default uses observable signals instead: task drift, unrelated branches, repeated stale decisions, excessive source summarization, validation output that cannot be compressed safely, or loss of a clear next action.

When these signals appear, finish or narrow the current subtask, update canonical state, and prepare a fresh-session handoff. See `spec/RETRIEVAL_RULES.md`.

A new session should start from `ai-context/AI_CONTEXT.md`, not from the full old chat.

## Context Efficiency Rules

For every file or document loaded into the active chat, the AI should be able to answer:

- Why is this needed for the current task?
- Is there a smaller file, section, search result, or summary that would be enough?
- Should the durable result be stored in `ai-context/AI_CONTEXT.md`, a decision record, a domain doc, or not stored at all?

For software development, avoid reading an entire repository at session start. Start from `ai-context/AI_CONTEXT.md`, project rules, package/build metadata, and targeted search. Load implementation files only when they are relevant to the active task.

## Handoff Workflow

Before ending a meaningful session, the AI should update:

1. `ai-context/AI_CONTEXT.md`
   - current state,
   - next task,
   - changed files,
   - validation state,
   - risks or blockers.

2. Domain or task docs
   - durable decisions,
   - completed work,
   - accepted plans,
   - important evidence.

3. Optional project history
   - only if the project needs a chronological record.

## What Should Be Remembered

Remember:

- user-approved decisions,
- current goals,
- stable constraints,
- active task status,
- changed files or artifacts,
- validation results,
- known risks,
- important source paths,
- domain-specific safety rules.

Do not remember:

- raw logs,
- temporary guesses,
- failed approaches without lessons,
- huge pasted documents,
- outdated task details,
- information already obvious from filenames,
- unsupported claims.

## Reading Map Pattern

Every active context file should act as a router.

Example:

```text
For implementation work:
- PROJECT_RULES.md
- docs/ARCHITECTURE.md
- src/relevant-module/

For validation:
- docs/VALIDATION.md
- package.json
- CI config

For research:
- docs/SOURCES.md
- notes/current-question.md
```

The context file should point to deeper material instead of duplicating it.

## Anti-Patterns

Avoid:

- creating one giant memory file,
- copying large chat transcripts into project memory,
- storing private or sensitive information without a clear need,
- treating unverified assumptions as facts,
- loading every file at session start,
- spending most of the context window before work begins,
- storing bulky summaries that are slower to use than the source files,
- letting stale plans override the user's newest instruction,
- managing AIContextKit itself when the user asked to manage another project.

## User-Visible Commitment

After reading this protocol, the AI should be able to tell the user:

```text
I will use the context window only for current reasoning. I will keep long-term memory in structured files that are layered, reviewable, cleanable, and portable. I will bind this system to your real project or task, then create and maintain only the context files that help that work continue across sessions.
```

## Universal New-Session Prompt

```text
Continue this project. First read ai-context/AI_CONTEXT.md. Follow its reading map and context management rules. Then continue the current task.
```
