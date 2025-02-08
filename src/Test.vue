<script setup lang="ts">
import set from 'lodash/set'
import get from 'lodash/get'

import { type Rule, Rules } from '../lib'

type SchemeRules = Record<string, Array<Rule>>

const rules: SchemeRules = {
  email: [Rules.required(), Rules.email()],
  password: [Rules.required()],

  'phones.*': [Rules.required()],

  'address.country': [Rules.required()],
  'address.city': [Rules.required()],
  'address.street': [Rules.required()],
  'address.zip': [Rules.required()],

  'books.*': [Rules.required()],
  'books.*.title': [Rules.required()],
  'books.*.author': [Rules.required()],
  'books.*.pages.*': [Rules.required()],
  'books.*.price': [Rules.required()]
}

const scheme = {
  email: null,
  password: null,
  phones: [],
  address: {
    country: null,
    city: null,
    street: null,
    zip: null
  },
  books: [
    {
      title: null,
      author: null,
      pages: null,
      price: null
    }
  ]
}

function useForm(schemeRules: SchemeRules, data = {}) {


  return {  }
}

const form = useForm(rules, {
  address: {
    city: 'city name'
  }
})
</script>

<template>
  <pre>{{ rules }}</pre>
</template>

<style scoped></style>
