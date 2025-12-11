class ModalManager {
  constructor(modalId) {
    this.modal = document.getElementById(modalId)
    this.modalId = modalId

    if (!this.modal) {
      console.warn(`[v0] Modal with id '${modalId}' not found`)
      return
    }

    this.isOpen = false
    this.previousActiveElement = null
    this.initializeModal()
  }

  initializeModal() {
    // Close button
    const closeBtn = this.modal.querySelector(".modal-close")
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.close())
    }

    // Click outside to close
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal) {
        this.close()
      }
    })

    // Keyboard escape to close
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.close()
      }
    })

    console.log(`[v0] Modal '${this.modalId}' initialized`)
  }

  open() {
    if (this.isOpen) return

    this.previousActiveElement = document.activeElement
    this.modal.style.display = "block"
    this.modal.setAttribute("aria-hidden", "false")
    document.body.style.overflow = "hidden"

    // Focus first focusable element in modal
    this.focusFirstElement()

    this.isOpen = true
    console.log(`[v0] Modal '${this.modalId}' opened`)
  }

  close() {
    if (!this.isOpen) return

    this.modal.style.display = "none"
    this.modal.setAttribute("aria-hidden", "true")
    document.body.style.overflow = "auto"

    // Restore focus to previously active element
    if (this.previousActiveElement) {
      this.previousActiveElement.focus()
    }

    this.isOpen = false
    console.log(`[v0] Modal '${this.modalId}' closed`)
  }

  focusFirstElement() {
    const focusableElements = this.modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    )

    if (focusableElements.length > 0) {
      focusableElements[0].focus()
    }
  }

  updateContent(content) {
    const modalBody = this.modal.querySelector("#modalBody")
    if (modalBody) {
      if (typeof content === "string") {
        modalBody.innerHTML = content
      } else {
        modalBody.textContent = content
      }
      console.log(`[v0] Modal content updated`)
    }
  }

  getState() {
    return {
      isOpen: this.isOpen,
      modalId: this.modalId,
    }
  }
}

export function createModal(modalId) {
  return new ModalManager(modalId)
}

export const modals = {}

export function initializeModals(modalIds) {
  modalIds.forEach((id) => {
    modals[id] = createModal(id)
    console.log(`[v0] Registered modal: ${id}`)
  })
}

export function openModal(modalId) {
  if (modals[modalId]) {
    modals[modalId].open()
  } else {
    console.warn(`[v0] Modal '${modalId}' not found in registry`)
  }
}

export function closeModal(modalId) {
  if (modals[modalId]) {
    modals[modalId].close()
  }
}

export function updateModalContent(modalId, content) {
  if (modals[modalId]) {
    modals[modalId].updateContent(content)
  }
}

export function isModalOpen(modalId) {
  return modals[modalId] ? modals[modalId].isOpen : false
}
