export function isLessThan(value: unknown, threshold: number): boolean {
  if (typeof value === 'number') {
    if (isNaN(value) || !isFinite(value)) {
      return false
    }
    return value < threshold
  }

  if (typeof value === 'string') {
    const trimmedValue = value.trim()
    const numberRegex = /^-?\d*\.?\d*$/
    if (!numberRegex.test(trimmedValue)) {
      return false
    }

    const num = Number(trimmedValue)
    if (isNaN(num) || !isFinite(num)) {
      return false
    }
    return num < threshold
  }

  return false
}
