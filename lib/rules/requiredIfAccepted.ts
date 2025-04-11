import get from 'lodash/get'

import type { Rule } from '../types'
import { isAccepted, isEmpty } from '../utils'

// TODO: process user.*.value path
export function requiredIfAccepted(path: string): Rule {
  return {
    name: 'requiredIfAccepted',
    validate: ({ value: fieldValue, payload }) => {
      const pathValue = get(payload, path)

      if (isAccepted(pathValue)) {
        return !isEmpty(fieldValue)
      }

      return true
    },
    options: { path }
  }
}
