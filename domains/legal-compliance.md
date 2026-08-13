---
context_version: 2
id: AICK-DOMAIN-LEGAL
type: domain
status: active
authority: canonical
visibility: public
updated: 2026-08-12
related: [AICK-SPEC-PROTOCOL, AICK-SPEC-PRIVACY]
---

# Legal And Compliance Profile

This domain document adapts AIContextKit for legal research, compliance review, policy analysis, and case organization.

Important: this document is for organizing legal or compliance context only. AI assistance does not replace qualified legal advice, legal representation, compliance review, or jurisdiction-specific professional judgment.

Do not use this document to produce legal conclusions, compliance guarantees, or action recommendations without qualified professional review.

## User Entry Paths

- The user downloads this file into a real case or compliance workspace and asks an AI assistant to read it.
- The user sends a GitHub link to this file and tells the AI which matter, policy review, or document set to manage.

In both cases, the AI should bind this domain document to the real legal or compliance work, propose a local context management plan, and only create files after the user approves the plan.

## Bind To

Bind the context system to a case folder, compliance project, policy review, contract review, or legal research file.

## Remember

- jurisdiction,
- matter scope,
- factual record,
- source authority,
- open legal questions,
- risk level,
- reviewed documents,
- user-approved conclusions,
- disclaimers and limitations.

## Do Not Remember

- unsupported legal conclusions,
- facts not present in the record,
- outdated statutes or rules without date markers,
- privileged or sensitive data unless the user explicitly chooses to store it.

## Suggested Files

```text
ai-context/
  AI_CONTEXT.md
  CONTEXT_PLAN.md
  domains/
    active-domain.md
  legal/
    FACT_RECORD.md
    SOURCE_MAP.md
    ISSUES.md
    RISK_REGISTER.md
    DECISIONS.md
  handoffs/
  maps/
```

## Context Efficiency Rules

- Keep facts, sources, issues, risks, and conclusions separated.
- Mark jurisdiction, source dates, and authority level.
- Do not store privileged or sensitive data unless the user explicitly chooses to do so.
- Keep `ai-context/AI_CONTEXT.md` focused on the current legal or compliance question.

## Safety Boundaries

- Treat generated legal text as draft organization material only.
- Do not present AI-generated conclusions as legal advice.
- Do not infer facts that are not present in the record.
- Require source dates and jurisdiction markers for statutes, rules, policies, or contracts.
- Recommend qualified professional review for decisions, filings, negotiations, compliance claims, or risk acceptance.

## Required Evidence

- Record jurisdiction, source authority, effective date, citation, review status, and factual provenance.
- Preserve the distinction between client facts, source text, analysis, and professional advice.

## Common Failure Modes

- Treating outdated or non-binding material as controlling authority.
- Converting an AI summary into a legal conclusion.
- Storing privileged or regulated data without an explicit need and retention rule.
