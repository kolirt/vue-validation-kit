import App from './App.vue'

import Notifications from '@kyvg/vue3-notification'
import 'bootstrap/dist/css/bootstrap.min.css'
import { createApp } from 'vue'

const app = createApp(App)

app.use(Notifications)

app.mount('#app')
