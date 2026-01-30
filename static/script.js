(function () {
  const root = document.documentElement;
  const themeBtn = document.getElementById("themeToggle");

  /* =========================
     Theme handling
  ========================== */
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

  /* =========================
     Footer year & last update
  ========================== */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const updatedEl = document.getElementById("lastUpdated");
  if (updatedEl) {
    const d = new Date(document.lastModified);
    updatedEl.textContent = d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit"
    });
  }

  /* =========================
     Project image rotation
  ========================== */
  document.querySelectorAll("[data-rotate]").forEach(container => {
    const images = container.querySelectorAll("img");
    if (images.length <= 1) return; // safety guard

    let index = 0;
    images[index].classList.add("active");

    setInterval(() => {
      images[index].classList.remove("active");
      index = (index + 1) % images.length;
      images[index].classList.add("active");
    }, 4000);
  });
})();

