import type { Rule } from '../types'
import { isEmpty, isMin } from '../utils'

export function min(threshold: number): Rule {
  return {
    name: 'min',
    validate: ({ value }) => {
      return isEmpty(value) || isMin(value, threshold)
    },
    options: { threshold }
  }
}
