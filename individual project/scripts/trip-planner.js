import { loadParksData } from "./modules/park-utils.js"

let allParks = []

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

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validateForm() {
  let isValid = true
  clearErrors()

  const name = document.getElementById("tripName").value.trim()
  if (!name) {
    showError("nameError", "Please enter your name")
    isValid = false
  }

  const email = document.getElementById("tripEmail").value.trim()
  if (!email) {
    showError("emailError", "Please enter your email")
    isValid = false
  } else if (!validateEmail(email)) {
    showError("emailError", "Please enter a valid email address")
    isValid = false
  }

  const duration = document.getElementById("tripDuration").value
  if (!duration) {
    showError("durationError", "Please select trip duration")
    isValid = false
  }

  const season = document.getElementById("bestSeason").value
  if (!season) {
    showError("seasonError", "Please select a season")
    isValid = false
  }

  const elevation = document.getElementById("elevation").value
  if (!elevation) {
    showError("elevationError", "Please select elevation preference")
    isValid = false
  }

  const activities = document.querySelectorAll('input[name="activities"]:checked')
  if (activities.length === 0) {
    showError("activitiesError", "Please select at least one activity")
    isValid = false
  }

  const style = document.querySelector('input[name="travel_style"]:checked')
  if (!style) {
    showError("styleError", "Please select a travel style")
    isValid = false
  }

  const budget = document.getElementById("budget").value
  if (!budget) {
    showError("budgetError", "Please select a budget range")
    isValid = false
  }

  const groupSize = document.getElementById("groupSize").value
  if (!groupSize || Number.parseInt(groupSize) < 1) {
    showError("groupError", "Please enter group size (at least 1)")
    isValid = false
  }

  return isValid
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId)
  if (errorElement) {
    errorElement.textContent = message
    errorElement.style.display = "block"
    console.log(`[v0] Validation error: ${message}`)
  }
}

function clearErrors() {
  document.querySelectorAll(".error-message").forEach((error) => {
    error.textContent = ""
    error.style.display = "none"
  })
}

function collectFormData() {
  const activities = Array.from(document.querySelectorAll('input[name="activities"]:checked')).map(
    (checkbox) => checkbox.value,
  )

  const formData = {
    name: document.getElementById("tripName").value.trim(),
    email: document.getElementById("tripEmail").value.trim(),
    duration: document.getElementById("tripDuration").value,
    season: document.getElementById("bestSeason").value,
    elevation: document.getElementById("elevation").value,
    activities: activities,
    style: document.querySelector('input[name="travel_style"]:checked').value,
    budget: document.getElementById("budget").value,
    groupSize: Number.parseInt(document.getElementById("groupSize").value),
    specialRequests: document.getElementById("specialRequests").value.trim(),
    newsletter: document.getElementById("newsletter").checked,
    timestamp: new Date().toISOString(),
  }

  console.log("[v0] Form data collected:", formData)
  return formData
}

function storeFormData(formData) {
  try {
    localStorage.setItem("tripPlannerData", JSON.stringify(formData))
    console.log("[v0] Form data stored in localStorage")
  } catch (error) {
    console.error("[v0] Error storing form data:", error)
  }
}

function recommendParks(formData) {
  let recommendedParks = [...allParks]

  // Filter by season
  recommendedParks = recommendedParks.filter((park) => park.bestSeason.includes(formData.season))

  // Filter by activities
  recommendedParks = recommendedParks.filter((park) =>
    formData.activities.some((activity) => park.activities.includes(activity)),
  )

  // Filter by elevation preference
  if (formData.elevation === "low") {
    recommendedParks = recommendedParks.filter((park) => park.elevation < 6000)
  } else if (formData.elevation === "high") {
    recommendedParks = recommendedParks.filter((park) => park.elevation > 8000)
  }

  // Sort by rating and limit to top 5
  recommendedParks.sort((a, b) => b.rating - a.rating)
  recommendedParks = recommendedParks.slice(0, 5)

  console.log("[v0] Generated recommendations:", recommendedParks)
  return recommendedParks
}

async function handleFormSubmit(e) {
  e.preventDefault()
  console.log("[v0] Form submission started")

  if (!validateForm()) {
    console.log("[v0] Form validation failed")
    return
  }

  const formData = collectFormData()
  storeFormData(formData)

  // Show loading spinner
  document.getElementById("loadingSpinner").style.display = "block"
  document.getElementById("tripPlannerForm").style.display = "none"

  // Simulate processing delay
  setTimeout(() => {
    const recommendations = recommendParks(formData)

    // Store recommendations in localStorage
    localStorage.setItem("tripRecommendations", JSON.stringify(recommendations))

    // Redirect to form action page
    window.location.href = "form-action.html"
  }, 1500)
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    allParks = await loadParksData()
    console.log("[v0] Parks data loaded for trip planner")

    const form = document.getElementById("tripPlannerForm")
    if (form) {
      form.addEventListener("submit", handleFormSubmit)
    }

    // Reset button
    document.getElementById("resetBtn").addEventListener("click", clearErrors)
  } catch (error) {
    console.error("[v0] Error initializing trip planner:", error)
  }
})
