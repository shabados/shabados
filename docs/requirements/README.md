# Requirements

**Source of truth for what the app must do.** Everything else — message shapes,
schemas, class names, module layout, which language a component is written in — is
implementation derived from here and free to change without changing this.

| Document | Covers |
| --- | --- |
| [data-model.md](data-model.md) | Line IDs, sources, assets, containers, variants, identity |
| [corpus.md](corpus.md) | Base + optional packs, remote query, local-content rule |
| [search.md](search.md) | Query modes, match units, tiered ranking, fuzzy matching |
| [navigation.md](navigation.md) | Block structure, keymap, adaptive scope, autoselect |
| [keyboard.md](keyboard.md) | Binding style, when modifiers are correct, focus ownership |
| [connect.md](connect.md) | Host/client roles, discovery, QR, relay, control PIN |
| [journeys.md](journeys.md) | Tabs, journeys as sessions, the timeline, export and sharing |
| [library.md](library.md) | Collections, bookmarks, presets, tracking, scheduling |
| [reading-shell.md](reading-shell.md) | Viewer, the sidebars, Settings, gestures, inactive sessions |
| [display-controls.md](display-controls.md) | Zoom, ratio, weight, width, mode, Variorum fields, presets, appearance |

## Why this is separate from `protocol/`

Two things with different lifetimes ([ADR-0009](../architecture/decisions/0009-requirements-are-the-contract.md)):

- **Behavioural requirements** (here) — stable across rewrites; these get re-read
  in ten years by whoever refactors onto whatever is native then.
- **The wire contract** ([`../protocol/`](../protocol/)) — what crosses between
  programs that version independently. Derived from these, and frozen at a release
  boundary because two independently updating programs cannot renegotiate a shape
  mid-conversation.

Payload shapes are **not** authored here. They are inferred during implementation
and then published so every implementer uses the same one.

## How to write in here

- State what must be **observably true**, not how to achieve it. "Exact whole-line
  matches rank above partial matches" is a requirement; "use a CTE with a rank
  column" is not.
- Every requirement must be checkable. If you cannot describe the test, it is not
  finished.
- Undecided domain rules go in an **Open questions** section, explicitly. A
  plausible-looking guess written in the imperative is worse than a question,
  because it will get implemented and then depended on.
- Do not describe v2 behaviour here unless it is also the requirement. v2 is
  catalogued in [`../presenter-capabilities.md`](../presenter-capabilities.md),
  and much of it is being deliberately replaced.
