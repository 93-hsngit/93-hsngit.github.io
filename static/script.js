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
     (calm, deterministic, academic)
  =============================== */
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const visualBlocks = document.querySelectorAll("[data-rotate]");

  visualBlocks.forEach(container => {
    const images = Array.from(container.querySelectorAll("img"));
    if (images.length <= 1) return;

    let index = 0;
    let timerId = null;

    // Deterministic initial state
    images.forEach((img, i) => {
      img.classList.toggle("active", i === 0);
    });

    // Skip rotation if user prefers reduced motion
    if (prefersReducedMotion) return;

    const startRotation = () => {
      if (timerId) return;
      timerId = setInterval(() => {
        images[index].classList.remove("active");
        index = (index + 1) % images.length;
        images[index].classList.add("active");
      }, 4800); // slow, academic pace
    };

    const stopRotation = () => {
      clearInterval(timerId);
      timerId = null;
    };

    // Pause rotation when tab is inactive (professional polish)
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopRotation();
      } else {
        startRotation();
      }
    });

    startRotation();
  });
})();

