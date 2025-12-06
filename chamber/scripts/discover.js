const attractions = [
  {
    id: 1,
    name: "Simpsons Park",
    address: "123 Animation Boulevard, Springfield, ST 12345",
    description:
      "Family-friendly park featuring walking trails, playgrounds, and scenic viewpoints of the Springfield Valley.",
    image: "images/attractions/simpsons-park.jpg",
  },
  {
    id: 2,
    name: "Springfield Nuclear Power Plant",
    address: "456 Energy Lane, Springfield, ST 12345",
    description:
      "Historic nuclear facility offering guided tours showcasing sustainable energy production and innovation in technology.",
    image: "images/attractions/power-plant.jpg",
  },
  {
    id: 3,
    name: "Moe's Tavern Historic District",
    address: "789 Main Street, Springfield, ST 12345",
    description:
      "Vibrant downtown area with local restaurants, shops, galleries, and entertainment venues perfect for a night out.",
    image: "images/attractions/moes-tavern.jpg",
  },
  {
    id: 4,
    name: "Springfield Museum of Natural History",
    address: "321 Cultural Avenue, Springfield, ST 12345",
    description:
      "World-class museum featuring exhibits on paleontology, world cultures, and interactive science displays.",
    image: "images/attractions/museum.jpg",
  },
  {
    id: 5,
    name: "Krusty Land Amusement Park",
    address: "555 Fun Way, Springfield, ST 12345",
    description: "Theme park with thrilling rides, entertainment shows, and family attractions for all ages.",
    image: "images/attractions/krusty-land.jpg",
  },
  {
    id: 6,
    name: "Springfield Gorge",
    address: "888 Scenic Route, Springfield, ST 12345",
    description:
      "Breathtaking natural wonder offering hiking trails, scenic overlooks, and opportunities for outdoor photography.",
    image: "images/attractions/gorge.jpg",
  },
  {
    id: 7,
    name: "Evergreen Terrace Historic Neighborhood",
    address: "742 Evergreen Terrace, Springfield, ST 12345",
    description:
      "Charming residential area with beautiful tree-lined streets, local coffee shops, and boutique shopping.",
    image: "images/attractions/evergreen-terrace.jpg",
  },
  {
    id: 8,
    name: "Shelbyville Speedway",
    address: "999 Race Track Road, Springfield, ST 12345",
    description:
      "Premier racing venue hosting motorsports events, including stock car racing, drag racing, and driving experiences.",
    image: "images/attractions/speedway.jpg",
  },
]

// Handle visitor tracking using localStorage
function handleVisitorTracking() {
  const currentDate = new Date().toDateString()
  const lastVisitDate = localStorage.getItem("lastVisitDate")
  const messageContainer = document.getElementById("visitor-message")

  if (!lastVisitDate) {
    // First time visitor
    messageContainer.innerHTML = "Welcome! This is your first visit to the Discover page."
    messageContainer.classList.add("first-visit")
  } else if (lastVisitDate === currentDate) {
    // Returning visitor on same day
    messageContainer.innerHTML = "Welcome back! You've visited us today already."
    messageContainer.classList.add("returning-same-day")
  } else {
    // Returning visitor - calculate days since last visit
    const lastDate = new Date(lastVisitDate)
    const today = new Date()
    const daysDifference = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24))
    messageContainer.innerHTML = `Welcome back! It's been ${daysDifference} day(s) since your last visit.`
    messageContainer.classList.add("returning-visitor")
  }

  // Update last visit date
  localStorage.setItem("lastVisitDate", currentDate)
}

function displayAttractions() {
  const container = document.getElementById("attractions-container")

  if (!container) {
    console.error("[v0] Attractions container not found")
    return
  }

  if (!attractions || attractions.length === 0) {
    console.error("[v0] Attractions data not loaded")
    return
  }

  container.innerHTML = attractions
    .map(
      (attraction) => `
        <div class="attraction-card" style="grid-area: auto;">
            <img src="${attraction.image}" alt="${attraction.name}" class="attraction-image" loading="lazy">
            <div class="attraction-content">
                <h3>${attraction.name}</h3>
                <p class="address">${attraction.address}</p>
                <p class="description">${attraction.description}</p>
            </div>
        </div>
    `,
    )
    .join("")
}

// Initialize discover page
document.addEventListener("DOMContentLoaded", () => {
  handleVisitorTracking()
  displayAttractions()
})
