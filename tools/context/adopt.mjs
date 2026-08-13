#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { parseArgs, resolveProjectRoot, safePath } from "./lib/core.mjs";

const args = parseArgs(process.argv.slice(2));
const root = resolveProjectRoot(args.root);
const candidates = ["ai-context", ".ai-context", "AGENTS.md", "CLAUDE.md", ".cursor/rules", ".windsurf/rules", "memory-bank", "docs/handoff", "docs/handoffs"];
const found = candidates.filter((item) => fs.existsSync(safePath(root, item)));
const recommended = ["ai-context/AI_CONTEXT.md", "ai-context/CONTEXT_BUDGET.md", "ai-context/maps/RETRIEVAL_INDEX.md"];
console.log("AIContextKit adoption analysis (read-only)");
console.log(`Project root: ${root}`);
console.log(`Existing context entries: ${found.length ? found.join(", ") : "none"}`);
console.log("Preserve: every existing context entry until the user approves a migration map.");
console.log(`Consider adding if useful: ${recommended.filter((item) => !fs.existsSync(safePath(root, item))).join(", ") || "none"}`);
console.log("No files changed. Adoption writes require an explicit repair plan and separate implementation step.");
