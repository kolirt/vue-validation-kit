import type { Rule } from '../types'
import { isEmpty } from '../utils'

export function is(value: unknown): Rule {
  return {
    name: 'is',
    validate: ({ value: fieldValue }) => {
      return isEmpty(fieldValue) || fieldValue == value
    },
    options: { value }
  }
}
