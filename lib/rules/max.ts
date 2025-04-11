import type { Rule } from '../types'
import { isEmpty, isMax } from '../utils'

export function max(threshold: number): Rule {
  return {
    name: 'max',
    validate: ({ value }) => {
      return isEmpty(value) || isMax(value, threshold)
    },
    options: { threshold }
  }
}
