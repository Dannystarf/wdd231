const hamburger = document.getElementById("hamburger")
const navLinks = document.getElementById("navLinks")

if (hamburger) {
  hamburger.addEventListener("click", () => {
    const isExpanded = hamburger.getAttribute("aria-expanded") === "true"
    hamburger.setAttribute("aria-expanded", !isExpanded)
    navLinks.classList.toggle("active")
  })

  // Close menu when a link is clicked
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.setAttribute("aria-expanded", "false")
      navLinks.classList.remove("active")
    })
  })
}

async function loadFeaturedParks() {
  try {
    // Fetch parks data from JSON file
    const response = await fetch("data/parks.json")

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const parks = await response.json()

    // Get featured parks (first 3)
    const featuredParks = parks.slice(0, 3)

    // Display featured parks
    const container = document.getElementById("featuredParksContainer")
    container.innerHTML = ""

    featuredParks.forEach((park) => {
      const parkCard = createParkCard(park)
      container.appendChild(parkCard)
    })
  } catch (error) {
    console.error("Error loading featured parks:", error)
    const container = document.getElementById("featuredParksContainer")
    container.innerHTML = "<p>Unable to load parks data. Please try again later.</p>"
  }
}

function createParkCard(park) {
  const card = document.createElement("div")
  card.className = "park-card"

  const imageUrl = park.imageUrl || "/national-park-landscape.jpg"
  const rating = park.rating || 4.8

  card.innerHTML = `
        <img src="${imageUrl}" alt="${park.name}" class="park-card-image" loading="lazy">
        <div class="park-card-content">
            <h3 class="park-card-title">${park.name}</h3>
            <p class="park-card-location">${park.location || "USA"}</p>
            <p class="park-card-description">${park.description.substring(0, 100)}...</p>
            <div class="park-card-footer">
                <span class="park-rating">★ ${rating}</span>
                <button class="park-btn" data-park-id="${park.id}">Learn More</button>
            </div>
        </div>
    `

  // Add event listener to Learn More button
  card.querySelector(".park-btn").addEventListener("click", () => {
    window.location.href = `parks-directory.html#${park.id}`
  })

  return card
}

document.addEventListener("DOMContentLoaded", () => {
  loadFeaturedParks()
})
