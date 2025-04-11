import type { Rule } from '../types'
import { isEmpty, isInteger } from '../utils'

export function integer(): Rule {
  return {
    name: 'integer',
    validate: ({ value }) => {
      return isEmpty(value) || isInteger(value)
    }
  }
}
