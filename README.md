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

## Scam families (6-category on-device classifier)

The landing page and guides reference the shipped extension model, which classifies
email into six scam families:

1. Credential theft
2. Business Email Compromise (BEC)
3. Gift card scams
4. Advance-fee scams
5. Romance scams
6. Prize / giveaway scams

## Recent updates

- **6th scam family:** added a "Prize & Giveaway" icon card to the scam library and
  named the six families in the engines section, features, and FAQ.
- **Gemini plain-language pass:** rewrote every Gemini Nano mention in everyday terms —
  free AI built into Chrome, runs on-device, never sends email to Google's servers,
  optional and off-able with no loss of protection.

## Preview locally

Any static file server works — there are no build steps:

```powershell
# from this folder
python -m http.server 8000
# or
npx serve .
```

Then open http://localhost:8000.

## Keep in sync

The `website/` folder mirrors the GitHub backup. After editing pages here, push or
re-upload to `https://github.com/cyberanalyst556/phishdiver.website` so the backup
stays current. The extension at `G:\__extensions\Exp` never depends on these files.
