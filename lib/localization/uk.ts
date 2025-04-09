import type { Messages } from '../types'

const messages: Messages = {
  messages: {
    _default: ({ field }) => `Значення поля ${field} є недійсним`,
    included: ({ field }) => `Поле ${field} повинно містити дійсне значення`,
    is: ({ field, options }) => `Поле ${field} не дорівнює ${options.value}`,
    min: ({ field, options }) => `Поле ${field} повинно містити щонайменше ${options.length}`,
    required: ({ field }) => `Поле ${field} є обов'язковим`,
    sameAs: ({ field, options }) => `Поле ${field} є ${options.label}`
  },
  attributes: {
    email: 'Електронна пошта',
    password_confirmation: 'підтвердження пароля'
  },
  custom: {
    email: {
      required: 'Ваша електронна пошта порожня'
    }
  }
}

export default messages
