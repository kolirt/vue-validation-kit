import type { Rule } from '../types'
import { isEmptyArray, isEmptyString, isFalse, isNullOrUndefined } from '../utils'

export function required(): Rule {
  return {
    name: 'required',
    validate: ({ value }) => {
      if (isNullOrUndefined(value) || isEmptyArray(value) || isFalse(value)) {
        return false
      }

      return !isEmptyString(value)
    }
  }
}
