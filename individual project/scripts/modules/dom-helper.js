export function createElement(tag, className = "", attributes = {}) {
  const element = document.createElement(tag)

  if (className) {
    element.className = className
  }

  Object.entries(attributes).forEach(([key, value]) => {
    if (key === "text") {
      element.textContent = value
    } else if (key === "html") {
      element.innerHTML = value
    } else {
      element.setAttribute(key, value)
    }
  })

  return element
}

export function createParkCardElement(park, options = {}) {
  const card = createElement("div", "park-card")

  const imageUrl = park.imageUrl || "/placeholder.svg?key=lo44x"
  const rating = park.rating || 4.5

  const activitiesHtml = (park.activities || [])
    .slice(0, 3)
    .map((activity) => `<span class="activity-tag">${escapeHtml(activity)}</span>`)
    .join("")

  card.innerHTML = `
        <img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(park.name)}" class="park-card-image" loading="lazy">
        <div class="park-card-content">
            <h3 class="park-card-title">${escapeHtml(park.name)}</h3>
            <p class="park-card-location">${escapeHtml(park.location || "USA")}</p>
            <p class="park-card-description">${escapeHtml(park.description.substring(0, 100))}...</p>
            <div class="park-card-footer">
                <span class="park-rating">★ ${rating}</span>
                <button class="park-btn" data-park-id="${park.id}">Learn More</button>
            </div>
        </div>
    `

  return card
}

export function escapeHtml(text) {
  const div = document.createElement("div")
  div.textContent = text
  return div.innerHTML
}

export function getElement(selector) {
  const element = document.querySelector(selector)
  if (!element) {
    console.warn(`[v0] Element not found: ${selector}`)
  }
  return element
}

export function addListener(element, event, handler) {
  if (!element) {
    console.warn("[v0] Cannot add listener: element is null")
    return
  }

  element.addEventListener(event, (e) => {
    try {
      handler(e)
    } catch (error) {
      console.error(`[v0] Error in event handler: ${error.message}`)
    }
  })
}

export function updateElement(element, content, isHTML = false) {
  if (!element) return

  if (isHTML) {
    element.innerHTML = content
  } else {
    element.textContent = content
  }
}

export function toggleVisibility(element, show) {
  if (!element) return
  element.style.display = show ? "block" : "none"
}

export function addClass(element, className) {
  if (element && className) {
    element.classList.add(className)
  }
}

export function removeClass(element, className) {
  if (element && className) {
    element.classList.remove(className)
  }
}

export function toggleClass(element, className) {
  if (element && className) {
    element.classList.toggle(className)
  }
}
