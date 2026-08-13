import fs from "node:fs";
import path from "node:path";
import {
  AUTHORITIES, STATUSES, TYPES, VISIBILITIES, collectMarkdown,
  extractContextReferences, extractMarkdownLinks, isManagedDocument, isSafeRelativePath, parseFrontmatter, safePath, slash,
} from "./core.mjs";

const REQUIRED_PATHS = [
  "AGENTS.md",
  "ai-context/AI_CONTEXT.md",
  "ai-context/CONTEXT_PLAN.md",
  "ai-context/CONTEXT_BUDGET.md",
  "ai-context/maps/RETRIEVAL_INDEX.md",
  "ai-context/maps/SOURCE_OF_TRUTH_MAP.md",
  "ai-context/maps/VALIDATION_MAP.md",
  "ai-context/plans/active/current-plan.md",
  "spec/CONTEXT_PROTOCOL.md",
  "spec/METADATA_SCHEMA.md",
  "spec/LIFECYCLE.md",
  "spec/PRECEDENCE.md",
  "spec/PRIVACY_AND_RETENTION.md",
];

const BOOT_PATHS = [
  "AGENTS.md",
  "ai-context/AI_CONTEXT.md",
  "ai-context/CONTEXT_BUDGET.md",
  "ai-context/maps/RETRIEVAL_INDEX.md",
  "ai-context/plans/active/current-plan.md",
];

const SECRET_PATTERN = /\b(?:sk-[A-Za-z0-9_-]{20,}|ghp_[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16})\b/g;

function redact(value) {
  return typeof value === "string" ? value.replace(SECRET_PATTERN, "[REDACTED]") : value;
}

function issue(level, code, message, file = null) {
  return { level, code, message: redact(message), file: redact(file) };
}

function exists(repoRoot, relativePath) {
  return fs.existsSync(safePath(repoRoot, relativePath));
}

function lineChecks(doc, issues) {
  doc.text.split(/\r?\n/).forEach((line, index) => {
    if (line.length > 4000) issues.push(issue("error", "line-too-long", `Line ${index + 1} exceeds 4000 characters`, doc.relativePath));
    else if (line.length > 1200) issues.push(issue("warning", "line-long", `Line ${index + 1} exceeds 1200 characters`, doc.relativePath));
  });
  if (!doc.relativePath.startsWith("ai-context/archive/") && SECRET_PATTERN.test(doc.text)) {
    issues.push(issue("error", "secret-pattern", "Potential credential pattern detected; value intentionally not printed", doc.relativePath));
  }
  SECRET_PATTERN.lastIndex = 0;
}

function checkExampleContracts(repoRoot, issues) {
  const required = {
    "examples/software-repo": [
      "ai-context/AI_CONTEXT.md", "ai-context/CONTEXT_PLAN.md", "ai-context/CONTEXT_BUDGET.md",
      "ai-context/domains/active-domain.md", "ai-context/maps/RETRIEVAL_INDEX.md",
    ],
    "examples/research-notes": [
      "ai-context/AI_CONTEXT.md", "ai-context/CONTEXT_PLAN.md", "ai-context/CONTEXT_BUDGET.md",
      "ai-context/domains/active-domain.md", "ai-context/maps/RETRIEVAL_INDEX.md",
      "ai-context/research/LITERATURE_MAP.md", "ai-context/research/SOURCES.md",
      "ai-context/research/CLAIMS_AND_EVIDENCE.md", "ai-context/research/OPEN_QUESTIONS.md",
    ],
  };
  for (const [fixture, paths] of Object.entries(required)) {
    for (const relativePath of paths) {
      const full = `${fixture}/${relativePath}`;
      if (!exists(repoRoot, full)) issues.push(issue("error", "fixture-missing", `Example contract path is missing: ${full}`, full));
    }
  }
  for (const filePath of ["examples/software-repo", "examples/research-notes"].flatMap((root) => {
    const full = path.join(repoRoot, ...root.split("/"));
    return fs.existsSync(full) ? collectMarkdown(full) : [];
  })) {
    if (/<[^>\n]+>/.test(filePath.text)) issues.push(issue("error", "fixture-placeholder", "Example contains unresolved angle-bracket placeholder", slash(path.relative(repoRoot, filePath.filePath))));
  }
}

export function runChecks(repoRoot) {
  const issues = [];
  for (const requiredPath of REQUIRED_PATHS) {
    if (!exists(repoRoot, requiredPath)) issues.push(issue("error", "required-path", `Missing required path: ${requiredPath}`, requiredPath));
  }

  const documents = collectMarkdown(repoRoot);
  const ids = new Map();
  for (const doc of documents) {
    lineChecks(doc, issues);
    if (doc.hasFrontmatter && doc.data.id) {
      if (ids.has(doc.data.id)) issues.push(issue("error", "duplicate-id", `Duplicate document id; first declaration is ${ids.get(doc.data.id)}`, doc.relativePath));
      else ids.set(doc.data.id, doc.relativePath);
    }
    if (isManagedDocument(doc)) {
      if (!doc.hasFrontmatter) {
        issues.push(issue("warning", "metadata-missing", "Managed document has no v2 frontmatter", doc.relativePath));
      } else {
        for (const key of ["context_version", "id", "type", "status", "authority", "visibility", "updated"]) {
          if (doc.data[key] === undefined || doc.data[key] === "") issues.push(issue("error", "metadata-required", `Missing frontmatter field '${key}'`, doc.relativePath));
        }
        const { id, type, status, authority, visibility, updated, related } = doc.data;
        if (doc.data.context_version !== 2) issues.push(issue("error", "context-version", "context_version must be 2", doc.relativePath));
        if (type && !TYPES.has(type)) issues.push(issue("error", "invalid-type", "Invalid type value", doc.relativePath));
        if (status && !STATUSES.has(status)) issues.push(issue("error", "invalid-status", "Invalid status value", doc.relativePath));
        if (authority && !AUTHORITIES.has(authority)) issues.push(issue("error", "invalid-authority", "Invalid authority value", doc.relativePath));
        if (visibility && !VISIBILITIES.has(visibility)) issues.push(issue("error", "invalid-visibility", "Invalid visibility value", doc.relativePath));
        if (updated && !/^\d{4}-\d{2}-\d{2}$/.test(String(updated))) issues.push(issue("error", "invalid-date", "Invalid updated date", doc.relativePath));
        if (related && !Array.isArray(related)) issues.push(issue("error", "related-shape", "related must be an array", doc.relativePath));
      }
    }

    const shouldCheckRefs = doc.relativePath !== "ai-context/maps/CONTEXT_INDEX.md" && doc.data.authority !== "derived" && (doc.relativePath === "PROTOCOL.md" || doc.relativePath.startsWith("ai-context/") || doc.relativePath.startsWith("spec/"));
    if (shouldCheckRefs && !doc.relativePath.startsWith("ai-context/archive/")) {
      for (const ref of extractContextReferences(doc.text)) {
        if (!isSafeRelativePath(ref)) issues.push(issue("error", "invalid-reference", "Context reference contains an invalid path segment", doc.relativePath));
        else if (!exists(repoRoot, ref)) issues.push(issue("error", "broken-ref", `Missing reference: ${ref}`, doc.relativePath));
      }
    }
    for (const link of extractMarkdownLinks(doc.text)) {
      const sourceDirectory = path.posix.dirname(doc.relativePath);
      const repositoryRelative = path.posix.normalize(path.posix.join(sourceDirectory, link));
      if (!isSafeRelativePath(repositoryRelative)) issues.push(issue("error", "invalid-markdown-link", "Relative Markdown link escapes the repository", doc.relativePath));
      else if (!exists(repoRoot, repositoryRelative)) issues.push(issue("error", "broken-markdown-link", `Missing Markdown link target: ${repositoryRelative}`, doc.relativePath));
    }
  }

  for (const doc of documents) {
    if (!doc.hasFrontmatter || !Array.isArray(doc.data.related)) continue;
    for (const relatedId of doc.data.related) {
      if (!ids.has(relatedId)) issues.push(issue("error", "broken-related-id", "Related document ID does not resolve", doc.relativePath));
    }
  }

  const activePlans = documents.filter((doc) => doc.data.type === "plan" && doc.data.status === "active" && doc.relativePath.startsWith("ai-context/"));
  if (activePlans.length !== 1) issues.push(issue("error", "active-plan-count", `Expected exactly one internal active plan, found ${activePlans.length}`));

  const agentBytes = exists(repoRoot, "AGENTS.md") ? fs.statSync(path.join(repoRoot, "AGENTS.md")).size : 0;
  if (agentBytes > 4096) issues.push(issue("error", "agents-budget", `AGENTS.md exceeds 4 KiB (${agentBytes} bytes)`, "AGENTS.md"));
  else if (agentBytes > 2048) issues.push(issue("warning", "agents-budget", `AGENTS.md exceeds 2 KiB warning level (${agentBytes} bytes)`, "AGENTS.md"));

  const aiPath = path.join(repoRoot, "ai-context", "AI_CONTEXT.md");
  const aiBytes = fs.existsSync(aiPath) ? fs.statSync(aiPath).size : 0;
  if (aiBytes > 12 * 1024) issues.push(issue("error", "ai-context-budget", `AI_CONTEXT.md exceeds 12 KiB (${aiBytes} bytes)`, "ai-context/AI_CONTEXT.md"));
  else if (aiBytes > 6 * 1024) issues.push(issue("warning", "ai-context-budget", `AI_CONTEXT.md exceeds 6 KiB warning level (${aiBytes} bytes)`, "ai-context/AI_CONTEXT.md"));

  let bootBytes = 0;
  for (const bootPath of BOOT_PATHS) if (exists(repoRoot, bootPath)) bootBytes += fs.statSync(path.join(repoRoot, ...bootPath.split("/"))).size;
  if (bootBytes > 32 * 1024) issues.push(issue("error", "boot-budget", `Startup packet exceeds 32 KiB (${bootBytes} bytes)`));
  else if (bootBytes > 24 * 1024) issues.push(issue("warning", "boot-budget", `Startup packet exceeds 24 KiB warning level (${bootBytes} bytes)`));

  checkExampleContracts(repoRoot, issues);

  const errors = issues.filter((item) => item.level === "error");
  const warnings = issues.filter((item) => item.level === "warning");
  return {
    repo: slash(path.resolve(repoRoot)),
    ok: errors.length === 0,
    metrics: { documents: documents.length, ai_context_bytes: aiBytes, boot_packet_bytes: bootBytes, active_plans: activePlans.length, errors: errors.length, warnings: warnings.length },
    issues,
  };
}
