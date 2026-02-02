(function () {

  /* ===============================
     Theme toggle
  =============================== */
  const root = document.documentElement;
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

      images.forEach((img, i) => {
        img.classList.toggle("active", i === 0);
      });

      setInterval(() => {
        images[index].classList.remove("active");
        index = (index + 1) % images.length;
        images[index].classList.add("active");
      }, 4200);
    });
  });

})();

/* ===============================
   Scientific reveal effect
=============================== */
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll('.card, .list-item').forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(20px)";
  el.style.transition = "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
  observer.observe(el);
});
/* ===============================
   Copy Email Functionality
=============================== */
function copyEmail(element) {
  // Finds the email text specifically within the clicked chip
  const emailText = element.querySelector('#userEmail').textContent;

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(emailText).then(() => {
      showFeedback(element);
    });
  } else {
    // Fallback logic
    const textArea = document.createElement("textarea");
    textArea.value = emailText;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      showFeedback(element);
    } catch (err) {
      console.error('Fallback copy failed', err);
    }
    document.body.removeChild(textArea);
  }
}

function showFeedback(element) {
  // Target the specific label or the chip itself
  const label = element.querySelector('#heroEmailName') || element;
  const originalHTML = label.innerHTML;
  
  label.innerHTML = `<i class="fa-solid fa-check" style="color: #2ecc71;"></i> Copied!`;
  
  setTimeout(() => {
    label.innerHTML = originalHTML;
  }, 2000);
}
/* ===============================
   Secure WhatsApp Redirect
=============================== */
function openWhatsApp() {
  // We split the number to make it even harder for basic bots to read
  const countryCode = "91";
  const areaPart = "9004";
  const phonePart = "319542";
  const message = encodeURIComponent("Hello Dr. Hossain, I saw your research portfolio and...");
  
  const fullUrl = `https://wa.me/${countryCode}${areaPart}${phonePart}?text=${message}`;
  
  // Opens the link in a new tab
  window.open(fullUrl, '_blank', 'noopener,noreferrer');
}

/* ===============================
   Simple ScrollSpy (robust)
=============================== */

const navAnchors = Array.from(
  document.querySelectorAll("nav.nav a[href^='#']")
);

const sectionElems = navAnchors.map(link => {
  const id = link.getAttribute("href").slice(1);
  return document.getElementById(id);
});

// On scroll
window.addEventListener("scroll", () => {
  let current = null;

  sectionElems.forEach(section => {
    if (
      section &&
      section.offsetTop <= window.scrollY + window.innerHeight / 3
    ) {
      current = section.id;
    }
  });

  navAnchors.forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `#${current}`
    );
  });
});

// On click (smooth feedback)
navAnchors.forEach(link => {
  link.addEventListener("click", () => {
    navAnchors.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});



