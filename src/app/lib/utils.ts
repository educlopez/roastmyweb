export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch (error) {
    return false
  }
}

export function sanitizeInput<T>(input: T): T {
  if (typeof input === "string") {
    return input.replace(/[<>&'"]/g, "") as T
  } else if (Array.isArray(input)) {
    return input.map((item) => sanitizeInput(item)) as T
  } else if (typeof input === "object" && input !== null) {
    return Object.fromEntries(
      Object.entries(input).map(([key, value]) => [key, sanitizeInput(value)])
    ) as T
  }
  return input
}
