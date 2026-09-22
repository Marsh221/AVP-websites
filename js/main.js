/* ==========================================================================
   ART VISIONARY PIXEL — interactions
   Sticky nav state · mobile drawer · scroll reveal · gallery lightbox
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Sticky header state ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile navigation drawer ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function closeNav() {
    document.body.classList.remove("nav-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", function () {
    var open = document.body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeNav);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeNav();
  });

  /* ---------- Footer year ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- Scroll reveal (progressive enhancement) ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Gallery lightbox ---------- */
  var works = Array.prototype.slice.call(document.querySelectorAll(".work"));
  var lightbox = document.getElementById("lightbox");
  var lbImg = lightbox.querySelector(".lightbox-img");
  var lbCaption = lightbox.querySelector(".lightbox-caption");
  var current = 0;
  var lastFocused = null;

  function render() {
    var work = works[current];
    var img = work.querySelector("img");
    var caption = work.querySelector("figcaption");
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt;
    lbCaption.innerHTML = caption ? caption.innerHTML : "";
  }

  function openLightbox(index) {
    current = index;
    render();
    lastFocused = document.activeElement;
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    lightbox.querySelector(".lightbox-close").focus();
  }

  function closeLightbox() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
    lbImg.src = "";
    if (lastFocused) lastFocused.focus();
  }

  function step(delta) {
    current = (current + delta + works.length) % works.length;
    render();
  }

  works.forEach(function (work, i) {
    var frame = work.querySelector(".work-frame");
    if (frame) {
      frame.addEventListener("click", function () { openLightbox(i); });
    }
  });

  lightbox.querySelectorAll("[data-lb-close]").forEach(function (el) {
    el.addEventListener("click", closeLightbox);
  });
  lightbox.querySelector(".lightbox-prev").addEventListener("click", function () { step(-1); });
  lightbox.querySelector(".lightbox-next").addEventListener("click", function () { step(1); });

  document.addEventListener("keydown", function (e) {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
})();
