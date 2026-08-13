#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { parseArgs, resolveProjectRoot, safePath } from "./lib/core.mjs";

const args = parseArgs(process.argv.slice(2));
const root = resolveProjectRoot(args.root);
const proposed = [
  "ai-context/AI_CONTEXT.md", "ai-context/CONTEXT_PLAN.md", "ai-context/CONTEXT_BUDGET.md",
  "ai-context/maps/RETRIEVAL_INDEX.md", "ai-context/decisions", "ai-context/handoffs",
];
const existing = proposed.filter((item) => fs.existsSync(safePath(root, item)));
console.log(`Mode: ${args.apply ? "apply" : "dry-run"}`);
console.log(`Project root: ${root}`);
console.log(`Existing protected paths: ${existing.length ? existing.join(", ") : "none"}`);
console.log("Proposed paths:");
for (const item of proposed) console.log(`- ${item}${existing.includes(item) ? " (preserve)" : " (create)"}`);
if (!args.apply) {
  console.log("No files changed. Re-run with --apply after reviewing the plan.");
} else {
  throw new Error("Automatic apply is intentionally disabled; create the reviewed directories with your normal project file-editing workflow");
}
