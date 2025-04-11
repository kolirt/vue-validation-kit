export function isNotIncluded(value: unknown, forbiddenValues: unknown[]): boolean {
  return forbiddenValues.every((forbidden) => forbidden != value)
}
