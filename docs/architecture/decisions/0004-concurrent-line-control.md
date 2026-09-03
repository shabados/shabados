# 4. Concurrent line control: absolute ids, optimistic advance, idempotent activation

2026-08-25 · **Proposed** — the idempotency rule is settled; optimistic local
advance needs confirming before implementation.

## Context

Multiple controllers can drive one session at once, and CLAUDE.md requires tests
for reconnection, late joiners, and two controllers issuing commands at once.

**v2 already sends absolute ids.** Line navigation does not send relative "next";
the client computes the target and sends its id
(`app/frontend/src/shared/NavigatorHotkeys.js:97` — `controller.line( lines[ currentLineIndex + 1 ].id )`).
Two operators on line 5 both compute 6 and both send `{ lineId: 6 }`; the session
lands on 6. **The feared "advances two lines" failure does not exist.** Same for
previous/next shabad, which send `orderId ± 1`.

**The real defect is the inverse.** The client computes from the last
*server-confirmed* `lineId`. Two presses inside one round trip both compute 6, so
the second press is **lost**. At LAN latency (~1ms) no human hits this; over the
relay ([ADR-0003](0003-relay-transport.md)) at 100–300ms a fast operator drops
presses regularly and experiences the app as unreliable mid-kirtan.

Duplicate activation also costs today: the same id twice re-broadcasts to every
client and rewrites the `viewedLines` timestamp. The history CSV is guarded
(`app/lib/History.js:61`), so damage is redundant traffic plus a wrong timestamp.

## Decision

Three rules, which only work together:

1. **Commands carry absolute ids, never relative intent.** `lines:current` names
   the line to activate; there is no "advance" command, so simultaneous clients
   converge rather than compound. State this in the protocol spec rather than
   leaving it an implementation habit.
2. **Clients compute from optimistic local position, not last-confirmed.** A local
   action advances the client's own view immediately and derives the next target
   from that, reconciling on broadcast. Rapid double-press yields 6 then 7; two
   operators pressing at once still both compute 6 and converge.
3. **Activation is idempotent within a short window.** The server ignores a
   `lines:current` naming the already-current line inside a debounce window,
   suppressing the redundant broadcast and the timestamp rewrite.

Absolute ids give convergence under concurrency; optimistic advance gives
responsiveness under latency. Absolute ids with confirmed-state computation *is*
the dropped-press bug; optimistic advance with relative commands *is* the
compounding bug.

## Consequences

- Clients need a reconciliation rule: **the server's broadcast always wins** and
  the client snaps to it. A visible snap beats two clients disagreeing about
  what is on screen.
- **Open:** the debounce window needs an actual number and a test. Too short and
  it does nothing over relay; too long and deliberate re-activation is swallowed.
- Optimistic advance means the controller can briefly show an unconfirmed line.
  **It must not apply to the projected display or overlay** — those render only
  confirmed state, or a dropped connection shows the congregation a line that was
  never selected.
- "Two controllers at once" becomes testable as a property of the message shape
  rather than of timing.

**Related bug, same path.** `findLineIndex` (`app/frontend/src/lib/line.js:14`)
memoizes on `lineId` alone (`normalizer: ( [ , lineId ] ) => lineId`), ignoring
the `lines` array. The same line looked up against a bani's list and its shabad's
list returns whichever index was cached first (cache of 5). Latent today, sits in
the navigation path — fix before or alongside this work, do not carry it forward.

## Rejected

- **Relative commands with server-side sequencing** — also correct and a smaller
  client, but it makes every command order-dependent, which is what gets fragile
  over a relay with retries and reconnects, and it reintroduces compounding if two
  commands arrive together. Absolute ids are inherently idempotent.
- **Server-side locking / a designated primary controller** — solves concurrency
  by forbidding it. Two people sharing control is a real pattern, and a lock held
  by a device that walked out of the room is worse than a conflict.
- **CRDT / operational transform** — vastly more machinery than "which line is
  showing" warrants. A last-write-wins register with absolute ids is the right
  size for this data.
