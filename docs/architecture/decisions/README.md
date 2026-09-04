# Architecture decision records

Why things are the way they are. Authoritative: do not silently contradict an ADR
— if one looks wrong, propose a replacement rather than working around it. Only
build against **Accepted**; writing code that assumes an answer is how an
undecided question becomes decided by whoever implemented first.

Statuses: **Needs discussion** (question framed, options laid out, nothing decided
— may carry a *Leaning*, which is not a recommendation) · **Proposed** (a specific
decision recommended, awaiting sign-off) · **Accepted** (build against it).

| # | Decision | Status | In one line |
| --- | --- | --- | --- |
| [0001](0001-record-architecture-decisions.md) | Record architecture decisions | Accepted | ADRs here, numbered, superseded not edited. |
| [0002](0002-view-modes-and-overlay-endpoints.md) | View modes and overlay endpoints are addressable URLs | Accepted | `/view/<mode>` shares per-device config; `/overlay/<name>` are named server-global configs. |
| [0003](0003-relay-transport.md) | Trial a WebSocket relay before considering WebRTC | Accepted (trial) | Plain WS relay, measure hosting cost; WebRTC's three claimed advantages did not survive. |
| [0004](0004-concurrent-line-control.md) | Concurrent line control | **Proposed** | Absolute ids + optimistic local advance + idempotent activation. |
| [0005](0005-line-type-derived-not-stored.md) | Line type is derived by gurmukhi, generated into the corpus | Accepted | One classifier in gurmukhi; block identity generated at build time, never hand-edited. |
| [0006](0006-features-removed-in-redesign.md) | Features removed in the redesign | Accepted | Zoom captions, vishraam symbols, `launchOnStartup`, `/screenreader` route, search language toggles. |
| [0007](0007-telemetry.md) | Error reporting and product analytics | **Needs discussion** | Sentry's value in doubt; settings analytics wanted; consent model undecided. |
| [0008](0008-history-capture-for-audio-alignment.md) | History capture for audio alignment | **Needs discussion** | Line-change timeline exists; audio association, consent, retention do not. |
| [0009](0009-requirements-are-the-contract.md) | Requirements are the contract; payload shapes are derived | **Proposed** | Requirements are truth; schemas are generated and pinned at a release boundary. |
| [0010](0010-shared-core-across-platforms.md) | Shared core across platforms | **Needs discussion** | Maximal sans-IO Rust core leaning yes; FFI binding-generator question open. |
| [0011](0011-distribution-channels.md) | Distribution channels, and the constraints they impose | **Needs discussion** | Sandboxing everywhere breaks the runtime DB update, the updater, and theme folders. |
| [0012](0012-journeys-replace-viewing-history.md) | Tabs, journeys, and a Library replace viewing history | Accepted | The browser model: tabs carry their entry container, journeys are sessions with a timeline, the Library is the catalogue. |
| [0013](0013-three-layers-of-specification.md) | Three layers of specification, split by lifetime | Accepted | Requirements stay platform-neutral; icon/gesture mappings are generated data; principles stay in CLAUDE.md. |
| [0014](0014-one-app-three-shells.md) | One app, three shells | Accepted | Swift, Kotlin, and a web codebase in OS webviews. No Electron. D-pad is the input constraint; the web server is core. |

Related: [presenter-capabilities.md](../../presenter-capabilities.md) — what v2
does today, the input these decisions were made against.
[protocol/](../../protocol/) — the contract these decisions produce.
