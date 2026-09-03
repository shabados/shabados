# Shabad OS Connect

Draft, 2026-08-25. Open questions at the end are blocking — do not guess them.

How devices find each other and share a session. Replaces v2's arrangement, where
the desktop app always served and the operator read an IP address off an About
screen and typed it into another device.

## Roles

Every platform can be a **host**, a **client**, or both. No privileged device type.
Hosting is a **mode you turn on**, not a property of being installed:

| Platform | Hosting default |
| --- | --- |
| Desktop (macOS / Windows / Linux) | **Autostart on**, user-disableable |
| Mobile (iOS / Android) | **Off**, user-enabled per session |

Desktop defaults to hosting because that is nearly always why it is installed — it
is the machine attached to the projector. Mobile defaults off because a phone is
usually joining someone else's session, and because hosting on a phone has real
costs to opt into.

**Enabling hosting on iOS requires explanation, not just a toggle.** It only works
while the app is foregrounded and the display is on
([ADR-0011](../architecture/decisions/0011-distribution-channels.md)). Turning it
on must say plainly that the screen stays awake, that switching apps disconnects
everyone, and what the battery cost is — rather than silently enabling something
that fails ten minutes into a programme. While hosting, the state must be visible
at a glance so nobody backgrounds the app without knowing what it costs.

## Discovery

**Manual IP entry is a last resort, not the primary path.** The ordinary
experience is: open the app, see the other device by name, tap it.

1. **Local discovery** — hosts advertise over mDNS / Bonjour / NSD; clients show a
   live list of **device names** and joining is one tap. The default, and should
   cover almost everyone.
2. **QR code** — the host displays a code, the client scans and joins. Covers
   networks where mDNS is blocked, and is faster than reading a name off a list
   when several devices are present.
3. **Relay** — `relay.shabados.com`, for clients not on the same subnet
   ([ADR-0003](../architecture/decisions/0003-relay-transport.md)).
4. **Manual address entry** — always available, never the thing a user is expected
   to reach for.

**The host works out how it is reachable and presents the best option unasked:**
check internet reachability, check for a local network, then present the
appropriate join method — a LAN address as a QR code when there is a local
network, a relay join method when there is internet.

**LAN-direct wins when both are available**: lower latency, no dependency on our
infrastructure, and it keeps working if the internet drops mid-programme. Relay is
offered *in addition*, for clients that cannot reach the LAN. Both can be
advertised simultaneously; this is about which is presented first.

## Control requires a PIN; viewing does not

From [ADR-0003](../architecture/decisions/0003-relay-transport.md): local viewing
stays unauthenticated — that openness is the feature. Taking **control** requires
a PIN. This is the first time the app distinguishes the two privilege levels.

## Open questions

1. **What does the QR code contain?** A URL that joins directly is obvious, but on
   mobile it must deep-link into the app rather than opening a browser — universal
   links / app links, plus a fallback for people who scan with a generic camera app
   and have no app installed.
2. **Does the QR carry the PIN?** Convenient, and defensible on a LAN where
   scanning means being in the room. Questionable for relay, where a code can be
   photographed or forwarded and grants control to whoever receives it. The answer
   may differ by transport.
3. **What is a "device name"?** v2 used reverse-DNS hostname falling back to IP,
   producing things like `DESKTOP-4F2K1A`. A user-set friendly name is far better
   for a list people pick from, but it needs a default that is not confusing when
   three devices are unnamed.
4. **What happens when mDNS is blocked?** Common on managed institutional Wi-Fi,
   which describes a lot of gurdwaras. Does the app detect it and promote the QR
   path, or does the user discover the failure themselves?
5. **Can a session survive host loss?** If a hosting phone backgrounds, everyone
   drops. Does the session end, can another device assume the host role, or do
   clients reconnect when it returns? Interacts with
   [ADR-0004](../architecture/decisions/0004-concurrent-line-control.md).
6. **Can two hosts exist on one network?** Two halls, two programmes, one Wi-Fi.
   Discovery must not make joining the wrong one easy.
7. **How is the PIN presented and entered?** Displayed on the host, typed on the
   client, presumably — but rotation, expiry, and what happens on a projected
   screen where the PIN is visible to everyone all need answers.
