import type { Rule } from '../types'

export function included(value: unknown[]): Rule {
  return {
    name: 'included',
    validate: ({ value: fieldValue }) => {
      return value.includes(fieldValue)
    },
    options: { value }
  }
}
