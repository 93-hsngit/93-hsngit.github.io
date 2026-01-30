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
  if (images.length <= 1) return;

  let index = 0;

  function updateActive(i) {
    images.forEach((img, j) => {
      img.classList.toggle("active", j === i);
    });

    // 🔑 THIS IS THE FIX
    const caption = images[i].getAttribute("data-caption") || "";
    container.setAttribute("data-caption", caption);
  }

  updateActive(0);

  setInterval(() => {
    index = (index + 1) % images.length;
    updateActive(index);
  }, 4500);
});

