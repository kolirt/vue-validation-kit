export function isDecimal(value: unknown): boolean {
  if (typeof value === 'number') {
    return !isNaN(value) && isFinite(value)
  }

  if (typeof value === 'string') {
    const trimmedValue = value.trim()
    const decimalRegex = /^-?\d*\.?\d+$/
    if (!decimalRegex.test(trimmedValue)) {
      return false
    }

    const num = Number(trimmedValue)
    return !isNaN(num) && isFinite(num)
  }

  return false
}
