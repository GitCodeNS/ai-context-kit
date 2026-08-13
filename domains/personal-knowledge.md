---
context_version: 2
id: AICK-DOMAIN-PERSONAL
type: domain
status: active
authority: canonical
visibility: public
updated: 2026-08-12
related: [AICK-SPEC-PROTOCOL, AICK-SPEC-PRIVACY]
---

# Personal Knowledge Profile

This domain document adapts AIContextKit for personal knowledge management, life admin, goals, habits, and long-running personal projects.

## User Entry Paths

- The user downloads this file into a real personal knowledge workspace and asks an AI assistant to read it.
- The user sends a GitHub link to this file and tells the AI which notes archive, project folder, or planning workspace to manage.

In both cases, the AI should bind this domain document to the real personal knowledge work, propose a local context management plan, and only create files after the user approves the plan.

## Bind To

Bind the context system to a personal knowledge folder, notes app export, project folder, or planning workspace.

## Remember

- active goals,
- recurring preferences,
- commitments,
- routines,
- project list,
- decision history,
- next actions,
- user-approved personal context.

## Do Not Remember

- private information without explicit user intent,
- one-off moods as permanent facts,
- old goals after they are replaced,
- sensitive data that does not need to be stored.

## Suggested Files

```text
ai-context/
  AI_CONTEXT.md
  CONTEXT_PLAN.md
  domains/
    active-domain.md
  personal/
    GOALS.md
    PROJECTS.md
    PREFERENCES.md
    DECISIONS.md
    NEXT_ACTIONS.md
  handoffs/
  maps/
```

## Context Efficiency Rules

- Do not store private information without explicit user intent.
- Separate stable preferences, active goals, commitments, and next actions.
- Do not turn one-off moods or temporary ideas into permanent memory.
- Keep `ai-context/AI_CONTEXT.md` focused on the current personal project or planning task.

## Required Evidence

- Record whether a preference, commitment, or goal was explicitly stated or inferred.
- Attach dates and review triggers to mutable personal context.

## Common Failure Modes

- Turning temporary moods or guesses into permanent preferences.
- Mixing unrelated personal projects in one active context.
- Keeping private data after it no longer serves an explicit purpose.
