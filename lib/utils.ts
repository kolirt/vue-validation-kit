function isNullOrUndefined(value: unknown): boolean {
  return value === null || value === undefined
}

function isArray(value: unknown): boolean {
  return Array.isArray(value)
}

function isEmptyArray(value: unknown): boolean {
  return Array.isArray(value) && value.length === 0
}

function isEmptyString(value: unknown): boolean {
  return typeof value === 'string' && value.trim().length === 0
}

function isEmpty(value: unknown): boolean {
  if (isNullOrUndefined(value) || isEmptyString(value)) {
    return true
  }

  return isEmptyArray(value)
}

function isFalse(value: unknown): boolean {
  return value === false
}

export { isNullOrUndefined, isArray, isEmptyArray, isEmptyString, isEmpty, isFalse }
