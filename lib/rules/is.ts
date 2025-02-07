import type { Rule } from '../types'

export function is(value: unknown): Rule {
  return {
    name: 'is',
    validate: (fieldValue: unknown) => {
      return fieldValue === value
    },
    options: { value }
  }
}
