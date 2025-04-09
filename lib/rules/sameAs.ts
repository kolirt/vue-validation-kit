import get from 'lodash/get'

import type { Rule } from '../types'
import { isEmpty } from '../utils'

export function sameAs(path: string, label?: string): Rule {
  return {
    name: 'sameAs',
    validate: ({ value, payload }) => {
      return isEmpty(get(payload, path)) || value == get(payload, path)
    },
    options: { path, label }
  }
}
