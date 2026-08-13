# Compatibility

AIContextKit's Markdown core is vendor-neutral. Adapters improve automatic discovery but do not change the canonical context model.

| Host | Adapter | Discovery mode | Canonical state |
| --- | --- | --- | --- |
| Codex | `adapters/codex/AGENTS.md.template` | Automatic project instructions | `ai-context/` |
| Claude Code | `adapters/claude/CLAUDE.md.template` | Automatic project instructions | `ai-context/` |
| Cursor | `adapters/cursor/aicontextkit.mdc.template` | Project rule | `ai-context/` |
| Other assistants | `adapters/generic/NEW_SESSION_PROMPT.md` | Manual prompt | `ai-context/` |

Host instruction precedence remains controlled by the host. AIContextKit governs project fact ownership after host instructions are resolved.
