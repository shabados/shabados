# Corpus

Draft, 2026-08-25. Open questions at the end are blocking — do not guess them.

What scripture data a device holds, what it can reach without holding, and how the
two interact.

## The problem: 151 MB, mostly derived

v2 ships one monolithic artifact — every source, every translation, every
transliteration. Measured from the shipped artifact (`dbstat`):

| Table | Size | Rows | Share |
| --- | --- | --- | --- |
| `translations` | 86 MB (+8 MB index) | 524,653 | **~62%** |
| `transliterations` | 32 MB (+6 MB index) | 423,792 | **~25%** |
| `lines` | 10 MB (+3 MB indexes) | 141,264 | ~9% |
| everything else | ~4 MB | — | ~3% |

**The scripture itself is 10 MB.** Nearly nine tenths is derived or supplementary,
and both large tables are exactly what a given user may never open:

- **Translations (62%)** are per source, per language — 201,819 English, 262,279
  Punjabi, 60,555 Spanish rows. An English-only reader carries the rest anyway.
  This is the biggest argument for packs and what packs are naturally shaped around.
- **Transliterations (25%)** are exactly 3.0 per line (English, Hindi, Urdu) and
  are **generated from the Gurmukhi**, not authored — see open question 2.

A base of lines plus one translation is plausibly **~20 MB rather than 151 MB**,
before any other decision. Corpus size is the constraint that drives every
distribution question; the compiled core is 2–5 MB against it
([ADR-0010](../architecture/decisions/0010-shared-core-across-platforms.md)).

## Modular corpus

The corpus splits into a **base** (required, always present) plus **optional
packs** (additional sources and translations, each independently installable).
Nothing beyond the base downloads unless a user asks.

**Base composition is deliberately deferred** — treat today's monolithic artifact
as the base for now. What matters first is that the **splitting mechanism exists**;
once it does, moving content out of the base is a data decision rather than an
architectural one.

### A pack is an asset

Packs map onto **assets** — real publications — not onto sources
([data-model.md](data-model.md)). A pack is a whole asset, so downloading a nitnem
gutka gets that entire publication, which may be a small slice of several sources.
**The Shabad OS asset is required and cannot be removed**: it is the minimum
offline install and it anchors canonical line IDs. Other assets are freely
installable including third-party ones — a user may install a competitor's asset
and prefer its rendering, but may not delete the Shabad OS asset underneath it.

**Terminology** — three levels, none called by another's name:

| Level | Example | In schema today |
| --- | --- | --- |
| **Asset** (= pack) | "Shabad OS", a nitnem gutka, STTM's data | **No** — new |
| **Source** | SGGS, Sri Dasam Granth, Vaaran | Yes, `sources` |
| Translation edition | Dr. Sant Singh Khalsa, Fareedkot Teeka | Yes, `translation_sources` |

The shipped schema already uses `sources` for **scripture**, so a pack must not be
called a source.

### Devices with different packs already work

A display and a controller may hold different packs, and the existing design
handles it: v2 broadcasts the **full shabad content**, not just an id
(`shabads:current` carries the shabad with its lines and translations), so a
client renders what it is given and never needs the row in its own corpus.
Combined with computing transliterations at runtime, a client needs **no local
corpus at all** to display a session — which is what makes web viable as a display.
Pack asymmetry is a non-issue for presentation; it remains an issue for anything a
client resolves locally (its own search, history, bookmarks).

## What the splitting mechanism must provide

Independent of what ends up in the base.

- **Identifiers must be stable across packs and versions.** A line's identifier
  must not depend on what is installed — bookmarks, history, cross-source
  comparison, and the protocol all carry line ids between devices holding
  different packs. v2's opaque string ids (`6WX1`) already have this; sequential
  ids would not. *Consequence to resolve:* v2 uses `shabad.orderId`, a corpus-wide
  sequence, for previous/next-shabad, and with optional packs that sequence has
  gaps. "Next shabad" over a partial corpus needs a defined meaning — next within
  installed content, next within the source, or something else.
- **Packs attach; they do not merge.** Each pack stays its own SQLite file,
  attached to the connection, with queries spanning them — native capability, no
  invented format. *Not merge-on-install:* **attaching preserves the
  byte-identical guarantee, merging destroys it.** A merged file is not the
  artifact that was built, so it cannot be verified against a rebuild or
  delta-updated as a unit, and uninstall becomes a destructive rewrite rather than
  deleting a file. Attach has a real limit to design within: SQLite permits a
  bounded number of attached databases (10 by default, raisable), so pack
  granularity must stay coarse enough to fit.
- **Base holds shared content; assets hold what differs.** Reference data assets
  point at — languages, writers, sources, sections — lives in the base or two
  assets will disagree about it. More importantly the base holds the **shared
  renderings and orderings** that 90–95% of assets agree with
  ([variants](data-model.md#variants-no-rendering-is-the-correct-one)), so a pack
  carries only its *variance* plus membership. This is what makes a tenth asset
  cost far less than a tenth corpus, and it is a harder constraint than an
  ordinary star-schema split: a pack shipping a complete copy of everything it
  touches defeats the entire model.
- **Packs declare schema compatibility.** A base at schema v5 with a pack built
  against v4 must fail clearly at attach time, not produce wrong results.
- **Search must rank across whatever is installed.** Tiered, source-ordered
  ranking ([search.md](search.md)) operates over all installed packs as one set —
  another argument for attach, since SQL spans attached databases and ranking
  stays one query rather than a merge step in application code.
- **Delta updates improve.** A fix to one source currently forces every user to
  re-download 151 MB; per-pack artifacts delta only that pack.

## Remote query, and the local-content rule

With an internet connection a user can **query content they have not downloaded** —
looking up a line or two from a source they do not keep, or comparing a line,
shabad, or page **across sources** including ones they will never install. Remote
query is for reach; local packs are for use.

**A line may only be presented from content held locally.** This is a hard rule,
not an optimisation: a projection that depends on a live internet connection fails
at the worst possible moment, and gurdwara networks are not reliable. A remote
result that is merely *viewable* becomes a liability the moment someone selects it
for display. Remote results can be searched, read, and compared freely; selecting
one for presentation must first make it local — by fetching at least that shabad,
or by prompting to install the pack. Where exactly that boundary sits is open
below; the rule it serves is not negotiable.

## Open questions

1. **What is in the base?** Deferred by decision — today's artifact is the base
   and the splitting mechanism comes first. The measured breakdown says most of
   the eventual answer is about translations, not lines.
2. **Do transliterations need to be stored at all?** 38 MB including indexes — a
   quarter of the artifact — exactly 3 per line, entirely generated from the
   Gurmukhi. v2's frontend already computes them at render time rather than
   reading the column (`TRANSLITERATORS[lang](gurmukhi)` in the display and
   search-result paths), so the app demonstrably does not need them stored. Same
   trade as line type ([ADR-0005](../architecture/decisions/0005-line-type-derived-not-stored.md)),
   but the economics invert with payload size: line type is ~2 bytes per row and
   worth storing for reviewability; three transliterations are full text fields
   costing 38 MB. Before deciding, confirm what still reads these columns — search
   matching, external consumers of `@shabados/database`, or nothing. If search
   matches on Gurmukhi and maps positions onto a computed transliteration (which
   is what v2's match-highlighter does), storage may serve only external consumers,
   and a pack is a better answer than a base column.
3. **What is the granularity of a pack?** Per source, per translation, or per
   source-plus-translation pair? Translations attach to sources, so the axes are
   not independent.
4. **How do remote results appear in search?** Mixed in or separated? Marked as
   not-installed? If mixed, ranking spans two very different latency classes and a
   slow network must not delay local results.
5. **What exactly happens when a remote result is selected for presentation?**
   Fetch that shabad, prompt to install the pack, or refuse? Fetching one shabad
   is fastest but leaves the local corpus partial and hard to reason about.
6. **Is fetched-on-demand content cached, and does it persist?** A cache is a
   third state between "installed" and "remote" and needs defined semantics or it
   becomes a "why does this work on my machine" problem.
7. **How are packs versioned against the base?** Identifiers must stay stable
   across packs and versions or a bookmark, history entry, or cross-source
   comparison breaks. Interacts with the byte-identical rebuild guarantee.
8. **What serves remote queries?** The `api` component is a separate repo
   consuming published artifacts. Does it become a hard runtime dependency of the
   apps, and what is the availability expectation if so?
9. **What does a user see when offline?** Packs work, remote query does not. That
   transition must be visible and unsurprising, not a search that silently returns
   fewer results.
10. **Does the web platform change this?** It cannot hold 151 MB and is a client
    only ([ADR-0010](../architecture/decisions/0010-shared-core-across-platforms.md)),
    so it may be remote-query-only — in which case "presenting requires local
    content" needs a web-specific answer, since web can present.
