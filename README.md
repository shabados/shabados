<img src="https://raw.githubusercontent.com/shabados/presenter/dev/resources/icon.png" width="96" alt="Shabad OS">

# Shabad OS

Shabad OS is free, open-source software built by and for the Sikh sangat — a presentation app for projecting shabads in gurdwaras and live streams, a digital corpus of Sikh scripture and Panthic texts, and the text-processing tools underneath both. It exists so that gurbani is accurately, transparently, and freely accessible to anyone who wants to build with it.

All Shabad OS development happens in this repo.

## Packages

| Path | Description | Published as | Docs |
| --- | --- | --- | --- |
| `apps/presenter` | Electron app that projects shabads onto screens/TVs in gurdwaras and live streams | — (desktop release) | [shabados.com/support](https://www.shabados.com/support/install-shabad-os-presenter/) |
| `apps/web` | shabados.com marketing + reader site | — | — |
| `apps/library` | Electron desktop reference/library app | — (desktop release) | — |
| `packages/gurmukhi` | Rust core + bindings for converting, analyzing, and transliterating Gurmukhi text | [crates.io: `gurmukhi`](https://crates.io/crates/gurmukhi), [npm: `gurmukhi`](https://www.npmjs.com/package/gurmukhi), [PyPI: `gurmukhi`](https://pypi.org/project/gurmukhi/), [RubyGems: `gurmukhi`](https://rubygems.org/gems/gurmukhi), Gradle `com.shabados:gurmukhi`, SPM | [package README](packages/gurmukhi/README.md) |
| `packages/sant-lipi` | Unicode Gurmukhi font | TBD | — |
| `database` | Gurbani + Panthic text corpus (154k source JSON files) built into SQLite | [npm: `@shabados/database`](https://npmjs.org/package/@shabados/database) | [database docs](database/docs) |
| `brand` | Logos and design assets | — | — |

## Getting started

```shell
git clone --filter=blob:none https://github.com/shabados/shabados.git
cd shabados
mise install
bun install
```

`apps/presenter` is npm-managed, not a bun workspace member — `cd apps/presenter && npm install` (see its own `CONTRIBUTING.md`) separately; root `bun install` doesn't cover it.

`--filter=blob:none` fetches history without downloading every historical blob up front — worth it here since some components carry deep history. If you don't touch `database/`, skip its 600MB+ `collections/` corpus (154k JSON files) with sparse-checkout:

```shell
git sparse-checkout set --no-cone '/*' '!database/collections'
```

Run this after cloning (or after `git clone --no-checkout` + `git sparse-checkout init --no-cone`, if you also want to avoid ever fetching those blobs). See [docs/architecture.md](docs/architecture.md) for the full sparse-checkout story and the rest of the monorepo layout.

## Links

- [shabados.com](https://www.shabados.com/) — the project's home
- [Docs](https://docs.shabados.com) — guides, API reference
- [Slack](https://chat.shabados.com/) — community chat
- [Instagram](https://www.instagram.com/shabad_os/) · [Twitter/X](https://twitter.com/shabad_os/)

## License

Code is [MIT licensed](LICENSE) unless a package states otherwise (`packages/gurmukhi`, `database`) — check each package's own `LICENSE`/`LICENSE.md`. Gurbani and Panthic text under `database/collections` follows a separate notice in [`database/README.md`](database/README.md#gurbani-and-panthic-compositions): public domain, but derogatory alteration of the source text is not.
