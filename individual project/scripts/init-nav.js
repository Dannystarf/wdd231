const hamburger = document.getElementById("hamburger")
const navLinks = document.getElementById("navLinks")

if (hamburger) {
  hamburger.addEventListener("click", () => {
    const isExpanded = hamburger.getAttribute("aria-expanded") === "true"
    hamburger.setAttribute("aria-expanded", !isExpanded)
    navLinks.classList.toggle("active")
  })

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.setAttribute("aria-expanded", "false")
      navLinks.classList.remove("active")
    })
  })
}
