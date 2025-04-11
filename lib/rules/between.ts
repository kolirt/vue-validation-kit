import type { Rule } from '../types'
import { isBetween, isEmpty } from '../utils'

export function between(min: number, max: number): Rule {
  return {
    name: 'between',
    validate: ({ value }) => {
      return isEmpty(value) || isBetween(value, min, max)
    },
    options: { min, max }
  }
}
