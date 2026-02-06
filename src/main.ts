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

// Get saved preferences or defaults
const savedLang = localStorage.getItem('preferred-language')
const defaultLang = savedLang || 'en'
const savedTheme = localStorage.getItem('preferred-theme')
const defaultTheme = savedTheme || 'light'

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
    defaultTheme: defaultTheme,
    themes: {
      light: {
        colors: {
          primary: '#667eea',
          secondary: '#764ba2',
          success: '#4caf50',
          error: '#f44336',
          background: '#f5f5f5'
        }
      },
      dark: {
        colors: {
          primary: '#8b9dc3',
          secondary: '#a48bc2',
          success: '#66bb6a',
          error: '#ef5350',
          background: '#121212',
          surface: '#1e1e1e'
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
