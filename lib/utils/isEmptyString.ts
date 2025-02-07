export function isEmptyString(value: unknown): boolean {
  return String(value).trim().length === 0
}
