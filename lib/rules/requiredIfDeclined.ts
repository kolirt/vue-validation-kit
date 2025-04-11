import get from 'lodash/get'

import type { Rule } from '../types'
import { isDeclined, isEmpty } from '../utils'

// TODO: process user.*.value path
export function requiredIfDeclined(path: string): Rule {
  return {
    name: 'requiredIfDeclined',
    validate: ({ value: fieldValue, payload }) => {
      const pathValue = get(payload, path)

      if (isDeclined(pathValue)) {
        return !isEmpty(fieldValue)
      }

      return true
    },
    options: { path }
  }
}
