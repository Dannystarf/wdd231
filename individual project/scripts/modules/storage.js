const STORAGE_KEYS = {
  FAVORITES: "npe_favorites",
  USER_PREFERENCES: "npe_user_prefs",
  TRIP_DATA: "tripPlannerData",
  RECOMMENDATIONS: "tripRecommendations",
  VIEWED_PARKS: "npe_viewed_parks",
}

function isStorageAvailable() {
  try {
    const test = "__storage_test__"
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    console.log("[v0] localStorage is available")
    return true
  } catch (error) {
    console.warn("[v0] localStorage is not available:", error.message)
    return false
  }
}

export function getStorageItem(key, defaultValue = null) {
  try {
    if (!isStorageAvailable()) return defaultValue

    const item = localStorage.getItem(key)
    if (!item) return defaultValue

    const parsed = JSON.parse(item)
    console.log(`[v0] Retrieved from storage (${key}):`, parsed)
    return parsed
  } catch (error) {
    console.error(`[v0] Error retrieving from storage (${key}):`, error.message)
    return defaultValue
  }
}

export function setStorageItem(key, value) {
  try {
    if (!isStorageAvailable()) {
      console.warn("[v0] Cannot save to storage - not available")
      return false
    }

    const serialized = JSON.stringify(value)
    localStorage.setItem(key, serialized)
    console.log(`[v0] Saved to storage (${key}):`, value)
    return true
  } catch (error) {
    console.error(`[v0] Error saving to storage (${key}):`, error.message)
    return false
  }
}

export function removeStorageItem(key) {
  try {
    if (!isStorageAvailable()) return false

    localStorage.removeItem(key)
    console.log(`[v0] Removed from storage: ${key}`)
    return true
  } catch (error) {
    console.error(`[v0] Error removing from storage (${key}):`, error.message)
    return false
  }
}

export function clearAllStorage() {
  try {
    if (!isStorageAvailable()) return false

    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key)
    })

    console.log("[v0] All app storage cleared")
    return true
  } catch (error) {
    console.error("[v0] Error clearing storage:", error.message)
    return false
  }
}

// ========================================
// FAVORITES MANAGEMENT
// ========================================

export function loadFavorites() {
  const favorites = getStorageItem(STORAGE_KEYS.FAVORITES, [])
  console.log(`[v0] Loaded ${favorites.length} favorites`)
  return favorites
}

export function saveFavorites(favorites) {
  return setStorageItem(STORAGE_KEYS.FAVORITES, favorites)
}

export function addToFavorites(park) {
  const favorites = loadFavorites()
  const exists = favorites.some((fav) => fav.id === park.id)

  if (!exists) {
    favorites.push({
      id: park.id,
      name: park.name,
      location: park.location,
      addedAt: new Date().toISOString(),
    })
    saveFavorites(favorites)
    console.log(`[v0] Added park ${park.id} to favorites`)
    return true
  }

  return false
}

export function removeFromFavorites(parkId) {
  const favorites = loadFavorites()
  const filtered = favorites.filter((fav) => fav.id !== parkId)

  if (filtered.length < favorites.length) {
    saveFavorites(filtered)
    console.log(`[v0] Removed park ${parkId} from favorites`)
    return true
  }

  return false
}

export function toggleFavorite(park) {
  const isFav = isFavorite(park.id)

  if (isFav) {
    removeFromFavorites(park.id)
  } else {
    addToFavorites(park)
  }

  return !isFav
}

export function isFavorite(parkId) {
  const favorites = loadFavorites()
  return favorites.some((fav) => fav.id === parkId)
}

export function getFavoritesCount() {
  return loadFavorites().length
}

// ========================================
// USER PREFERENCES
// ========================================

export function getUserPreferences() {
  return getStorageItem(STORAGE_KEYS.USER_PREFERENCES, {
    sortBy: "name",
    filterActivity: "",
    filterSeason: "",
    viewMode: "grid",
  })
}

export function saveUserPreferences(prefs) {
  return setStorageItem(STORAGE_KEYS.USER_PREFERENCES, prefs)
}

export function updateUserPreference(key, value) {
  const prefs = getUserPreferences()
  prefs[key] = value
  return saveUserPreferences(prefs)
}

// ========================================
// TRIP DATA
// ========================================

export function saveTripData(tripData) {
  return setStorageItem(STORAGE_KEYS.TRIP_DATA, tripData)
}

export function getTripData() {
  return getStorageItem(STORAGE_KEYS.TRIP_DATA)
}

export function clearTripData() {
  return removeStorageItem(STORAGE_KEYS.TRIP_DATA)
}

// ========================================
// PARK RECOMMENDATIONS
// ========================================

export function saveRecommendations(parks) {
  return setStorageItem(STORAGE_KEYS.RECOMMENDATIONS, parks)
}

export function getRecommendations() {
  return getStorageItem(STORAGE_KEYS.RECOMMENDATIONS, [])
}

// ========================================
// VIEWED PARKS TRACKING
// ========================================

export function addViewedPark(park) {
  const viewed = getStorageItem(STORAGE_KEYS.VIEWED_PARKS, [])

  // Remove if already exists, then add to front
  const filtered = viewed.filter((p) => p.id !== park.id)
  filtered.unshift({
    id: park.id,
    name: park.name,
    viewedAt: new Date().toISOString(),
  })

  // Keep only last 10 viewed parks
  const limited = filtered.slice(0, 10)

  setStorageItem(STORAGE_KEYS.VIEWED_PARKS, limited)
  console.log("[v0] Park view tracked:", park.id)
}

export function getRecentlyViewed() {
  return getStorageItem(STORAGE_KEYS.VIEWED_PARKS, [])
}
