import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { runChecks } from "../lib/checks.mjs";
import { collectMarkdown, safePath, walkFiles } from "../lib/core.mjs";

function frontmatter(id, type, options = {}) {
  return `---
context_version: 2
id: ${id}
type: ${type}
status: ${options.status || "active"}
authority: ${options.authority || "canonical"}
visibility: ${options.visibility || "internal"}
updated: 2026-08-12
---

# ${id}
`;
}

function write(root, relativePath, text) {
  const fullPath = path.join(root, ...relativePath.split("/"));
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, text, "utf8");
}

function createValidFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "aick-fixture-"));
  write(root, "AGENTS.md", "# Fixture instructions\n");
  const managed = [
    ["ai-context/AI_CONTEXT.md", "FIX-BOOT", "profile"],
    ["ai-context/CONTEXT_PLAN.md", "FIX-CONTEXT", "policy"],
    ["ai-context/CONTEXT_BUDGET.md", "FIX-BUDGET", "policy"],
    ["ai-context/maps/RETRIEVAL_INDEX.md", "FIX-RETRIEVAL", "map"],
    ["ai-context/maps/SOURCE_OF_TRUTH_MAP.md", "FIX-SOT", "map"],
    ["ai-context/maps/VALIDATION_MAP.md", "FIX-VALIDATION", "map"],
    ["ai-context/plans/active/current-plan.md", "FIX-PLAN", "plan"],
    ["spec/CONTEXT_PROTOCOL.md", "FIX-SPEC", "specification"],
    ["spec/METADATA_SCHEMA.md", "FIX-META", "specification"],
    ["spec/LIFECYCLE.md", "FIX-LIFECYCLE", "specification"],
    ["spec/PRECEDENCE.md", "FIX-PRECEDENCE", "specification"],
    ["spec/PRIVACY_AND_RETENTION.md", "FIX-PRIVACY", "specification"],
  ];
  for (const [relativePath, id, type] of managed) write(root, relativePath, frontmatter(id, type));
  const examplePaths = [
    "examples/software-repo/ai-context/AI_CONTEXT.md",
    "examples/software-repo/ai-context/CONTEXT_PLAN.md",
    "examples/software-repo/ai-context/CONTEXT_BUDGET.md",
    "examples/software-repo/ai-context/domains/active-domain.md",
    "examples/software-repo/ai-context/maps/RETRIEVAL_INDEX.md",
    "examples/research-notes/ai-context/AI_CONTEXT.md",
    "examples/research-notes/ai-context/CONTEXT_PLAN.md",
    "examples/research-notes/ai-context/CONTEXT_BUDGET.md",
    "examples/research-notes/ai-context/domains/active-domain.md",
    "examples/research-notes/ai-context/maps/RETRIEVAL_INDEX.md",
    "examples/research-notes/ai-context/research/LITERATURE_MAP.md",
    "examples/research-notes/ai-context/research/SOURCES.md",
    "examples/research-notes/ai-context/research/CLAIMS_AND_EVIDENCE.md",
    "examples/research-notes/ai-context/research/OPEN_QUESTIONS.md",
  ];
  examplePaths.forEach((relativePath, index) => write(root, relativePath, frontmatter(`FIX-EX-${index}`, "example", { authority: "reference", visibility: "public" })));
  return root;
}

test("a complete managed fixture passes strict contract checks", () => {
  const root = createValidFixture();
  try {
    const result = runChecks(root);
    assert.equal(result.metrics.errors, 0);
    assert.equal(result.metrics.warnings, 0);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("multiple active plans and oversized bootstrap are rejected", () => {
  const root = createValidFixture();
  try {
    write(root, "ai-context/plans/active/second.md", frontmatter("FIX-PLAN-2", "plan"));
    write(root, "ai-context/AI_CONTEXT.md", `${frontmatter("FIX-BOOT", "profile")}\n${"x".repeat(13 * 1024)}`);
    const codes = runChecks(root).issues.map((item) => item.code);
    assert.ok(codes.includes("active-plan-count"));
    assert.ok(codes.includes("ai-context-budget"));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("unresolved example placeholders and credential patterns are rejected without echoing values", () => {
  const root = createValidFixture();
  try {
    write(root, "examples/software-repo/ai-context/AI_CONTEXT.md", `${frontmatter("FIX-EX-0", "example", { authority: "reference", visibility: "public" })}\n<TODO>`);
    write(root, "ai-context/AI_CONTEXT.md", `${frontmatter("FIX-BOOT", "profile")}\ncredential: sk-abcdefghijklmnopqrstuvwxyz123456`);
    const result = runChecks(root);
    assert.ok(result.issues.some((item) => item.code === "fixture-placeholder"));
    assert.ok(result.issues.some((item) => item.code === "secret-pattern"));
    assert.equal(JSON.stringify(result).includes("abcdefghijklmnopqrstuvwxyz123456"), false);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("invalid references are rejected without probing outside the root", () => {
  const root = createValidFixture();
  try {
    fs.appendFileSync(path.join(root, "ai-context", "AI_CONTEXT.md"), "\nRead `ai-context/../../outside-probe`.\n", "utf8");
    const result = runChecks(root);
    assert.ok(result.issues.some((item) => item.code === "invalid-reference"));
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("discovery enforces a caller-selected file-count limit", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "aick-limit-"));
  try {
    write(root, "one.md", "# One\n");
    write(root, "two.md", "# Two\n");
    assert.throws(() => walkFiles(root, { maxFiles: 1 }), /file count exceeds limit/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("discovery bounds total directory entries including directories", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "aick-entries-"));
  try {
    fs.mkdirSync(path.join(root, "one"));
    fs.mkdirSync(path.join(root, "two"));
    assert.throws(() => walkFiles(root, { maxEntries: 1 }), /entry count exceeds limit/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("Markdown collection rejects oversized files before reading them", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "aick-size-"));
  try {
    const largePath = path.join(root, "large.md");
    fs.writeFileSync(largePath, "x", "utf8");
    fs.truncateSync(largePath, 2 * 1024 * 1024 + 1);
    assert.throws(() => collectMarkdown(root), /per-file limit/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("safePath rejects linked path components when the platform permits links", (t) => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "aick-link-root-"));
  const outside = fs.mkdtempSync(path.join(os.tmpdir(), "aick-link-outside-"));
  try {
    try {
      fs.symlinkSync(outside, path.join(root, "linked"), process.platform === "win32" ? "junction" : "dir");
    } catch (error) {
      if (["EPERM", "EACCES", "ENOSYS"].includes(error.code)) return t.skip("Platform does not permit link creation");
      throw error;
    }
    assert.throws(() => safePath(root, "linked/output.md"), /Symbolic link|junction/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
    fs.rmSync(outside, { recursive: true, force: true });
  }
});

test("index refuses to replace an unmarked existing file", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "aick-index-"));
  const indexScript = fileURLToPath(new URL("../index.mjs", import.meta.url));
  try {
    write(root, "ai-context/maps/CONTEXT_INDEX.md", "# User-owned content\n");
    assert.throws(() => execFileSync(process.execPath, [indexScript, "--root", root], { stdio: "pipe" }), /status 1|Command failed/);
    assert.equal(fs.readFileSync(path.join(root, "ai-context/maps/CONTEXT_INDEX.md"), "utf8"), "# User-owned content\n");
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("index rejects an oversized existing generated index before reading it", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "aick-index-size-"));
  const indexScript = fileURLToPath(new URL("../index.mjs", import.meta.url));
  try {
    const output = path.join(root, "ai-context/maps/CONTEXT_INDEX.md");
    write(root, "ai-context/maps/CONTEXT_INDEX.md", "<!-- generated by tools/context/index.mjs; do not edit manually -->\n");
    fs.truncateSync(output, 2 * 1024 * 1024 + 1);
    assert.throws(() => execFileSync(process.execPath, [indexScript, "--root", root], { stdio: "pipe" }), /status 1|Command failed/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("sync executes its installed index implementation rather than project code", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "aick-sync-"));
  const syncScript = fileURLToPath(new URL("../sync.mjs", import.meta.url));
  try {
    write(root, "tools/context/index.mjs", "import fs from 'node:fs'; fs.writeFileSync('ATTACKER_CODE_RAN', 'yes');\n");
    write(root, "ai-context/maps/CONTEXT_INDEX.md", "<!-- generated by tools/context/index.mjs; do not edit manually -->\n");
    execFileSync(process.execPath, [syncScript, "--root", root], { cwd: root, stdio: "pipe" });
    assert.equal(fs.existsSync(path.join(root, "ATTACKER_CODE_RAN")), false);
    assert.equal(fs.existsSync(path.join(root, "ai-context/maps/CONTEXT_INDEX.md")), true);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
