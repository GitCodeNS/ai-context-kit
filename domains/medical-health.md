---
context_version: 2
id: AICK-DOMAIN-MEDICAL
type: domain
status: active
authority: canonical
visibility: public
updated: 2026-08-12
related: [AICK-SPEC-PROTOCOL, AICK-SPEC-PRIVACY]
---

# Medical And Health Profile

This domain document adapts AIContextKit for organizing health information, appointment preparation, symptom timelines, and medical research notes.

Important: this document is for organizing health information only. AI assistance does not replace professional medical care, diagnosis, treatment, emergency support, or clinician judgment.

Do not use this document to produce diagnoses, treatment plans, medication changes, or urgent-care decisions.

## User Entry Paths

- The user downloads this file into a real health information workspace and asks an AI assistant to read it.
- The user sends a GitHub link to this file and tells the AI which health folder, timeline, or appointment preparation task to manage.

In both cases, the AI should bind this domain document to the real health information work, propose a local context management plan, and only create files after the user approves the plan.

## Bind To

Bind the context system to a health folder, appointment preparation file, symptom timeline, or wellness tracking project.

## Remember

- timeline,
- symptoms,
- medications,
- test results,
- clinician instructions,
- questions for a professional,
- source dates,
- urgent safety flags.

## Do Not Remember

- diagnoses without professional confirmation,
- outdated medical guidance without date/source,
- sensitive health data unless the user explicitly chooses to store it,
- guesses presented as facts.

## Suggested Files

```text
ai-context/
  AI_CONTEXT.md
  CONTEXT_PLAN.md
  domains/
    active-domain.md
  health/
    TIMELINE.md
    QUESTIONS.md
    TEST_RESULTS.md
    MEDICATIONS.md
    SOURCE_MAP.md
  handoffs/
  maps/
```

## Context Efficiency Rules

- Keep timelines, symptoms, medications, test results, and questions separated.
- Mark source dates and professional confirmation status.
- Do not store sensitive health data unless the user explicitly chooses to do so.
- Keep `ai-context/AI_CONTEXT.md` focused on the current appointment, research question, or organization task.

## Safety Boundaries

- Treat generated health text as organization material only.
- Do not present AI-generated interpretations as medical advice.
- Do not infer diagnoses from symptoms or test results.
- Preserve clinician instructions separately from user notes and AI summaries.
- Recommend professional medical review for diagnosis, treatment, medication, emergency, or care decisions.

## Required Evidence

- Record dates, source type, clinician confirmation status, measurement units, and uncertainty.
- Preserve original clinical instructions separately from AI or user summaries.

## Common Failure Modes

- Treating symptom organization as diagnosis.
- Losing dates, units, or source identity during summarization.
- Retaining sensitive health data without explicit purpose and review.
