type Rule = {
  name: string
  validate: (data: { value: unknown; path: string; payload: {} }) => boolean
  options?: any
}

type Rules = Record<string, Rule[]>

type Error =
  | {
      ruleName: Rule['name']
      fieldName: string
      value: any
      options?: Rule['options']
    }
  | string

type Errors = Record<string, Error[]>

type AsTag =
  | 'a'
  | 'button'
  | 'div'
  | 'form'
  | 'h2'
  | 'h3'
  | 'img'
  | 'input'
  | 'label'
  | 'li'
  | 'nav'
  | 'ol'
  | 'p'
  | 'span'
  | 'svg'
  | 'ul'
  | ({} & string)

type ValidateEventDetail = {
  name: string
}

type Messages = {
  messages: Record<string, (data: { field: string; value: any; options: Record<string, any> }) => string>
  attributes?: Record<string, string>
  custom?: Record<string, Record<string, string>>
}

type Options = {
  locale: string
  defaultLocale: string
  messages: Record<string, Messages>
  validationType?: null | 'submit' | 'change' | 'input' | 'debounce'
  clearErrorOnInput?: boolean
  silentRevalidation?: boolean
  debounceDelay?: number
}

type FormConfig = {
  validationType: Options['validationType']
  clearErrorOnInput: Options['clearErrorOnInput']
  debounceDelay: Options['debounceDelay']
}

export type { Rule, Rules, Error, Errors, AsTag, ValidateEventDetail, Messages, Options, FormConfig }
