(function () {
  const root = document.documentElement;

  /* ===============================
     Theme toggle
  =============================== */
  const themeBtn = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    root.setAttribute("data-theme", savedTheme);
  }

  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  /* ===============================
     Footer metadata
  =============================== */
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const updatedEl = document.getElementById("lastUpdated");
  if (updatedEl) {
    const d = new Date(document.lastModified);
    updatedEl.textContent = d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  }

/* ===============================
   Project image rotation + captions
=============================== */
const visualBlocks = document.querySelectorAll("[data-rotate]");

visualBlocks.forEach(container => {
  const images = container.querySelectorAll("img");
  if (images.length === 0) return;

  let index = 0;

  // Initialize
  images.forEach((img, i) => {
    img.classList.toggle("active", i === 0);
  });

  // Set initial caption from first image
  container.setAttribute(
    "data-caption",
    images[0].dataset.caption || ""
  );

  // Rotate images + captions
  setInterval(() => {
    images[index].classList.remove("active");

    index = (index + 1) % images.length;

    images[index].classList.add("active");

    // 🔑 Update container caption
    container.setAttribute(
      "data-caption",
      images[index].dataset.caption || ""
    );
  }, 4500); // calm academic pacing
});

