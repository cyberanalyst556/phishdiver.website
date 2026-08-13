/* checkout.js — plan select + hand off to the license worker, which creates
   the Stripe Checkout Session and returns the hosted payment URL. */
(function () {
  "use strict";

  // ── config ──────────────────────────────────────────────────────────────
  // Your Cloudflare Worker URL. Override for testing with:  checkout.html?api=https://...
  var API = new URLSearchParams(location.search).get("api") || "https://lic.phishdiver.com";

  var PLAN_DATA = {
    monthly: { name: "Pro Monthly", bill: "$4.99 billed monthly", total: "$4.99" },
    annual:  { name: "Pro Annual",  bill: "$49.99 billed once a year", total: "$49.99" },
  };

  var selected = new URLSearchParams(location.search).get("plan") === "annual" ? "annual" : "monthly";

  function render() {
    document.querySelectorAll(".checkout-card").forEach(function (card) {
      card.classList.toggle("sel", card.dataset.plan === selected);
    });
    var d = PLAN_DATA[selected];
    document.getElementById("sum-plan").textContent = d.name;
    document.getElementById("sum-bill").textContent = d.bill;
    document.getElementById("sum-total").textContent = d.total;
  }

  function showErr(msg) {
    var el = document.getElementById("errbox");
    el.style.display = "block";
    el.textContent = msg;
  }

  document.querySelectorAll(".checkout-card").forEach(function (card) {
    card.addEventListener("click", function () { selected = card.dataset.plan; render(); });
  });

  document.getElementById("continue-btn").addEventListener("click", async function () {
    var btn = document.getElementById("continue-btn");
    btn.disabled = true;
    btn.textContent = "Opening secure payment…";
    try {
      var res = await fetch(API + "/billing/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ plan: selected }),
      });
      var body = await res.json();
      if (res.ok && body.ok && body.url) {
        location.href = body.url;
        return;
      }
      if (body && body.error === "billing_not_configured") {
        showErr("Checkout is not configured yet. Please try again later.");
      } else {
        showErr("Could not start checkout. Please try again.");
      }
    } catch (e) {
      showErr("Could not reach the checkout service. Check your connection and try again.");
    } finally {
      btn.disabled = false;
      btn.textContent = "Continue to secure payment";
    }
  });

  render();
})();
