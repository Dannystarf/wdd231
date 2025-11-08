// Update current year in footer
function updateYear() {
  const yearElement = document.getElementById("currentyear")
  const currentYear = new Date().getFullYear()
  if (yearElement) {
    yearElement.textContent = currentYear
  }
}

// Update copyright year
function updateCopyright() {
  const copyrightElement = document.getElementById("copyright-year")
  const currentYear = new Date().getFullYear()
  if (copyrightElement) {
    copyrightElement.textContent = `© ${currentYear}`
  }
}

// Update last modified date
function updateLastModified() {
  const lastModElement = document.getElementById("lastModified")
  if (lastModElement) {
    const lastMod = document.lastModified
    lastModElement.textContent = `Last Modification: ${lastMod}`
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  updateYear()
  updateCopyright()
  updateLastModified()
})
