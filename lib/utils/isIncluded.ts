export function isIncluded(value: unknown, allowedValues: unknown[]): boolean {
  return allowedValues.some((allowed) => allowed == value)
}
