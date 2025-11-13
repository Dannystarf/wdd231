// Directory page functionality
const gridBtn = document.getElementById("grid-btn")
const listBtn = document.getElementById("list-btn")
const membersContainer = document.getElementById("members-container")
const menuToggle = document.getElementById("menu-toggle")
const navMenu = document.getElementById("nav-menu")

// View toggle functionality
gridBtn.addEventListener("click", () => {
  membersContainer.classList.remove("list-view")
  gridBtn.classList.add("active")
  listBtn.classList.remove("active")

  // Update all cards to grid view
  document.querySelectorAll(".member-card").forEach((card) => {
    card.classList.remove("list-item")
  })
})

listBtn.addEventListener("click", () => {
  membersContainer.classList.add("list-view")
  listBtn.classList.add("active")
  gridBtn.classList.remove("active")

  // Update all cards to list view
  document.querySelectorAll(".member-card").forEach((card) => {
    card.classList.add("list-item")
  })
})

// Mobile menu toggle
menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true"
  menuToggle.setAttribute("aria-expanded", !isExpanded)
  navMenu.classList.toggle("active")
})

// Close menu when a link is clicked
navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false")
    navMenu.classList.remove("active")
  })
})

// Set current year and last modified date in footer
document.getElementById("year").textContent = new Date().getFullYear()
document.getElementById("lastModified").textContent = document.lastModified

// Load members from JSON
async function loadMembers() {
  try {
    const response = await fetch("data/members.json")
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const members = await response.json()
    displayMembers(members)
  } catch (error) {
    console.error("Error loading members:", error)
    membersContainer.innerHTML = "<p>Error loading members. Please try again later.</p>"
  }
}

// Display members in grid or list format
function displayMembers(members) {
  membersContainer.innerHTML = ""

  members.forEach((member) => {
    const card = createMemberCard(member)
    membersContainer.appendChild(card)
  })
}

// Create a member card element
function createMemberCard(member) {
  const card = document.createElement("div")
  card.className = "member-card"

  const memberLevel = getMemberLevelText(member.level)

  card.innerHTML = `
        <img src="${member.image}" alt="${member.name}" class="member-image" onerror="this.src='images/placeholder.jpg'">
        <div class="member-info">
            <h3 class="member-name">${member.name}</h3>
            <span class="member-level ${member.level}">${memberLevel}</span>
            <p class="member-address">${member.address}</p>
            <p class="member-phone">📞 ${member.phone}</p>
            <p class="member-website">🌐 <a href="https://${member.website}" target="_blank" rel="noopener noreferrer">${member.website}</a></p>
        </div>
    `

  return card
}

// Get readable membership level text
function getMemberLevelText(level) {
  const levels = {
    member: "Member",
    silver: "Silver Member",
    gold: "Gold Member",
  }
  return levels[level] || "Member"
}

// Load members when page loads
document.addEventListener("DOMContentLoaded", loadMembers)
