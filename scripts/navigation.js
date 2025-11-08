// Menu Toggle for Mobile Navigation
const menuToggle = document.getElementById("menu-toggle")
const navMenu = document.getElementById("nav-menu")
const navLinks = navMenu.querySelectorAll("a")

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true"
  menuToggle.setAttribute("aria-expanded", !isOpen)
  navMenu.classList.toggle("open")
})

// Close menu when a link is clicked
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false")
    navMenu.classList.remove("open")
  })
})

// Close menu when clicking outside
document.addEventListener("click", (event) => {
  const isClickInside = menuToggle.contains(event.target) || navMenu.contains(event.target)
  if (!isClickInside && navMenu.classList.contains("open")) {
    menuToggle.setAttribute("aria-expanded", "false")
    navMenu.classList.remove("open")
  }
})

// Set active nav link based on current page
window.addEventListener("load", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html"
  navLinks.forEach((link) => {
    const href = link.getAttribute("href")
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active")
    } else {
      link.classList.remove("active")
    }
  })
})
