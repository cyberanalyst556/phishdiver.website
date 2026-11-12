# PhishDiver Website

Marketing and support site for the PhishDiver browser extension — on-device AI
phishing, scam, and malicious-link protection for email.

## Pages

| File                    | Purpose                                        |
| ----------------------- | ---------------------------------------------- |
| `index.html`            | Landing page — features, engines, pricing, scam library, FAQ |
| `checkout.html`         | Pro subscription checkout (Stripe)             |
| `checkout-success.html` | Post-purchase confirmation                     |
| `guide.html`            | User guide — install, verdicts, settings, troubleshooting |
| `privacy.html`          | Privacy policy (incl. Gemini Nano processing)  |
| `terms.html`            | Terms of service                               |
| `eula.html`             | End-user license agreement                     |
| `disclaimer.html`       | Legal disclaimers and third-party services     |
| `refund.html`           | Refund policy                                  |
| `licenses.html`         | Open-source licenses and dataset attribution   |

## Assets

- `css/styles.css` — shared stylesheet (dark theme, cards, engine cards, scam grid, footer).
- `js/main.js` — landing-page interactivity (nav toggle, footer year, nav link states).
- `js/checkout.js`, `js/checkout-success.js` — checkout flow logic (Stripe integration).
- `images/` — extension icons (16/48/128) reused for branding.
- `favicon.ico`, `favicon-32.png` — site favicons.

## Scam families (22-class on-device classifier + 1 deterministic family)

The landing page and guides reference the shipped extension model, which classifies
email into twenty-two scam families, plus a dedicated deterministic detector that
names a 23rd:

1. Credential theft
2. Business Email Compromise (BEC)
3. Gift card scams
4. Advance-fee scams
5. Romance scams
6. Prize / giveaway scams
7. Sextortion / extortion scams
8. Job / recruitment scams
9. Callback / vishing scams
10. Tech-support scams
11. Government / tax impersonation scams
12. Crypto-investment scams
13. Crypto-recovery scams
14. Delivery / package scams
15. Wire-transfer scams
16. Persona / CEO impersonation scams
17. Fake-investment / regulator scams
18. Payment-redirect / vendor scams
19. Refund / reimbursement scams
20. Account-scare / tech-panic scams
21. Scareware / fake-AV scams
22. QR-code phishing scams
23. Health-plan / Medicare card-bait scams — supplied by the deterministic health-bait
    detector (`lib/health-bait.js`), which names the family even when the classifier's
    family scores are low.

## Recent updates

- **Current shipped version: 1.8.0** (matches `manifest.json`).
- **Third on-device model — sender-domain trust:** a bundled ONNX model scores the sender's
  registrable root using only local popularity hashes. It is a soft prior, never a verdict:
  it can substitute for a missing domain-age signal, never adds risk, and never overrides a
  known domain age under 90 days. Small legitimate businesses outside the popularity list
  stay `unknown` by design.
- **23rd scam family:** a deterministic health-bait detector now names health-plan /
  Medicare card-bait lures ("free Medicare kit/card, confirm your details") even when the
  22-class model has no confident family for them.
- **Fewer false positives on real senders:** fixed legitimate mail from a retirement
  provider (Empower), Shopify order confirmations, an ISC² town-hall notice routed through
  Salesforce Marketing Cloud, a Samsung/Medallia survey, and a DraftKings Predictions
  notice. A bare crypto word is no longer a scam signal without a same-sentence
  investment/claim hook.
- **Vendor-zone and ESP recognition:** controlled vendor zones (e.g. `medallia.com`,
  `shopifyemail.com`) and provider-owned email-service redirect hosts are recognized as
  infrastructure, not evidence. A link that redirects to the sender's own registrable root
  is exempt at the warning band; danger-band hits are never exempted.
- **Threat-source sync line:** the popup now shows when the sources last synced
  (e.g. "Last download 4 min ago · 11/12 feeds current") under Active threat sources.
- **Gmail read-state safety:** the unload guard is conditional and never blocks Gmail's own
  sync window, so marking a message read is not reverted on close.
- **Allow once / Always allow:** the link-warning dialog offers a session-only "Allow once"
  and a permanent "Always allow this domain" for trusted senders. A block is still the
  default action for anything dangerous.
- **Offline phone vetting (Pro):** a phone number in an email, signature, or embedded image
  is checked on-device against known scam-call patterns and the public FTC Do-Not-Call list.
  A number on a list is only ever a soft, corroborating signal — never a verdict by itself.
- **Embedded-image scan:** the banner shows how many inline body images were checked, with a
  Details section for URL checks and QR decode (free) and OCR text reads (Pro). Purely
  informational — it never affects the verdict.
