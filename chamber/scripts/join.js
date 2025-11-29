// Set current date and time when page loads
function setTimestamp() {
  const now = new Date()
  const timestamp = now.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  })
  document.getElementById("timestamp").value = timestamp
}

// Initialize modal functionality
function initializeModals() {
  const modals = document.querySelectorAll(".membership-modal")
  const infoButtons = document.querySelectorAll(".info-btn")

  infoButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const modalId = button.getAttribute("data-modal")
      const modal = document.getElementById(modalId)
      if (modal) {
        modal.showModal()
      }
    })
  })

  modals.forEach((modal) => {
    const closeBtn = modal.querySelector(".modal-close")
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        modal.close()
      })
    }

    // Close modal when clicking outside dialog
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.close()
      }
    })

    // Close on Escape key
    modal.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        modal.close()
      }
    })
  })
}

// Animate membership cards on page load
function animateMembershipCards() {
  const cards = document.querySelectorAll(".membership-card")
  cards.forEach((card, index) => {
    card.style.animation = `slideInUp 0.6s ease-out ${index * 0.15}s both`
  })
}

// Form submission handler
function handleFormSubmit(e) {
  // Allow default form submission to thankyou.html
  // Form validation is handled by HTML5 input attributes
}

// Initialize everything on page load
document.addEventListener("DOMContentLoaded", () => {
  setTimestamp()
  initializeModals()
  animateMembershipCards()

  const form = document.getElementById("membershipForm")
  if (form) {
    form.addEventListener("submit", handleFormSubmit)
  }
})
