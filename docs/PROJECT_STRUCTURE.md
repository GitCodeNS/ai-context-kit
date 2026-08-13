# Project Structure

```text
AIContextKit/
  AGENTS.md                 # this repository's Codex entry
  README.md
  PROTOCOL.md               # approachable universal guide
  spec/                     # normative Context Protocol v2
  domains/                  # public domain extensions
  templates/                # copyable starting files
  adapters/                 # optional host routing files
  examples/                 # complete examples and fixtures
  tools/context/            # optional zero-dependency tools
  docs/                     # rationale, workflow, compatibility, release
  ai-context/               # this repository's own working context
```

## Public And Internal Boundaries

- `spec/` owns normative contracts.
- `PROTOCOL.md` and `README.md` explain those contracts to users and assistants.
- `domains/` extends the core without changing universal invariants.
- `templates/` are reusable shapes and must not contain repository-local state.
- `adapters/` improve host discovery but never own project facts.
- `examples/` demonstrate and test behavior; they are not normative.
- `tools/context/` is optional assurance tooling.
- `ai-context/` controls this repository's own current work and is not a copy template.

## Recommended User Project Shapes

Level 0 may use only a short `ai-context/AI_CONTEXT.md`. Level 1 adds a plan, budget, retrieval index, and optional host entry. Levels 2 and 3 add metadata, source-of-truth, lifecycle, validation maps, and automated checks only when their scale justifies them.

Existing context is preserved by default. Use a repair plan and migration map before any rename, move, archive, or replacement.
