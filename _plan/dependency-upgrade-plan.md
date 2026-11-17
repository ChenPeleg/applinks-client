# Dependency and Node.js Upgrade Plan

Date: 2026-11-17  
Status: proposal; no dependency or application changes made

## Goal

Bring the project’s JavaScript development toolchain and Node.js runtime baseline up to supported versions, while keeping the client behavior and release output unchanged. Upgrade the development dependencies first; add or change runtime dependencies only if the inventory proves they are needed.

## Current baseline

- `package.json` declares Node `18` and has no production `dependencies`.
- The direct development dependencies pinned by `package-lock.json` are ESLint `8.28.0`, `eslint-config-prettier` `8.5.0`, `eslint-plugin-prettier` `4.2.1`, and Prettier `2.7.1`.
- The npm lockfile is version 2.
- CI tests only Node 18.x, and both workflows use `actions/checkout@v3`; CI also uses `actions/setup-node@v3`.
- The lint script runs `eslint --fix js/*.js`, but the repository’s JavaScript sources are under `src/`, `tests/`, and `utils/`. It also modifies files, which is not appropriate for a CI check.
- The build script points at `bundler/bundler.js`, which is not present in the repository. Treat build-script repair as a separate decision unless a build is required to validate a dependency change.

## Plan

1. **Establish the real baseline**
   - Inventory all direct and transitive npm packages from `package.json` and the lockfile; record their current and supported versions at implementation time.
   - Run `npm ci` and `npm test` on the existing Node baseline before changing anything.
   - Resolve the lint command’s source paths and make its check mode non-mutating before using it as an upgrade gate. Confirm whether the missing build entry point is in scope; do not invent a replacement bundler as part of a dependency update.
   - Confirm whether any repository configuration, scripts, or CI jobs rely on Node 18-specific behavior.

2. **Choose and align the Node.js/npm baseline**
   - Select the latest active Node.js LTS line that supports the project and its dependencies when the work starts. Document the minimum supported Node version and the CI test versions.
   - Replace the exact `18` engine declaration with an intentional supported-version range, and use the same policy in CI.
   - Decide on one optional local-version pin (`.nvmrc` or `.node-version`) only if it improves contributor consistency; avoid maintaining conflicting pins.
   - Use the npm version bundled with the chosen Node line unless a specific lockfile or CI requirement justifies another version.

3. **Upgrade the development dependencies**
   - Upgrade ESLint, its Prettier integration packages, and Prettier as a compatible set. Check the current ESLint configuration format and migrate it only if required by the chosen ESLint major.
   - Review all transitive packages and update the lockfile through npm; avoid hand-editing lock entries.
   - Keep dependencies development-only. Do not add a TypeScript compiler or unrelated tooling solely because a TypeScript config file exists.
   - Review any additional packages discovered during the inventory, upgrading only packages that are actually used or required by the selected toolchain.

4. **Update CI and release workflow tooling**
   - Move `actions/checkout` and `actions/setup-node` to supported major versions, checking their Node runtime requirements and current GitHub Actions guidance at implementation time.
   - Keep npm caching configured through `setup-node` and verify that lockfile-based cache invalidation works.
   - Test the selected Node LTS baseline in CI; include another Node version only if the project explicitly intends to support it.
   - Keep release behavior unchanged and confirm that the release workflow still runs on its existing tag trigger.

5. **Validate in small, reviewable groups**
   - Install from a clean state with `npm ci` using the selected Node/npm versions.
   - Run the full `npm test` suite on the minimum supported Node line and the primary LTS line.
   - Run lint in non-fixing mode and run Prettier in check mode over the intended source/config files. Review any formatting or lint changes separately; do not apply broad autofixes without inspecting the diff.
   - Confirm the package/lockfile are consistent, CI workflow syntax is valid, and no new production dependency was introduced inadvertently.
   - Compare test results and generated/released client content with the pre-upgrade baseline for unintended behavior changes.

## Completion criteria

- The supported Node range is explicit and matches CI.
- All used direct and transitive packages resolve from a clean install with a current lockfile.
- Tests and non-mutating lint/format checks pass on the agreed Node versions.
- The release workflow and client output retain their existing behavior.
- Any unresolved build-script issue is documented separately rather than hidden by the upgrade.

## Out of scope

- Implementing the upgrades in this change.
- Refactoring the client or changing its API/runtime behavior.
- Adding a bundler, migrating package distribution, or introducing new runtime dependencies without a separate requirement.
