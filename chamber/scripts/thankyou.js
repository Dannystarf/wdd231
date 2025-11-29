// Extract query parameters from URL
function getQueryParameter(name) {
  const urlParams = new URLSearchParams(window.location.search)
  return urlParams.get(name)
}

// Display submitted form data
function displaySubmittedData() {
  const firstName = getQueryParameter("firstName") || "Not provided"
  const lastName = getQueryParameter("lastName") || "Not provided"
  const email = getQueryParameter("email") || "Not provided"
  const phone = getQueryParameter("phone") || "Not provided"
  const businessName = getQueryParameter("businessName") || "Not provided"
  const timestamp = getQueryParameter("timestamp") || "Not provided"

  document.getElementById("displayFirstName").textContent = firstName
  document.getElementById("displayLastName").textContent = lastName
  document.getElementById("displayEmail").textContent = email
  document.getElementById("displayPhone").textContent = phone
  document.getElementById("displayBusinessName").textContent = businessName
  document.getElementById("displayTimestamp").textContent = timestamp
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  displaySubmittedData()
})
