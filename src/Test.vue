<script setup lang="ts">
import { includes } from 'lodash'
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
  const schemeKeys = initSchemeKeys(schemeRules)
  const schemeObject = initSchemeObject(schemeKeys)
  const fields = initFields(schemeKeys, data)

  console.log(fields)

  // console.log(schemeKeys)
  // console.log(schemeObject)

  function initSchemeKeys(schemeRules: SchemeRules): string[] {
    return Object.keys(schemeRules).sort()
  }

  function initSchemeObject(schemeKeys: string[]) {
    const data = {}

    for (const key of schemeKeys) {
      set(data, key, null)
    }

    return data
  }

  function initFields(schemeKeys, data) {
    const result = {}

    for (const key of schemeKeys) {
      if (key.includes('.*')) {
      } else {
        set(result, key, get(data, key) ?? null)
      }
    }

    console.log('=======')

    console.log(schemeKeys)
    console.log(data)
    console.log(result)

    return result
  }

  /*function arrayToNestedObject(paths, value = '') {
    const result = {};

    paths.forEach(path => {
      let current = result;

      // Проходимо по кожному ключу в шляху
      path.forEach((key, index) => {
        if (index === path.length - 1) {
          // Якщо це останній елемент, присвоюємо значення
          current[key] = value;
        } else {
          // Якщо об'єкт за цим ключем ще не існує, створюємо його
          if (!current[key]) {
            current[key] = {};
          }
          current = current[key];
        }
      });
    });

    return result;
  }*/

  /*function initFields(rules: SchemeRules) {
    console.log(rules)

    const fields = {}

    const keys = Object.keys(rules)

    const qwe = []

    for (const key of keys)  {
      if (key.includes('.*')) {

      } else {
        const path = key.split('.')

        qwe.push(path)
        // console.log(path)

        // console.log(path.reduceRight((acc, key) => ({ [key]: acc }), null))

      }
    }

    console.log(arrayToNestedObject(qwe))

    // console.log(fields)

    return fields
  }*/

  function fill() {}

  return {
    rules,
    fill
  }
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
