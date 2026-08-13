/* checkout-success.js — after Stripe redirects here with ?session_id=,
   poll the license worker until the payment is confirmed, then reveal the key. */
(function () {
  "use strict";

  var API = new URLSearchParams(location.search).get("api") || "https://lic.phishdiver.com";
  var sid = new URLSearchParams(location.search).get("session_id");

  var loading  = document.getElementById("loading");
  var done     = document.getElementById("done");
  var notpaid  = document.getElementById("notpaid");
  var missing  = document.getElementById("missing");

  function show(el) {
    [loading, done, notpaid, missing].forEach(function (e) { if (e) e.style.display = "none"; });
    el.style.display = "block";
  }

  function finish(lic, email) {
    document.getElementById("keybox").textContent = lic;
    show(done);
  }

  async function poll(attempt) {
    if (attempt > 30) { show(notpaid); return; }
    try {
      var res = await fetch(API + "/billing/session-status?session_id=" + encodeURIComponent(sid));
      var body = await res.json();
      if (body && body.ok && body.lic) { finish(body.lic, body.email); return; }
    } catch (e) { /* network hiccup — keep polling */ }
    setTimeout(function () { poll(attempt + 1); }, 2000);
  }

  if (!sid) { show(missing); }
  else {
    // First check immediately, then every 2s (the Stripe webhook may lag a second).
    poll(1);
  }

  document.getElementById("copy-btn").addEventListener("click", async function () {
    var key = document.getElementById("keybox").textContent;
    try {
      await navigator.clipboard.writeText(key);
      var b = document.getElementById("copy-btn");
      b.textContent = "✓ Copied";
      setTimeout(function () { b.textContent = "Copy license key"; }, 2000);
    } catch (e) { /* clipboard blocked — user can select the box manually */ }
  });
})();
