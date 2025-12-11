export async function loadParksData() {
  try {
    const response = await fetch("data/parks.json")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const parks = await response.json()
    console.log(`[v0] Successfully loaded ${parks.length} parks`)
    return parks
  } catch (error) {
    console.error("[v0] Error loading parks data:", error)
    throw error
  }
}

export function filterAndSortParks(parks, sortBy) {
  switch (sortBy) {
    case "name":
      parks.sort((a, b) => a.name.localeCompare(b.name))
      break
    case "established":
      parks.sort((a, b) => new Date(a.established) - new Date(b.established))
      break
    case "area":
      parks.sort((a, b) => b.area - a.area)
      break
    case "rating":
      parks.sort((a, b) => b.rating - a.rating)
      break
    default:
      parks.sort((a, b) => a.name.localeCompare(b.name))
  }
  return parks
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
