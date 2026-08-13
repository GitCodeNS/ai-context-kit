import fs from "node:fs";
import path from "node:path";

export const TYPES = new Set([
  "profile", "policy", "plan", "decision", "map", "report", "handoff",
  "domain", "template", "example", "specification", "repair_plan", "archive", "index",
]);
export const STATUSES = new Set([
  "active", "proposed", "accepted", "blocked", "completed", "rejected", "superseded", "archived",
]);
export const AUTHORITIES = new Set(["canonical", "derived", "reference"]);
export const VISIBILITIES = new Set(["public", "internal", "sensitive"]);
export const DISCOVERY_LIMITS = Object.freeze({
  maxDepth: 64,
  maxFiles: 10000,
  maxEntries: 20000,
  maxEntriesPerDirectory: 5000,
  maxMarkdownFiles: 2000,
  maxFileBytes: 2 * 1024 * 1024,
  maxTotalMarkdownBytes: 32 * 1024 * 1024,
});

export function slash(value) {
  return value.split(path.sep).join("/");
}

export function parseArgs(argv) {
  const args = { root: process.cwd(), json: false, strict: false, check: false, apply: false };
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--root") args.root = path.resolve(argv[++index]);
    else if (value === "--json") args.json = true;
    else if (value === "--strict") args.strict = true;
    else if (value === "--check") args.check = true;
    else if (value === "--apply") args.apply = true;
  }
  return args;
}

export function isInsideRoot(root, candidate) {
  const resolvedRoot = path.resolve(root);
  const resolvedCandidate = path.resolve(candidate);
  const relative = path.relative(resolvedRoot, resolvedCandidate);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

export function resolveProjectRoot(root) {
  const resolved = path.resolve(root);
  if (!fs.existsSync(resolved)) throw new Error(`Project root does not exist: ${resolved}`);
  const stat = fs.lstatSync(resolved);
  if (stat.isSymbolicLink()) throw new Error("Project root must not be a symbolic link or junction");
  if (!stat.isDirectory()) throw new Error(`Project root is not a directory: ${resolved}`);
  return fs.realpathSync.native(resolved);
}

export function isSafeRelativePath(relativePath) {
  if (typeof relativePath !== "string" || !relativePath || path.isAbsolute(relativePath)) return false;
  const normalized = relativePath.replace(/\\/g, "/").replace(/\/+$/, "");
  if (!normalized) return false;
  const segments = normalized.split("/");
  return segments.every((segment) => segment && segment !== "." && segment !== "..");
}

export function safePath(root, relativePath) {
  if (!isSafeRelativePath(relativePath)) throw new Error("Invalid project-relative path");
  const realRoot = resolveProjectRoot(root);
  const candidate = path.resolve(realRoot, relativePath);
  if (!isInsideRoot(realRoot, candidate)) throw new Error("Path escapes project root");
  let current = realRoot;
  for (const segment of path.relative(realRoot, candidate).split(path.sep).filter(Boolean)) {
    current = path.join(current, segment);
    if (!fs.existsSync(current)) break;
    const stat = fs.lstatSync(current);
    if (stat.isSymbolicLink()) throw new Error("Symbolic link or junction is not allowed");
    const realCurrent = fs.realpathSync.native(current);
    if (!isInsideRoot(realRoot, realCurrent)) throw new Error("Resolved path escapes project root");
  }
  return candidate;
}

export function walkFiles(rootDir, options = {}) {
  if (!fs.existsSync(rootDir)) return [];
  const ignored = new Set(options.ignored || [".git", "node_modules", "dist", "build", "coverage"]);
  const maxDepth = options.maxDepth ?? DISCOVERY_LIMITS.maxDepth;
  const maxFiles = options.maxFiles ?? DISCOVERY_LIMITS.maxFiles;
  const maxEntries = options.maxEntries ?? DISCOVERY_LIMITS.maxEntries;
  const maxEntriesPerDirectory = options.maxEntriesPerDirectory ?? DISCOVERY_LIMITS.maxEntriesPerDirectory;
  const realRoot = resolveProjectRoot(rootDir);
  const result = [];
  const stack = [{ directory: realRoot, depth: 0 }];
  let entryCount = 0;
  while (stack.length) {
    const { directory, depth } = stack.pop();
    if (depth > maxDepth) throw new Error(`Discovery depth exceeds limit (${maxDepth})`);
    let directoryEntries = 0;
    const handle = fs.opendirSync(directory);
    try {
      let entry;
      while ((entry = handle.readSync()) !== null) {
        entryCount += 1;
        directoryEntries += 1;
        if (entryCount > maxEntries) throw new Error(`Discovery entry count exceeds limit (${maxEntries})`);
        if (directoryEntries > maxEntriesPerDirectory) throw new Error(`Directory entry count exceeds limit (${maxEntriesPerDirectory})`);
        if (entry.isDirectory() && ignored.has(entry.name)) continue;
        const fullPath = path.join(directory, entry.name);
        if (entry.isSymbolicLink()) continue;
        if (entry.isDirectory()) stack.push({ directory: fullPath, depth: depth + 1 });
        else if (entry.isFile()) {
          result.push(fullPath);
          if (result.length > maxFiles) throw new Error(`Discovery file count exceeds limit (${maxFiles})`);
        }
      }
    } finally {
      handle.closeSync();
    }
  }
  return result.sort();
}

function sameFile(left, right) {
  return left.dev === right.dev && left.ino === right.ino;
}

export function readRegularFileBounded(root, filePath, maxBytes) {
  const realRoot = resolveProjectRoot(root);
  const descriptor = fs.openSync(filePath, "r");
  try {
    const openedStat = fs.fstatSync(descriptor);
    if (!openedStat.isFile()) throw new Error("Input must be a regular file");
    if (openedStat.size > maxBytes) throw new Error(`Input exceeds per-file limit (${maxBytes} bytes)`);
    const realFile = fs.realpathSync.native(filePath);
    if (!isInsideRoot(realRoot, realFile)) throw new Error("Input resolves outside project root");
    if (!sameFile(openedStat, fs.statSync(realFile))) throw new Error("Input changed during validation");
    return readDescriptorBounded(descriptor, maxBytes);
  } finally {
    fs.closeSync(descriptor);
  }
}

export function readDescriptorBounded(descriptor, maxBytes) {
  const stat = fs.fstatSync(descriptor);
  if (stat.size > maxBytes) throw new Error(`Input exceeds per-file limit (${maxBytes} bytes)`);
  const buffer = Buffer.alloc(Math.min(maxBytes + 1, stat.size + 1));
  let offset = 0;
  while (offset < buffer.length) {
    const read = fs.readSync(descriptor, buffer, offset, buffer.length - offset, offset);
    if (read === 0) break;
    offset += read;
  }
  if (offset > maxBytes) throw new Error(`Input exceeds per-file limit (${maxBytes} bytes)`);
  return buffer.subarray(0, offset).toString("utf8");
}

function parseScalar(value) {
  const trimmed = value.trim();
  if (trimmed === "[]") return [];
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed.slice(1, -1).split(",").map((item) => item.trim().replace(/^['\"]|['\"]$/g, "")).filter(Boolean);
  }
  if (/^\d+$/.test(trimmed)) return Number.parseInt(trimmed, 10);
  return trimmed.replace(/^['\"]|['\"]$/g, "");
}

export function parseFrontmatter(text) {
  const normalized = text.replace(/^\uFEFF/, "");
  if (!normalized.startsWith("---\n") && !normalized.startsWith("---\r\n")) {
    return { data: {}, body: normalized, hasFrontmatter: false };
  }
  const lines = normalized.split(/\r?\n/);
  const end = lines.indexOf("---", 1);
  if (end < 0) return { data: {}, body: normalized, hasFrontmatter: false };
  const data = {};
  let arrayKey = null;
  for (const line of lines.slice(1, end)) {
    const listMatch = line.match(/^\s+-\s+(.+)$/);
    if (listMatch && arrayKey) {
      data[arrayKey].push(parseScalar(listMatch[1]));
      continue;
    }
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;
    const [, key, rawValue] = match;
    if (!rawValue.trim()) {
      data[key] = [];
      arrayKey = key;
    } else {
      data[key] = parseScalar(rawValue);
      arrayKey = null;
    }
  }
  return { data, body: lines.slice(end + 1).join("\n"), hasFrontmatter: true };
}

export function collectMarkdown(repoRoot) {
  const realRoot = resolveProjectRoot(repoRoot);
  const markdownFiles = walkFiles(realRoot).filter((filePath) => filePath.toLowerCase().endsWith(".md"));
  if (markdownFiles.length > DISCOVERY_LIMITS.maxMarkdownFiles) {
    throw new Error(`Markdown file count exceeds limit (${DISCOVERY_LIMITS.maxMarkdownFiles})`);
  }
  let totalBytes = 0;
  return markdownFiles.map((filePath) => {
      const text = readRegularFileBounded(realRoot, filePath, DISCOVERY_LIMITS.maxFileBytes);
      const bytes = Buffer.byteLength(text, "utf8");
      totalBytes += bytes;
      if (totalBytes > DISCOVERY_LIMITS.maxTotalMarkdownBytes) throw new Error(`Markdown input exceeds aggregate limit (${DISCOVERY_LIMITS.maxTotalMarkdownBytes} bytes)`);
      return {
        filePath,
        relativePath: slash(path.relative(realRoot, filePath)),
        text,
        bytes,
        ...parseFrontmatter(text),
      };
    });
}

export function isManagedDocument(doc) {
  if (doc.relativePath.startsWith("ai-context/archive/")) return false;
  if (/\/(README)\.md$/.test(doc.relativePath)) return false;
  return doc.relativePath === "PROTOCOL.md" ||
    doc.relativePath.startsWith("ai-context/") ||
    doc.relativePath.startsWith("spec/") ||
    doc.relativePath.startsWith("domains/") ||
    doc.relativePath.startsWith("templates/") ||
    doc.relativePath.startsWith("examples/");
}

export function firstHeading(body, fallback) {
  const match = body.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : fallback;
}

export function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(1)} KiB`;
}

export function extractContextReferences(text) {
  const refs = [];
  const pattern = /(?<![A-Za-z0-9_.-])((?:ai-context|spec)\/[A-Za-z0-9_./-]+)/g;
  for (const match of text.matchAll(pattern)) {
    refs.push(match[1].replace(/[.,;:)]+$/g, ""));
  }
  return [...new Set(refs)];
}

export function extractMarkdownLinks(text) {
  const links = [];
  const pattern = /\[[^\]]*\]\(([^)]+)\)/g;
  for (const match of text.matchAll(pattern)) {
    const target = match[1].trim().replace(/^<|>$/g, "").split("#", 1)[0];
    if (!target || /^(?:https?:|mailto:|#)/i.test(target)) continue;
    links.push(target.replace(/\\/g, "/"));
  }
  return [...new Set(links)];
}
