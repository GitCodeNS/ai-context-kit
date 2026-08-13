# Platform Adapters

Adapters make a host discover the same canonical AIContextKit startup packet. They are optional and must not own project facts.

- `codex/`: root `AGENTS.md` routing.
- `claude/`: root `CLAUDE.md` routing.
- `cursor/`: project rule routing.
- `generic/`: manual new-session prompt.

Copy only the adapter needed by the target project. Keep mutable state in `ai-context/`, not in the adapter.
