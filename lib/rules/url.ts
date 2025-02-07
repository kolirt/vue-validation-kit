import type { Rule } from '../types'

export function url(): Rule {
  return {
    name: 'url',
    validate: (fieldValue: unknown) => {
      if (!fieldValue) return true
      if (typeof fieldValue !== 'string') return false
      try {
        const url = new URL(fieldValue)
        return url.protocol === 'http:' || url.protocol === 'https:'
      } catch (e) {
        return false
      }
    },
    options: {}
  }
}
