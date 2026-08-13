# Safety And Scope

AIContextKit is an experimental documentation kit for AI context management. It is provided for learning, research, and experimentation.

It helps users and AI assistants organize project memory, reading maps, handoffs, decisions, and evidence trails. It does not provide professional advice, automated validation, legal compliance, medical guidance, financial advice, guaranteed correctness, or guaranteed improvement in AI assistant performance.

Users are responsible for reviewing, adapting, validating, and maintaining any files or workflows created from AIContextKit.

## High-Risk Domains

Some domains are high risk, especially:

- legal and compliance,
- medical and health,
- finance and investment,
- safety-critical engineering,
- cybersecurity operations,
- regulated business processes.

AIContextKit may include domain documents for high-risk areas, but those documents are for context organization only.

They should help the user organize:

- facts,
- sources,
- timelines,
- open questions,
- professional instructions,
- evidence maps,
- reviewed documents,
- uncertainty and risk markers.

They should not be used to generate or preserve:

- legal advice,
- medical advice,
- diagnoses,
- treatment plans,
- financial recommendations,
- compliance guarantees,
- safety-critical instructions,
- unsupported conclusions.

## Recommended Project Policy

For the first public version:

- Keep high-risk domain documents visible, but clearly marked.
- Do not hide them silently.
- Do not present them as expert systems.
- Do not include high-risk examples in the first release.
- Require professional review language inside high-risk domain documents.
- Keep sensitive data out of examples.
- Encourage users to store only the minimum needed context.

## AI Behavior In High-Risk Domains

When an AI assistant uses a high-risk domain document, it should:

- state that the document is for organization only,
- ask the user what real work object is being organized,
- separate facts, sources, questions, and conclusions,
- mark uncertainty clearly,
- avoid unsupported claims,
- recommend qualified professional review where appropriate,
- avoid storing sensitive data unless the user explicitly chooses to do so,
- never treat generated text as professional advice.

## Repository Disclaimer

AIContextKit is provided as-is as an experimental open-source learning project. The project maintainers do not assume responsibility for outcomes, losses, decisions, or errors resulting from its use. Users are responsible for reviewing, adapting, and validating any context files created from it.

The project should keep this scope visible in:

- `README.md`,
- high-risk domain documents,
- `docs/RELEASE_CRITERIA.md`,
- examples and templates where relevant.
