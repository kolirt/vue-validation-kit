export function isAccepted(value: unknown): boolean {
  if (typeof value === 'boolean') {
    return value
  }

  if (typeof value === 'number') {
    return value === 1
  }

  if (typeof value === 'string') {
    const trimmedValue = value.trim().toLowerCase()
    return trimmedValue === 'yes' || trimmedValue === 'on' || trimmedValue === '1'
  }

  return false
}
