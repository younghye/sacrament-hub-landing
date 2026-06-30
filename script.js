document.getElementById("year").textContent = new Date().getFullYear();

// Screenshot slider
(function () {
  const swiperEl = document.querySelector(".screenshot-swiper");
  if (!swiperEl) return;

  new Swiper(swiperEl, {
    loop: true,
    speed: 500,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  // Click a slide image to view it full-size in the lightbox, with
  // prev/next arrows cycling through every screenshot (not just the one
  // clicked).
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");
  const lightboxCount = document.getElementById("lightboxCount");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");
  const lightboxClose = document.getElementById("lightboxClose");

  const lightboxItems = Array.from(
    swiperEl.querySelectorAll(".swiper-slide"),
  ).map((slide) => {
    const img = slide.querySelector("img");
    return {
      src: img.src,
      alt: img.alt,
      caption: slide.querySelector(".slide-caption")?.textContent ?? "",
    };
  });
  let lightboxIndex = 0;

  function renderLightbox() {
    const item = lightboxItems[lightboxIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    lightboxCaption.textContent = item.caption;
    lightboxCount.textContent = `${lightboxIndex + 1} / ${lightboxItems.length}`;
  }

  function openLightbox(index) {
    lightboxIndex = index;
    renderLightbox();
    lightbox.hidden = false;
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = "";
  }

  function stepLightbox(delta) {
    lightboxIndex =
      (lightboxIndex + delta + lightboxItems.length) % lightboxItems.length;
    renderLightbox();
  }

  swiperEl.querySelectorAll(".swiper-slide").forEach((slide, index) => {
    const img = slide.querySelector("img");
    img.addEventListener("click", () => openLightbox(index));
  });

  lightboxPrev.addEventListener("click", () => stepLightbox(-1));
  lightboxNext.addEventListener("click", () => stepLightbox(1));
  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") stepLightbox(-1);
    if (e.key === "ArrowRight") stepLightbox(1);
  });
})();
