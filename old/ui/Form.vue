<script setup lang="ts">/*
import { provide } from 'vue'

import type { Form } from '../types'
import { formKey } from '../utils'

const props = defineProps<{
  form: Form<any>
}>()

const emits = defineEmits<{
  submit: []
}>()

provide(formKey, props.form)
*/</script>

<template><!--
  <form @submit="() => emits('submit')">
    <slot></slot>
  </form>
--></template>

<style scoped></style>
