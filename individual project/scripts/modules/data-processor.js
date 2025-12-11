export function filterParksByActivity(parks, activity) {
  if (!activity) return parks

  return parks.filter((park) => park.activities && park.activities.includes(activity))
}

export function filterParksBySeason(parks, season) {
  if (!season) return parks

  return parks.filter((park) => park.bestSeason && park.bestSeason.includes(season))
}

export function filterParksByElevation(parks, elevationLevel) {
  if (!elevationLevel || elevationLevel === "any") return parks

  return parks.filter((park) => {
    const elevation = park.elevation || 0

    switch (elevationLevel) {
      case "low":
        return elevation < 6000
      case "moderate":
        return elevation >= 6000 && elevation < 8000
      case "high":
        return elevation >= 8000
      default:
        return true
    }
  })
}

export function searchParks(parks, searchTerm) {
  if (!searchTerm) return parks

  const term = searchTerm.toLowerCase()

  return parks.filter(
    (park) =>
      (park.name && park.name.toLowerCase().includes(term)) ||
      (park.location && park.location.toLowerCase().includes(term)) ||
      (park.description && park.description.toLowerCase().includes(term)),
  )
}

export function sortParks(parks, sortBy) {
  const sorted = [...parks] // Create copy to avoid mutating original

  switch (sortBy) {
    case "name":
      sorted.sort((a, b) => a.name.localeCompare(b.name))
      break

    case "established":
      sorted.sort((a, b) => new Date(a.established) - new Date(b.established))
      break

    case "area":
      sorted.sort((a, b) => b.area - a.area)
      break

    case "rating":
      sorted.sort((a, b) => b.rating - a.rating)
      break

    case "elevation":
      sorted.sort((a, b) => b.elevation - a.elevation)
      break

    default:
      return sorted
  }

  return sorted
}

export function getUniqueActivities(parks) {
  const activitiesSet = new Set()

  parks.forEach((park) => {
    if (park.activities && Array.isArray(park.activities)) {
      park.activities.forEach((activity) => activitiesSet.add(activity))
    }
  })

  return Array.from(activitiesSet).sort()
}

export function getParkStatistics(parks) {
  if (parks.length === 0) {
    return {
      totalParks: 0,
      averageRating: 0,
      totalAcreage: 0,
      averageElevation: 0,
    }
  }

  const totalAcreage = parks.reduce((sum, park) => sum + (park.area || 0), 0)
  const totalElevation = parks.reduce((sum, park) => sum + (park.elevation || 0), 0)
  const totalRating = parks.reduce((sum, park) => sum + (park.rating || 0), 0)

  return {
    totalParks: parks.length,
    averageRating: (totalRating / parks.length).toFixed(2),
    totalAcreage: totalAcreage.toLocaleString(),
    averageElevation: Math.round(totalElevation / parks.length).toLocaleString(),
  }
}

export function findMatchingParks(parks, criteria) {
  return parks.filter((park) => {
    // Check activity criteria
    if (criteria.activities && criteria.activities.length > 0) {
      const hasAllActivities = criteria.activities.some((activity) => park.activities.includes(activity))
      if (!hasAllActivities) return false
    }

    // Check season criteria
    if (criteria.season) {
      if (!park.bestSeason.includes(criteria.season)) return false
    }

    // Check elevation criteria
    if (criteria.elevationLevel) {
      const elevation = park.elevation
      const isElevationMatch =
        (criteria.elevationLevel === "low" && elevation < 6000) ||
        (criteria.elevationLevel === "moderate" && elevation >= 6000 && elevation < 8000) ||
        (criteria.elevationLevel === "high" && elevation >= 8000)
      if (!isElevationMatch) return false
    }

    return true
  })
}
