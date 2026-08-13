/* PhishDiver — site scripts (pricing toggle, mobile nav, footer year) */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var navToggle = document.getElementById("nav-toggle");
    var navLinks = document.getElementById("nav-links");
    if (navToggle && navLinks) {
      navToggle.addEventListener("click", function () {
        navLinks.classList.toggle("open");
      });
      navLinks.addEventListener("click", function (e) {
        if (e.target.tagName === "A") navLinks.classList.remove("open");
      });
    }

    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
  });
})();
