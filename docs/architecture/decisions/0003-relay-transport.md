# 3. Trial a WebSocket relay before considering WebRTC

2026-08-25 · **Accepted (trial)** — revisit once hosting cost at small scale is measured.

## Context

v2's defining property: any device on the LAN opens the host's URL and is
immediately a viewer or a fully privileged controller. No install, pairing, or
account. That is why it works in a gurdwara and it is staying. The gap is devices
on *different subnets*; a relay at `relay.shabados.com` closes it.

WebRTC DataChannel was the initial candidate. Three assumptions did not survive:

1. **A signaling server is required regardless** — peers cannot find each other
   without one. Disabling TURN removes the *data* path, not the hosted component.
2. **Reliable + ordered is the DataChannel default** (SCTP over DTLS), so
   retransmission, ordering, and duplicate suppression are already handled. The
   anticipated in-channel sequence-id work is not needed. Sequence ids *are*
   needed for reconnection resync — but that exists on any transport and the
   full-state-dump-on-connect already solves it.
3. **The no-TURN failure mode is symmetric NAT, not VPNs.** VPNs are usually
   neutral. Symmetric NAT is common on institutional and CGNAT networks, plausibly
   including gurdwaras — "90% works" means 10% get a feature that silently never
   connects with no diagnostic.

Payload sizes: a line change is ~10 bytes; a full shabad broadcast is single-digit
KB, a few dozen times per programme. A trickle of small JSON, not a media stream.

## Decision

Build a **plain WebSocket relay** first. Measure real hosting cost at small scale
before wide rollout. Do not build WebRTC now; revisit only if measured cost is a
genuine constraint. CLAUDE.md's "one protocol, two transports" is satisfied
literally — LAN-direct and relay carry identical messages.

## Consequences

- We host and pay for the data path. Expected negligible at this volume; that
  assumption is what the trial tests. If wrong, this ADR gets superseded.
- Relay traffic passes through our infrastructure — a privacy surface LAN-direct
  does not have. Must be stated plainly to users, and argues for end-to-end
  encryption rather than trusting the relay. **Open**, to be settled with the
  control-PIN design.
- Vastly less complexity than WebRTC: no ICE, candidate gathering, NAT
  classification, or STUN/TURN operations; one code path. This is the main reason.
- Relay latency is 100–300ms versus ~1ms on LAN. Not a transport problem to solve,
  but it breaks an assumption in the current client — see [ADR-0004](0004-concurrent-line-control.md).
- Everything is additive: LAN-direct stays primary and works with no relay involved.

## Rejected

- **WebRTC DataChannel, TURN disabled** — rejected on complexity, not correctness.
  Three stated advantages did not survive (above) and it strands symmetric-NAT
  users with no fallback.
- **WebRTC with TURN fallback** — the honest version, and it would cover those
  users, but it means hosting TURN *and* signaling *and* maintaining two
  transports. Strictly more work than the relay it was meant to avoid.
- **No relay; document port forwarding / VPN** — pushes network administration
  onto volunteers at each gurdwara, contrary to why the LAN feature works at all.
