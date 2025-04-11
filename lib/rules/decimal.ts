import type { Rule } from '../types'
import { isDecimal, isEmpty } from '../utils'

export function decimal(): Rule {
  return {
    name: 'decimal',
    validate: ({ value }) => {
      return isEmpty(value) || isDecimal(value)
    }
  }
}
