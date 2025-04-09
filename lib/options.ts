import { computed, reactive } from 'vue'

import type { Messages, Options } from './types'

const state = reactive<Options>({
  locale: 'en',
  defaultLocale: 'en',
  messages: {}
})

const locale = computed(() => state.locale)
const messages = computed(() => state.messages)

function setLocale(locale: string) {
  state.locale = locale
}

function setDefaultLocale(defaultLocale: string) {
  state.defaultLocale = defaultLocale
}

function setMessages(locale: string, messages: Messages) {
  state.messages[locale] = messages
}

function setOptions(newOptions: Omit<Options, 'defaultLocale'>): void {
  setLocale(newOptions.locale)
  setDefaultLocale(newOptions.locale)

  for (const locale in newOptions.messages) {
    setMessages(locale, newOptions.messages[locale])
  }

  if (newOptions?.validationType) {
    state.validationType = newOptions.validationType
  }

  if (newOptions?.validationType) {
    state.validationType = newOptions.validationType
  }

  if (newOptions?.clearErrorOnInput) {
    state.clearErrorOnInput = newOptions.clearErrorOnInput
  }

  if (newOptions?.silentRevalidation) {
    state.silentRevalidation = newOptions.silentRevalidation
  }

  if (newOptions?.debounceDelay) {
    state.debounceDelay = newOptions.debounceDelay
  }
}

export { state, locale, messages, setLocale, setMessages, setOptions }
