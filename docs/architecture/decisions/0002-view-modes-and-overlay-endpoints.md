# 2. View modes and overlay endpoints are addressable URLs

2026-08-25 · **Accepted**

## Context

v2 has three hardcoded presentation surfaces: `/` (display), `/overlay` (one
chromeless caption layer), `/screenreader` (whole-shabad Gurmukhi-only, linked
from no UI). Problems:

- **One overlay configuration exists**, stored server-global. Captions at the top
  for one scene and a lower-third for another means reconfiguring mid-stream.
- **No preview** — you must open OBS to see what `/overlay` looks like.
- **Some users already point OBS at the plain display URL** and fullscreen it.
  A legitimate in-use setup that must not break.
- The screen reader has real users (whole shabad in Gurmukhi only, to read ahead
  and sing while the projection stays on the current line) but is undiscoverable.

## Decision

Two route families, both directly addressable and both switchable from the UI.

- **View modes** — `/view/presenter`, `/view/screenreader`. Share one config (the
  per-device display settings) and differ only in rendering. The bare host address
  keeps working, so the fullscreen-the-display OBS setup is unaffected.
- **Overlays** — `/overlay/global`, `/overlay/<name>`. Each named overlay owns its
  config: theme, position, language toggles, larivaar, line endings. A second
  differently-styled overlay is a new name plus an OBS browser source pointed at
  it — no operator interaction in Shabad OS between scenes.
- **Overlay configs stay server-global**, not per-device: the machine running OBS
  is usually not the machine being configured. Because config travels with the
  *name*, opening `/overlay/global` on a laptop shows exactly what OBS sees — the
  preview falls out of the design rather than being built.
- `/overlay/global` is the migration target for v2's single overlay config.

## Consequences

- Overlay config becomes a **collection**: create / rename / delete, and the
  protocol addresses overlays by name. This is the main cost.
- **Open:** what `/overlay/<unknown>` does. Proposal for the protocol spec: serve
  the shell with default settings rather than 404, so a typo'd OBS source degrades
  to something visible instead of a blank scene mid-stream.
- **Open:** character set and collision rule for overlay names — they are URLs.
- The screen reader becomes a discoverable view mode. Its 39 hardcoded ASCII title
  patterns do not come back; that job moves to gurmukhi ([ADR-0005](0005-line-type-derived-not-stored.md)).

## Rejected

- **One unified `/view/*` family including overlay** — overlays are server-global
  and independently configured, view modes are per-device and share config.
  Collapsing them forces one scope onto both, and global scope is the entire point
  of overlay.
- **Single overlay plus a scene/preset switcher in the UI** — that is precisely
  the reconfigure-mid-stream problem. A URL per overlay lets OBS scene switching
  do the work.
- **Query parameters (`/overlay?config=lower-third`)** — works, but path segments
  are easier to read, type into OBS, and route.
