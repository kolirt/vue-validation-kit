import type { Rule } from '../types'

export function min(length: number): Rule {
  return {
    name: 'min',
    validate: (fieldValue: unknown) => {
      if (Array.isArray(fieldValue)) {
        return fieldValue.length >= length
      }

      if (typeof fieldValue === 'string') {
        return fieldValue.length >= length
      }

      return false
    },
    options: { length }
  }
}
