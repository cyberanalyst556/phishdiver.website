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

## Scam families (22-category on-device classifier)

The landing page and guides reference the shipped extension model, which classifies
email into twenty-two scam families:

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

## Recent updates

- **22 scam families:** the on-device classifier now names twenty-two families (job offers,
  callback/vishing, tech support, government impersonation, crypto-investment and crypto-recovery,
  delivery, wire transfer, persona/CEO, fake-investment, payment-redirect, refund, account-scare,
  scareware, and QR-code phishing — alongside the original seven). All family recalls ≥0.987 on
  holdout; binary phishing detection unchanged.
- **Embedded-image scan:** the banner now shows how many inline body images were checked, with a
  Details section for the URL checks and QR decode (free) and OCR text reads (Pro). Purely
  informational — it never affects the verdict.
- **Fewer false positives on institutional senders:** known trusted roots (e.g. `blackboard.com`)
  are rescued from a false high-confidence "phishing" AI read, so legitimate mail from e.g. your
  university LMS no longer trips the banner, while forged lookalikes from the same brand stay caught.
- **AI reliability:** a watchdog + late-bind keeps the on-device engine available through browser
  blank periods, so the AI read is rarely skipped.
- **Own-reply sender attribution:** replies inside a thread are attributed to the real external
  counterparty and vetted normally, so a hijacker in your own reply chain is still caught.
- **Reduced false positives on legit mail:** a single shared legitimate-root set keeps normal
  transactional mail from known banks/carriers un-flagged while still detecting forged look-alikes.
- **7th scam family (historical, 2026-08-30):** added "Sextortion / Extortion" detection; at the time the
  site named the seven families in the engines section, features, guide, and FAQ.
- **6th scam family (historical, 2026-08-24):** added a "Prize & Giveaway" icon card to the scam library and
  named the six families in the engines section, features, and FAQ.
- **Gemini plain-language pass:** rewrote every Gemini Nano mention in everyday terms —
  free AI built into Chrome, runs on-device, never sends email to Google's servers,
  optional and off-able with no loss of protection.
