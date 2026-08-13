#!/usr/bin/env node
import { formatBytes, parseArgs } from "./lib/core.mjs";
import { runChecks } from "./lib/checks.mjs";

const args = parseArgs(process.argv.slice(2));
const result = runChecks(args.root);
console.log(`Context health: ${result.ok ? "PASS" : "FAIL"}`);
console.log(`AI context: ${formatBytes(result.metrics.ai_context_bytes)}`);
console.log(`Startup packet: ${formatBytes(result.metrics.boot_packet_bytes)}`);
console.log(`Active plans: ${result.metrics.active_plans}`);
console.log(`Errors: ${result.metrics.errors}`);
console.log(`Warnings: ${result.metrics.warnings}`);
