import type { Rule } from '../types'

export function max(length: number): Rule {
  return {
    name: 'max',
    validate: ({ value }) => {
      if (Array.isArray(value)) {
        return value.length <= length
      }

      if (typeof value === 'string') {
        return String(value).length <= length
      }

      return false
    },
    options: { length }
  }
}
