import type { Rule } from '../types'

export function requiredIf(): Rule {
  // path: string,
  // mode: 'in' | 'notIn' | 'eq' | 'less' | 'greater' | 'between' | 'notBetween',
  // value: any
  return {
    name: 'required',
    validate: (/*{ value: fieldValue }*/) => {
      return false
      /*if (
        true
        // validate if the field is required
      ) {
        if (isNullOrUndefined(fieldValue) || isEmptyArray(fieldValue) || isFalse(fieldValue)) {
          return false
        }

        return !isEmptyString(fieldValue)
      }*/

      // return true;
    }
  }
}
