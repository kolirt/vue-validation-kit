export function isDeclined(value: unknown): boolean {
  if (typeof value === 'boolean') {
    return !value
  }

  if (typeof value === 'number') {
    return value === 0
  }

  if (typeof value === 'string') {
    const trimmedValue = value.trim().toLowerCase()
    return trimmedValue === 'no' || trimmedValue === 'off' || trimmedValue === '0'
  }

  return false
}
