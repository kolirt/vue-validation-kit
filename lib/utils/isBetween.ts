export function isBetween(value: unknown, min: number, max: number): boolean {
  if (Array.isArray(value)) {
    return value.length >= min && value.length <= max
  }

  if (typeof value === 'number') {
    if (isNaN(value) || !isFinite(value)) {
      return false
    }
    return value >= min && value <= max
  }

  if (typeof value === 'string') {
    const trimmedValue = value.trim()

    const numberRegex = /^-?\d*\.?\d*$/
    if (numberRegex.test(trimmedValue)) {
      const num = Number(trimmedValue)
      if (isNaN(num) || !isFinite(num)) {
        return false
      }
      return num >= min && num <= max
    }

    return trimmedValue.length >= min && trimmedValue.length <= max
  }

  return false
}
