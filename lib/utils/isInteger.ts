export function isInteger(value: unknown): boolean {
  if (typeof value === 'number') {
    return Number.isInteger(value)
  }

  if (typeof value === 'string') {
    const trimmedValue = value.trim()
    const integerRegex = /^-?\d+$/
    if (!integerRegex.test(trimmedValue)) {
      return false
    }

    const num = Number(trimmedValue)
    return Number.isInteger(num)
  }

  return false
}
