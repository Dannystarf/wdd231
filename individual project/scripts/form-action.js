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

function formatTravelStyle(style) {
  const styleMap = {
    "family-friendly": "Family-Friendly",
    adventure: "Adventure-Focused",
    balanced: "Balanced",
  }
  return styleMap[style] || style
}

function formatBudget(budget) {
  const budgetMap = {
    budget: "Budget-conscious ($50-100/day)",
    moderate: "Moderate ($100-200/day)",
    comfortable: "Comfortable ($200-400/day)",
    luxury: "Luxury ($400+/day)",
  }
  return budgetMap[budget] || budget
}

function openParkModal(park) {
  const modal = document.getElementById("parkModal")

  console.log("[v0] Opening modal for park:", park)

  // Populate modal with park data
  document.getElementById("modalTitle").textContent = park.name
  document.getElementById("modalLocation").textContent = park.location
  document.getElementById("modalRating").textContent = `${park.rating}/5`
  document.getElementById("modalArea").textContent = `${park.area.toLocaleString()} acres`
  document.getElementById("modalElevation").textContent = `${park.elevation.toLocaleString()} ft`
  document.getElementById("modalEstablished").textContent = park.established
  document.getElementById("modalDescription").textContent = park.description
  document.getElementById("modalBestSeason").textContent = park.bestSeason
  document.getElementById("modalHours").textContent = park.hours
  document.getElementById("modalParkImage").src = park.imageUrl
  document.getElementById("modalParkImage").alt = park.name

  // Display activities
  const activitiesContainer = document.getElementById("modalActivities")
  activitiesContainer.innerHTML = park.activities
    .map((activity) => `<span class="activity-tag">${activity}</span>`)
    .join("")

  // Show modal with accessibility updates
  modal.setAttribute("aria-hidden", "false")
  modal.style.display = "block"
  document.body.style.overflow = "hidden"

  // Focus on close button for accessibility
  document.getElementById("modalCloseBtn").focus()
}

function closeParkModal() {
  const modal = document.getElementById("parkModal")
  modal.setAttribute("aria-hidden", "true")
  modal.style.display = "none"
  document.body.style.overflow = "auto"
}

function displayPreferences() {
  try {
    const formData = JSON.parse(localStorage.getItem("tripPlannerData"))

    if (!formData) {
      console.log("[v0] No form data found in localStorage")
      return
    }

    console.log("[v0] Form data retrieved:", formData)

    // Personalized greeting
    document.getElementById("userGreeting").textContent =
      `Thanks for planning with us, ${formData.name}! We found some great parks for your trip.`

    // Display preferences
    document.getElementById("prefDuration").textContent = formData.duration
    document.getElementById("prefSeason").textContent = formData.season
    document.getElementById("prefStyle").textContent = formatTravelStyle(formData.style)
    document.getElementById("prefGroup").textContent =
      `${formData.groupSize} person${formData.groupSize !== 1 ? "s" : ""}`
    document.getElementById("prefActivities").textContent = formData.activities.join(", ")
    document.getElementById("prefBudget").textContent = formatBudget(formData.budget)
  } catch (error) {
    console.error("[v0] Error displaying preferences:", error)
  }
}

function displayRecommendations() {
  try {
    const recommendations = JSON.parse(localStorage.getItem("tripRecommendations"))

    if (!recommendations || recommendations.length === 0) {
      console.log("[v0] No recommendations found")
      document.getElementById("noRecommendations").style.display = "block"
      document.getElementById("recommendationsGrid").style.display = "none"
      return
    }

    console.log("[v0] Displaying recommendations:", recommendations)
    console.log("[v0] allParks data available:", allParks)

    const grid = document.getElementById("recommendationsGrid")
    grid.innerHTML = ""

    recommendations.forEach((park, index) => {
      const card = document.createElement("div")
      card.className = "recommendation-card"

      const activitiesHtml = park.activities
        .slice(0, 3)
        .map((a) => `<span class="activity-tag">${a}</span>`)
        .join("")

      const imageUrl = park.imageUrl || "/placeholder.svg?key=lo44x"

      const parkIdString = String(park.id)

      card.innerHTML = `
                <div class="rec-rank">Recommendation ${index + 1}</div>
                <img src="${imageUrl}" alt="${park.name}" class="rec-image" loading="lazy">
                <div class="rec-content">
                    <h3>${park.name}</h3>
                    <p class="rec-location">${park.location}</p>
                    <div class="rec-meta">
                        <span>★ ${park.rating}</span>
                        <span>${park.area.toLocaleString()} acres</span>
                    </div>
                    <p class="rec-description">${park.description.substring(0, 130)}...</p>
                    <div class="rec-activities">${activitiesHtml}</div>
                    <div class="rec-footer">
                        <span class="best-season">Best: ${park.bestSeason}</span>
                        <button class="btn btn-small view-details-btn" data-park-id="${parkIdString}" data-park-name="${park.name}">View Details</button>
                    </div>
                </div>
            `

      grid.appendChild(card)
    })

    grid.addEventListener("click", (e) => {
      if (e.target.classList.contains("view-details-btn")) {
        const parkId = String(e.target.dataset.parkId)
        const parkName = e.target.dataset.parkName
        console.log("[v0] View Details clicked for park ID:", parkId, "Name:", parkName)

        // Find the park in recommendations array by comparing string IDs
        const park = recommendations.find((p) => String(p.id) === parkId)
        console.log("[v0] Found park:", park)

        if (park) {
          openParkModal(park)
        } else {
          console.error("[v0] Park not found with ID:", parkId)
          console.log(
            "[v0] Available park IDs:",
            recommendations.map((p) => String(p.id)),
          )
        }
      }
    })
  } catch (error) {
    console.error("[v0] Error displaying recommendations:", error)
    document.getElementById("noRecommendations").style.display = "block"
  }
}

function printRecommendations() {
  try {
    const formData = JSON.parse(localStorage.getItem("tripPlannerData"))
    const recommendations = JSON.parse(localStorage.getItem("tripRecommendations"))

    console.log("[v0] Printing recommendations for:", formData.name)

    window.print()
  } catch (error) {
    console.error("[v0] Error printing:", error)
    alert("Unable to print. Please try again.")
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    allParks = await loadParksData()
    console.log("[v0] Parks data loaded for form action page")

    displayPreferences()
    displayRecommendations()

    // Print button
    document.getElementById("printBtn").addEventListener("click", printRecommendations)

    const modal = document.getElementById("parkModal")
    const closeBtn = modal.querySelector(".modal-close")
    const closeModalBtn = document.getElementById("modalCloseBtn")
    const overlay = modal.querySelector(".modal-overlay")

    closeBtn.addEventListener("click", closeParkModal)
    closeModalBtn.addEventListener("click", closeParkModal)
    overlay.addEventListener("click", closeParkModal)

    // Close modal on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
        closeParkModal()
      }
    })
  } catch (error) {
    console.error("[v0] Error initializing form action page:", error)
  }
})
