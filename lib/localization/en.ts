import type { Messages } from '../types'

const messages: Messages = {
  messages: {
    _default: ({ field }) => `The ${field} value is not valid`,
    included: ({ field }) => `The ${field} field must be a valid value`,
    is: ({ field, options }) => `The ${field} is not equal to ${options.value}`,
    min: ({ field, options }) => `The ${field} field must be at least ${options.length}`,
    required: ({ field }) => `The ${field} is required`,
    sameAs: ({ field, options }) => `The ${field} is not same as ${options.label ?? options.path}`
  },
  attributes: {
    email: 'Email',
    password_confirmation: 'password confirmation'
  },
  custom: {
    email: {
      required: 'Your email is empty'
    }
  }
}

export default messages
