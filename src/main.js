import "bootstrap/dist/css/bootstrap.css"
import "bootstrap/dist/js/bootstrap"
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
app.mount('#app')
