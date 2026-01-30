(function () {
  const root = document.documentElement;

  /* ===============================
     Theme toggle
  =============================== */
  const btn = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    root.setAttribute("data-theme", savedTheme);
  }

  if (btn) {
    btn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  /* ===============================
     Footer year + last updated
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
     Project image rotation
  =============================== */
  const visualBlocks = document.querySelectorAll("[data-rotate]");

  visualBlocks.forEach(container => {
    const images = container.querySelectorAll("img");
    if (images.length <= 1) return; // nothing to rotate

    let index = 0;

    // Ensure deterministic start
    images.forEach((img, i) => {
      img.classList.toggle("active", i === 0);
    });

    // Rotate slowly and smoothly
    setInterval(() => {
      images[index].classList.remove("active");
      index = (index + 1) % images.length;
      images[index].classList.add("active");
    }, 4500); // 4.5s = calm academic pace
  });

})();

