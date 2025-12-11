export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validateRequired(value) {
  return value && value.trim().length > 0
}

export function validateMinLength(value, minLength) {
  return value && value.length >= minLength
}

export function validateMaxLength(value, maxLength) {
  return value && value.length <= maxLength
}

export function validateNumber(value, min = null, max = null) {
  const num = Number(value)

  if (isNaN(num)) return false

  if (min !== null && num < min) return false
  if (max !== null && num > max) return false

  return true
}

export function validateFormFields(fields) {
  const errors = {}

  Object.entries(fields).forEach(([fieldName, fieldConfig]) => {
    const { value, rules } = fieldConfig

    for (const rule of rules) {
      let isValid = true
      let errorMessage = ""

      switch (rule.type) {
        case "required":
          isValid = validateRequired(value)
          errorMessage = rule.message || "This field is required"
          break

        case "email":
          isValid = validateEmail(value)
          errorMessage = rule.message || "Please enter a valid email"
          break

        case "minLength":
          isValid = validateMinLength(value, rule.value)
          errorMessage = rule.message || `Minimum length is ${rule.value}`
          break

        case "maxLength":
          isValid = validateMaxLength(value, rule.value)
          errorMessage = rule.message || `Maximum length is ${rule.value}`
          break

        case "number":
          isValid = validateNumber(value, rule.min, rule.max)
          errorMessage = rule.message || "Please enter a valid number"
          break
      }

      if (!isValid) {
        errors[fieldName] = errorMessage
        break
      }
    }
  })

  return errors
}

export function displayValidationErrors(errors, errorElements) {
  // Clear all errors first
  Object.values(errorElements).forEach((element) => {
    if (element) {
      element.textContent = ""
      element.style.display = "none"
    }
  })

  // Display new errors
  Object.entries(errors).forEach(([fieldName, errorMessage]) => {
    const errorElement = errorElements[fieldName]
    if (errorElement) {
      errorElement.textContent = errorMessage
      errorElement.style.display = "block"
      console.log(`[v0] Validation error for ${fieldName}: ${errorMessage}`)
    }
  })
}
