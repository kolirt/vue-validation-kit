import type { Rule } from '../types'
import { isEmpty, isIncluded } from '../utils'

export function included(allowedValues: unknown[]): Rule {
  return {
    name: 'included',
    validate: ({ value }) => {
      return isEmpty(value) || isIncluded(value, allowedValues)
    },
    options: { allowedValues }
  }
}
