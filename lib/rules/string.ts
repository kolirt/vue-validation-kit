import type { Rule } from '../types'

export function string(): Rule {
  return {
    name: 'string',
    validate: (fieldValue: unknown) => {
      return typeof fieldValue === 'string'
    }
  }
}
