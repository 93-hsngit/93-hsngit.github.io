(function () {
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");
  const year = document.getElementById("year");

  if (year) year.textContent = new Date().getFullYear();

  // Load theme
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") {
    root.setAttribute("data-theme", saved);
  }

  if (btn) {
    btn.addEventListener("click", () => {
      const current = root.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }
})();
// Footer year + last updated
(function () {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const updatedEl = document.getElementById("lastUpdated");
  if (updatedEl) {
    const d = new Date(document.lastModified);
    const options = { year: "numeric", month: "short", day: "2-digit" };
    updatedEl.textContent = d.toLocaleDateString(undefined, options);
  }
})();

