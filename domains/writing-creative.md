---
context_version: 2
id: AICK-DOMAIN-WRITING
type: domain
status: active
authority: canonical
visibility: public
updated: 2026-08-12
related: [AICK-SPEC-PROTOCOL]
---

# Writing And Creative Profile

This domain document adapts AIContextKit for novels, scripts, worldbuilding, essays, games, and other creative projects.

## User Entry Paths

- The user downloads this file into a real writing workspace and asks an AI assistant to read it.
- The user sends a GitHub link to this file and tells the AI which manuscript, story bible, or creative archive to manage.

In both cases, the AI should bind this domain document to the real creative work, propose a local context management plan, and only create files after the user approves the plan.

## Bind To

Bind the context system to a writing project folder, manuscript, story bible, or worldbuilding archive.

## Remember

- genre,
- tone,
- audience,
- style rules,
- character facts,
- world rules,
- plot state,
- unresolved threads,
- continuity constraints,
- next writing target.

## Do Not Remember

- discarded plot ideas unless marked as reusable,
- temporary brainstorming fragments,
- old names or facts after replacement,
- full drafts unless the active task needs them.

## Suggested Files

```text
ai-context/
  AI_CONTEXT.md
  CONTEXT_PLAN.md
  domains/
    active-domain.md
  story/
    STYLE_GUIDE.md
    CHARACTERS.md
    WORLD_RULES.md
    PLOT_STATE.md
    OPEN_THREADS.md
  handoffs/
  maps/
```

## Context Efficiency Rules

- Do not load full drafts unless the task requires direct revision.
- Prefer compact continuity files for characters, world rules, plot state, and open threads.
- Mark discarded ideas clearly so they do not leak back into the active canon.
- Keep `ai-context/AI_CONTEXT.md` focused on the current writing target.

## Required Evidence

- Mark whether a detail is canonical, proposed, discarded, or intentionally ambiguous.
- Link continuity facts to the owning outline, character, world, or draft file.

## Common Failure Modes

- Reintroducing discarded ideas as canon.
- Copying full drafts into context instead of routing to them.
- Mixing author decisions with AI suggestions.
