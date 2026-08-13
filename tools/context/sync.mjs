#!/usr/bin/env node
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { parseArgs } from "./lib/core.mjs";

const args = parseArgs(process.argv.slice(2));
const trustedIndexScript = fileURLToPath(new URL("./index.mjs", import.meta.url));
execFileSync(process.execPath, [trustedIndexScript, "--root", path.resolve(args.root)], { stdio: "inherit" });
console.log("Context derived views are synchronized.");
