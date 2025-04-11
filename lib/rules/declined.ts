import type { Rule } from '../types'
import { isDeclined, isEmpty } from '../utils'

export function declined(): Rule {
  return {
    name: 'declined',
    validate: ({ value }) => {
      return isEmpty(value) || isDeclined(value)
    }
  }
}
