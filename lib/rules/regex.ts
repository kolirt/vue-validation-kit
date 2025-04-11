import type { Rule } from '../types'
import { isEmpty, isRegex } from '../utils'

export function regex(pattern: RegExp | string): Rule {
  return {
    name: 'regex',
    validate: ({ value }) => {
      return isEmpty(value) || isRegex(value, pattern)
    },
    options: { pattern }
  }
}
