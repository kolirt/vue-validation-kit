<script setup lang="ts">
import {
  type Component,
  type ComputedRef,
  computed,
  inject,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch
} from 'vue'

import { FormEvent } from '../enums'
import { getMessage } from '../message'
import { locale } from '../options'
import type { AsTag, Errors, FormConfig, ValidateEventDetail } from '../types'

const props = withDefaults(
  defineProps<{
    name: string
    as?: AsTag | Component
  }>(),
  {
    as: 'div'
  }
)

const formConfig = inject<ComputedRef<FormConfig> | null>('formConfig', null)
const formErrors = inject<Errors | null>('formErrors', null)

const errors = computed(() => {
  return (formErrors?.[props.name] ?? []).map((error) => getMessage(error, locale.value))
})
const firstError = computed(() => errors.value[0] ?? null)

let debounceTimeout: ReturnType<typeof setTimeout> | null = null
const el = ref<HTMLElement | null>(null)

function getValidationType(validationType: FormConfig['validationType']): FormConfig['validationType'] | null {
  if (validationType === 'input' || validationType === 'change') {
    return validationType
  } else if (validationType === 'debounce') {
    return 'input'
  }
  return null
}

function subscribe(validationType: FormConfig['validationType'], clearErrorOnInput: FormConfig['clearErrorOnInput']) {
  const event = getValidationType(validationType)
  if (el.value) {
    if (event) el.value.addEventListener(event, onUpdateField)
    if (clearErrorOnInput && validationType !== 'input') el.value.addEventListener('input', onClear)
  }
}

function unsubscribe(validationType: FormConfig['validationType'], clearErrorOnInput: FormConfig['clearErrorOnInput']) {
  const event = getValidationType(validationType)
  if (el.value) {
    if (event) el.value.removeEventListener(event, onUpdateField)
    if (clearErrorOnInput && validationType !== 'input') el.value.removeEventListener('input', onClear)
  }
}

function emitToForm(event: FormEvent) {
  if (el.value) {
    el.value.dispatchEvent(
      new CustomEvent(event, {
        detail: { name: props.name } as ValidateEventDetail,
        bubbles: true
      })
    )
  }
}

function onUpdateField() {
  if (formConfig) {
    if (formConfig.value.validationType === 'debounce') {
      if (debounceTimeout) clearTimeout(debounceTimeout)
      debounceTimeout = setTimeout(emitToForm, formConfig.value.debounceDelay, FormEvent.Validate)
    } else {
      emitToForm(FormEvent.Validate)
    }
  }
}

function onClear() {
  emitToForm(FormEvent.Clear)
}

onMounted(() => {
  nextTick(() => {
    if (formConfig) subscribe(formConfig.value.validationType, formConfig.value.clearErrorOnInput)
  })
})

onBeforeUnmount(() => {
  if (formConfig) unsubscribe(formConfig.value.validationType, formConfig.value.clearErrorOnInput)
})

watch(
  () => formConfig?.value,
  (newConfig, oldConfig) => {
    if (oldConfig) unsubscribe(oldConfig.validationType, oldConfig.clearErrorOnInput)
    if (newConfig) subscribe(newConfig.validationType, newConfig.clearErrorOnInput)
  }
)
</script>

<template>
  <component ref="el" :is="props.as">
    <slot :errors="errors" :fieldName="props.name" :firstError="firstError"></slot>
  </component>
</template>

<style scoped></style>
