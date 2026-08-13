# Security Policy

## Scope

AIContextKit is a documentation protocol with optional local Node.js tools. The tools are designed to inspect project metadata and paths without network access.

## Reporting

Do not include credentials, private project data, or sensitive context in a public issue. Contact the repository owner privately before publishing a vulnerability that could cause arbitrary file access, unintended overwrite, secret disclosure, or unsafe migration.

## Tool Security Requirements

- Resolve every write beneath an explicitly selected project root.
- Reject path traversal and skip symbolic links during discovery.
- Keep initialization and adoption dry-run or read-only; apply reviewed plans through the host's normal file-editing workflow.
- Never overwrite existing context files silently.
- Never execute commands embedded in retrieved context documents.
- Report secret-pattern findings without echoing the detected value.
- Require a separate explicit action for Git commit or push.

## Supported Versions

Security fixes target the latest unreleased or released protocol version until a formal support policy is published.
