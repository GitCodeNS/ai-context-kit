# Reference Scan

This document summarizes nearby ideas and what AIContextKit can learn from them.

The goal is not to clone another project. The goal is to understand the existing design space and keep AIContextKit focused on its own value: efficient, file-based, low-coupling context management that can be adapted to real user work.

## Cline Memory Bank

Reference:
- `https://docs.cline.bot/features/memory-bank`

Observed idea:
- Uses regular Markdown files in a project.
- Separates project brief, product context, active context, system patterns, tech context, and progress.
- Explicitly addresses context-window pressure and recommends keeping starting context lean.

Useful lessons:
- A small set of named files helps AI resume work.
- Current state should be separated from architecture and long-term project facts.
- Context files must stay concise; otherwise they become part of the context problem.

AIContextKit direction:
- Keep `ai-context/AI_CONTEXT.md` short and current.
- Keep deeper maps, decisions, and evidence files separate.
- Avoid forcing every domain into the same software-project memory-bank shape.

## agentmemory

Reference:
- `https://github.com/rohitg00/agentmemory`

Observed idea:
- Runs as a persistent memory server for coding agents.
- Supports MCP and REST integrations across many agent hosts.
- Captures agent activity, compresses observations, and retrieves relevant memories later.
- Uses multiple retrieval signals such as keyword, vector, and graph search.
- Tracks provenance, memory lifecycle, snapshots, and deletion/audit operations.
- Emphasizes token savings by retrieving only relevant memories instead of pasting full context.

Useful lessons:
- Passive files alone are not enough when the agent keeps reading too much.
- A useful memory system needs an operating loop: capture, compress, index, retrieve, inject, prune.
- Retrieval must be selective. The assistant should not reload the whole project memory folder.
- Provenance matters: memory should point back to source files, decisions, sessions, or evidence.
- Deletion and stale-memory handling need explicit policy.

AIContextKit direction:
- Stay tool-free and file-based for the first version, but adopt the same lifecycle idea manually.
- Add templates for context budget and retrieval index.
- Make software-development sessions start with a read budget and a read list.
- Require the AI to update indexed memory instead of dumping long summaries.
- Treat future MCP/CLI automation as a later layer, not the first public release.

## Claude Code Memory

Reference:
- `https://code.claude.com/docs/en/memory`
- `https://docs.claude.com/en/docs/claude-code/memory`

Observed idea:
- Combines persistent project instructions with auto memory.
- Keeps memory in editable Markdown files.
- Uses a concise index/entry file and reads deeper topic files on demand.
- Warns that vague or conflicting instructions reduce reliability.

Useful lessons:
- An entry file should route to deeper files instead of duplicating everything.
- Human-auditable Markdown is a strong default.
- Conflicting memory files are a real failure mode.

AIContextKit direction:
- Use `AI_CONTEXT.md` as a router, not a full history.
- Make low coupling and single responsibility explicit.
- Keep user-visible memory editable and cleanable.

## Cursor Rules

Reference:
- `https://cursor.com/docs/rules`

Observed idea:
- Project rules live in a project-scoped folder.
- Rules can be scoped and attached based on relevance.
- Persistent instructions are injected into the model context.

Useful lessons:
- Context should be scoped.
- Not every rule should be loaded all the time.
- Relevance-based loading is an important design direction.

AIContextKit direction:
- Keep domain documents independent.
- Encourage reading only the domain document and project files needed for the active task.
- Future versions could define optional trigger rules for maps or decision files.

## Repomix

Reference:
- `https://repomix.com/guide/`

Observed idea:
- Packs a whole repository into an AI-friendly file.
- Tracks token usage and respects ignore files.
- Useful when a broad whole-repo snapshot is actually needed.

Useful lessons:
- Token visibility matters.
- Ignore rules matter.
- Full-context packing is useful for review, but risky as a default workflow.

AIContextKit direction:
- Do not encourage loading the whole project before work starts.
- Treat whole-repo packing as an optional special mode, not the normal path.
- Consider future guidance for "snapshot mode" versus "active task mode."

## llms.txt

Reference:
- `https://llmtxt.info/`

Observed idea:
- Provides a curated, AI-readable map for a website.
- Treats the file as a stable machine-readable contract controlled by the project owner.
- Emphasizes discoverability and validation.

Useful lessons:
- A small routing file can be more useful than a giant dump.
- Public examples, templates, and validation are important for adoption.

AIContextKit direction:
- `domains/*.md` should work like curated entry documents.
- `ai-context/AI_CONTEXT.md` should route AI assistants to the right deeper material.
- Context Protocol v2 now includes optional validator and index scripts while preserving the tool-free core.

## AGENTS.md Research

References:
- `https://arxiv.org/abs/2602.11988`
- `https://arxiv.org/abs/2601.20404`

Observed idea:
- Repository-level context files can influence coding-agent behavior.
- Findings are mixed: one study reports reduced task success and higher inference cost when context files add unnecessary requirements; another reports lower runtime and reduced output tokens in the studied setup.

Useful lessons:
- Context files are powerful, but can harm performance if they are too broad, vague, or burdensome.
- Minimal, actionable requirements matter.
- Efficiency should be measured by context use, runtime, and task success, not just "more memory."

AIContextKit direction:
- Keep documents short, scoped, and operational.
- Avoid adding requirements that do not directly help the active work.
- Treat context management as performance architecture.

## mem0 And Letta

References:
- `https://github.com/mem0ai/mem0`
- `https://github.com/letta-ai/letta`

Observed idea:
- These projects treat memory as a runtime layer, not just static files.
- They support APIs, SDKs, memory blocks, retrieval, and long-term agent state.
- They are closer to infrastructure than a copyable project protocol.

Useful lessons:
- Long-term memory needs retrieval, not just storage.
- Memory entries should be small, typed, and queryable.
- Runtime memory systems are powerful, but they add dependencies and operational complexity.

AIContextKit direction:
- Do not compete as a memory engine in v1.
- Focus on the lightweight, file-based, no-server workflow.
- Borrow the idea of small typed memories through Markdown sections and indexes.
- Leave automation hooks, search, and MCP integrations as future work.

## Design Takeaways

AIContextKit should:

- stay file-based and Markdown-friendly,
- keep one short active context router,
- separate current state, decisions, maps, evidence, and handoffs,
- add a manual memory lifecycle: capture, compress, index, retrieve, prune,
- avoid loading everything by default,
- make context budget visible,
- require selective retrieval before file reads,
- keep domain documents independently useful,
- offer examples that show efficient context layout,
- provide optional validation without making tools a prerequisite for basic use.

AIContextKit should avoid:

- one giant memory file,
- all-project scanning as the default,
- tightly coupling protocol, domains, templates, and examples,
- vague instructions that inflate context without improving behavior,
- hiding memory from the user.
