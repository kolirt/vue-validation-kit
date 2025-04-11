export function isBoolean(value: unknown): boolean {
  if (typeof value === 'boolean') {
    return true
  }

  if (typeof value === 'number') {
    return value === 0 || value === 1
  }

  if (typeof value === 'string') {
    const trimmedValue = value.trim().toLowerCase()
    return trimmedValue === 'true' || trimmedValue === 'false' || trimmedValue === '1' || trimmedValue === '0'
  }

  return false
}
