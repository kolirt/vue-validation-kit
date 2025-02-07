import type { Rule } from '../types'
import { isArray, isBoolean } from '../utils'

export function number(): Rule {
  return {
    name: 'number',
    validate: (fieldValue: unknown) => {
      return !isArray(fieldValue) && !isBoolean(fieldValue) && !isNaN(Number(fieldValue))
    }
  }
}
