import type { Rule } from '../types'
import { isEmail, isEmpty } from '../utils'

export function email(): Rule {
  return {
    name: 'email',
    validate: ({ value }) => {
      return isEmpty(value) || isEmail(value)
    }
  }
}
