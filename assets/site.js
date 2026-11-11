/* RL Investments Ltd — site script (launch build: real page navigation, Netlify form) */(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "Menu";
        toggle.focus();
      }
    });
  }

})();




(function () {
  "use strict";
  var form = document.getElementById("enquiry-form");
  var status = document.getElementById("enquiry-status");
  // Arriving back from a submitted enquiry: show the confirmation.
  if (status && new URLSearchParams(location.search).get("sent") === "1") {
    status.textContent = "Thank you. Your enquiry has been sent to RL Investments and the team will respond. For anything urgent, please call or WhatsApp +256 777 188 766.";
    var enq = document.getElementById("enquiry");
    if (enq) enq.scrollIntoView();
  }
  if (!form) return;
  form.addEventListener("submit", function (e) {
    if (!form.checkValidity()) {
      e.preventDefault();
      if (status) status.textContent = "Please complete the marked fields so we can respond to your enquiry.";
      form.reportValidity();
      return;
    }
    if (status) status.textContent = "Sending your enquiry...";
  });
})();

(function () {
  "use strict";
  var btn = document.getElementById("enquiry-whatsapp");
  var form = document.getElementById("enquiry-form");
  if (!btn || !form) return;
  btn.addEventListener("click", function () {
    function val(id) { var el = document.getElementById(id); return el ? el.value.trim() : ""; }
    var lines = ["Hello RL Investments, I have a transport enquiry."];
    if (val("enq-name")) lines.push("Name: " + val("enq-name"));
    if (val("enq-company")) lines.push("Company: " + val("enq-company"));
    if (val("enq-cargo")) lines.push("Cargo: " + val("enq-cargo"));
    if (val("enq-from")) lines.push("Collection point: " + val("enq-from"));
    if (val("enq-to")) lines.push("Delivery location(s): " + val("enq-to"));
    if (val("enq-volume")) lines.push("Volumes and frequency: " + val("enq-volume"));
    if (val("enq-start")) lines.push("Preferred start date: " + val("enq-start"));
    if (val("enq-details")) lines.push("Details: " + val("enq-details"));
    var url = "https://wa.me/256777188766?text=" + encodeURIComponent(lines.join("\n"));
    window.open(url, "_blank", "noopener");
  });
})();

(function () {
  "use strict";
  var photos = document.querySelectorAll(".award-photos .photo img");
  if (!photos.length) return;
  var overlay = document.createElement("div");
  overlay.className = "lightbox";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.hidden = true;
  overlay.innerHTML = '<button class="lightbox-close" type="button" aria-label="Close">&times;</button><img alt=""/>';
  document.body.appendChild(overlay);
  var big = overlay.querySelector("img");
  var closeBtn = overlay.querySelector(".lightbox-close");
  var lastFocus = null;
  function open(img) {
    lastFocus = document.activeElement;
    big.src = img.getAttribute("data-full") || img.currentSrc || img.src;
    big.alt = img.alt;
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }
  function close() {
    overlay.hidden = true;
    big.src = "";
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  photos.forEach(function (img) { img.addEventListener("click", function () { open(img); }); });
  closeBtn.addEventListener("click", close);
  overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && !overlay.hidden) close(); });
})();
