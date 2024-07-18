interface RateLimitEntry {
  count: number
  lastReset: number
}

const rateLimit = new Map<string, RateLimitEntry>()

const WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const MAX_REQUESTS = 100

export function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimit.get(ip) || { count: 0, lastReset: now }

  if (now - entry.lastReset > WINDOW_MS) {
    entry.count = 1
    entry.lastReset = now
  } else {
    entry.count++
  }

  rateLimit.set(ip, entry)

  return entry.count <= MAX_REQUESTS
}
