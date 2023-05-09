import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
// import createPopper from '@popperjs/core'

const app = createApp(App)
app.use(store)
app.use(router)
// app.use(createPopper)
app.mount('#app')
