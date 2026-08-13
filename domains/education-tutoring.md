---
context_version: 2
id: AICK-DOMAIN-EDUCATION
type: domain
status: active
authority: canonical
visibility: public
updated: 2026-08-12
related: [AICK-SPEC-PROTOCOL]
---

# Education And Tutoring Profile

This domain document adapts AIContextKit for teaching, tutoring, curriculum planning, and long-term study support.

## User Entry Paths

- The user downloads this file into a real learning workspace and asks an AI assistant to read it.
- The user sends a GitHub link to this file and tells the AI which learner, course, or study plan to manage.

In both cases, the AI should bind this domain document to the real learning work, propose a local context management plan, and only create files after the user approves the plan.

## Bind To

Bind the context system to a learner, course, study folder, curriculum plan, or tutoring program.

## Remember

- learner level,
- goals,
- weak points,
- mastered topics,
- preferred explanation style,
- lesson history,
- exercises assigned,
- next review topics.

## Do Not Remember

- incorrect learner answers without correction,
- sensitive student data unless needed and approved,
- outdated level assumptions,
- every individual exercise attempt.

## Suggested Files

```text
ai-context/
  AI_CONTEXT.md
  CONTEXT_PLAN.md
  domains/
    active-domain.md
  learning/
    LEARNER_PROFILE.md
    CURRICULUM.md
    PROGRESS.md
    REVIEW_QUEUE.md
  handoffs/
  maps/
```

## Context Efficiency Rules

- Do not store every exercise attempt.
- Store corrected weak points, mastered topics, and next review items.
- Keep learner assumptions current and mark uncertainty clearly.
- Keep `ai-context/AI_CONTEXT.md` focused on the next lesson or review target.

## Required Evidence

- Record the learner's stated goal, demonstrated work, correction source, and review date.
- Separate measured progress from inferred ability.

## Common Failure Modes

- Turning one mistake into a permanent learner profile.
- Saving every exercise instead of stable weak points and review needs.
- Advancing the plan without checking prerequisite mastery.
