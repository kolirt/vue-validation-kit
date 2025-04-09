<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, provide, ref, watchEffect } from 'vue'

import { FormEvent } from '../enums'
import { state as optionsState } from '../options'
import type { FormConfig, Options, ValidateEventDetail } from '../types'
import { useForm } from '../useForm'

const emits = defineEmits<{
  submit: [e: Event]
}>()

const props = withDefaults(
  defineProps<{
    form: ReturnType<typeof useForm>
    validationType?: Options['validationType']
    clearErrorOnInput?: Options['clearErrorOnInput']
    silentRevalidation?: Options['silentRevalidation']
    debounceDelay?: Options['debounceDelay']
  }>(),
  {
    validationType: null,
    clearErrorOnInput: false,
    silentRevalidation: false,
    debounceDelay: 500
  }
)

const config = computed<FormConfig>(() => ({
  validationType: 'validationType' in optionsState ? optionsState.validationType : props.validationType,
  clearErrorOnInput: 'clearErrorOnInput' in optionsState ? optionsState.clearErrorOnInput : props.clearErrorOnInput,
  debounceDelay: 'debounceDelay' in optionsState ? optionsState.debounceDelay : props.debounceDelay
}))

const el = ref<HTMLFormElement | null>(null)

function onValidate({ detail: { name } }: CustomEvent<ValidateEventDetail>) {
  props.form.validate(name)
}

function onClear({ detail: { name } }: CustomEvent<ValidateEventDetail>) {
  props.form.clear(name)
}

function onSubmit(e: Event) {
  if (config.value.validationType === 'submit') {
    props.form.validate().then(() => {
      emits('submit', e)
    })
  } else {
    emits('submit', e)
  }
}

onMounted(() => {
  nextTick(() => {
    if (el.value) {
      // @ts-ignore
      el.value.addEventListener(FormEvent.Validate, onValidate)
      // @ts-ignore
      el.value.addEventListener(FormEvent.Clear, onClear)
    }
  })
})

onBeforeUnmount(() => {
  if (el.value) {
    // @ts-ignore
    el.value.removeEventListener(FormEvent.Validate, onValidate)
    // @ts-ignore
    el.value.removeEventListener(FormEvent.Clear, onClear)
  }
})

watchEffect(() => {
  props.form.setSilentRevalidate(props.silentRevalidation)
})

provide('formErrors', props.form.errors)
provide('formConfig', config)
</script>

<template>
  <form ref="el" @submit.prevent="onSubmit" novalidate>
    <slot></slot>
  </form>
</template>

<style scoped></style>
