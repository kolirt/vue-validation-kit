import type { Plugin } from 'vue'

import { setOptions } from './options'
import type { Options } from './types'

export function createValidation(options: Omit<Options, 'defaultLocale'>): Plugin {
  return {
    install() {
      setOptions(options)
    }
  }
}
