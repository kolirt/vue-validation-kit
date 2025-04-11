import type { Rule } from '../types'
import { isBoolean, isEmpty } from '../utils'

export function boolean(): Rule {
  return {
    name: 'boolean',
    validate: ({ value }) => {
      return isEmpty(value) || isBoolean(value)
    }
  }
}
