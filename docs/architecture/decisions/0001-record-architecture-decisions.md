# 1. Record architecture decisions

2026-08-25 · **Accepted**

## Context

CLAUDE.md already treated this directory as authoritative, but it did not exist —
decisions were being made in chat and lost. Maintenance is by agents that cannot
ask the author, so an unrecorded reason is a decision that gets reversed by
whoever next finds it inconvenient.

## Decision

Record architecturally significant decisions here, numbered sequentially.
Significant = expensive to reverse: protocol shape, transport, data ownership,
what is a source of truth, what gets removed. Library choices and file layout are
not, unless they lock in one of those.

Template — `# N. Title` / date + status line / **Context** (why this was a
question) / **Decision** / **Consequences** (including the bad parts; an ADR with
no downsides listed is unfinished) / **Rejected** (what else was on the table and
why it lost — the section future maintainers actually need).

**Status discipline.**

- **Needs discussion** — question framed, options laid out, nothing decided and
  nothing pushed. May carry a *Leaning*, which is explicitly not a recommendation.
- **Proposed** — a specific decision is on the table, awaiting sign-off.
- **Accepted** — build against this.

Build only against Accepted. Writing code that assumes an answer is how an
undecided question becomes decided by whoever implemented first.

Supersede by writing a new ADR that references the old one. Never edit an old ADR
into a different decision — the record of what we believed and when is the point.

## Consequences

- A small tax per significant change; far smaller than re-litigating in three years.
- Overlap with `requirements/` and `protocol/` is resolved by role: ADRs record
  *why we chose this*, requirements *what must be true*, protocol *what crosses
  the wire*. If two disagree, that is a bug in one of them — name which.

## Rejected

- **A single running decisions log** — no way to mark one entry superseded, and
  no stable anchor to link from code comments.
- **Decisions in PR descriptions only** — not findable in five years, and GitHub
  is not the archive of record for a project that must outlive its hosting.
