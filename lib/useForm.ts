import get from 'lodash/get';
import { computed, reactive, readonly, toRaw, watch } from 'vue';



import type { AddNullToValues, Errors, Options, Rule, Rules } from './types';


function useForm<T extends object>(payload: AddNullToValues<T>, rules: Rules) {
  const payloadData = reactive<AddNullToValues<T>>(structuredClone(payload))
  const rulesData: Rules = {}
  const errors = reactive<Errors>({})
  const options: {
    silentRevalidation: Options['silentRevalidation']
  } = {
    silentRevalidation: false
  }

  setRules(rules)

  const allValidationPaths = computed(() => {
    return Object.keys(rulesData).flatMap((key) => generateKeys(key, rulesData[key]))
  })

  const allPayloadKeys = computed(() => getNestedKeys(payloadData))

  function getNestedKeys(obj: Record<string, any>, prefix = '') {
    let keys: string[] = []

    if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        const newPrefix = `${prefix}.${index}`
        if (item && typeof item === 'object') {
          keys = keys.concat(getNestedKeys(item, newPrefix))
        } else {
          keys.push(newPrefix)
        }
      })
    } else if (obj && typeof obj === 'object') {
      for (const key in obj) {
        const newPrefix = prefix ? `${prefix}.${key}` : key
        if (obj[key] && typeof obj[key] === 'object') {
          keys = keys.concat(getNestedKeys(obj[key], newPrefix))
        } else {
          keys.push(newPrefix)
        }
      }
    }

    return keys
  }

  /**
   * Returns a deep clone of the payload data.
   */
  function getPayload() {
    return structuredClone(toRaw<T>(payloadData as T))
  }

  /**
   * Adds an error message for a specific field.
   * @param fieldPath - The field path to associate the error with.
   * @param message
   */
  function addError(fieldPath: string, message: string) {
    if (!errors[fieldPath]) {
      errors[fieldPath] = []
    }

    errors[fieldPath].push(message)
  }

  function addErrorWithRule(fieldPath: string, value: any, rule: Rule) {
    if (!errors[fieldPath]) {
      errors[fieldPath] = []
    }

    const fieldName = fieldPath.split('.').pop() as string

    errors[fieldPath].push({
      ruleName: rule.name,
      fieldName: fieldName,
      value: value,
      options: rule.options
    })
  }

  /**
   * Updates the validation rules, replacing the existing ones.
   * @param rules - The new set of validation rules.
   */
  function setRules(rules: Rules) {
    Object.keys(rulesData).forEach((key) => delete rulesData[key])
    Object.keys(rules).forEach((key) => (rulesData[key] = rules[key]))
  }

  /**
   * Clears errors for a specific field or all fields.
   * @param name - Optional field name to clear errors for; if omitted, clears all errors.
   */
  function clear(name?: string) {
    if (name) {
      delete errors[name]
    } else {
      for (const errorKey of Object.keys(errors)) {
        delete errors[errorKey]
      }
    }
  }

  /**
   * Generates an array of key-rule pairs based on a pattern with wildcards (*).
   * This function recursively traverses the data structure in `payloadData` to expand
   * wildcard patterns (e.g., 'books.*.title') into concrete keys (e.g., 'books.0.title', 'books.1.title')
   * while associating each generated key with its corresponding validation rules.
   *
   * @param keyPattern - The pattern string containing field names and optional wildcards (e.g., 'books.*.title').
   * @param rules - The array of validation rules to associate with each generated key.
   * @returns An array of tuples where each tuple contains a generated key and its associated rules.
   *
   * A huge thank you to Grok for creating this incredibly helpful function.
   * It has saved a ton of time in handling complex validation logic.
   * While it’s been tested extensively, I hope it remains bug-free in all edge cases!
   */
  function generateKeys(keyPattern: string, rules: Rule[]): [string, Rule[]][] {
    const parts = keyPattern.split('.')
    const result: [string, Rule[]][] = []

    function expandPath(obj: any, currentPath: string[] = [], partIndex = 0) {
      if (partIndex === parts.length) {
        result.push([currentPath.join('.'), rules])
        return
      }

      const part = parts[partIndex]

      if (part === '*') {
        const array = get(obj, currentPath, [])
        if (Array.isArray(array)) {
          for (let i = 0; i < array.length; i++) {
            expandPath(obj, [...currentPath, i.toString()], partIndex + 1)
          }
        }
      } else {
        const nextPath = [...currentPath, part]
        const nextValue = get(obj, nextPath)
        if (nextValue !== undefined && !isNaN(Number(part))) {
          const array = get(obj, currentPath, [])
          if (Array.isArray(array) && Number(part) < array.length) {
            expandPath(array[Number(part)], nextPath, partIndex + 1)
          }
        } else if (nextValue !== undefined) {
          expandPath(obj, nextPath, partIndex + 1)
        } else {
          result.push([nextPath.join('.'), rules])
        }
      }
    }

    if (parts.includes('*')) {
      const wildcardIndex = parts.indexOf('*')
      const prefixPath = parts.slice(0, wildcardIndex)
      const prefixValue = get(payloadData, prefixPath)
      if (prefixValue !== undefined) {
        expandPath(payloadData, prefixPath, wildcardIndex)
      }
    } else {
      result.push([keyPattern, rules])
    }

    return result
  }

  /**
   * Validates the form data against the defined rules.
   * @param name - Optional field name to validate; if omitted, validates all fields.
   * @returns A promise that resolves to true if validation passes, or false if there are errors.
   */
  async function validate(name?: string) {
    return new Promise<T>((resolve, reject) => {
      const pathsToValidation = name
        ? allValidationPaths.value.filter((item) => item[0] === name)
        : allValidationPaths.value

      name ? clear(name) : clear()

      let hasError = false
      const clonedPayload = getPayload()

      for (const item of pathsToValidation) {
        const fieldPath = item[0] as string
        const rules = item[1] as Rule[]

        const value = get(payloadData, fieldPath)

        for (const rule of rules) {
          if (!rule.validate({ value, path: fieldPath, payload: clonedPayload })) {
            addErrorWithRule(fieldPath, value, rule)
            hasError = true
          }
        }
      }

      if ((name && hasError) || (!name && Object.keys(errors).length)) {
        reject('Validation error')
      } else {
        resolve(name ? get(clonedPayload, name) : clonedPayload)
      }
    })
  }

  function setSilentRevalidate(value: Options['silentRevalidation']) {
    options.silentRevalidation = value
  }

  function findTopPath(paths: string[]) {
    if (!paths || paths.length === 0) return ''
    if (paths.length === 1) return paths[0]

    const splitPaths = paths.map((path) => path.split('.'))

    const firstPathParts = splitPaths[0]
    const commonPrefix: string[] = []

    for (let i = 0; i < firstPathParts.length; i++) {
      const currentPart = firstPathParts[i]
      const isCommon = splitPaths.every((parts) => parts[i] === currentPart)
      if (isCommon) {
        commonPrefix.push(currentPart)
      } else {
        break
      }
    }

    return commonPrefix.join('.')
  }

  watch(
    () => allPayloadKeys.value,
    (newValue, oldValue) => {
      const newSet = new Set(newValue)
      const removedItems = oldValue.filter((item) => !newSet.has(item))

      if (removedItems.length) {
        const topPath = findTopPath(removedItems)?.split('.')
        if (topPath) {
          const pathToClear = topPath.slice(0, -1).join('.')
          const errorKeysToClear = Object.keys(errors).filter((item) => item.startsWith(pathToClear))

          for (const errorKey of errorKeysToClear) {
            clear(errorKey)
          }
        }
      }

      if (options.silentRevalidation) {
        for (const key in errors) {
          validate(key)
        }
      }
    }
  )

  return {
    payload: payloadData,
    getPayload,
    addError,
    errors: readonly(errors),
    setRules,
    clear,
    validate,
    setSilentRevalidate
  }
}

export { useForm }
