# Contributing

Issues and pull requests are welcome. Indonesian and English are both fine.

## Setup

```bash
pnpm install
pnpm dev
```

`pnpm test` covers the session rules in `src/session`. Those tests check decisions a packer can see: a receipt goes in, a decision and a filename come out. Do not assert private helper structure.

`pnpm typecheck`, `pnpm lint`, and `pnpm build` must pass before a pull request is merged. GitHub Actions runs those plus `pnpm test`. Playwright does not gate a release.

## Clean room

Do not copy source from closed packing-video products, including paid Electron apps. Copy the workflow idea only: scan, speak, record, name the file from the receipt, stamp the time, let the next scan close the previous clip.

Components from the shadcn registry are copied into this repo with the CLI and committed. Do not vendor the whole shadcn repository, and do not pull `main` on every build.

## License

By contributing, you agree that your contribution is licensed under AGPL-3.0, the same license as the rest of the repository. There is no separate contributor license agreement.
