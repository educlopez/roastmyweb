export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch (error) {
    return false
  }
}

export function sanitizeInput(input: any): any {
  if (typeof input === "string") {
    // Remove any potentially harmful characters or patterns
    return input.replace(/[<>&'"]/g, "")
  } else if (Array.isArray(input)) {
    return input.map(sanitizeInput)
  } else if (typeof input === "object" && input !== null) {
    const sanitizedObject: { [key: string]: any } = {}
    for (const [key, value] of Object.entries(input)) {
      sanitizedObject[key] = sanitizeInput(value)
    }
    return sanitizedObject
  }
  return input
}
