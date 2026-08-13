---
context_version: 2
id: AICK-DOMAIN-BUSINESS
type: domain
status: active
authority: canonical
visibility: public
updated: 2026-08-12
related: [AICK-SPEC-PROTOCOL]
---

# Business And Product Profile

This domain document adapts AIContextKit for business planning, product management, strategy, operations, and market analysis.

## User Entry Paths

- The user downloads this file into a real business or product workspace and asks an AI assistant to read it.
- The user sends a GitHub link to this file and tells the AI which initiative, company workspace, or product plan to manage.

In both cases, the AI should bind this domain document to the real business work, propose a local context management plan, and only create files after the user approves the plan.

## Bind To

Bind the context system to a company workspace, product folder, planning document, or business initiative.

## Remember

- business goal,
- target users,
- constraints,
- strategy,
- product decisions,
- metrics definitions,
- assumptions,
- risks,
- next milestone.

## Do Not Remember

- unsupported market claims,
- stale metrics,
- old strategy after replacement,
- private or sensitive information unless the user explicitly chooses to store it.

## Suggested Files

```text
ai-context/
  AI_CONTEXT.md
  CONTEXT_PLAN.md
  domains/
    active-domain.md
  business/
    STRATEGY.md
    USERS.md
    METRICS.md
    DECISIONS.md
    RISKS.md
  handoffs/
  maps/
```

## Context Efficiency Rules

- Do not treat old strategy, stale metrics, or unsupported market claims as current truth.
- Keep assumptions, decisions, risks, and metrics separated.
- Prefer concise decision and metric records over long meeting-style summaries.
- Keep `ai-context/AI_CONTEXT.md` focused on the active milestone and next decision.

## Required Evidence

- Identify the owner, date, and source for metrics, customer claims, constraints, and approvals.
- Distinguish observed results from forecasts and assumptions.

## Common Failure Modes

- Treating an old strategy or forecast as current fact.
- Mixing customer evidence, internal opinion, and accepted decisions.
- Preserving meeting transcripts instead of actionable outcomes.
