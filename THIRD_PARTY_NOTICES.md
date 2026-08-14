# Third-Party Notices — PhishDiver

This file documents the third-party software, libraries, and data used by
the PhishDiver browser extension, together with their licenses and
the obligations PhishDiver must satisfy. License texts are included in
the `LICENSES/` directory and are distributed with the extension.

Last reviewed: August 14, 2026

---

## 1. Bundled software (shipped inside the extension)

| Component | Files | License | Copyright | Used for |
|---|---|---|---|---|
| ONNX Runtime Web v1.26.0 | `ai/ort.wasm.min.js`, `ai/ort-wasm-simd-threaded.mjs`, `ai/ort-wasm-simd-threaded.wasm` | MIT | Microsoft Corporation | On-device inference of the phishing classifier |
| jsQR | `ai/jsQR.js` | Apache License 2.0 | Cooperative Computing Ltd. (cozmo), 2015 | Decoding QR codes in email image attachments |

License texts:
* MIT: `LICENSES/MIT-ONNX-Runtime-Web.txt`
* Apache-2.0: `LICENSES/Apache-2.0.txt`

Compliance notes:
* ONNX Runtime Web is distributed under the MIT License. The copyright
  and permission notice are reproduced in `LICENSES/MIT-ONNX-Runtime-Web.txt`
  and the header of `ai/ort.wasm.min.js`.
* jsQR is distributed under the Apache License 2.0. A copy of the license
  is included in `LICENSES/Apache-2.0.txt` and the license banner has been
  restored at the top of `ai/jsQR.js`. jsQR's original project contains no
  NOTICE file, so none is reproduced here.

## 2. Data used for model training (NOT redistributed)

The on-device classifiers shipped as `ai/phishing_classifier.onnx` and
`ai/url_classifier.onnx` are trained TF-IDF + logistic-regression models.
The raw source messages and URL lists are **not** distributed with the
extension; only the trained model files ship.

### Email classifier (`ai/phishing_classifier.onnx`)

| Data source | License | Copyright / Creator | Used for |
|---|---|---|---|
| Jose Nazario "Phishing corpus" | CC BY 4.0 | Jose Nazario | Positive (phishing) training examples |
| Apache SpamAssassin public mail corpus — "spam" corpora (`spam_20021010`, `spam_20030228`, `spam_2_20030228`, `spam_2_20050311`) | Freely redistributable public corpus; individual message copyrights remain with the original senders | Apache SpamAssassin project and individual message authors | Positive (spam) training examples — the model's "phishing" verdict covers all malicious email content (phishing, scams, and spam) |
| Apache SpamAssassin public mail corpus — "ham" corpora (`easy_ham`, `easy_ham_2`, `hard_ham_20021010`, `hard_ham_20030228`) | Freely redistributable public corpus; individual message copyrights remain with the original senders | Apache SpamAssassin project and individual message authors | Negative (legitimate) training examples |
| Enron Email Corpus (CMU mirror, `enron_mail_20150507`) | Released publicly by the Federal Energy Regulatory Commission (FERC) during its 2003 investigation; mirrored at https://www.cs.cmu.edu/~enron/ | FERC and the original Enron Corp. email authors | Negative (legitimate) training examples — modern-ish workplace ham that the older corpora lack |

### URL classifier (`ai/url_classifier.onnx`)

The URL model is trained on a synthetic corpus (first-party, systematically
encoding attack URL structures) blended with a real URL corpus built by
`ai/train/build_url_feed.py` from the following public feeds:

| Data source | License | Copyright / Creator | Used for |
|---|---|---|---|
| URLhaus database dump (abuse.ch) | CC0 1.0 | abuse.ch | Positive (malicious URL) training examples |
| PhishTank "online-valid" database | CC BY-SA 2.5 | Cisco Talos (OpenDNS) and PhishTank community | Positive (phishing URL) training examples |
| Tranco daily top-1M list | MIT | Tranco authors | Negative (legitimate URL) training examples |

Attribution / compliance notes:
* Nazario corpus — CC BY 4.0. Attribution, credit, and change indication
  are provided in `LICENSES/CC-BY-4.0-Nazario-Corpus.txt`, in the extension's
  About page, and in the store listing. The corpus was adapted (parsed and
  normalized) into a training set; this adaptation is disclosed there.
* SpamAssassin public corpus — the corpus is made available for public use
  by the Apache SpamAssassin project. Per the corpus README, all messages
  were posted to public fora or released with knowledge that they may be
  made public; copyright in the text remains with the original senders.
  PhishDiver does not redistribute the raw messages, and it acknowledges
  the Apache SpamAssassin project as the source of both the spam class and
  the legitimate-mail class: https://spamassassin.apache.org/old/publiccorpus/
* Enron corpus — the messages were made public by the Federal Energy
  Regulatory Commission (FERC) in 2003 as part of its investigation of
  Enron Corp.; the CMU mirror is maintained at https://www.cs.cmu.edu/~enron/.
  PhishDiver uses a deduplicated, per-user-capped sample as negative
  (legitimate) training examples and does not redistribute the raw messages.
* URLhaus — released to the public domain under CC0 1.0. The public CSV dump
  (https://urlhaus.abuse.ch/downloads/) is used; attribution to abuse.ch is
  provided here and on the extension's About page.
* PhishTank — CC BY-SA 2.5. The "online-valid" subset (verified and online
  phishing URLs) is used for offline model training only. Attribution to
  PhishTank / Cisco Talos is provided here and on the extension's About page;
  PhishTank is not queried at runtime.
* Tranco — MIT License. The daily top-1M list (https://tranco-list.eu/) is
  used only to sample legitimate URLs; attribution is provided here.

## 3. Development-time tools (NOT shipped)

The training pipeline (`ai/train/`) runs on standard Python machine-learning
packages during development only. They are not bundled with or distributed
as part of the extension:

| Tool | License |
|---|---|
| scikit-learn | BSD 3-Clause |
| skl2onnx | Apache License 2.0 |
| onnx | Apache License 2.0 |
| onnxruntime (Python) | MIT |
| onnxruntime-web (bundled runtime) | MIT (see section 1) |

## 4. First-party code

The following are original works of PhishDiver and are not covered by
third-party license obligations:

* `content.js`, `background.js`, `page-protection.js`
* `pages/*` (interceptor, popup, about, offscreen)
* `ai/onnx-classifier.js`, `ai/qr-scanner.js`, `ai/attachment-inspector.js`
* `ai/train/*.py`
* `icons/*`
* `ai/phishing_classifier.onnx`, `ai/url_classifier.onnx` (trained models; see section 2 for data attribution)

## 5. Network services (not bundled code)

The extension queries public services at runtime. These are external
services governed by their own terms and privacy policies, and are not
redistributed code: URLhaus, Feodo Tracker, Phishing.Database, Destroylist,
OpenPhish, PhishStats, Phishing Army, IPsum, blocklist.de, GreenSnow, DShield,
SSLBL, ransomware.live, Spamhaus DNSBL, Cloudflare and Google
DNS-over-HTTPS, IANA RDAP, registry RDAP servers (via the IANA RDAP
bootstrap), the rdap.org RDAP aggregator, the free public WHOIS lookup
who.is (used only as a last resort for registries without RDAP, e.g. .hu,
.us, .se, .it, .ru), crt.sh, Cert Spotter, HaveIBeenPwned.

All information queried or scraped through these services is **publicly
available data** — domain-registration records, public DNS and
certificate-transparency records, and publicly distributed security
lists. Requests carry only the URL, IP address, or domain being evaluated,
and never include personal or private data.

## 6. Trademarks

Product and brand names referenced by the extension (e.g., ONNX, Gemini
Nano, Gmail, Outlook, HaveIBeenPwned) are trademarks of their respective
owners. PhishDiver is an independent project and is not affiliated
with, endorsed by, or sponsored by those owners. See the extension's About
page and the website's Legal Disclaimers page.

---

If you believe any component is missing or mis-attributed, contact
contact@phishdiver.com.
