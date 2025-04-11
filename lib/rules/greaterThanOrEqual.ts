import type { Rule } from '../types'
import { isEmpty, isGreaterThan } from '../utils'

export function greaterThanOrEqual(threshold: number): Rule {
  return {
    name: 'greaterThanOrEqual',
    validate: ({ value }) => {
      return isEmpty(value) || isGreaterThan(value, threshold)
    },
    options: { threshold }
  }
}
