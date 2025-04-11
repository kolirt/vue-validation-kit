export function isMin(value: unknown, threshold: number): boolean {
  if (Array.isArray(value)) {
    return value.length >= threshold
  }

  if (typeof value === 'number') {
    if (isNaN(value) || !isFinite(value)) {
      return false
    }
    return value >= threshold
  }

  if (typeof value === 'string') {
    const trimmedValue = value.trim()

    const numberRegex = /^-?\d*\.?\d*$/
    if (numberRegex.test(trimmedValue)) {
      const num = Number(trimmedValue)
      if (isNaN(num) || !isFinite(num)) {
        return false
      }
      return num >= threshold
    }

    return trimmedValue.length >= threshold
  }

  return false
}
