# 6. Features removed in the redesign

2026-08-25 · **Accepted**

## Context

CLAUDE.md: "Removing a user-facing feature. Propose it; do not do it." Removals
need recording in one place with their reasoning, so a future maintainer finding a
gap knows it was deliberate rather than lost in the rewrite. Full v2 descriptions
are in [presenter-capabilities.md](../../presenter-capabilities.md).

## Decision

Remove the following from Presenter.

- **Closed captions / Zoom** (posts each active line to Zoom's Closed Caption API
  URL with an incrementing sequence, including crash-resume). Only Zoom was ever
  implemented despite the UI naming YouTube and Facebook; the overlay
  ([ADR-0002](0002-view-modes-and-overlay-endpoints.md)) covers streaming captions
  for every platform that accepts a browser source. The crash-resume mechanism
  stays documented in the capability inventory in case captions return.
- **Vishraam symbols** — the *display option* only. Colours stay, and the vishraam
  characters remain the parsing input for word classification and heavy-phrase
  partitioning, so strip-on-render stays; only the user toggle goes.
- **`launchOnStartup`** — a phantom setting: present in `settings.default.json`
  and the options table but commented out with `//! Currently not implemented`.
  Never confirmed working, and modern Windows and macOS reopen apps on login.
  Replaced by support documentation for adding a login item.
- **Standalone `/screenreader` route** — removed now, re-implemented later as a
  view mode ([ADR-0002](0002-view-modes-and-overlay-endpoints.md)). Real users
  need the whole shabad in Gurmukhi only, to read ahead and sing while the
  projection stays on the current line; only the current form is being dropped.
  Its 39 hardcoded ASCII title patterns do not come back
  ([ADR-0005](0005-line-type-derived-not-stored.md)).
- **Per-view search result language toggles** — search results carry their own
  translation and transliteration settings today, which with overlay and closed
  captions makes four places to configure the same thing. After this there are
  exactly two independently-configured views: **display** and **overlay**.

## Consequences

- Zoom users lose an integration with no in-app replacement. Browser-source
  overlay is a different workflow, not a drop-in — needs a migration note in
  release notes and support docs. Most likely removal to generate support requests.
- Vishraam symbols were off by default; colours remain.
- `launchOnStartup` removal is invisible — nothing worked, so nothing is lost.
- **Screen reader is the only temporary regression here.** It must not ship as a
  removal before the view mode replaces it, or people lose the ability to do
  their seva. Sequencing matters more here than anywhere else in this ADR.
- Collapsing four language configurations to two removes a real capability
  (a different translation in search results than on the display). Judged not
  worth the surface, but it is a genuine loss, not pure simplification.

## Rejected

- **Keep closed captions, add more providers** — the overlay already covers every
  platform accepting a browser source, and per-provider caption APIs are ongoing
  work against shifting third-party contracts.
- **Keep everything behind an "advanced" section** — unused configuration is still
  code that must keep working for twenty years; hiding an option makes it harder
  to find without making it cheaper to maintain.
- **Remove the screen reader outright** — rejected once its actual usage was
  understood. Real accessibility and usability feature; only its implementation is
  being discarded.
