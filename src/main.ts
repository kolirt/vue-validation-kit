import App from './App.vue'

import Notifications from '@kyvg/vue3-notification'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'

import { createValidation } from '../lib'
import en from './localization/en'

const app = createApp(App)

app.use(Notifications)

app.use(
  createValidation({
    locale: 'en',
    messages: { en }
  })
)

app.mount('#app')
