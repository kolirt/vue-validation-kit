import type { Rule } from '../types'

export function url(): Rule {
  return {
    name: 'url',
    validate: ({ value }) => {
      if (!value) return true
      if (typeof value !== 'string') return false
      try {
        const url = new URL(value)
        return url.protocol === 'http:' || url.protocol === 'https:'
      } catch (e) {
        return false
      }
    },
    options: {}
  }
}
