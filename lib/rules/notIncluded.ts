import type { Rule } from '../types'
import { isEmpty, isNotIncluded } from '../utils'

export function notIncluded(forbiddenValues: unknown[]): Rule {
  return {
    name: 'notIncluded',
    validate: ({ value }) => {
      return isEmpty(value) || isNotIncluded(value, forbiddenValues)
    },
    options: { forbiddenValues }
  }
}
