import type { Rule } from '../types'
import { isEmpty } from '../utils'

export function required(): Rule {
  return {
    name: 'required',
    validate: ({ value }) => {
      return !isEmpty(value)
    }
  }
}
