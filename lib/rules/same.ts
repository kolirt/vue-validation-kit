import get from 'lodash/get'

import type { Rule } from '../types'
import { isEmpty } from '../utils'

// TODO: process user.*.value path
export function same(path: string): Rule {
  return {
    name: 'same',
    validate: ({ value, payload }) => {
      const sameValue = get(payload, path)
      return isEmpty(sameValue) || isEmpty(value) || value == sameValue
    },
    options: { path }
  }
}
