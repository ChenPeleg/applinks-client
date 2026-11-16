# Plan: a better way to get the app-links client into the apps

Date: 2026-11-16 · Status: proposal, nothing implemented yet

## 1. How it works today

- `applinks-client` holds one 1,339-line file, `src/client.js` (about 51 KB unminified). It contains three
  things: the floating panel UI (`ApplinksPanel`, roughly the first 640 lines, mostly inline SVG and CSS), the
  HTTP helpers (`APPLinkUtils`), and the client itself (`APPLinksClient`).
- A tag push runs `.github/workflows/release.yml`, which attaches `src/client.js` to a GitHub release as
  `applinksClient.js`.
- Each app gets the client by **copying that file into its own source tree**. A code search of the account
  finds copies at `effects/src/provider/appLinksClient.js` and `Assembly-x86/src/app/provider/appLinksClient.js`.
  Assembly-x86 also carries a hand-written `applinksClientTypes.ts` next to it.
- `app-links-portal` is the deploy pipeline: it clones an app repo, runs `npm ci` and a build command, and
  deploys the output to a Firebase Hosting site (`sidur-nesiot`, `assembly-86`, `birds-of-israel`, `shmira`,
  `33010-demo`, `sound-effects`, `sorcery`). So every deployed app already has an npm build step.
- The backend lives at `https://apps-links.web.app` (`api/appRecord`, `api/refreshToken`, `api/logout`,
  `site/app-login`). Its source is in neither repo, so this plan treats it as fixed unless an option says otherwise.

I could not read the app repos from this session (only these two were in scope), so the statements about them
come from file paths in search results, not from their contents.

## 2. What is wrong with copying the file

1. **Copies drift, and the drift flows backwards.** The last two commits here are "changes from 86x0" and
   "from assembly": fixes were made inside an app's copy and pasted back by hand. There is no way to tell which
   version an app is running. The release workflow has a commented-out line that would have stamped the tag
   into the file.
2. **A fix needs N manual copies plus N redeploys**, one per app.
3. **Types are maintained twice.** The JSDoc in `client.js` and the hand-written `.ts` file in Assembly-x86
   describe the same API and can disagree.
4. **Every app ships the panel**, including its icons and CSS, even if it sets `useClientPanel: false`.
5. **The repo is not set up to be consumed any other way.** `package.json` has no `version`, `exports` or
   `files`; `npm run build` points at `bundler/bundler.js`, which does not exist; `npm run lint` targets
   `js/*.js`, which does not exist; `README.md` is empty. The newest release, `v0.18`, predates the last three
   commits on `main`, so the published file is already behind the source.

## 3. Options

### Option A — Keep copying, but make it scripted and versioned

Keep the file in each app's source, and replace the manual copy with a small script in each app
(`npm run update-applinks`) that downloads the release asset for a pinned tag. Stamp the version into the
file at release time and expose it as `APPLinksClient.version`.

| | |
|---|---|
| For | Smallest change. No registry, no account, no new runtime dependency. Works for an app with no bundler. Each app stays pinned until you choose to update it. |
| Against | The copy is still editable in place, so drift is discouraged but not prevented. Still one commit and one redeploy per app per fix. Types still need a second downloaded file. Nothing tells you an app is behind. |
| Effort | About an hour here, plus ten minutes per app. |

### Option B — Make it a real package and install it with npm (recommended)

Turn this repo into an installable package. Apps declare it in `package.json` and import it:

```js
import { APPLinksClient } from 'applinks-client';
```

There are three ways to host the package, and they can be changed later without touching app code:

| Source | Install line | Trade-off |
|---|---|---|
| Git tag | `npm i github:ChenPeleg/applinks-client#v1.2.0` | Nothing to publish and no account. Needs this repo to stay public (or the deploy job needs a token). No semver ranges, so Dependabot/Renovate support is weaker, and `npm outdated` does not help. |
| npmjs.com, public | `npm i applinks-client` | Semver ranges, `npm outdated`, Dependabot PRs in every app. Free CDN copies on jsDelivr and unpkg come with it (see Option C). Needs an npm account and a publish token in this repo's secrets. The name is public forever. |
| GitHub Packages | `npm i @chenpeleg/applinks-client` | Stays inside GitHub. Every install, including the portal's `npm ci`, needs an auth token and an `.npmrc`, even for a public package. This is the most friction of the three. |

| | |
|---|---|
| For | One source of truth; the copy in `node_modules` cannot be edited by accident. The lockfile says exactly which version each app runs. Types ship with the package, generated from the existing JSDoc, so the hand-written `.ts` file goes away. Subpath exports let a game skip the panel. It fits the existing pipeline, since the portal already runs `npm ci` for every app. |
| Against | Still one version bump and one redeploy per app per fix (Dependabot can open those PRs). You have to tag releases properly. An app with no build step cannot use it directly (it can use Option C). |
| Effort | Half a day here, then about fifteen minutes per app to swap the copied file for the import. |

I checked that type generation works: `tsc --allowJs --declaration --emitDeclarationOnly` on `src/client.js`
produces a 326-line `client.d.ts` with `APPLinksClient`, `ApplinksPanel`, `UserData` and `RecordData`. It also
reports eight JSDoc type errors at lines 1198, 1246 and 1333 (`APPLinksClient.ApplinksClientEvents[...]` used
as a type namespace). Those need fixing as part of this option.

### Option C — Load the client from a URL at runtime

Apps do not contain the client at all. They import it from a URL:

```js
import { APPLinksClient } from 'https://apps-links.web.app/client/v1/applinks-client.js';
```

The file can be served from the backend's own hosting, or from jsDelivr, which serves any GitHub tag
(`cdn.jsdelivr.net/gh/ChenPeleg/applinks-client@v1/...`) and any npm package without setup.

| | |
|---|---|
| For | A fix reaches every app at once with no app redeploys. This is the only option that removes the per-app work. Works for a plain HTML game with no build step. The client and the backend can be released together, so they cannot fall out of step. Shared browser cache entry per app visit is small. |
| Against | A bad release breaks every app at once, and there is no lockfile to roll one app back. A URL like `/v1/` that moves is unpinned by design. Apps that work offline or are installed as PWAs need the file in their service-worker cache. Bundlers need the import marked external, and TypeScript needs a separate types file or a `declare module` shim (Assembly-x86 would feel this). Any Content-Security-Policy in an app has to allow the host. If served from a third-party CDN, that CDN becomes a point of failure and of trust. Served from `apps-links.web.app` it adds no new dependency, because the apps already cannot save without that host. |
| Effort | Half a day: a build that writes versioned files, a hosting path with sensible cache headers, and one line per app. |

### Option D — Inject the client at deploy time from the portal

The portal's `build-for-deploy` action already clones and builds each app. It could download the current
client into a known path before the build, or add a script tag to the built `index.html`.

| | |
|---|---|
| For | No per-app version bumps: every deploy picks up the current client. No runtime dependency on a CDN. Central control in a pipeline you already own. |
| Against | The app repo no longer describes what it ships. Local development needs its own copy, which brings the drift back. It only helps apps deployed through the portal, and an app only updates when it is next deployed, so versions still differ between apps. A failure here is hard to trace from the app side. |
| Effort | Two hours, but it adds a hidden coupling I would not recommend on its own. |

### Option E — Move tokens and API calls into a hosted iframe ("bridge")

The app embeds a hidden iframe from `apps-links.web.app`. The iframe holds the tokens and makes the API calls;
the app talks to it with `postMessage` through a very small loader. Login, refresh and storage logic all live
on the backend's origin and update without touching the apps.

| | |
|---|---|
| For | Access and refresh tokens never sit in the app's own `localStorage`, where any script on the app's page can read them. The part inside each app shrinks to a thin, stable message protocol. Login and refresh fixes need no app change. |
| Against | It does not give single sign-on across the apps. Each app is on its own `*.web.app` subdomain, and `web.app` is on the Public Suffix List, so browsers treat each one as a separate site and give the iframe a separate storage partition per app. Safari and Firefox have done this for years and Chrome does it too. Getting shared login would need the Storage Access API (a user prompt) or putting all apps under one custom domain. It is the most work of all options and changes the backend's login page. Every save becomes an asynchronous message round trip. |
| Effort | Several days, including backend work I have not seen the source for. |

### Option F — Drop the custom client and use the Firebase SDK directly

The project is already a Firebase project (`app-links-portal`); the Realtime Database and Storage rules in the
portal repo currently deny everything. Apps could use Firebase Auth plus Firestore or Realtime Database with
per-user security rules, and this repo would shrink to a thin wrapper or disappear.

| | |
|---|---|
| For | No token handling, refresh logic or login popup to maintain. Offline persistence and live sync come built in. Security is enforced by rules instead of custom API code. |
| Against | The Firebase Auth and Firestore SDKs add far more to each app than the current 51 KB file. The custom backend, account pages and panel are thrown away or rebuilt. Existing saved records need migrating. Login is still per origin. It ties every app to Firebase's SDK versions. Whether this is a good trade depends on what the backend does beyond storing one record per user per app, which I could not see. |
| Effort | Days, plus a data migration. |

## 4. Comparison

| | A scripted copy | B npm package | C runtime URL | D deploy inject | E iframe bridge | F Firebase SDK |
|---|---|---|---|---|---|---|
| Drift between apps prevented | Partly | Yes | Yes | Partly | Yes | Yes |
| Fix without redeploying apps | No | No | Yes | No | Mostly | n/a |
| One app can stay on an old version | Yes | Yes | Only with pinned URLs | No | No | Yes |
| Types without a second file | No | Yes | No | No | Small shim | Yes |
| Works with no build step | Yes | No | Yes | Yes | Yes | With CDN build |
| Works offline / as PWA | Yes | Yes | Needs caching | Yes | Saves need network anyway | Yes |
| Blast radius of a bad release | One app | One app | All apps | Apps deployed after it | All apps | One app |
| Effort | Hours | Half a day | Half a day | Hours | Days | Days |

## 5. Recommendation

**Do Option B, published to npmjs.com, and get Option C for free from the same release.**

- All seven deployed apps already run `npm ci`, so a dependency costs them nothing new. It ends the
  copy-and-paste-back loop, which is the cause of the drift, and it removes the duplicate types file.
- Publishing to npm makes the same files available at `cdn.jsdelivr.net/npm/applinks-client@1/...`
  with no extra work. A future game with no build step can import from that URL, so one release serves both
  kinds of app.
- Start with the git-tag install if you do not want an npm account yet. Moving to npm later changes one line
  in each app's `package.json`.
- Options E and F are worth a second look only if you put the apps under one custom domain or decide the
  custom backend is not worth keeping. D I would skip.

## 6. Implementation steps for the recommendation

In `applinks-client`:

1. Fix `package.json`: add `version`, `description`, `license`, `repository`, `files`, `sideEffects: false`,
   and an `exports` map. Remove or repair the `build` and `lint` scripts. Raise `engines.node` from 18.
2. Split `src/client.js` into `src/panel.js`, `src/utils.js` and `src/client.js`, with `src/index.js`
   re-exporting everything. Make the panel an injected option or a lazy import, so
   `import { APPLinksClient } from 'applinks-client/core'` leaves the panel out.
3. Fix the eight JSDoc errors and add a `types` script that emits `dist/*.d.ts`. Replace the placeholder
   `tsconfig.json` (`outFile: justANameToMakeTSHappy.js`).
4. Add a small build (esbuild is enough) that writes `dist/applinks-client.min.js` as a single ES module for
   URL use, with the version stamped in and exposed as `APPLinksClient.version`.
5. Rewrite `release.yml`: on a `v*` tag run tests, build, `npm publish --provenance`, and attach the built
   file to the GitHub release. The current "Check if on main branch" step does nothing: on a tag push the ref
   is never `main`, and `exit 0` only ends that step, not the job.
6. Write the README: install, a minimal save/load example, options, events, and an upgrade note.
7. Have the client send its version in a request header (`X-Applinks-Client`), so the backend can log which
   apps are behind. This needs a matching CORS allow-header on the backend.

In each app (effects, Assembly-x86, then the others that have a copy):

8. `npm i applinks-client`, change the import, delete the copied file, and in Assembly-x86 delete
   `applinksClientTypes.ts`. Before deleting, diff the app's copy against `src/client.js` and bring any
   app-only fixes back here first.
9. Enable Dependabot for npm so version bumps arrive as PRs.

In `app-links-portal`: nothing has to change.

## 7. Client issues found while reading the code

These are independent of which option you choose, and are worth fixing in the same pass, because after
packaging every fix reaches the apps through a version bump instead of a manual copy.

1. **Login message is not origin-checked** (`src/client.js:1132-1168`). The handler accepts any object message
   posted to the popup, never compares `msg.origin` with the backend origin, and passes `clientConfig` from
   that message straight into `setConfigs`, which can replace `baseUrl`. After that the client would send
   tokens to whatever URL the message named. Check `msg.origin`, and do not let a message change `baseUrl`.
2. **Tokens are left behind on logout** (`src/client.js:1221`). A panel login writes the full user object,
   including token and refresh token, to a second `localStorage` key, `user-data`. `logoutClient` only removes
   `app-links-user-data`.
3. **`logoutClient` clears local state before the request succeeds** (`src/client.js:1173-1189`). If the
   request fails, storage is already cleared but `#UserData` stays set, so the panel says logged out while the
   client still holds tokens.
4. **A non-object message rejects the login promise** (`src/client.js:1136-1138`). Any stray message, for
   example from a browser extension, fails the login. It should be ignored instead.
5. **`debounceSave` drops errors silently** (`src/client.js:1095`): `.then()` with no `catch` produces an
   unhandled rejection, and the app never learns the save failed.
6. **`loadSavedRecords` emits `UserRecordLoaded` before the retry** when the token had expired
   (`src/client.js:1013-1019`), so listeners receive a "loaded" event carrying the 440 response.
7. **The constructor's default options are all-or-nothing** (`src/client.js:911-920`). Passing
   `{ useClientPanel: true }` replaces the whole default object, so `useLocalStorage` becomes `undefined` and
   the session is not restored. Merge with defaults instead.
8. **`appId` is put in the login URL without encoding** (`src/client.js:1106`).

Tests currently pass (9 of 9), but they cover only record loading and saving; login, logout and refresh have
none.

## 8. Decisions needed from you

1. npmjs.com, or git-tag installs to start with?
2. Package name: `applinks-client` unscoped, or scoped under your npm user?
3. Are there apps with no build step today? If so, the URL build in step 4 moves up in priority.
4. Should the panel stay bundled by default, or become opt-in through a separate import?
