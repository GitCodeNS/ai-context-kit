import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { extractContextReferences, extractMarkdownLinks, isInsideRoot, parseFrontmatter, safePath } from "../lib/core.mjs";

test("parseFrontmatter reads required scalars and related IDs", () => {
  const parsed = parseFrontmatter(`---
context_version: 2
id: TEST-001
type: plan
status: active
authority: canonical
visibility: internal
updated: 2026-08-12
related: [TEST-002]
---
# Test
`);
  assert.equal(parsed.hasFrontmatter, true);
  assert.equal(parsed.data.context_version, 2);
  assert.equal(parsed.data.id, "TEST-001");
  assert.deepEqual(parsed.data.related, ["TEST-002"]);
});

test("reference extraction returns unique context and specification paths", () => {
  assert.deepEqual(extractContextReferences("Read `ai-context/AI_CONTEXT.md` and spec/LIFECYCLE.md."), ["ai-context/AI_CONTEXT.md", "spec/LIFECYCLE.md"]);
});

test("Markdown link extraction ignores external URLs and keeps relative targets", () => {
  assert.deepEqual(extractMarkdownLinks("[local](../README.md) [web](https://example.com)"), ["../README.md"]);
});

test("path guard rejects traversal outside project root", () => {
  const root = path.resolve("fixture-root");
  assert.equal(isInsideRoot(root, path.join(root, "ai-context")), true);
  assert.throws(() => safePath(root, "../outside"), /Invalid project-relative path|escapes project root/);
});
