export function isEmail(value: unknown): boolean {
  if (typeof value !== 'string') {
    return false
  }

  const trimmedValue = value.trim()
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  return emailRegex.test(trimmedValue)
}
