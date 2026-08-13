# Contributing

AIContextKit is in early design. Contributions should keep the project practical, portable, and easy for both users and AI assistants to follow.

## Contribution Principles

- Bind examples to real work objects, not abstract protocol exercises.
- Prefer small, layered files over large all-purpose documents.
- Keep templates short enough to copy into real projects.
- Separate facts, assumptions, decisions, and open questions.
- Make domain documents concrete about evidence, risks, and failure modes.
- Avoid vendor-specific requirements unless clearly marked as optional.

## Useful Contribution Areas

- clearer protocol wording,
- domain document improvements,
- practical examples,
- template refinements,
- memory hygiene patterns,
- handoff and validation examples.

## Style

- Use plain Markdown.
- Prefer concise sections and actionable bullet points.
- Keep examples realistic but small.
- Do not include raw chat transcripts unless the example specifically teaches compression.
- Do not store sensitive personal, medical, legal, or client information in examples.

## Reviewing Changes

Before proposing a change, check:

- Can a new AI assistant act after reading the relevant file?
- Can a user inspect and edit the memory easily?
- Is the durable memory close to the real work object?
- Does the change avoid turning the protocol into one giant file?

Before submitting a change, run:

```powershell
npm test
npm run context:sync
npm run context:index:check
npm run context:check
git diff --check
```

Public examples must contain synthetic data, templates must not contain repository-local state, and adapters must not become sources of truth.
