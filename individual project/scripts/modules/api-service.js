const DATA_SOURCES = {
  LOCAL_JSON: "data/parks.json",
  CACHE_KEY: "parksDataCache",
  CACHE_DURATION: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
}

export async function fetchParksData() {
  try {
    // Check for cached data first
    const cachedData = getCachedData()
    if (cachedData) {
      console.log("[v0] Using cached parks data")
      return cachedData
    }

    // Fetch fresh data from JSON file
    console.log("[v0] Fetching parks data from:", DATA_SOURCES.LOCAL_JSON)

    const response = await fetch(DATA_SOURCES.LOCAL_JSON)

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`)
    }

    const data = await response.json()

    // Validate data structure
    if (!Array.isArray(data)) {
      throw new Error("Invalid data format: expected array of parks")
    }

    console.log(`[v0] Successfully loaded ${data.length} parks`)

    // Cache the data
    cacheData(data)

    return data
  } catch (error) {
    console.error("[v0] Error fetching parks data:", error.message)
    throw new Error(`Failed to load parks data: ${error.message}`)
  }
}

function cacheData(data) {
  try {
    const cacheObject = {
      data: data,
      timestamp: Date.now(),
    }
    localStorage.setItem(DATA_SOURCES.CACHE_KEY, JSON.stringify(cacheObject))
    console.log("[v0] Parks data cached successfully")
  } catch (error) {
    console.warn("[v0] Unable to cache data:", error.message)
  }
}

function getCachedData() {
  try {
    const cached = localStorage.getItem(DATA_SOURCES.CACHE_KEY)
    if (!cached) return null

    const cacheObject = JSON.parse(cached)
    const now = Date.now()
    const isExpired = now - cacheObject.timestamp > DATA_SOURCES.CACHE_DURATION

    if (isExpired) {
      console.log("[v0] Cached data expired, will fetch fresh data")
      localStorage.removeItem(DATA_SOURCES.CACHE_KEY)
      return null
    }

    console.log("[v0] Cache hit - data is still valid")
    return cacheObject.data
  } catch (error) {
    console.warn("[v0] Error reading cache:", error.message)
    return null
  }
}

export function clearParksCache() {
  try {
    localStorage.removeItem(DATA_SOURCES.CACHE_KEY)
    console.log("[v0] Parks cache cleared")
  } catch (error) {
    console.error("[v0] Error clearing cache:", error.message)
  }
}
