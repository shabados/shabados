# 9. Requirements are the contract; payload shapes are derived

2026-08-25 · **Proposed**

## Context

CLAUDE.md says "the protocol spec is the contract" and that `docs/protocol/`
defines behaviour, and an earlier assessment treated missing JSON payload schemas
as a blocking gap. That conflates two things with different lifetimes:

- **What the app must do** — search ranking, block navigation, what an operator
  can rely on. Stable across rewrites; still true in ten years when someone
  refactors onto whatever is native then.
- **The bytes on the wire** — derived from the above, and properly an
  implementation detail until two independently-versioned programs exchange them.

Hand-authoring schemas first inverts the dependency: it fixes an implementation
choice before the requirement it serves is written, and invites building to the
shape rather than the behaviour.

The qualification that keeps this from being wrong: **Presenter and Mobile ship
from separate release trains.** Gurdwaras update Presenter rarely — it lives on a
machine nobody touches while it works. A two-year-old Presenter talking to a fresh
Mobile over the relay is ordinary, not an edge case, and at that point the shape
is a contract whether or not anyone declared it.

## Decision

- **Requirements are the source of truth**, in [`docs/requirements/`](../../requirements/),
  stating what must be observably true without prescribing structure.
- **Payload shapes are derived during implementation**, not authored in advance.
- **Once inferred, a shape is published**, so it stops being one implementer's
  private choice. Publishing is what makes it real, not authoring it up front.
- **Shapes freeze at a version boundary.** Within a release train a shape is
  freely refactorable; at the boundary where independently-updating clients meet,
  the shape in effect is pinned in [`docs/protocol/`](../../protocol/) as a
  **generated artifact**. Changing a pinned shape is a versioned protocol change
  with a compatibility story, not a refactor.

So `docs/protocol/` holds two different things: message *semantics* (when a
message is sent, what it means, what invariants hold — derived from requirements,
reviewed by humans) and message *schemas* (generated, pinned, machine-checked
against fixtures).

## Consequences

- CLAUDE.md's "protocol changes require updated JSON Schemas and passing fixture
  validation" holds exactly as written; only provenance changes — schemas are
  generated and checked in, and fixture validation is what makes them trustworthy.
- An agent can be handed a requirement and produce a working implementation
  without waiting for a schema. This is the practical payoff.
- **Risk: two agents derive two different shapes for one requirement.** Mitigated
  only by the publishing step actually happening. If shapes are inferred and never
  published, this decision produces divergence instead of flexibility. Publishing
  is the load-bearing part, not the inference.
- **Open:** every pinned shape needs a compatibility policy — what an old client
  does with an unknown field, what a new client does against an old server.
  Settle before the first pin, not after.
- Requirements documents become the artifact that survives rewrites, which is the
  stated intent.

## Rejected

- **Schema-first: author JSON Schemas as the source of truth** — fixes structure
  before behaviour is agreed, and produces documents describing shape without ever
  stating why, which is what makes a ten-year-old spec useless to whoever
  refactors it.
- **No published shapes; every consumer infers independently** — works while one
  team ships everything at once, fails immediately with separate release trains
  and independent clients, which is the actual situation.
- **Version the whole protocol as one unit, renegotiated on connect** — viable and
  possibly still necessary for the relay, but heavier than needed for within-train
  changes. Revisit when the compatibility policy is written.
