import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

// App
import App from './App.vue'

// Locales
import en from './locales/en'
import zh from './locales/zh'

// Get saved language or default to English
const savedLang = localStorage.getItem('preferred-language')
const defaultLang = savedLang || 'en'

const i18n = createI18n({
  legacy: false,
  locale: defaultLang,
  fallbackLocale: 'en',
  messages: {
    en,
    zh
  }
})

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#667eea',
          secondary: '#764ba2',
          success: '#4caf50',
          error: '#f44336'
        }
      }
    }
  }
})

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.use(i18n)
app.use(vuetify)
app.mount('#app')
