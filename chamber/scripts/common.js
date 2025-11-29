// Update year in footer
function updateYear() {
  const yearSpan = document.getElementById("year")
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear()
  }
}

// Update last modified date
function updateLastModified() {
  const lastModSpan = document.getElementById("lastModified")
  if (lastModSpan) {
    lastModSpan.textContent = document.lastModified
  }
}

// Handle mobile menu toggle
function initializeMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle")
  const navMenu = document.getElementById("nav-menu")

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      const isExpanded = menuToggle.getAttribute("aria-expanded") === "true"
      menuToggle.setAttribute("aria-expanded", !isExpanded)
    })

    // Close menu when a link is clicked
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
        menuToggle.setAttribute("aria-expanded", "false")
      })
    })
  }
}

// Initialize all common functionality
document.addEventListener("DOMContentLoaded", () => {
  updateYear()
  updateLastModified()
  initializeMobileMenu()
})
