import type { Rule } from '../types'
import { isEmpty, isUrl } from '../utils'

export function url(): Rule {
  return {
    name: 'url',
    validate: ({ value }) => {
      return isEmpty(value) || isUrl(value)
    }
  }
}
