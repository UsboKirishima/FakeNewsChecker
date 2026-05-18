type RateLimitConfig = {
  windowMs: number
  max: number
}

const store = new Map<string, number[]>()

const CLEANUP_INTERVAL = 60_000
let lastCleanup = Date.now()

function cleanup() {
  const now = Date.now()
  if (now - lastCleanup < CLEANUP_INTERVAL) return
  lastCleanup = now
  for (const [key, timestamps] of store) {
    const recent = timestamps.filter((t) => now - t < CLEANUP_INTERVAL * 2)
    if (recent.length === 0) store.delete(key)
    else store.set(key, recent)
  }
}

export function rateLimiter(key: string, config: RateLimitConfig = { windowMs: 60_000, max: 10 }) {
  cleanup()

  const now = Date.now()
  const timestamps = store.get(key) || []
  const recent = timestamps.filter((t) => now - t < config.windowMs)

  if (recent.length >= config.max) {
    const oldest = recent[0]
    const reset = oldest + config.windowMs
    return {
      success: false,
      remaining: 0,
      reset: Math.ceil(reset / 1000),
    }
  }

  recent.push(now)
  store.set(key, recent)

  return {
    success: true,
    remaining: config.max - recent.length,
    reset: Math.ceil((now + config.windowMs) / 1000),
  }
}
