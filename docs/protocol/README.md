# Protocol

**Status: not yet written.** Read
[ADR-0009](../architecture/decisions/0009-requirements-are-the-contract.md) first —
it scopes this directory more narrowly than CLAUDE.md's original framing.

- **Behavioural requirements live in [`../requirements/`](../requirements/)** and
  are the source of truth.
- **This directory holds the wire contract**: message *semantics* (derived from
  requirements, reviewed by humans) and message *schemas* (generated from the
  implementation, pinned at a release boundary, validated against `fixtures/`).

Schemas here are **generated artifacts, not hand-authored source.** Do not write
one before the requirement it serves exists.

## What belongs here

The behavioural contract between a Shabad OS server and its clients, transport
independent — LAN-direct and relay carry identical messages, so nothing
transport-specific belongs here.

- **Message catalogue** — every client→server and server→client message, its
  payload shape, and when it is sent. Backed by JSON Schemas with fixtures.
- **Session state model** — what a session owns, what is broadcast on connect,
  what a late-joining client receives.
- **Concurrency rules** — from [ADR-0004](../architecture/decisions/0004-concurrent-line-control.md):
  absolute ids, idempotent activation within a window, the server's broadcast is
  authoritative. Contract, not implementation detail — belongs here once that ADR
  is Accepted.
- **Reconnection and resync**, including the sequence-id question reconnection
  raises on any transport.
- **Addressing** — view modes and named overlay routes from
  [ADR-0002](../architecture/decisions/0002-view-modes-and-overlay-endpoints.md),
  including unknown-overlay-name behaviour and overlay identifier naming rules.
- **Auth** — the PIN gate distinguishing viewing from control. Note the deliberate
  asymmetry: local viewing stays unauthenticated.

## Writing order

Do not write this spec by transcribing v2's messages
([presenter-capabilities.md §17](../presenter-capabilities.md) catalogues them).
Several encode decisions being reversed — closed captions, the single global
overlay, the four duplicated language configurations. Write the contract from the
decisions in [`../architecture/decisions/`](../architecture/decisions/), and use
the v2 catalogue only to check that nothing real got dropped.
