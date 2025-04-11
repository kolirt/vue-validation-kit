import { isEmptyArray } from './isEmptyArray'
import { isEmptyString } from './isEmptyString'
import { isNullOrUndefined } from './isNullOrUndefined'

export function isEmpty(value: unknown): boolean {
  if (isNullOrUndefined(value) || isEmptyString(value)) {
    return true
  }

  return isEmptyArray(value)
}
