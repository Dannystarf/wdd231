class Notification {
  constructor(message, type = "info", duration = 3000) {
    this.message = message
    this.type = type // 'success', 'error', 'warning', 'info'
    this.duration = duration
    this.element = null

    this.create()
    this.show()
  }

  create() {
    this.element = document.createElement("div")
    this.element.className = `notification notification-${this.type}`
    this.element.setAttribute("role", "alert")
    this.element.textContent = this.message

    // Styles
    Object.assign(this.element.style, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      padding: "1rem 1.5rem",
      borderRadius: "6px",
      color: "white",
      fontSize: "14px",
      fontWeight: "600",
      zIndex: "9999",
      animation: "slideInUp 0.3s ease",
    })

    // Type-specific colors
    const colors = {
      success: "#4CAF50",
      error: "#f44336",
      warning: "#ff9800",
      info: "#2196F3",
    }

    this.element.style.backgroundColor = colors[this.type] || colors["info"]

    document.body.appendChild(this.element)
    console.log(`[v0] Notification created: ${this.type} - ${this.message}`)
  }

  show() {
    setTimeout(() => this.remove(), this.duration)
  }

  remove() {
    if (this.element) {
      this.element.style.animation = "slideOutDown 0.3s ease"
      setTimeout(() => {
        this.element.remove()
        console.log("[v0] Notification removed")
      }, 300)
    }
  }
}

export function showNotification(message, type = "info", duration = 3000) {
  return new Notification(message, type, duration)
}

export function showSuccess(message, duration = 3000) {
  return showNotification(message, "success", duration)
}

export function showError(message, duration = 3000) {
  return showNotification(message, "error", duration)
}

export function showWarning(message, duration = 3000) {
  return showNotification(message, "warning", duration)
}

export function showInfo(message, duration = 3000) {
  return showNotification(message, "info", duration)
}
