# Keyboard

Draft, 2026-08-25. Open questions at the end are blocking — do not guess them.
Governs binding style and focus ownership app-wide; navigation's specific
assignments are in [navigation.md](navigation.md).

## Binding principles

**Prefer single keypresses. Use modifiers deliberately, not by default.** v2 puts
nearly everything behind a chord — all 11 copy bindings are `ctrl+c` sequences,
every global shortcut is `ctrl`+key. That is the pattern being moved away from,
but modifiers are not eliminated. They earn their place in three cases:

1. **Rare actions.** Addressing a second or third rahao is the example: `r` covers
   ordinary use and `shift`+digit handles the exception without spending a bare key.
2. **Dangerous actions.** Where an accidental press would be costly, the modifier
   *is* the safety — a deliberate two-handed gesture is the point.
3. **Platform convention.** Copy stays `ctrl+c` because that is how copying works
   in every application the operator has used. Muscle memory carried in from
   outside is a strong reason to keep a chord; overriding it is novelty at the
   user's expense.

The design question for a new binding is not "is a modifier available" but **"is
this common and safe?"** If yes, a single key.

## Focus ownership

Single-key bindings and text inputs compete for the same keystrokes, so the app
must be explicit about which context owns the keyboard. This cannot be left to
whatever happens to have DOM focus.

**A focused text input owns printable characters and text editing. It does not own
selection and activation.** While a search input is focused: typing goes into the
input; **`up`/`down` move the selection through results**, not the text caret; and
**`enter` activates the focused result**. This is the requirement, not incidental
behaviour to be preserved by accident — an operator searching mid-kirtan types,
arrows to the right result, and presses enter without touching a mouse or thinking
about focus. v2 achieves it by force-refocusing the input on blur and intercepting
arrows before the input sees them; the behaviour is right, the implementation is
an open question.

Every navigation binding moved from a chord to a bare character increases the
overlap between navigation keys and typing keys. The direction is correct, but it
raises the cost of getting focus ownership wrong — focus must be a designed,
testable property, not an emergent one.

## Escape, and moving clear-display off it

**`escape` means "back out one level." It never touches the projection.** From
search, `escape` closes search entirely rather than leaving the input defocused
with the view still open — that intermediate state is ambiguous, since the
operator sees results but their keypresses belong to the presenter behind it and
nothing on screen says so. `/` opens and focuses search, the convention operators
already know from browsers, editors, and chat apps.

The model: **one view owns the keyboard at a time, and `escape` exits the current
view.** Every key has exactly one meaning at any moment, determined by which view
is open, which makes the keymap testable.

**Clear-display does not belong on `escape`.** v2 binds it there, which combined
with the above puts a cleared projection **two escape presses** from a focused
search box — and mashing escape to back out of something is one of the most
ingrained reflexes a computer user has. In front of a congregation that is the
wrong thing under an over-pressed key.

Clearing is frequent and legitimate (between shabads, during ardaas), so it stays
a bare keypress. **Recommendation: bind it to `b`** — `b` is free (v2 used it for
autoselect, now `space`), **presentation remotes emit `b` for blank-screen** so
remotes work with no remapping, and it keeps `escape` purely navigational so the
reflex is harmless. Clearing stays instantly reversible either way, so this is
about removing a foot-gun, not treating clear as dangerous.

**Open:** existing operators have `escape`-to-clear in muscle memory. Rebinding is
a retraining cost needing a migration note, or a transitional period where both
work.

## Open questions

1. **Is the search query preserved** when `escape` closes search? An operator who
   backs out and reopens with `/` almost certainly wants their query. v2 kept it
   in URL state.
2. **What owns `left`/`right` while a text input is focused?** v2 binds them to
   previous/next line, but in an input they move the caret — unlike `up`/`down`
   there is a genuine competing text-editing meaning.
3. **What owns `tab`?** v2 binds `tab`/`shift+tab` to next/previous line. `tab` is
   the platform's focus-traversal key and reassigning it has real accessibility
   consequences.
4. **What owns `home`/`end`?** Text navigation within an input, or line
   navigation? Also relevant to presentation remotes, which emit them.
5. **Which window owns global hotkeys** when the controller is popped out into its
   own always-on-top window and the display is in another? v2 tracks window focus
   with a platform split — `focus` on macOS, `click` elsewhere. Needs a stated rule
   rather than a workaround.
6. **Is there a modal or capture mode** — anywhere the app deliberately takes the
   whole keyboard, such as recording a new hotkey binding? v2 has that dialog; it
   needs describing in these terms.
7. **Presentation remotes** emit `PageUp`/`PageDown` — first-class bindings, or is
   the operator expected to remap? (Their blank-screen `b` is handled above.)
