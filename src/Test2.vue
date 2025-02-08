<script setup lang="ts">
import { reactive } from 'vue'
import { z } from 'zod'
import { Rules, type Rule } from '../lib';

z.string().max(5, { message: 'Too long' })

type Scheme = Record<string, Array<Rule>>

const scheme: Scheme = {
  'username': [Rules.required(), Rules.string()],

  'location.latitude': [Rules.required(), Rules.number()],
  'location.longitude': [Rules.required(), Rules.number()],

  'strings.*': [Rules.required(), Rules.min(2)],
  'strings.*.value': [Rules.required(), Rules.string()]
}

function useForm<T extends Record<string, any>>(scheme: Scheme) {
  const data = initData(scheme)

  function initData(scheme: Scheme) {
    const result: Record<string, any> = {}

    for (const paths in scheme) {
      const splittedPaths = paths.split('.')

      // const path of splittedPaths
      for (let i = 0; i< splittedPaths.length;i++) {
        const path = splittedPaths[i]
        const nextPath = splittedPaths[i + 1] ?? null

        console.log('path', path)
        console.log('nextPath', nextPath)

        // if (!(path in result)) {
        //   result[path] = null
        // }
      }
      console.log('===')

      // for (const

      // const rules = scheme[key]
      // const value = key.split('.').reduce((acc, key) => acc[key], data)
      // console.log(value)
    }

    return {}
  }

  return {

  }
}

const form = useForm(scheme)
// console.log(form)

/*const formData = reactive({
  username: 'qwe',
  location: {
    latitude: 37.7749,
    longitude: -122.4194
  },
  strings: [{ value: 2 }, { value: 'bar' }]
})

function validate() {
  const result = scheme.safeParse(formData)
  const errors = result?.error?.issues ?? []
  console.log(errors[0])
}*/
</script>

<template>
<!--  @click="validate"-->
  <button >Validate</button>
</template>

<style scoped></style>
