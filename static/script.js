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
     Footer dates
  =============================== */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const updatedEl = document.getElementById("lastUpdated");
  if (updatedEl) {
    updatedEl.textContent = new Date(document.lastModified)
      .toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
      });
  }

/* ===============================
   Project image rotation
=============================== */
window.addEventListener("load", () => {
  document.querySelectorAll("[data-rotate]").forEach(container => {
    const images = container.querySelectorAll("img");
    if (images.length <= 1) return;

    let index = 0;
    images.forEach((img, i) => img.classList.toggle("active", i === 0));

    setInterval(() => {
      images[index].classList.remove("active");
      index = (index + 1) % images.length;
      images[index].classList.add("active");
    }, 4200);
  });
});

