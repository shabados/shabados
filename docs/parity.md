# Shell parity

**Feature parity is the target; interaction parity is not**
([ADR-0014](architecture/decisions/0014-one-app-three-shells.md)). This tracks the
first, shell by shell, so an agent can tell in one table whether a requirement is
built anywhere, everywhere, or nowhere — without reading each app's source to find
out. It says what exists in code today, checked against that code. **Not a target
list** — `docs/plan.md` is that, and a requirement with no ✅ yet is not a bug.

**Update the row in the same commit that ships or changes it.** A stale ✅ is worse
than a missing one — it tells the next agent a thing works when it does not, and
nothing else catches that lie.

Legend: ✅ built · — not started · 🚧 partial (say what's missing in the row)

| Feature | Swift (`apps/ios`) | Kotlin (`apps/android`) | Web |
| --- | --- | --- | --- |
| Bani list + reader, plain text | ✅ | ✅ | — |
| Pinch-to-zoom, anchored to the touched line | ✅ | ✅ | — |
| [Heading / colophon / mool mantar typography](requirements/display-controls.md#titles) | ✅ | ✅ | — |
| [Keep-reading continuation](requirements/library.md#continuation-not-configuration) | ✅ | ✅ | — |
| [Tap a line: scroll + highlight](requirements/display-controls.md#tap-a-line) | ✅ | ✅ | — |
| [Journeys / Controls sidebars, Library](requirements/reading-shell.md) | — | — | — |

**Web** means the shell [ADR-0014](architecture/decisions/0014-one-app-three-shells.md)
describes — Windows Store, Flatpak, browser — which hasn't started
([plan.md](plan.md) Phase 2). The existing `apps/web` is v2 and is out of scope here
until it's replaced.

**Kotlin's reader is a separate implementation, not a port of Swift's** — the two
agree on every row above because each was built against the requirement, and they
differ where the platform does: tap-a-line confirms with Compose's default ripple
rather than Swift's own fade-out highlight, same requirement, different mechanism.
Anything ✅ in one column needs its own implementation in the other, not a
shared-code assumption;
[ADR-0010](architecture/decisions/0010-shared-core-across-platforms.md) (core scope)
is still undecided.
