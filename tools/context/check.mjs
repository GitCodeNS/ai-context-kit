#!/usr/bin/env node
import { formatBytes, parseArgs } from "./lib/core.mjs";
import { runChecks } from "./lib/checks.mjs";

const args = parseArgs(process.argv.slice(2));
const result = runChecks(args.root);
if (args.json) process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
else {
  console.log(`Context health: ${result.ok ? "PASS" : "FAIL"}`);
  console.log(`Repository: ${result.repo}`);
  console.log(`Documents: ${result.metrics.documents}`);
  console.log(`AI context: ${formatBytes(result.metrics.ai_context_bytes)}`);
  console.log(`Startup packet: ${formatBytes(result.metrics.boot_packet_bytes)}`);
  console.log(`Active plans: ${result.metrics.active_plans}`);
  console.log(`Errors: ${result.metrics.errors}; warnings: ${result.metrics.warnings}`);
  for (const item of result.issues) console.log(`[${item.level.toUpperCase()}] ${item.code}: ${item.message}${item.file ? ` (${item.file})` : ""}`);
}
if (!result.ok || (args.strict && result.metrics.warnings > 0)) process.exitCode = 1;
