# 11. Distribution channels, and the constraints they impose

2026-08-25 · **Needs discussion**

## Context

Channels: iOS App Store, Play Store, Mac App Store, Windows (Store *or* portable —
undecided), Linux Flatpak. This looks like packaging; it is not. **Four of five
sandbox the app**, and three mechanisms Presenter depends on are incompatible with
that, so distribution must be decided alongside architecture.

### 1. The runtime database update cannot survive sandboxing

v2 downloads a `@shabados/database` tarball from npm at runtime, destroys the SQLite
connection, **overwrites the module directory inside its own installation**, and
re-imports (`app/lib/Updater.js`). Hot-patching data without a restart is genuinely
good for a live worship tool — and impossible under MAS sandboxing, MSIX, or
Flatpak: an application may not write to its own bundle. The artifact must move to
**user-writable data** and load from there. Prerequisite for any store channel, and
it changes where the artifact lives on every platform, including ones that would
have tolerated the old way.

### 2. Store channels take over updates

`electron-updater` plus the `automaticUpdates` and `betaOptIn` settings are
meaningless under MAS, MSIX, Flatpak, and both mobile stores — and actively wrong if
they try to run. The updater becomes **conditional on channel**, and the settings UI
must reflect what a build can actually do: a "beta channel" toggle in a Mac App
Store build is a lie. Prerelease moves to TestFlight, Play internal testing, and
whatever Windows and Linux settle on.

### 3. Custom theme folders conflict with sandbox filesystem rules

Users drop `.css` into a themes folder and Presenter serves them — a real feature
with an external authoring tool. v2 uses an arbitrary path under the OS
application-data directory, and under a sandbox *arbitrary* paths are unavailable.
**But a designated writable folder always exists, and the OS chooses it:**

| Platform | App-owned writable folder | User-browsable? |
| --- | --- | --- |
| macOS (MAS) | `~/Library/Containers/<bundle-id>/Data/` | Yes, but obscure |
| iOS | App container `Documents/` | **Yes** — `UIFileSharingEnabled` + `LSSupportsOpeningDocumentsInPlace` |
| Android | `getExternalFilesDir()` | **Yes** — no permission needed |
| Flatpak | `~/.var/app/<app-id>/data` | **Yes** — ordinary visible path |
| MSIX | Package-local app data | Yes, but virtualised |

**This makes a user-store the sandbox-native design.** The sandbox restricts
*importing from outside*, not *writing our own data*: app downloads a theme → app
writes it into its own container → no picker, no permission grant, no portal, on
every platform. A picker is needed only for bringing a file in from outside — a
fallback for sideloading and v2 migration, not the primary path. Most users neither
author nor hand-install themes, so the download path serves nearly everyone.

Two caveats: **(a) store policy limits what may be downloaded** — themes and
overlays (CSS and assets) are generally accepted, but downloadable **extensions**
implying scripting or new functionality carry real iOS rejection risk. **Open** —
needs a policy read before "extensions" is promised. **(b) CSS from a store is
untrusted input** — `url()`/`@import` can pull remote resources (exfiltration, and a
dead font host degrades a live projection) and `content:` can inject text onto the
screen. Needs review and a restricted CSS surface, not raw passthrough.

### Drag-and-drop and folder backup survive

**Requirement:** drag a folder onto the app and it works; back up the library by
copying a folder to a new machine. Compatible with sandboxing, because what matters
is not *where* the folder is but *how access was obtained*. **Ambient access** —
silently reading a path we chose — is what sandboxes forbid. **User-initiated
access** — drag-and-drop or a picker — is an implicit grant, and drag-and-drop is
treated identically to a picker, not as a lesser path. The grant persists across
relaunch: security-scoped bookmarks on macOS
(`com.apple.security.files.bookmarks.app-scope`), documents portal on Flatpak,
broker-granted access on MSIX, SAF tree URI + `takePersistableUriPermission` on
Android.

**Library location model.** (1) *Default* — app-managed library in the container:
zero configuration, identical everywhere, where user-store downloads land. (2)
*Optional* — a user-designated folder chosen by drag or picker with a persisted
grant; this is what makes backup-by-copying work and lets one folder serve two
machines. (3) *Export/import archive* — one file of settings, themes, and overlays
for migration and "send me your setup," portable in a way a raw folder is not. Path
2 answers the requirement; 1 and 3 exist so it never becomes mandatory.

**Settled:** sync conflicts are the sync provider's job — Dropbox and iCloud already
have conflict semantics and it is not ours to reimplement; our only obligation is to
tolerate files changing underneath us and conflict copies appearing, without
corrupting state or crashing. **No custom themes or overlays on mobile** — desktop
only, removing the weak mobile folder-designation story rather than working around
it.

### 4. Mobile hosts in the foreground, and LAN access is permissioned

**Correction to an earlier claim:** mobile is not "a client, never a host." That
conflated *cannot run a background server* (true) with *cannot host at all* (false).
**Mobile is a peer** — a phone must be able to serve other devices while foregrounded
*and* control another device that is hosting.

- **iOS** can bind listening sockets and serve HTTP/WebSocket on the local network
  (`Network.framework`'s `NWListener`, or BSD sockets); ports above 1024 need no
  entitlement, so 1699 is fine.
- **Android** can bind freely, and can keep hosting while backgrounded via a
  **foreground service** with a persistent notification — a capability iOS lacks.

**The foreground constraint is real on iOS:** backgrounded or locked, iOS suspends
within seconds and clients drop. Hosting therefore requires keeping the screen awake
(`isIdleTimerDisabled`, with the battery cost over a two-hour programme), a visible
"this device is hosting" state, and graceful client reconnection when the host
returns — the same reconnect path the relay needs anyway
([ADR-0003](0003-relay-transport.md)).

**Local network permission (iOS 14+)** applies to hosting *and* connecting:
`NSLocalNetworkUsageDescription`, plus `NSBonjourServices` if advertising. The
defining feature is silently broken if denied, so onboarding must ask clearly and
leave a diagnosable state rather than a connection that never succeeds.

**Discovery becomes a requirement, not a convenience.** Reading an IP off the About
screen was tolerable when the host was a desktop with a stable address; it is not
when the host may be a phone on DHCP. mDNS/Bonjour is supported everywhere
(`NWListener.Service`, `NsdManager`, Bonjour/Avahi). **Open** — needs specifying,
including networks with mDNS blocked, common on managed institutional Wi-Fi. See
[connect.md](../../requirements/connect.md).

### 5. Electron-as-localhost-server versus sandboxing

Under MAS sandboxing, bundled helper processes are permitted but fiddly, and the app
needs `com.apple.security.network.server` to accept incoming connections. Survivable,
but it raises [ADR-0010](0010-shared-core-across-platforms.md)'s question 3: **wasm
in the renderer** avoids the child process, the port, and the entitlement while
still satisfying "no native Node modules." Counter-point: LAN serving is a core
feature, so *something* binds a port on desktop regardless — the entitlement is
needed either way, only the helper-process complexity goes away.

### 6. Windows: sandbox everywhere, but the Store is optional

**Direction: every platform is sandboxed, Windows included** — one data model, one
theme-install story, one set of assumptions, rather than a privileged desktop path
that quietly becomes the "real" build features get tested against. That means MSIX,
but MSIX does **not** require the Microsoft Store: an `.msix` can be signed and
distributed by direct download, and `winget` can install from our own manifest
pointing at our own hosted package. So: ship MSIX for consistency, distribute by
direct download and `winget`, treat the Store as optional.

**Cost of dropping portable:** copy-the-folder-to-a-new-machine is a real benefit
for gurdwaras replacing hardware, and it is lost. Mitigation is the export/import
path above — arguably a better migration story than copying a directory and hoping.
**Open:** confirm portable is genuinely being dropped for consistency, since it is
the one channel that would have kept implicit folder conventions.

## Decision

**None yet.** What needs deciding:

1. **Where does the database artifact live**, and how is it updated, per channel?
   Prerequisite for everything else.
2. **Does the built-in updater survive at all**, or does every channel delegate? How
   does the settings UI represent a build that cannot self-update?
3. **How do custom themes work under a sandbox** — container folder, picker import,
   or portal?
4. **Windows: Store, portable, or both?**
5. **Does Electron reach the core via localhost or wasm** (with ADR-0010)?
6. **What is the iOS local-network-permission experience when denied?**

## Consequences

To be filled in once decided. Already certain:

- The database update mechanism changes regardless of channel — not negotiable by
  choosing different stores.
- Store review becomes a release-path dependency: fixes cannot ship on our schedule,
  which matters given that a bug here interrupts worship.
- Per-channel builds add an axis to the release matrix.
- **Onboarding becomes load-bearing, not cosmetic** — it carries iOS local network
  permission (the defining feature does not work until granted, and a denial must
  produce a diagnosable state), finding the host (with no magic folder and no assumed
  local install, connecting must be taught rather than discovered), and theme import.
- **Existing users need a migration gesture, not a migration tool.** A sandboxed
  build is a new installation and cannot silently read
  `~/Library/Application Support/Shabad OS/themes`. Onboarding asks the user to drag
  their old themes folder onto the app — one gesture, no tooling, same grant
  mechanism as ordinary folder designation. Worth doing well: the affected
  population only grows the longer it goes unhandled.
- **Sandboxing and storefront are separable** — MSIX ships outside the Microsoft
  Store, Flatpak outside Flathub — so choosing consistency does not force a
  dependency on any storefront.

## Rejected

- **Direct download only, no stores** — what v2 does: zero sandbox constraints, full
  control of updates, keeps the hot-patch. Rejected as a target because it costs
  discoverability, code-signing trust on Windows, and any iOS/Android presence at
  all, since mobile has no non-store path.
- **Ship to stores without changing the update mechanism** — not an option; it does
  not work, rather than being merely undesirable.
- **Web-only for everything except mobile** — sidesteps desktop packaging, but a
  browser tab cannot bind a LAN port, so the host role disappears, and the host role
  is the product.
