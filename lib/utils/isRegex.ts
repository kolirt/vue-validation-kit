export function isRegex(value: unknown, pattern: RegExp | string): boolean {
  let stringValue: string
  if (typeof value === 'string') {
    stringValue = value.trim()
  } else if (typeof value === 'number') {
    stringValue = value.toString()
  } else {
    return false
  }

  let regex: RegExp
  if (typeof pattern === 'string') {
    try {
      const patternString = pattern.replace(/^\/|\/$/g, '')
      regex = new RegExp(patternString)
    } catch (e) {
      return false
    }
  } else {
    regex = pattern
  }

  return regex.test(stringValue)
}
