import type { Rule } from '../types'
import { isEmpty, isGreaterThan } from '../utils'

export function greaterThan(threshold: number): Rule {
  return {
    name: 'greaterThan',
    validate: ({ value }) => {
      return isEmpty(value) || isGreaterThan(value, threshold)
    },
    options: { threshold }
  }
}
