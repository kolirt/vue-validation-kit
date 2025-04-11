export function compare(valueLeft: unknown, valueRight: unknown, mode: '==' | '>=' | '>' | '<=' | '<' = '==') {
  if (typeof valueLeft !== 'number' || typeof valueRight !== 'number') {
    return valueLeft === valueRight
  }

  switch (mode) {
    case '==':
      return valueLeft == valueRight
    case '>=':
      return valueLeft >= valueRight
    case '>':
      return valueLeft > valueRight
    case '<=':
      return valueLeft <= valueRight
    case '<':
      return valueLeft < valueRight
    default:
      return valueLeft == valueRight
  }
}
