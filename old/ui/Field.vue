<script setup lang="ts">/*
import { useField } from '../old/composables/useField'
import type { AsTag } from '../types'

const props = withDefaults(
  defineProps<{
    as?: AsTag
    name: string
    mode?: 'passive' | 'aggressive' | 'lazy' | 'eager'
  }>(),
  {
    as: 'div',
    mode: 'passive'
  }
)

const { form, field } = useField(props.name)

function onEvent(e: Event) {
  const on = []

  switch (props.mode) {
    case 'passive':
      break
    case 'aggressive':
      on.push('input', 'blur')
      break
    case 'lazy':
      on.push('change', 'blur')
      break
    case 'eager':
      // if dirty
      on.push('change', 'blur')
      // else
      // on.push('input', 'blur')
      break
  }

  console.log(e.type, on, on.includes(e.type))
  if (on.includes(e.type)) {
    form.validate(field.name)
  }
}
*/</script>

<template><!--
  <pre>{{ field }}</pre>

  <component :is="props.as" @blur.capture="onEvent" @change.capture="onEvent" @input.capture="onEvent">
    <slot :field="field"></slot>
  </component>
--></template>

<style scoped></style>
