import type { Rule } from '../types'

export function is(value: unknown): Rule {
  return {
    name: 'is',
    validate: ({ value: fieldValue }) => {
      return fieldValue == value
    },
    options: { value }
  }
}
