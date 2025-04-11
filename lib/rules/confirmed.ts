import get from 'lodash/get'

import type { Rule } from '../types'
import { isEmpty } from '../utils'

export function confirmed(): Rule {
  return {
    name: 'confirmed',
    validate: ({ value, path, payload }) => {
      const confirmedValue = get(payload, path + '_confirmed')
      return isEmpty(confirmedValue) || isEmpty(value) || value == confirmedValue
    }
  }
}
