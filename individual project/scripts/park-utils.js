import { fetchParksData } from "./modules/api-service.js"
import { sortParks } from "./modules/data-processor.js"

export async function loadParksData() {
  try {
    const parks = await fetchParksData()
    console.log("[v0] Parks data loaded successfully")
    return parks
  } catch (error) {
    console.error("[v0] Failed to load parks:", error.message)
    throw error
  }
}

export function filterAndSortParks(parks, sortBy) {
  return sortParks(parks, sortBy)
}

export function renderParks(parks, container) {
  container.innerHTML = ""
  parks.forEach((park) => {
    const card = document.createElement("div")
    card.className = "park-card"
    card.innerHTML = `<h3>${park.name}</h3>`
    container.appendChild(card)
  })
}
