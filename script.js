
const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
    menuBtn.textContent = isOpen ? "✕" : "☰";
});

document.querySelectorAll("#navMenu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.textContent = "☰";
    });
});

// Rotating job titles
const titles = [
    "Web Developer",
    "Python Programmer",
    "UI Designer",
    "Tech Enthusiast"
];

const typingElement = document.getElementById("typing");
let titleIndex = 0;

setInterval(() => {
    titleIndex = (titleIndex + 1) % titles.length;
    typingElement.style.opacity = "0";

    setTimeout(() => {
        typingElement.textContent = titles[titleIndex];
        typingElement.style.opacity = "1";
    }, 250);
}, 2200);

// Reveal sections when they enter the screen
const revealElements = document.querySelectorAll(
    ".about-card, .skill-card, .project-card, .contact-box"
);

revealElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealElements.forEach(element => observer.observe(element));
