# Projects — start here

**Standalone tools that support the work without being a shell of the Shabad OS
product** ([ADR-0015](../docs/architecture/decisions/0015-apps-vs-projects.md)).
That is the whole test, and it cuts both ways:

- Not `apps/` — a project doesn't render Shabad OS itself, so it has no claim on
  `packages/design`'s tokens, `packages/gurmukhi`, or the requirements in
  `docs/requirements/`. If a directory shares those, it's a shell and belongs in
  `apps/` instead, whatever its UI looks like.
- Not `packages/` — a project isn't consumed by anything else in this repo or
  published for outside consumers. If something starts depending on it as a
  library, it has become a package and should move.

**Not a GUI-only category.** A CLI or TUI tool with a standalone purpose belongs
here exactly as much as a desktop app does — `library`'s Electron shell is
incidental to what qualifies it, not the reason.

## Current members

| Path | Description |
| --- | --- |
| `library` | Electron desktop tool for dewarping scanned pages. Used by the `database` component's citation-backed review process. |

## Anticipated, not yet built

`about` — a project for what is currently footer/legal content on shabados.com
(privacy policy, support pages), addressable independently once `apps/web` becomes
the ADR-0014 web shell rather than the marketing site it is today. Named here so
the shape is obvious when someone starts it; not scoped or decided.

## If a second project needs to share something

Nothing here is shared yet — `library` is the only member. If a future project
needs the same generated asset another one does (a design token, a corpus export),
apply the same rule `apps/README.md` uses: write the shared fact once, in whichever
file both projects would otherwise duplicate it in, and have the others point back
rather than restate it.
