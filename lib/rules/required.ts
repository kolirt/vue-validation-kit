import type { Rule } from '../types'
import { isEmptyArray, isEmptyString, isFalse, isNullOrUndefined } from '../utils'

export function required(): Rule {
  return {
    name: 'required',
    validate: (fieldValue: unknown) => {
      if (isNullOrUndefined(fieldValue) || isEmptyArray(fieldValue) || isFalse(fieldValue)) {
        return false
      }

      return !isEmptyString(fieldValue)
    }
  }
}
