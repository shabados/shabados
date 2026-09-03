# 7. Error reporting and product analytics

2026-08-25 · **Needs discussion**

## Context

Two wants keep being discussed as one. They have different privacy weights and
should be decided separately.

**Error reporting today.** Sentry on both processes, two DSNs
(`desktop-backend`, `desktop-frontend`), two toggles — `system.serverAnalytics`
(server-global) and `security.displayAnalytics` (per-device) — **both default on,
so collection is opt-out**. The backend one notes in source: "Cannot be disabled
without a restart" (`app/lib/analytics.js:31`). A backend exception ships the full
global settings object, CPU model and count, free/total memory, platform, OS
release, and **`networkInterfaces()`** — which on Node includes **MAC addresses**
and local IPs for every interface (`app/lib/analytics.js:46`). That is more
identifying than the toggle label "Server Usage Analytics" implies.

**Product analytics today.** None. No mechanism at all.

**Why reopened.** Sentry's value is in doubt — v2 is stable enough that errors
rarely fire, so we carry an SDK, a vendor, and a privacy surface for signal we
mostly do not receive. Meanwhile there is a specific unmet want: **which settings
people change and what they set them to**, so defaults are designed from evidence.

**Constraints.** A telemetry SDK is a dependency with a vendor and terms that can
change, on a twenty-year horizon. Anything that phones home does so from a device
inside a gurdwara. `security.private` already makes privacy a first-class
user-facing concept. A user-initiated diagnostic path already exists and works
with no telemetry: per-launch log files plus an "Open Logs Folder" button
(`app/lib/consts.js:42`).

## Decision

**None yet.**

**Error reporting options.** (1) Keep Sentry as-is — zero work, keeps the vendor
and the MAC-address payload for signal that rarely arrives. (2) Keep Sentry,
shrink the payload to version/platform/stack — small change, removes the sharpest
edge, keeps the vendor. (3) Self-host a Sentry-compatible collector (GlitchTip) —
same SDK protocol, no third party holding data, adds an operational surface to
keep alive for twenty years. (4) Drop automated reporting — rely on the logs
folder plus a "report a bug" flow; removes a dependency and a privacy surface,
loses crashes from users who never report.

**Product analytics options.** (1) SaaS platform (PostHog or similar) — most
capability, fastest, largest dependency and privacy surface, and most of its
feature set is irrelevant to the one question asked. (2) Self-hosted equivalent —
no third party, hosting we maintain. (3) A single purpose-built endpoint —
periodically POST an anonymous snapshot (settings values, app version, platform,
install-scoped random id) to an endpoint we own. No SDK, no vendor, ~100 lines,
answers the actual question; extending it later means writing that code
deliberately. (4) Nothing — design defaults from support conversations, as now.

**Consent model, needed either way.** Today is opt-out and on by default, so
moving to opt-in is a *reduction* in what we collect, not a new imposition.
Opt-out gives representative data, and unrepresentative analytics are worse than
none — if only the technically confident opt in, defaults get designed for the
wrong people. Opt-in is more defensible for software in a place of worship and
matches the `security.private` precedent. Either way the toggle label must
describe what is actually sent.

## Consequences

To be filled in once decided. Already known:

- Dropping Sentry means some crashes go unseen — plausibly an acceptable trade
  given stability, but it should be made knowingly rather than by attrition.
- Any self-hosted option is infrastructure owned for the project's whole life.
  That recurring cost is the main argument against options that look free.
- Settings telemetry, however anonymous, describes what a specific gurdwara does.
  Aggregation and retention limits need stating.

## Leaning

Not a recommendation.

- **Error reporting: 2 or 4.** The payload is the urgent problem regardless —
  shipping MAC addresses under a label reading "usage analytics" should be fixed
  whether or not Sentry stays.
- **Product analytics: 3.** The want is bounded, and a purpose-built endpoint
  answers it without a vendor or a twenty-year dependency. Counter-argument that
  deserves a hearing: a real platform answers questions we have not thought to
  ask, and building our own means only ever learning what we knew to instrument.

## Rejected

- **Treat both as one "telemetry" decision** — they differ in frequency, detail,
  privacy weight, and value; bundling means the weaker case rides on the stronger.
- **Ship analytics disabled and enable per-deployment** — opt-in with extra steps,
  producing exactly the unrepresentative sample that makes analytics not worth
  having.
