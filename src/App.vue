<script setup lang="ts">
import { notify } from '@kyvg/vue3-notification'
import { ref } from 'vue'

import { type Options, messages, locale, setLocale, setMessages, useForm, type Messages } from '../lib'
import ValidationField from '../lib/components/ValidationField.vue'
import ValidationForm from '../lib/components/ValidationForm.vue'
import * as Rules from '../lib/rules'

const localization = import.meta.glob('./localization/*', { import: 'default' })

type Payload = {
  name: string
  email: string
  password: string
  password_confirmation: string
  city: {
    name: string
    lat: number
    lon: number
  }
  books: {
    title: string
    author: {
      name: string
      pages: number[]
    }
  }[]
  permissions: string[]
}

const form = useForm<Payload>(
  {
    name: null,
    email: null,
    password: null,
    password_confirmation: null,
    city: {
      name: null,
      lat: null,
      lon: null
    },
    books: [
      {
        title: null,
        author: {
          name: null,
          pages: [null, null]
        }
      }
    ],
    permissions: []
  },
  {
    name: [Rules.required(), Rules.min(3)],
    email: [Rules.required(), Rules.min(2)],

    password: [Rules.required(), Rules.min(6)],
    password_confirmation: [Rules.required(), Rules.min(6), Rules.sameAs('password')],

    'city.name': [Rules.required()],
    'city.lat': [Rules.required()],
    'city.lon': [Rules.required()],

    books: [Rules.required(), Rules.min(1)],
    'books.*.title': [Rules.required(), Rules.min(2)],
    'books.*.author.name': [Rules.required(), Rules.min(3)],
    'books.*.author.pages': [Rules.required(), Rules.min(1)],
    'books.*.author.pages.*': [Rules.required()],

    permissions: [Rules.required()],
    'permissions.*': [Rules.required()]
  }
)

const config = ref<{
  validationType: Options['validationType']
  clearErrorOnInput: Options['clearErrorOnInput']
  silentRevalidation: Options['silentRevalidation']
  debounceDelay: Options['debounceDelay']
}>({
  validationType: null,
  clearErrorOnInput: false,
  silentRevalidation: false,
  debounceDelay: 500
})

function send() {
  form
    .validate()
    .then(() => {
      notify({
        type: 'success',
        title: 'Success validation'
      })
    })
    .catch(() => {
      notify({
        type: 'error',
        title: 'Error validation'
      })
    })
}

function removeBook(index: number) {
  form.payload.books.splice(index, 1)
}

function addBook() {
  form.payload.books.push({
    title: null,
    author: {
      name: null,
      pages: [0]
    }
  })
}

function removePage(bookIndex: number, pageIndex: number) {
  form.payload.books[bookIndex].author.pages.splice(pageIndex, 1)
}

function addPage(bookIndex: number) {
  form.payload.books[bookIndex].author.pages.push(null)
}

async function setLanguage(lang: string) {
  if (!(lang in messages.value)) setMessages(lang, (await localization[`./localization/${lang}.ts`]()) as Messages)
  setLocale(lang)
}
</script>

<template>
  <div class="container py-5">
    <div class="bg-body-secondary rounded p-5">
      <div class="d-grid d-sm-flex mb-3 gap-2">
        <img
          src="https://img.shields.io/static/v1?label=Made%20with&message=VueJS&color=limegreen&style=for-the-badge&logo=vue.js"
          alt="vuejs"
        />
      </div>

      <iframe
        src="https://ghbtns.com/github-btn.html?user=kolirt&repo=vue-validation-kit&type=star&count=true&size=large"
        frameborder="0"
        scrolling="0"
        width="170"
        height="30"
        title="GitHub"
        class="mb-3"
      >
      </iframe>

      <div class="d-grid d-sm-flex mb-3 gap-2">
        <a href="https://github.com/kolirt/vue-validation-kit" target="_blank">Github</a>
        <a href="https://www.npmjs.com/package/vue-validation-kit" target="_blank">Npmjs</a>
        <a href="https://github.com/kolirt/vue-validation-kit/blob/master/README.md" target="_blank">Docs</a>
        <a href="https://github.com/kolirt/vue-validation-kit/tree/master/examples" target="_blank">Example</a>
      </div>

      <h1>Vue3 validation kit</h1>
      <p class="lead">Easy to use and highly customizable Vue3 validation kit</p>

      <div class="row">
        <div class="col-md-6 mb-4">
          <div class="card mb-4 p-4">
            <h4 class="mb-3">Localization</h4>

            <div class="mb-3">
              <p>Current language: {{ locale }}</p>

              <button @click="setLanguage('en')" class="btn btn-primary me-1">Set en</button>
              <button @click="setLanguage('uk')" class="btn btn-primary">Set uk</button>
            </div>
          </div>

          <div class="card mb-4 p-4">
            <h4 class="mb-3">Form settings</h4>

            <div class="mb-3">
              <label class="form-label">Props: validation-type</label>
              <select class="form-select" v-model="config.validationType">
                <option value=""></option>
                <option value="submit">submit</option>
                <option value="change">change</option>
                <option value="input">input</option>
                <option value="debounce">debounce</option>
              </select>
            </div>

            <hr />

            <div>
              <label class="form-label">Props: clear-error-on-input</label>

              <p class="border-3 border-bottom-0 border-top-0 border-end-0 border border-black pb-1 ps-2 pt-1">
                <small>If there is an error, it will be cleared during the input event.</small>
              </p>

              <div class="form-check">
                <input
                  @input="config.clearErrorOnInput = !config.clearErrorOnInput"
                  :checked="config.clearErrorOnInput"
                  id="clearErrorOnInput"
                  class="form-check-input"
                  type="checkbox"
                />
                <label for="clearErrorOnInput" class="form-check-label"> True/False </label>
              </div>
            </div>

            <hr />

            <div>
              <label class="form-label">Props: silent-revalidation</label>

              <p class="border-3 border-bottom-0 border-top-0 border-end-0 border border-black pb-1 ps-2 pt-1">
                <small>Background validation will be performed, and if the error disappears, it will be gone.</small>
              </p>

              <div class="form-check">
                <input
                  @input="config.silentRevalidation = !config.silentRevalidation"
                  :checked="config.silentRevalidation"
                  id="silentRevalidation"
                  class="form-check-input"
                  type="checkbox"
                />
                <label for="silentRevalidation" class="form-check-label"> True/False </label>
              </div>
            </div>

            <hr />

            <div class="mb-3">
              <label class="form-label">Props: debounce-delay</label>
              <input type="number" class="form-control" v-model.number="config.debounceDelay" />
            </div>
          </div>

          <div class="card mb-4 p-4">
            <h4 class="mb-3">Form payload</h4>

            <pre>{{ form.payload }}</pre>
          </div>

          <div class="card p-4">
            <h4 class="mb-3">Form validation errors</h4>

            <pre>{{ form.errors }}</pre>
          </div>
        </div>

        <div class="col-md-6 mb-4">
          <div class="card p-4">
            <h4 class="mb-3">Form preview</h4>

            <ValidationForm
              @submit="send"
              :validation-type="config.validationType"
              :clear-error-on-input="config.clearErrorOnInput"
              :silent-revalidation="config.silentRevalidation"
              :debounce-delay="config.debounceDelay"
              :form="form"
            >
              <ValidationField name="name" v-slot="{ fieldName, firstError }" class="mb-3">
                <label :for="fieldName" class="form-label">{{ fieldName }}</label>
                <input
                  :id="fieldName"
                  :name="fieldName"
                  :class="{ 'is-invalid': firstError }"
                  type="text"
                  class="form-control"
                  v-model="form.payload.name"
                />
                <div v-if="firstError" class="invalid-feedback">{{ firstError }}</div>
              </ValidationField>

              <ValidationField name="email" v-slot="{ fieldName, firstError }" class="mb-3">
                <label for="fieldName" class="form-label">{{ fieldName }}</label>
                <input
                  :id="fieldName"
                  :name="fieldName"
                  :class="{ 'is-invalid': firstError }"
                  type="text"
                  class="form-control"
                  v-model="form.payload.email"
                />
                <div v-if="firstError" class="invalid-feedback">{{ firstError }}</div>
              </ValidationField>

              <div class="row">
                <div class="col-md-6">
                  <ValidationField name="password" v-slot="{ fieldName, firstError }" class="mb-3">
                    <label :for="fieldName" class="form-label">{{ fieldName }}</label>
                    <input
                      :id="fieldName"
                      :name="fieldName"
                      :class="{ 'is-invalid': firstError }"
                      type="text"
                      class="form-control"
                      v-model="form.payload.password"
                    />
                    <div v-if="firstError" class="invalid-feedback">{{ firstError }}</div>
                  </ValidationField>
                </div>

                <div class="col-md-6">
                  <ValidationField name="password_confirmation" v-slot="{ fieldName, firstError }" class="mb-3">
                    <label :for="fieldName" class="form-label">{{ fieldName }}</label>
                    <input
                      :id="fieldName"
                      :name="fieldName"
                      :class="{ 'is-invalid': firstError }"
                      type="text"
                      class="form-control"
                      v-model="form.payload.password_confirmation"
                    />
                    <div v-if="firstError" class="invalid-feedback">{{ firstError }}</div>
                  </ValidationField>
                </div>
              </div>

              <hr />

              <ValidationField name="city.name" v-slot="{ fieldName, firstError }" class="mb-3">
                <label :for="fieldName" class="form-label">{{ fieldName }}</label>
                <input
                  :id="fieldName"
                  :name="fieldName"
                  :class="{ 'is-invalid': firstError }"
                  type="text"
                  class="form-control"
                  v-model="form.payload.city.name"
                />
                <div v-if="firstError" class="invalid-feedback">{{ firstError }}</div>
              </ValidationField>

              <div class="row">
                <div class="col-md-6">
                  <ValidationField name="city.lat" v-slot="{ fieldName, firstError }" class="mb-3">
                    <label :for="fieldName" class="form-label">{{ fieldName }}</label>
                    <input
                      :id="fieldName"
                      :name="fieldName"
                      :class="{ 'is-invalid': firstError }"
                      type="text"
                      class="form-control"
                      v-model="form.payload.city.lat"
                    />
                    <div v-if="firstError" class="invalid-feedback">{{ firstError }}</div>
                  </ValidationField>
                </div>

                <div class="col-md-6">
                  <ValidationField name="city.lon" v-slot="{ fieldName, firstError }" class="mb-3">
                    <label :for="fieldName" class="form-label">{{ fieldName }}</label>
                    <input
                      :id="fieldName"
                      :class="{ 'is-invalid': firstError }"
                      type="text"
                      class="form-control"
                      v-model="form.payload.city.lon"
                    />
                    <div v-if="firstError" class="invalid-feedback">{{ firstError }}</div>
                  </ValidationField>
                </div>
              </div>

              <hr />

              <div v-for="(book, bookIndex) in form.payload.books" :key="bookIndex" class="book-item mb-4">
                <h5>Book {{ bookIndex + 1 }}</h5>
                <button @click="removeBook(bookIndex)" type="button" class="btn btn-danger btn-sm remove-btn">−</button>

                <ValidationField :name="`books.${bookIndex}.title`" v-slot="{ fieldName, firstError }" class="mb-3">
                  <label :for="fieldName" class="form-label">{{ fieldName }}</label>
                  <input
                    :id="fieldName"
                    :name="fieldName"
                    :class="{ 'is-invalid': firstError }"
                    type="text"
                    class="form-control"
                    v-model="book.title"
                  />
                  <div v-if="firstError" class="invalid-feedback">{{ firstError }}</div>
                </ValidationField>

                <ValidationField
                  :name="`books.${bookIndex}.author.name`"
                  v-slot="{ fieldName, firstError }"
                  class="mb-3"
                >
                  <label :for="fieldName" class="form-label">{{ fieldName }}</label>
                  <input
                    :id="fieldName"
                    :name="fieldName"
                    :class="{ 'is-invalid': firstError }"
                    type="text"
                    class="form-control"
                    v-model="book.author.name"
                  />
                  <div v-if="firstError" class="invalid-feedback">{{ firstError }}</div>
                </ValidationField>

                <hr />

                <h6>Pages</h6>

                <div
                  v-for="(page, pageIndex) in book.author.pages"
                  :key="`${bookIndex}.pages.${pageIndex}`"
                  class="book-item mb-4"
                >
                  <button
                    @click="removePage(bookIndex, pageIndex)"
                    type="button"
                    class="btn btn-danger btn-sm remove-btn"
                  >
                    −
                  </button>

                  <ValidationField
                    :name="`books.${bookIndex}.author.pages.${pageIndex}`"
                    v-slot="{ fieldName, firstError }"
                    class="mb-3"
                  >
                    <label :for="fieldName" class="form-label">{{ fieldName }}</label>
                    <input
                      :id="fieldName"
                      :name="fieldName"
                      :class="{ 'is-invalid': firstError }"
                      type="text"
                      class="form-control"
                      v-model="book.author.pages[pageIndex]"
                    />
                    <div v-if="firstError" class="invalid-feedback">{{ firstError }}</div>
                  </ValidationField>
                </div>

                <button @click="addPage(bookIndex)" type="button" class="btn btn-outline-primary mb-3">
                  + Add page
                </button>
              </div>

              <button @click="addBook" type="button" class="btn btn-outline-primary mb-3">+ Add Book</button>

              <hr />

              <ValidationField name="permissions" v-slot="{ firstError }" class="mb-3">
                <label class="form-label">permissions</label>
                <select
                  :class="{ 'is-invalid': firstError }"
                  class="form-select"
                  v-model="form.payload.permissions"
                  multiple
                >
                  <option value="can_create">can create</option>
                  <option value="can_edit">can edit</option>
                  <option value="can_view">can view</option>
                  <option value="can_delete">can delete</option>
                </select>
                <div v-if="firstError" class="invalid-feedback">{{ firstError }}</div>
              </ValidationField>

              <hr />

              <button type="submit" class="btn btn-primary">Submit</button>
            </ValidationForm>
          </div>
        </div>
      </div>
    </div>
  </div>

  <notifications class="notifications" />
</template>

<style scoped>
.notifications {
  position: fixed;
  right: unset !important;
  left: 100vw;
  transform: translateX(-100%);
  margin-left: -15px;
}

.book-item {
  position: relative;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-bottom: 15px;
}

.remove-btn {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
