import { state } from './options'
import type { Error } from './types'

export function getMessage(error: Error, locale: string) {
  if (typeof error === 'object') {
    const messages = state.messages[locale] ?? state.messages[state.defaultLocale]

    let message

    if (messages.custom?.[error.fieldName]?.[error.ruleName]) {
      return messages.custom?.[error.fieldName]?.[error.ruleName]
    }

    if (error.ruleName in messages.messages) {
      message = messages.messages[error.ruleName]
    } else if ('_default' in messages.messages) {
      message = messages.messages['_default']
    }

    if (message) {
      const label = messages.attributes?.[error.fieldName] ? messages.attributes[error.fieldName] : error.fieldName
      return message({ field: label, value: error.value, options: error.options })
    } else {
      return 'Unknown error'
    }
  } else {
    return error
  }
}
