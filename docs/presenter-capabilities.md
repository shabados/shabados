# Presenter v2 capability inventory

What Presenter (`apps/presenter`, `main`) does today, read from source. **A record
of the past, not a target.** Exists so removals are decisions, not oversights.
`[GAP]` = the code cannot tell us (intent, real usage, unexplained hardcoding).

| v2 area | Already decided in |
| --- | --- |
| Routes, overlay, screen reader | [ADR-0002](architecture/decisions/0002-view-modes-and-overlay-endpoints.md) |
| LAN access, cross-subnet | [ADR-0003](architecture/decisions/0003-relay-transport.md) |
| Concurrent line control | [ADR-0004](architecture/decisions/0004-concurrent-line-control.md) |
| `typeId`, screen-reader patterns, Asa Ki Vaar | [ADR-0005](architecture/decisions/0005-line-type-derived-not-stored.md) |
| Zoom captions, vishraam symbols, `launchOnStartup`, search language toggles | [ADR-0006](architecture/decisions/0006-features-removed-in-redesign.md) |
| Sentry, analytics | [ADR-0007](architecture/decisions/0007-telemetry.md) |
| History CSV, ML ambition | [ADR-0008](architecture/decisions/0008-history-capture-for-audio-alignment.md) |
| Runtime DB update, themes folder, mobile hosting | [ADR-0011](architecture/decisions/0011-distribution-channels.md) |
| Search, navigation, keymap | [requirements/](requirements/) |

Deferred, not decided: **Unicode-only** (off ASCII/AnmolLipi, on Sant Lipi, to
match the new database — touches §18); **CSS rewrite**, human-led, all CSS
packages re-evaluated; **`^`/`%` search modifiers**, wanted, currently dead;
**Navigator**, concept expected to change, not yet specified.

## 1. Topology

Not one app: a **local server with N clients**, every client the same React bundle
on a different route.

- Express + WebSocket (`app/server.js`), port **1699** prod / **42425** dev, all
  interfaces.
- Electron shell (`app/electron/`) = browser host + updater only; spawns the server
  as a child process, talks over IPC (`sendToElectron`, `app/lib/utils.js:99`).
- Any LAN device opening `http://<host-ip>:1699` is a fully privileged client.
  **No authentication, pairing, or authorisation of any kind.** LAN addresses are
  surfaced to copy in Settings → About (`Settings/About.js:43`).
- Clients identified by reverse-DNS hostname falling back to IP (`getHost`,
  `app/lib/utils.js:32`), 200ms resolution timeout.
- All session state in one in-memory `SessionManager` (`app/lib/SessionManager.js`);
  nothing persisted but settings and the history CSV.
- 30s ping/pong heartbeat reaps broken clients (`app/lib/Sockets.js:26`).
  **[GAP] it never runs** — `setInterval( () => this.closeBrokenConnections, ... )`
  passes the method without calling it.

| Route | Purpose |
| --- | --- |
| `/` | Display + collapsible controller. Default window. |
| `/controller/*` | Search, Navigator, History, Bookmarks |
| `/settings/*` | All configuration, including for *other* devices |
| `/overlay` | Chromeless caption layer for OBS/vMix/Wirecast |
| `/screenreader` | Full-shabad scrolling text — §12 |

Roles are not exclusive: one window can display and control at once, and the
controller can be collapsed, expanded, fullscreened, or popped into its own
always-on-top window.

## 2. Content model

`@shabados/database` (pinned `^4.8.7`) via Objection/knex directly — **no HTTP API
layer between app and database** (`app/lib/db.js`).

- **Shabad** — `orderId` (globally sequential across the corpus), `sourceId`,
  `writerId`, `section`, ordered `lines`.
- **Bani** — lines pulled across shabads, ordered by `line_group` then line
  `order_id` (`getBaniLines`, `db.js:84`).
- **Line** — `gurmukhi` (ASCII/AnmolLipi), `typeId` (manglaCharan/sirlekh/rahao/
  pankti), `sourcePage`, `orderId`, eager `translations` + `transliterations`.
- **Sources** — 12 (SGGS, Dasam Granth, Vaaran, Kabit Svaiye, Ghazals, Zindagi
  Naama, Ganj Naama, Jot Bigaas, Ardaas, Rehitname, Sarabloh, Uggardanti);
  abbreviations hardcoded at `lib/data.js:49` "until ShabadOS/database#1767".
- **Languages** — english(1), punjabi(2), spanish(3), hindi(4), urdu(5).
  Translations en/pa/es. Transliterations en/hi/ur **computed at runtime** by
  `gurmukhi-utils` (`toEnglish`/`toHindi`/`toShahmukhi`), not read from the column.
- **Translation sources** — several per language per source; "recommended" is the
  last in the list (`db.js:120`); user-overridable per source per language.

## 3. Search

`Controller/Search/`, `app/lib/db.js`, `frontend/src/lib/consts.js:61`.

- First-letter (default), accent-stripped before querying. Full-word via leading
  `#`. Space inside a first-letter query becomes `_` (any letter).
- Minimum 2 characters; capped at **50 results** (`MAX_RESULTS`).
- Live on every keystroke over WebSocket, **no debounce**.
- Query mirrored into the URL query string, so a search is linkable/restorable.
- ASCII-keyboard input (placeholder `Koj` = ਖੋਜ in AnmolLipi).
- Rows optionally show translation, transliteration, citation (writer – source
  abbreviation – page name + number), configured per-device.
- **Match highlighting** (`Search/match-highlighter.js`) highlights the span in
  the Gurmukhi *and* maps the same word range onto the transliteration.
- Selecting broadcasts `shabads:current` with both shabad and line id.
- **Dead constants:** `SEARCH_CHARS` declares `^` (`wordOrder`) and `%`
  (`larivaarAccentless`); `SEARCH_ANCHORS` maps only `#`.

## 4. Navigation and line selection

Densest and least documented area; matters most live.

- Next/previous line, first/last line.
- First-line-then-up crosses to the **previous shabad** by `orderId`, landing on
  its last line; last-line-then-down crosses forward. Disabled inside banis
  (`shared/NavigatorHotkeys.js:24-42`).
- Jump to line *N* via 25 single-key hotkeys `1234567890qwertyuiopasdfg`
  (`LINE_HOTKEYS`). `esc` clears the display without unloading; `enter` restores
  the most recently viewed line.
- **Two pointers per shabad** beyond the current line: **main line** (`mainLineId`,
  the asthaaee/refrain, defaults to the line the shabad was opened at, reset with
  `ctrl+space`) and **next jump line** (`nextLineId`). Both **restored from
  history** when returning to a shabad already presented (`SessionManager.onLine`).
- **Autoselect** (`space`/`b`/middle mouse) toggles (`lib/controller.js:153`): off
  the main line it jumps *to* it and advances the jump pointer to the line after
  where you were, skipping the main line; on the main line it jumps to the stored
  jump line. `shift+,` skips to the main line without disturbing the jump pointer;
  `shift+.` skips to the jump line.
- **Bani autoselect** (`lib/auto-jump.js`) — no user-set main line; jump lines are
  computed. Default rule: a line is a target if the *previous* line ended matching
  `/](\d*)]$/`. **Asa Ki Vaar (bani id 11) has bespoke hardcoded logic** — a
  pauri/chant state machine keyed off `/pauVI ]/` and `/](\d*)]$/`, plus a
  hardcoded exclusion of line id `6WX1`. Most likely a workaround for
  mis-categorised title lines rather than a domain rule; confirm, then most likely
  delete rather than port ([ADR-0005](architecture/decisions/0005-line-type-derived-not-stored.md)).
- **Mouse shortcuts, entirely undocumented** — presenter surface, window focused,
  controller closed (`shared/NavigatorHotkeys.js:150`): left = next line, right =
  previous (context menu suppressed), middle = autoselect. Gated so clicks on the
  controller do not advance.

## 5. Bookmarks

`Controller/Bookmarks.js`. Not user-editable — the fixed list of banis from the
database (`Banis.query()`), by Gurmukhi name, each with a line hotkey; resumes at
the last line viewed if opened before this session. **[GAP]** the name implies
user-curated; is a user-defined list a known gap or is "bookmarks == banis"
intentional?

## 6. History

`app/lib/History.js`, `Controller/History.js`. Three in-memory structures, reset on
restart: **transitions** (one per shabad/bani change, timestamped — the History tab
list, newest first); **latest line per shabad/bani** (so reopening resumes);
**viewed lines** with timestamps (Navigator shows a checkmark + time, for "have I
already done this line?").

Every line change also appends to a **CSV** in the data folder named by app-launch
timestamp — timestamp, gurmukhi, translation, transliteration, punjabi, line id,
shabad id, transition (`CSV_FIELDS`, `History.js:8`) — served at `GET /history.csv`
and downloadable from the History tab. "Clear History" wipes the in-memory
structures and rebroadcasts; it does **not** truncate the CSV.

## 7. Display rendering

`Presenter/Display.js`, `Presenter/Line.js`. Per-device (local) settings.

- **Layout** — font size 3–13 vh, plus independent relative scaling per script
  (Gurmukhi, Latin, Punjabi, Hindi, Urdu); center-align; justify for wrapped lines;
  vertical spacing (space-between/around/evenly/top/middle/bottom); previous lines
  0–5 and next lines 0–5 with optional dimming; **inline transliterations** (under
  each word); **inline column guides**; **split on primary pause** (wraps at heavy
  vishraams into blocks).
- **Gurbani treatments** — larivaar + larivaar assist (alternate words coloured);
  vishraams heavy/medium/light, independently toggleable, as **colours or
  symbols**; syllabic weights (`toSyllabicSymbols`); syllable count
  (`countSyllables`); hide line ending, which strips `॥੧॥`-style endings *except*
  on sirlekh lines (`customiseLine`, `lib/line.js:29`).
- **Languages** — en/es/pa translation, en/hi/ur transliteration, independently
  toggleable, fixed order (`TRANSLATION_ORDER`, `TRANSLITERATION_ORDER`).
- **Theme** — six bundled (Day, Night, Blue on White, Yellow on Blue, Darbar Sahib,
  Avani); background image / current-line highlight / dim-adjacent toggles;
  **`simpleGraphics`** ("Remove visual effects") disables transitions and expensive
  effects for weak hardware; **custom themes** — any `.css` in the user's `themes/`
  data folder is listed and served, `Example.css` copied there every launch;
  unknown names fall back to `Day.css` (`server.js:98`); external authoring tool at
  `themes.shabados.com`.
- **Idle** — after 3s without mouse/touch on desktop an `idle` class is applied to
  the presenter root, used by CSS to hide chrome and cursor (`react-idle-timer`,
  `Presenter/index.js:184`).

## 8. Overlay

`Overlay/`, `Settings/OverlaySettings.js`. Chromeless page at
`http://<ip>:1699/overlay`, for an OBS/vMix/Wirecast browser source or fullscreened
as a second presentation.

- **Eleven bundled themes**: Avani Conference / Presentation / Top Banner,
  Cinematic Presentation / Subtitles / Top Captions, Floating Presentation /
  Subtitles / Top Captions, Windowed Subtitles / Top Captions.
- Custom themes from the user's `overlay/` data folder; "Open Overlay Folder"
  shells out to the OS file manager.
- Its own **independent** language, larivaar, and line-ending toggles.
- **Settings are global (server-side), not per-device** — the machine rendering the
  overlay is often not the one configuring it.
- Renders nothing when disconnected; an `empty` state between lines. Settings lists
  per-interface overlay URLs with copy buttons.

## 9. Closed captions (Zoom)

`app/lib/zoom.js`, `Settings/ClosedCaptionSettings.js`. Removed
([ADR-0006](architecture/decisions/0006-features-removed-in-redesign.md)); kept
here so the crash-resume trick is not lost.

- Zoom's Closed Caption API URL pasted whole (`closedCaptions.zoomApiToken`).
- Every line change POSTs `text/plain` there with an incrementing `seq` query param.
- **Resumes after a crash** by first `GET`ing `<url>/seq` to discover the last
  sequence Zoom saw (`fetchPreviousSeq`).
- Body = Gurmukhi converted to Unicode + translations + transliterations, one per
  line, same fixed language order.
- A *third* independent copy of the language/larivaar/line-ending config, again
  global. Always uses the **recommended** translation source, ignoring per-device
  overrides (`zoom.js:52`). Only Zoom is implemented; the UI names YouTube and
  Facebook.

## 10. Settings model

`frontend/src/lib/options.js`, `app/lib/settings.js`, `SessionManager.onSettings`.
Three scopes: **local** (per-device in `localStorage`, *and* mirrored to the server
so other devices can see and edit it); **global** (server-side `settings.json`,
seeded from `app/settings.default.json`); **private** (`security.private`, a local
setting opting a device out of publishing).

**Remote configuration is a real feature** — a device dropdown lists every
connected client by hostname and you can edit another device's settings. Private
devices are excluded and reject remote writes (`getPublicSettings`,
`SessionManager.js:19`). Per-group "Reset to defaults". Hotkeys are `local`-only,
never remote. **Known bug, flagged in-source:** a client whose hostname is literally
`local` or `global` collides with the reserved keys (`SessionManager.js:320`).

Groups — Device: Display, Layout, Theme, Vishraams, Sources, Hotkeys, Security.
Activities: Search. Server: Notifications, System Options, About. Tools: Overlay,
Closed Captions.

## 11. Hotkeys

`lib/keyMap.js`, `Settings/Hotkeys/`. Fully rebindable, per-device, three groups:
**Global** (14 — fullscreen, fullscreen controller, new controller window, toggle
controller, zoom in/out/reset, search, settings, navigator, history, bookmarks,
clear display, quit); **Copying** (11, §13); **Navigator** (9 — activate line,
next/previous, first/last, autoselect, reset main line, skip to main line, skip to
jump line).

Any binding can have **multiple key sequences**, added/removed via a
record-a-keystroke dialog. `required: true` bindings cannot lose their *default*
sequence, so the app can never be locked out of core controls. `ctrl+a` and
`ctrl+r` are globally unassignable (`RESTRICTED_STROKES`). Duplicate-assignment
detection warns. Platform key names remapped for display (`mapPlatformKeys`).

## 12. Screen reader route

`/screenreader` renders the whole current shabad/bani as scrolling paragraphs with
vishraam word colouring and CSS classes for `title` and `end-of-pauri`. Both
classifications come from **hardcoded ASCII string lists**
(`ScreenReader/index.js:10-52`): 28 fuzzy title patterns (`mhlw 1`…`mhlw 9`,
`] jpu ]`, `pwiqswhI 10`, chhand names…), 11 exact titles, plus `isEndOfPauri` for
`/][\d]+]/` or the literal `bolo jI vwihgurU [`.

Linked from no UI, absent from the docs, and duplicating — inconsistently — what
`typeId` was supposed to answer. **Its users need the whole shabad in Gurmukhi
only, to read ahead and sing while the display stays on the current line**, which
is why it is re-implemented as a view mode rather than dropped
([ADR-0006](architecture/decisions/0006-features-removed-in-redesign.md)).

## 13. Copy to clipboard

`shared/CopyHotkeys.js`. Eleven bindings, all `ctrl+c` chords: current line as
Gurmukhi Unicode (`g`) or ASCII (`shift+g`); all lines of the shabad as Unicode
(`a`) or ASCII (`shift+a`); English (`e`) / Punjabi (`p`) / Spanish (`s`)
translation; English (`shift+e`) / Hindi (`shift+h`) / Urdu (`shift+u`)
transliteration; citation (`c`) as `Writer - Source Abbreviation - Page Name N`.
Vishraams stripped from all copied output; a toast confirms with a truncated
preview or reports what was unavailable.

The Navigator's shabad-info popover also has **Copy** (whole shabad, Unicode) and
**Open Online** → `viewer.shabados.com/line/<lineId>`, tooltipped "Report a
mistake" — the data-correction on-ramp.

## 14. Windowing and displays (Electron only)

`app/electron/window.js`, `entry.js`.

- Splash screen while the server boots.
- **Launch on all displays** (default on) — a maximised window on every
  non-primary display, closed when the setting is off. Guard: only creates them if
  exactly one window currently exists.
- **Launch in fullscreen** uses `setSimpleFullScreen`, a macOS-only API. **[GAP]**
  knowingly mac-only?
- **Pop out controller** → its own `alwaysOnTop` window; **new controller**
  (`ctrl+x`) → an additional one. Controller zoom 0.1×–2.5× via hotkeys,
  independent of OS zoom.
- Native menu bar hidden in production; a macOS-only app menu installed (Help →
  docs, report a bug, request a feature, support).
- Mobile browsers auto-forced into fullscreen-controller mode
  (`Presenter/index.js:171`).
- `launchOnStartup` is in `settings.default.json` and `OPTIONS` but commented out
  of the defaults with `//! Currently not implemented` (`lib/options.js:308`) — a
  phantom setting.

## 15. Updates

`app/lib/Updater.js`, `app/electron/updates.js`. Checked every 5 minutes, prod only.

- **Database updates hot-patch without a restart** — new `@shabados/database`
  tarball fetched from npm with `pacote`, knex connection destroyed, module
  directory swapped, module re-imported. Code changes still need a restart; data
  changes do not. Writes into the app's own install directory, which no sandboxed
  channel permits ([ADR-0011](architecture/decisions/0011-distribution-channels.md)).
- **App updates** via `electron-updater`, downloaded in the background, installed
  on quit — never mid-session, deliberately.
- Beta-channel opt-in. Toasts for download-started/complete, individually
  toggleable. A list of network errors is explicitly swallowed rather than crashing.

## 16. Diagnostics

- **Sentry** on backend (`desktop-backend`) and frontend (`desktop-frontend`),
  independently toggleable (`system.serverAnalytics`, `security.displayAnalytics`).
  Backend note in-source: "Cannot be disabled without a restart." Backend exception
  scope attaches full settings + CPU/memory/platform/**network interfaces**
  (`app/lib/analytics.js:46`).
- Rotating per-launch log files; "Open Logs Folder" in Settings → About; a
  log-replay script (`app/scripts/replay-log.js`).
- Settings → About reports app version, database version, hostname, platform, OS
  release, architecture, CPU model/count, LAN addresses, connected device count.
- Connect/disconnect status toasts, independently toggleable — connections default
  off in `settings.default.json` but on in `DEFAULT_OPTIONS`; the two disagree.

## 17. Wire surface

The de-facto protocol. v2 has no spec; this is the starting point for writing one
([protocol/](protocol/)), not a substitute — several messages encode decisions
being reversed.

```
GET  /heartbeat            -> "alive"
GET  /about                -> version, databaseVersion, hostname, arch, cpus,
                              platform, release, addresses
GET  /sources              -> { sources, recommendedSources }
GET  /languages            -> { languages }
GET  /writers              -> { writers }
GET  /presenter/themes     -> [ theme names ]   (bundled + custom)
GET  /overlay/themes       -> [ theme names ]
GET  /presenter/themes/:x  -> CSS  (falls back to Day.css)
GET  /overlay/themes/:x    -> CSS
GET  /history.csv          -> current session's history file
GET  *                     -> SPA index.html
```

WebSocket (`SessionManager`, `server.js`) — **client → server:** `shabads:current`,
`lines:current`, `lines:main`, `lines:next`, `banis:current`, `history:clear`,
`settings:all`, `search:first-letter`, `search:full-word`,
`action:open-overlay-folder`, `action:open-external-url`, `action:open-window`,
`action:open-logs-folder`. **Server → client:** `ready`, `shabads:current`,
`banis:current`, `banis:list`, `lines:current`, `lines:main`, `lines:next`,
`history:viewed-lines`, `history:transitions`, `history:latest-lines`,
`settings:all`, `status`, `results`.

- Every state change is a **full broadcast to all clients including the sender**.
  No deltas, acks, sequence numbers, or conflict resolution — last write wins.
- `shabads:current` and `lines:current` accept **either** an id **or** an `orderId`,
  with clamping — that is how prev/next-shabad works.
- Clients reconnect via `reconnecting-websocket` with 300–500ms jittered delay and
  get a full state dump on connect.

## 18. Defects and smells worth carrying forward

- **Language configuration duplicated four times** — display, overlay, closed
  captions, search results each with their own toggles.
- **`Presenter/Settings.js` is a zero-byte file.** Dead.
- **`Line.js` reads the wrong defaults group** — destructures `syllabicWeights`,
  `syllableCount`, `larivaarGurbani`, `larivaarAssist`, and the vishraam flags out
  of `DEFAULT_OPTIONS.local.layout`, but they live in `display`/`vishraams`.
  Harmless at runtime (Display spreads all three groups in), but "which settings
  apply to which surface" is accidental rather than declared.
- **`settings.default.json` and `DEFAULT_OPTIONS.global` are hand-synced**
  (`lib/options.js:305`) and already disagree on `notifications.connectionEvents`.
- **Line text is ASCII/AnmolLipi end-to-end**, converted to Unicode only at the
  edges (copy, Zoom captions). Search, highlighting, vishraam parsing, and the
  screen-reader heuristics all operate on ASCII.
- **`app/lib/zoom.js` imports from `app/frontend/src/lib/`** — backend reaching into
  frontend source for `line.js` and `data.js`, marked `//!` as needing a shared home.

## Open questions about v2 itself

1. **Bookmarks** — is user-defined bookmarking wanted, or is banis-only correct?
2. **Mouse shortcuts** — known and relied upon, or incidental? Undocumented anywhere.
3. **Remote settings editing** — do people configure other devices in practice, and
   is `security.private` used?
4. **`fullscreenOnLaunch`** is macOS-only; is Windows/Linux known-broken?
5. **Mobile's role** — which of these surfaces does Mobile become, and does it
   share the protocol or a subset?
6. **The heartbeat reaper never runs** (§1). Has anything depended on broken
   connections lingering?
