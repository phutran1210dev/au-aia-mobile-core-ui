<!-- No `paths` frontmatter on purpose: a commit can follow an edit to any file, so this rule loads every session. -->

# Commits and releases

## Commits

- Conventional Commits, enforced by Lefthook's `commit-msg` hook, which runs commitlint with `@commitlint/config-conventional`.
- Format: `type(scope): subject`. Types: `feat`, `fix`, `perf`, `refactor`, `test`, `docs`, `style`, `build`, `ci`, `chore`, `revert`.
- Scopes: `theme`, `tokens`, `config-provider`, a component name such as `button`, `example`, `docs`, `deps`, `ci`, `release`.
- Subject in the imperative mood, lowercase start, no trailing period. Header and body lines stay within 100 characters.
- Breaking change (a renamed or removed public token, type or prop, or changed default behavior): `feat(theme)!: ...` plus a `BREAKING CHANGE:` footer.
- Syncing values from Figma: `fix(tokens): sync primary palette with DDS AU v2.0.11`.
- Pre-commit runs ESLint on staged files and `tsc`. Fix the cause; never use `--no-verify`.
- One logical change per commit. A public API change carries its code, tests and example screen in the same commit.
- Commit only after the user approves. Never amend or force-push shared history.

## Releases

- The package is `UNLICENSED` and must never reach the public npm registry.
- `yarn release` runs `release-it --only-version`. It asks for the version, bumps `package.json`, commits `chore: release x.y.z`, tags `vx.y.z` and creates a GitHub release with notes from conventional-changelog (angular preset). No CHANGELOG file is written.
- npm publishing is off (`release-it.npm.publish: false`) because `publishConfig.registry` is still a TODO placeholder. When the private registry URL is known, set it and turn publishing back on in the same commit.
- Run it only with explicit approval. Before proposing a release: clean tree on `master`, every check green, and `yarn prepare` builds `lib/`.
- The suggested bump follows the commits: `feat` gives minor, `fix` and `perf` give patch, a breaking change gives major.
