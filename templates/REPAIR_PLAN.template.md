---
context_version: 2
id: AICK-TEMPLATE-REPAIR-PLAN
type: template
status: active
authority: reference
visibility: public
updated: 2026-08-12
---

# Repair Plan

Purpose: propose a safe way to repair, adopt, or migrate existing context files without losing useful project memory.

Use this file only when a project already has context files, stale handoffs, mixed assistant rules, or an incomplete `ai-context/` folder. Do not create repair plans for clean new projects unless the user asks.

## 1. Scope

- Project:
- Existing context location:
- Reason this repair plan is needed:

## 2. Existing Context Found

Keep this short. List key files and folders, not full trees.

- `ai-context/`:
- Other assistant files:
- Handoff or memory folders:

## 3. Preserve

Files or facts that should stay as-is:

-

## 4. Add

Small missing pieces that would improve context quality:

-

## 5. Archive Or Mark Historical

Stale files or entries that should not be deleted yet:

-

## 6. Ignore

Files that should remain in place but not drive normal session startup:

-

## 7. User Approval Needed

Before applying this repair plan, ask the user to approve:

-

## 8. After Repair

Update only the durable routing files needed for future sessions:

- `ai-context/AI_CONTEXT.md`
- `ai-context/CONTEXT_BUDGET.md`
- `ai-context/maps/RETRIEVAL_INDEX.md`
