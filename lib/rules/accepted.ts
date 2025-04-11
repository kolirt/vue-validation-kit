import type { Rule } from '../types'
import { isAccepted, isEmpty } from '../utils'

export function accepted(): Rule {
  return {
    name: 'accepted',
    validate: ({ value }) => {
      return isEmpty(value) || isAccepted(value)
    }
  }
}
