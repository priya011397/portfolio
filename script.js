
const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

// Mobile navigation
menuBtn.addEventListener("click", () => {
  navbar.classList.toggle("show");

  const isOpen = navbar.classList.contains("show");
  menuBtn.textContent = isOpen ? "✕" : "☰";
  menuBtn.setAttribute("aria-expanded", String(isOpen));
});

// Close menu after clicking a navigation link
document.querySelectorAll(".navbar a").forEach(link => {
  link.addEventListener("click", () => {
    navbar.classList.remove("show");
    menuBtn.textContent = "☰";
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// Highlight the current section in navigation
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".navbar a");

function updateActiveLink() {
  let currentSection = "home";

  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 150) {
      currentSection = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + currentSection
    );
  });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();

// Reveal cards smoothly as you scroll
const revealElements = document.querySelectorAll(
  ".section-heading, .feature-card, .skill-card, .project-card, .education-card"
);

revealElements.forEach(element => {
  element.style.opacity = "0";
  element.style.transform = "translateY(20px)";
  element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach(element => observer.observe(element));
} else {
  revealElements.forEach(element => {
    element.style.opacity = "1";
    element.style.transform = "translateY(0)";
  });
}

// Contact form: opens the user's email application
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = "Please complete all fields.";
    return;
  }

  const recipient = "yourname@gmail.com"; // Replace with your email
  const subject = encodeURIComponent("Portfolio Contact from " + name);
  const body = encodeURIComponent(
    "Name: " + name +
    "\nEmail: " + email +
    "\n\nMessage:\n" + message
  );

  formStatus.textContent = "Opening your email application...";

  window.location.href =
    `mailto:${recipient}?subject=${subject}&body=${body}`;
});
