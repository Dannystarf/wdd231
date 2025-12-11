import {
  loadFavorites as storageFavorites,
  addToFavorites as storageAdd,
  removeFromFavorites as storageRemove,
  isFavorite as storageIsFavorite,
} from "./storage.js"

export function loadFavorites() {
  return storageFavorites()
}

export function addToFavorites(park) {
  return storageAdd(park)
}

export function removeFromFavorites(parkId) {
  return storageRemove(parkId)
}

export function isFavorite(parkId) {
  return storageIsFavorite(parkId)
}

export function getFavoriteParks(allParks) {
  const favorites = loadFavorites()
  return allParks.filter((park) => favorites.some((fav) => fav.id === park.id))
}

export function toggleFavoritesDisplay(container, allParks) {
  const favorites = getFavoriteParks(allParks)

  if (favorites.length === 0) {
    container.innerHTML = "<p>No favorite parks yet. Add some parks to your favorites!</p>"
    return
  }

  // Render favorite parks
  container.innerHTML = ""
  favorites.forEach((park) => {
    const card = createFavoriteCard(park)
    container.appendChild(card)
  })
}

function createFavoriteCard(park) {
  const card = document.createElement("div")
  card.className = "favorite-card"
  card.innerHTML = `
        <h3>${park.name}</h3>
        <p>${park.location}</p>
        <button class="remove-favorite" data-park-id="${park.id}">Remove from Favorites</button>
    `
  return card
}
