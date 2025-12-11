import { loadParksData, filterAndSortParks } from "./modules/park-utils.js"
import { createModal } from "./modules/modal.js"
import { loadFavorites, addToFavorites, isFavorite } from "./modules/favorites.js"

let allParks = []
let filteredParks = []
let parkModal = null

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

function handleSearch() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase()
  const activity = document.getElementById("activityFilter").value
  const season = document.getElementById("seasonFilter").value
  const sortBy = document.getElementById("sortBy").value

  filteredParks = allParks.filter((park) => {
    const matchesSearch =
      park.name.toLowerCase().includes(searchTerm) || park.location.toLowerCase().includes(searchTerm)
    const matchesActivity = !activity || park.activities.includes(activity)
    const matchesSeason = !season || park.bestSeason.includes(season)

    return matchesSearch && matchesActivity && matchesSeason
  })

  // Apply sorting
  filterAndSortParks(filteredParks, sortBy)

  updateResultsDisplay()
}

function updateResultsDisplay() {
  const resultsCount = document.getElementById("resultsCount")
  const noResults = document.getElementById("noResults")
  const parksGrid = document.getElementById("parksGrid")

  if (filteredParks.length === 0) {
    noResults.style.display = "block"
    parksGrid.style.display = "none"
    resultsCount.textContent = "No parks found"
  } else {
    noResults.style.display = "none"
    parksGrid.style.display = "grid"
    resultsCount.textContent = `Showing ${filteredParks.length} park${filteredParks.length !== 1 ? "s" : ""}`
    renderParksGrid(filteredParks)
  }
}

function renderParksGrid(parks) {
  const grid = document.getElementById("parksGrid")
  grid.innerHTML = ""

  parks.forEach((park) => {
    const card = document.createElement("div")
    card.className = "park-card"
    card.id = `park-${park.id}`

    const isFav = isFavorite(park.id)
    const imageUrl = park.imageUrl || "/placeholder.svg?key=lo44x"

    card.innerHTML = `
            <img src="${imageUrl}" alt="${park.name}" class="park-card-image" loading="lazy">
            <div class="park-card-content">
                <h3 class="park-card-title">${park.name}</h3>
                <p class="park-card-location">${park.location}</p>
                <p class="park-card-meta">Established: ${new Date(park.established).getFullYear()}</p>
                <p class="park-card-description">${park.description.substring(0, 120)}...</p>
                <div class="park-card-footer">
                    <span class="park-rating">★ ${park.rating}</span>
                    <button class="favorite-btn ${isFav ? "active" : ""}" 
                            data-park-id="${park.id}" 
                            aria-label="Toggle favorite"
                            title="${isFav ? "Remove from favorites" : "Add to favorites"}">
                        ${isFav ? "❤️" : "🤍"}
                    </button>
                </div>
                <button class="park-btn" data-park-id="${park.id}">View Details</button>
            </div>
        `

    // View details button
    card.querySelector(".park-btn").addEventListener("click", () => {
      openParkModal(park)
    })

    // Favorite button
    card.querySelector(".favorite-btn").addEventListener("click", (e) => {
      e.stopPropagation()
      const favBtn = e.target.closest(".favorite-btn")
      const parkId = Number.parseInt(favBtn.dataset.parkId)
      toggleFavorite(parkId, favBtn)
    })

    grid.appendChild(card)
  })
}

function toggleFavorite(parkId, button) {
  const park = allParks.find((p) => p.id === parkId)
  if (park) {
    addToFavorites(park)
    button.classList.toggle("active")
    button.textContent = button.classList.contains("active") ? "❤️" : "🤍"
  }
}

function openParkModal(park) {
  const modalBody = document.getElementById("modalBody")
  const modalTitle = document.getElementById("parkModalTitle")

  const activitiesHtml = park.activities.map((a) => `<span class="activity-tag">${a}</span>`).join("")

  modalBody.innerHTML = `
        <h2 id="parkModalTitle">${park.name}</h2>
        <div class="modal-image-container">
            <img src="${park.imageUrl}" alt="${park.name}" class="modal-park-image" loading="lazy">
        </div>
        <div class="modal-details">
            <div class="detail-row">
                <strong>Location:</strong> ${park.location}
            </div>
            <div class="detail-row">
                <strong>Established:</strong> ${new Date(park.established).toLocaleDateString()}
            </div>
            <div class="detail-row">
                <strong>Area:</strong> ${(park.area / 1000).toFixed(1)} thousand acres
            </div>
            <div class="detail-row">
                <strong>Elevation:</strong> ${park.elevation.toLocaleString()} ft
            </div>
            <div class="detail-row">
                <strong>Best Season:</strong> ${park.bestSeason}
            </div>
            <div class="detail-row">
                <strong>Activities:</strong>
                <div class="activities-container">
                    ${activitiesHtml}
                </div>
            </div>
            <div class="detail-row full">
                <strong>Description:</strong>
                <p>${park.description}</p>
            </div>
            <div class="detail-row">
                <strong>Official Website:</strong> <a href="${park.officialUrl}" target="_blank">Visit NPS.gov</a>
            </div>
        </div>
    `

  const favBtn = document.getElementById("addToFavorites")
  const isFav = isFavorite(park.id)
  favBtn.textContent = isFav ? "Remove from Favorites" : "Add to Favorites"
  favBtn.onclick = () => {
    addToFavorites(park)
    favBtn.textContent = isFavorite(park.id) ? "Remove from Favorites" : "Add to Favorites"
  }

  parkModal.open()
}

function initializeEventListeners() {
  document.getElementById("searchInput").addEventListener("keyup", handleSearch)
  document.getElementById("activityFilter").addEventListener("change", handleSearch)
  document.getElementById("seasonFilter").addEventListener("change", handleSearch)
  document.getElementById("sortBy").addEventListener("change", handleSearch)

  document.getElementById("clearFilters").addEventListener("click", () => {
    document.getElementById("searchInput").value = ""
    document.getElementById("activityFilter").value = ""
    document.getElementById("seasonFilter").value = ""
    document.getElementById("sortBy").value = "name"
    handleSearch()
  })

  document.getElementById("resetSearch").addEventListener("click", () => {
    document.getElementById("searchInput").value = ""
    document.getElementById("activityFilter").value = ""
    document.getElementById("seasonFilter").value = ""
    document.getElementById("sortBy").value = "name"
    handleSearch()
  })

  document.getElementById("closeModal").addEventListener("click", () => parkModal.close())
  document.getElementById("closeModalBtn").addEventListener("click", () => parkModal.close())

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    const modal = document.getElementById("parkModal")
    if (e.target === modal) {
      parkModal.close()
    }
  })
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    parkModal = createModal("parkModal")

    allParks = await loadParksData()
    filteredParks = allParks
    loadFavorites()
    initializeEventListeners()
    updateResultsDisplay()

    const selectedParkId = localStorage.getItem("selectedParkId")
    if (selectedParkId) {
      const parkId = Number.parseInt(selectedParkId)
      const park = allParks.find((p) => p.id === parkId)
      if (park) {
        console.log("[v0] Auto-opening modal for park:", park.name)
        openParkModal(park)
        localStorage.removeItem("selectedParkId") // Clear after using
      }
    }
  } catch (error) {
    console.error("Error initializing parks directory:", error)
    document.getElementById("parksGrid").innerHTML = "<p>Error loading parks data.</p>"
  }
})
