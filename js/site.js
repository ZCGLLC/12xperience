(function () {
  var nav = document.getElementById("nav");
  var burger = document.getElementById("burger");
  var menu = document.getElementById("menu");
  var loader = document.getElementById("loader");
  var form = document.getElementById("visit-form");
  var lightbox = document.getElementById("lightbox");
  var lbImage = document.getElementById("lb-image");
  var lbTitle = document.getElementById("lb-title");
  var lbMeta = document.getElementById("lb-meta");

  window.addEventListener("scroll", function () {
    if (!nav) return;
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
  });

  if (loader) {
    window.setTimeout(function () {
      loader.classList.add("is-done");
    }, 1800);
  }

  function closeMenu() {
    if (!menu || !burger) return;
    menu.classList.remove("is-open");
    burger.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = !menu.classList.contains("is-open");
      menu.classList.toggle("is-open", open);
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      form.reset();
      var button = document.getElementById("visit-submit");
      var note = document.getElementById("visit-note");
      if (button) button.textContent = "Sent — we will find you";
      if (note) {
        note.textContent =
          "Received on this page. For a real reply, DM @12xperience — the house email is a placeholder.";
      }
    });
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("is-open");
    lightbox.hidden = true;
    document.body.style.overflow = "";
  }

  document.querySelectorAll(".tile[data-full]").forEach(function (tile) {
    tile.addEventListener("click", function () {
      if (!lightbox || !lbImage) return;
      lbImage.src = tile.getAttribute("data-full") || "";
      lbImage.alt = tile.getAttribute("data-title") || "";
      if (lbTitle) lbTitle.textContent = tile.getAttribute("data-title") || "";
      if (lbMeta) lbMeta.textContent = tile.getAttribute("data-meta") || "";
      lightbox.hidden = false;
      lightbox.classList.add("is-open");
      document.body.style.overflow = "hidden";
    });
  });

  if (lightbox) {
    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closeLightbox();
    });
  }
  var closeBtn = document.getElementById("lb-close");
  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeLightbox();
  });
})();
