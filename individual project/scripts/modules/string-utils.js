export function formatParkName(name) {
  return name
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}

export function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function formatNumber(num) {
  return num.toLocaleString()
}

export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text
  return `${text.substring(0, maxLength).trim()}...`
}

export function createSummaryString(park) {
  return `
        ${formatParkName(park.name)} - ${park.location}
        Established: ${formatDate(park.established)}
        Area: ${formatNumber(park.area)} acres
        Rating: ${park.rating}/5
    `.trim()
}

export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
}
