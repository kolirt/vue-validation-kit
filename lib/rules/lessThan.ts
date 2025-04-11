import type { Rule } from '../types'
import { isEmpty, isLessThan } from '../utils'

export function lessThan(threshold: number): Rule {
  return {
    name: 'lessThan',
    validate: ({ value }) => {
      return isEmpty(value) || isLessThan(value, threshold)
    },
    options: { threshold }
  }
}
