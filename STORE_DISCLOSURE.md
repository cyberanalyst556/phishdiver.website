# Chrome Web Store — Obfuscated Code Disclosure

Required by the [Chrome Web Store Developer Program Policies](https://developer.chrome.com/docs/webstore/program-policies)
(obfuscation must be disclosed with a policy reason in the "Additional notes to
reviewer" field). Paste the block below into that field on every submission.

---

## Reviewer note (copy-paste this)

**Obfuscated code:** `lib/license.js`

This extension contains one obfuscated file: `lib/license.js`. It is the
entitlement / license-key client used to gate "Pro" features (webmail scanning,
attachment analysis, QR decoding, and the on-device AI). It verifies
locally-issued signed license tokens (Ed25519) with the WebCrypto API and
handles activation + periodic refresh.

**Why it is obfuscated (policy reason):** license enforcement / anti-tampering.
The activation path is obfuscated to add friction to casual inspection and
license bypass. This is the *only* obfuscated file in the package; all other
JavaScript is standard minified code only.

**Important (current build):** licensing is currently **DISABLED** in this
submission. No license server URL and no verification key are embedded, so the
`LICENSING_ENABLED` flag is false and the entitlement client is an inert stub —
it returns a static build-time claim and makes **no network requests** and
collects no data. Obfuscation is applied consistently across builds (disabled
and future enabled) so the release pipeline behaves identically.

**Assurances:**
- No remotely fetched code. All code ships inside the extension package; the
  license client only talks to a documented HTTPS endpoint when licensing is
  enabled, and never to a hidden/third-party server.
- No data collection by the obfuscated code. It stores only the user's own
  license token and a locally generated device id.
- The obfuscated file performs no privileged API access beyond
  `chrome.storage.local` and standard `fetch`/`crypto.subtle`.
- All outbound lookups in the extension (including the WHOIS/RDAP domain-age
  checks) go to **public data sources only** — registry RDAP servers, the
  rdap.org aggregator, the free public WHOIS page who.is (used as a last resort
  for registries without RDAP), public DNS-over-HTTPS, certificate-transparency
  logs, and public threat/blocklists — and send only the URL, IP, or domain
  being evaluated. All information read is publicly available data; nothing
  private is ever sent.

---

## Supporting detail (for internal reference, not pasted)

- File: `lib/license.js` — entitlement client (Ed25519 token verify, offline
  grace, refresh). Obfuscated by `tools/build-release.mjs` step 4
  (`javascript-obfuscator`, `stringArray` + `base64` encoding, no
  control-flow/dead-code injection).
- Config: `tools/release-config.json` — `publicKey` empty, `serverUrl` empty →
  `LICENSING_ENABLED=false`, `ACTIVE=false`.
- Verify current state: `lib/license.js` lines 28-30 (`LICENSING_ENABLED`,
  `LICENSE_SERVER`, `EMBEDDED_PUBLIC_KEY`). With `ACTIVE=false`,
  `getEntitlement()` returns `{ pro: true }` statically; `activateLicense()` and
  `startCheckout()` short-circuit without any network call.
- Source (unobfuscated) lives in the repo at `lib/license.js` and is what
  appears in developer-mode unpacked installs.

## Re-submission checklist

- [ ] Paste the reviewer note above into "Additional notes to reviewer"
- [ ] If `tools/release-config.json` ever gets a `publicKey`/`serverUrl`
      (licensing enabled), update the note's "current build" paragraph before
      resubmitting — the disabled-state claim will no longer be true.
