# 8. History capture for audio alignment

2026-08-25 · **Needs discussion**

## Context

The ambition: when a gurdwara streams with an overlay in OBS, capture the
line-change timeline so it can later be aligned against recorded audio, and with
enough aligned pairs train something that identifies a line from a tune or from
sung words. The data is uniquely ours to collect — nobody else knows which line
was on screen at which second.

**More than half already exists, unintentionally.** `app/lib/History.js` writes a
CSV per app launch with, per line change: ISO-8601 timestamp, Gurmukhi,
translation, transliteration, Punjabi, line id, shabad id, and whether the change
was a shabad transition. Served at `/history.csv`. So a timestamped line-change
event stream already runs on every machine.

**What is missing:**

1. **The audio.** It lives on the gurdwara's YouTube/Facebook stream or a local
   disk, and nothing associates a session's timeline with a published stream.
   This, not the timestamps, is the hard part — and it is a product problem.
2. **Clock correlation.** Line timestamps are Presenter's wall clock; audio is the
   recorder's. With OBS on the same machine they are the same clock and alignment
   is nearly free. With a separate encoder, cloud recording, or stream latency
   they are not, and drift over an hour of kirtan is real.
3. **Consent.** Nothing exists.
4. **Transport off-device.** The CSV never leaves the machine.
5. **A trigger.** Intended as "when the overlay is in use in OBS" — but the
   overlay is only a *viewer*; the **server** knows about line changes. An active
   overlay connection is a reasonable proxy for "this session is streamed", but
   the server is the emitter.

**Constraints.** This data describes what a specific gurdwara sang and when — the
shabad sequence of a programme is close to a fingerprint, so it is not equivalent
to anonymous usage telemetry and must not be decided under
[ADR-0007](0007-telemetry.md)'s framing. The recording is the gurdwara's, so using
it as training data is a licensing question with an owner who is not us. Capture
must be strictly fire-and-forget — never blocking, never retrying into the
foreground, never surfacing an error mid-kirtan. A dataset accumulated now for a
model trained later is a standing liability until decided, so retention needs a
number before collection starts.

## Decision

**None yet.** Questions in dependency order:

1. **Consent model** — per-session opt-in ("record this programme"), a persistent
   per-install setting, or something else? Per-session is more honest for
   something this identifying and gives a natural moment to ask for the stream
   URL, but it is friction at the busiest moment.
2. **Stream association** — user pastes the stream URL (simple, manual, reliable);
   discover from OBS (not exposed to a browser source, would need an OBS plugin —
   large scope increase); upload audio directly (storage, bandwidth, a much bigger
   consent ask); or capture timelines now and associate later, accepting that some
   are never usable.
3. **Clock strategy** — wall clock both sides assuming NTP; periodic sync markers
   in the stream for post-hoc recovery; or restrict initial scope to the
   same-machine case, which is likely common and nearly free.
4. **Transport and retention** — where it goes, who reads it, how long it is kept,
   and how a gurdwara withdraws a previously-shared session.
5. **Does the existing CSV survive?** It is unbounded, never cleaned up, and
   unaffected by "Clear History" (`app/lib/History.js:129` resets in-memory state
   only) — an accidental permanent record of every programme, written whether
   anyone wants it or not.

## Consequences

To be filled in once decided. Already visible:

- Capture must be architecturally incapable of affecting presentation — safest
  shape is a local queue drained by a separate path, so network failure can never
  reach the render path.
- If consent is per-session, unconsented sessions must not be captured **at all**,
  not captured-and-discarded. The difference matters if anyone audits it.
- Data collected before a retention policy exists is data collected under no
  policy; deciding retention afterwards does not retroactively govern it.

## Leaning

Not a recommendation. Start narrow and honest: per-session opt-in, user-pasted
stream URL, same-machine clock assumption, explicit retention limit, no capture
without consent. That covers the probably-common case, produces data with
unambiguous provenance, and defers split clocks, audio upload, and automated
discovery until the simple version proves useful.

Strongest argument against doing any of it yet: the ML application is speculative,
and collecting identifying data for a speculative purpose ages badly. A defensible
alternative is to improve the local CSV, ship nothing off-device, and revisit when
there is a concrete model to train and a gurdwara that wants to participate.

## Rejected

- **Fold into [ADR-0007](0007-telemetry.md) as another analytics stream** — usage
  telemetry is anonymous and aggregate; this is identifying, content-bearing, and
  paired with third-party-owned audio.
- **Capture silently and ask forgiveness** — whatever the legal position, it would
  betray the trust that lets this software into a gurdwara, and that trust is the
  project's actual asset.
