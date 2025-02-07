import type { Rule } from '../types'

export function includes(value: unknown[]): Rule {
  return {
    name: 'includes',
    validate: (fieldValue: unknown) => {
      return value.includes(fieldValue)
    },
    options: { value }
  }
}
