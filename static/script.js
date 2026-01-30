/* =========================
   Theme toggle + footer info
   ========================= */
(function () {
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");

  // Load saved theme
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") {
    root.setAttribute("data-theme", saved);
  }

  // Theme toggle button
  if (btn) {
    btn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }
})();

/* =========================
   Footer year + last updated
   ========================= */
(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const updatedEl = document.getElementById("lastUpdated");
  if (updatedEl) {
    const d = new Date(document.lastModified);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    updatedEl.textContent = d.toLocaleDateString(undefined, options);
  }
})();

/* =========================
   Project image auto-rotation
   ========================= */
(function () {
  const carousels = document.querySelectorAll(".project-visual-carousel");

  carousels.forEach(carousel => {
    const images = carousel.querySelectorAll("img");
    if (images.length <= 1) return;

    let index = 0;
    images[index].classList.add("active");

    setInterval(() => {
      images[index].classList.remove("active");
      index = (index + 1) % images.length;
      images[index].classList.add("active");
    }, 9000); // 9 seconds per image (subtle, research-grade)
  });
})();

// =========================
// Project image auto-rotation
// =========================
(function () {
  const visualBlocks = document.querySelectorAll("[data-rotate]");

  visualBlocks.forEach(block => {
    const images = block.querySelectorAll("img");
    if (images.length <= 1) return;

    let index = 0;
    images[index].classList.add("active");

    setInterval(() => {
      images[index].classList.remove("active");
      index = (index + 1) % images.length;
      images[index].classList.add("active");
    }, 3500); // slow, elegant
  });
})();

