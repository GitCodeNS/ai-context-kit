# User Workflow

This document describes how a user applies AIContextKit to a real project or body of work.

AIContextKit is not meant to be managed by itself. The user gives an AI assistant a domain-specific context management document, and the assistant uses it to design a local context system for the user's actual work.

## Goal

Help the user's AI assistant stay effective under a limited context window.

The core goal is not simply to make the assistant read fewer files. The core goal is to keep context quality high with a small, relevant, high-signal reading path.

The assistant should avoid filling the active chat with broad project reads, old logs, stale assumptions, and repeated summaries. Instead, it should create a local context management folder that keeps durable memory organized, efficient, reviewable, and easy to retrieve when the active task needs it.

AIContextKit should also be easy to adopt in projects that already have context files. Existing `ai-context/`, `AGENTS.md`, `CLAUDE.md`, Cursor rules, memory-bank folders, or handoff notes should be detected and reused where helpful instead of overwritten.

## Entry Path 1: Download A Domain Document

1. The user downloads the relevant domain document from AIContextKit.
   - Example: `domains/software-development.md`
   - Example: `domains/research-academic.md`
2. The user places that document in the real project or work folder.
3. The user asks their AI assistant to read the local document.
4. The AI assistant learns the rules in that document.
5. The assistant inspects only the minimum project material needed to design a context system.
6. The assistant proposes a local context management plan to the user.
7. After user confirmation, the assistant creates a local context management folder.

Recommended prompt:

```text
Read this local context management document. Bind it to this project, then design the most efficient local context management plan for the actual work here. Tell me your plan before creating files.
```

## Entry Path 2: Share A GitHub Link

1. The user copies a link to the relevant AIContextKit domain document on GitHub.
2. The user sends that link to their AI assistant.
3. The user tells the assistant which real project, folder, or body of data should be managed.
4. The assistant reads the linked document.
5. The assistant binds the rules to the real work object.
6. The assistant proposes a local context management plan to the user.
7. After user confirmation, the assistant creates the local context management folder in the real project.

Recommended prompt:

```text
Read this AIContextKit domain document: <link>. Use it to design a context management system for this project: <project path or description>. Tell me the plan, then create the local context management folder after I confirm.
```

## What The AI Should Create

The default local folder name is:

```text
ai-context/
```

For software repositories that prefer hidden tooling folders, the user may choose:

```text
.ai-context/
```

The folder should be designed for the real project, not copied mechanically from AIContextKit.

A practical first version:

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
  plans/
    active/
      current-plan.md
```

Purpose:

- `AI_CONTEXT.md`: the first file a new AI session reads.
- `CONTEXT_PLAN.md`: the local plan explaining what memory goes where.
- `CONTEXT_BUDGET.md`: startup limits, expansion rules, and exclusions.
- `domains/active-domain.md`: the selected domain rules adapted to the project.
- `decisions/`: accepted decisions that should survive session compression.
- `handoffs/`: optional session handoff notes for longer work.
- `maps/`: reading maps, source maps, evidence maps, or task-specific file maps.
- `plans/active/current-plan.md`: the single active execution plan for managed projects.

These files are not all mandatory. A Level 0 project may use only a short bootstrap. Level 1 adds routing and a current plan. Level 2 adds metadata, lifecycle, precedence, and source ownership. Level 3 adds automated assurance. See `spec/CONTEXT_PROTOCOL.md`.

Small projects may only need `AI_CONTEXT.md` and `CONTEXT_PLAN.md`. Large projects may need more folders.

Projects with existing, messy, or partially migrated context may optionally add:

```text
ai-context/
  repair-plans/
```

Use `repair-plans/` for proposed context repairs, migrations, or cleanup plans. It is not required for a clean new project.

## What The AI Should Tell The User

Before creating files, the assistant should explain:

- which real work object it is binding to,
- which domain document it is using,
- whether existing context files were found,
- what local context folder it recommends,
- what each file or folder will store,
- how this preserves context quality under limited context capacity,
- what it will read next and what it will avoid reading.

## Good Behavior

The assistant should:

- ask for the real project or data target if unclear,
- preserve existing context files unless the user approves a change,
- reuse other context schemes when they contain useful project rules,
- avoid reading the whole project before planning,
- create a small first version,
- keep durable memory inspectable by the user,
- update context files only when useful state changes,
- keep current chat focused on active reasoning.

## Bad Behavior

The assistant should not:

- manage AIContextKit instead of the user's real work,
- create a giant memory file,
- copy the whole domain document into every project,
- overwrite an old `ai-context/` just to make it match the template,
- force optional folders onto simple projects,
- scan the entire repository without a reason,
- fill the context window before useful work starts,
- write sensitive data into context files without explicit need and user approval.

## Trial On A Local Project

To try AIContextKit on a local project before publishing the kit:

1. Choose the domain document that best matches the local project.
   - Software project: `domains/software-development.md`
   - Research or notes project: `domains/research-academic.md`
   - Writing project: `domains/writing-creative.md`
2. Start a new AI assistant session inside the target project.
3. Ask the AI to read the chosen AIContextKit domain document from this repository.
4. Tell the AI the real target project path.
5. Ask it to define the context quality goal for the current task.
6. Ask it to check whether an old `ai-context/` or other context scheme already exists.
7. Ask it to inspect only the minimum high-signal files needed to design a context plan.
8. Ask it to propose the local `ai-context/` structure before creating files.
9. If old context exists, ask for an adoption plan: preserve, add, archive, or ignore.
10. After approval, let it create or update the target project's `ai-context/` folder.
11. In future sessions for that target project, start from that target project's `ai-context/AI_CONTEXT.md`.

Recommended local trial prompt:

```text
Use AIContextKit on this local project. Read <path-to-AIContextKit>/domains/software-development.md, bind it to the current project, and preserve high context quality with a small high-signal first read. This project may already have ai-context/ or other context files; do not overwrite, delete, rename, or move anything. Before reading implementation files, show me your context quality goal, context budget, first read list, existing-context adoption plan, and the simplest ai-context/ plan before creating files.
```

## Optional Platform Entry

Copy only the relevant routing template from `adapters/` when the host supports automatic project instructions. The adapter must point to the same canonical `ai-context/` files and must not duplicate mutable facts.

## Optional Validation

Projects that adopt the Managed or Assured level may copy or adapt `tools/context/`. Run initialization and adoption analysis in dry-run mode first. The Markdown workflow remains valid without Node.js.
