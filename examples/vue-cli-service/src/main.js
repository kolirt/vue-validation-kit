import App from './App.vue'

import { createValidation } from '@kolirt/vue-validation-kit'
import { en } from '@kolirt/vue-validation-kit/localization'
import Notifications from '@kyvg/vue3-notification'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'

const app = createApp(App)

app.use(Notifications)

app.use(
  createValidation({
    locale: 'en',
    messages: { en }
  })
)

app.mount('#app')
