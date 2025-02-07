import type { Rule } from '../types'

export function email(): Rule {
  return {
    name: 'email',
    validate: (fieldValue: unknown) => {
      const re =
        // eslint-disable-next-line no-useless-escape
        /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      return re.test(fieldValue as string)
    }
  }
}
