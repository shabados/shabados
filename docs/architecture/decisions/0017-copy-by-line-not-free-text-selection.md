# 17. Copy by line; no free text selection

2026-11-10 · **Accepted** (2026-11-10)

Behaviour: [display-controls.md](../../requirements/display-controls.md#copying),
[reading-shell.md](../../requirements/reading-shell.md#getting-between-them).

## Context

The iOS reader made every line selectable with the platform's own text selection
(`.textSelection(.enabled)`): a long press placed a selection with drag handles and a
loupe. Its long press is the system's own recogniser, which runs beside the pinch.
A finger held still during a pinch started a selection, with handles over the text,
in the middle of reading (iPhone, 2026-11-10).

The text is lines, not prose. What a person copies is a line or a run of lines,
never half a word or the end of one line and the start of the next. Android's
reader never had free selection; the web and desktop reader is not built.

## Decision

**No free text selection in the reader, on any platform.** No long press that
selects, no drag handles, no loupe, no select-all over the reader's text.

**Copying is by whole lines**, through one of two routes:

- **A line's context menu**, holding Copy among the line's actions.
- **A select mode**, in which whole lines are picked and then copied.

Neither is built yet. Which comes first, how each is opened, and what else a
line's menu holds are open ([display-controls.md](../../requirements/display-controls.md#copying)).
Until one is built the reader has no way to copy.

Per platform:

- **iOS and iPadOS:** no `.textSelection` on reader text.
- **Android:** no `SelectionContainer` around reader text.
- **Web and desktop:** reader text is `user-select: none`, and a right-click opens
  the line's context menu once there is one, not the browser's.

## Consequences

- **A pinch can no longer start a selection**, whichever finger lands first.
- **The copy rules stay as they are**: what is copied matches the display, Continuous
  copies without spaces, and the mool mantar copies as one span. They now apply to
  whole lines, which is all they ever needed.
- **A long press on a line is free for its context menu.** The tap stays a
  simultaneous gesture on iOS, so a long press on the row never delays it.
- **Removed, for now: copying any text from the reader on iOS.** It comes back
  with the line's context menu or the select mode.

## Rejected

- **Turning selection off only during a pinch.** That keeps the pinch from starting
  one, but not a finger that rests before the second lands. It also keeps handles that
  can select half a line, which no use calls for.
- **Making the selection's long press wait for the pinch to fail.** SwiftUI does
  not expose that recogniser. Reaching it through UIKit's view tree breaks between
  iOS releases.
