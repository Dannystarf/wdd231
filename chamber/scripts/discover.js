const attractions = [
  {
    id: 1,
    name: "Simpsons Park",
    address: "123 Animation Boulevard, Springfield, ST 12345",
    description:
      "Family-friendly park featuring walking trails, playgrounds, and scenic viewpoints of the Springfield Valley.",
    image: "images/attractions/simpsons-park.webp", 
  },
  {
    id: 2,
    name: "Springfield Nuclear Power Plant",
    address: "456 Energy Lane, Springfield, ST 12345",
    description:
      "Historic nuclear facility offering guided tours showcasing sustainable energy production and innovation in technology.",
    image: "images/attractions/power-plant.webp",
  },
  {
    id: 3,
    name: "Moe's Tavern Historic District",
    address: "789 Main Street, Springfield, ST 12345",
    description:
      "Vibrant downtown area with local restaurants, shops, galleries, and entertainment venues perfect for a night out.",
    image: "images/attractions/moes-tavern.webp",
  },
  {
    id: 4,
    name: "Springfield Museum of Natural History",
    address: "321 Cultural Avenue, Springfield, ST 12345",
    description:
      "World-class museum featuring exhibits on paleontology, world cultures, and interactive science displays.",
    image: "images/attractions/museum.webp",
  },
  {
    id: 5,
    name: "Krusty Land Amusement Park",
    address: "555 Fun Way, Springfield, ST 12345",
    description: "Theme park with thrilling rides, entertainment shows, and family attractions for all ages.",
    image: "images/attractions/krusty-land.webp",
  },
  {
    id: 6,
    name: "Springfield Gorge",
    address: "888 Scenic Route, Springfield, ST 12345",
    description:
      "Breathtaking natural wonder offering hiking trails, scenic overlooks, and opportunities for outdoor photography.",
    image: "images/attractions/gorge.webp",
  },
  {
    id: 7,
    name: "Evergreen Terrace Historic Neighborhood",
    address: "742 Evergreen Terrace, Springfield, ST 12345",
    description:
      "Charming residential area with beautiful tree-lined streets, local coffee shops, and boutique shopping.",
    image: "images/attractions/evergreen-terrace.webp",
  },
  {
    id: 8,
    name: "Shelbyville Speedway",
    address: "999 Race Track Road, Springfield, ST 12345",
    description:
      "Premier racing venue hosting motorsports events, including stock car racing, drag racing, and driving experiences.",
    image: "images/attractions/speedway.webp",
  },
]

// Handle visitor tracking using localStorage
function handleVisitorTracking() {
  const currentDate = new Date().toDateString()
  const lastVisitDate = localStorage.getItem("lastVisitDate")
  const messageContainer = document.getElementById("visitor-message")

  if (!lastVisitDate) {
    messageContainer.innerHTML = "Welcome! This is your first visit to the Discover page."
    messageContainer.classList.add("first-visit")
  } else if (lastVisitDate === currentDate) {
    messageContainer.innerHTML = "Welcome back! You've visited us today already."
    messageContainer.classList.add("returning-same-day")
  } else {
    const lastDate = new Date(lastVisitDate)
    const today = new Date()
    const daysDifference = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24))
    messageContainer.innerHTML = `Welcome back! It's been ${daysDifference} day(s) since your last visit.`
    messageContainer.classList.add("returning-visitor")
  }

  localStorage.setItem("lastVisitDate", currentDate)
}

async function displayAttractions() {
  const container = document.getElementById("attractions-container")

  if (!container) {
    console.error("[v0] Attractions container not found")
    return
  }

  try {
    const response = await fetch("data/attractions.json")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const attractions = await response.json()

    container.innerHTML = attractions
      .map(
        (attraction, index) => `
        <div class="attraction-card" style="grid-area: area-${index + 1};">
            <img src="${attraction.image}" alt="${attraction.name}" class="attraction-image" loading="lazy">
            <div class="attraction-content">
                <h3>${attraction.name}</h3>
                <p class="address"><strong>Address:</strong> ${attraction.address}</p>
                <p class="description">${attraction.description}</p>
                <a href="#" class="learn-more-btn">Learn More</a>
            </div>
        </div>
      `,
      )
      .join("")
  } catch (error) {
    console.error("[v0] Error loading attractions:", error)
    container.innerHTML = "<p>Unable to load attractions. Please try again later.</p>"
  }
}

// Initialize discover page
document.addEventListener("DOMContentLoaded", () => {
  handleVisitorTracking()
  displayAttractions()
})
