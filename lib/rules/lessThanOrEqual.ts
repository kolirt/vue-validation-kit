import type { Rule } from '../types'
import { isEmpty, isLessThanOrEqual } from '../utils'

export function lessThanOrEqual(threshold: number): Rule {
  return {
    name: 'lessThanOrEqual',
    validate: ({ value }) => {
      return isEmpty(value) || isLessThanOrEqual(value, threshold)
    },
    options: { threshold }
  }
}
