# Templates

Templates are public source assets. Their top-level frontmatter identifies the template file inside AIContextKit.

When copying a template into a real project:

1. replace the template asset ID with a project-unique ID;
2. change `type` to the copied document's real responsibility;
3. choose project-appropriate `status`, `authority`, and `visibility`;
4. replace `updated` and every body placeholder;
5. run the target project's context check when available.

Do not leave `AICK-TEMPLATE-*` metadata in an active user-project document.
