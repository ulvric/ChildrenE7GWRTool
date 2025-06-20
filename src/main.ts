import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createI18n } from 'vue-i18n';
import App from './App.vue';

import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-select/dist/css/bootstrap-select.min.css';
import 'bootstrap-select/dist/js/bootstrap-select.min.js';
import './assets/css/dark-mode.css';

import { en } from './lang/en';
import { fr } from './lang/fr';
import { cn } from './lang/cn';
import { tw } from './lang/tw';

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    fr,
    cn,
    tw,
  },
});

const app = createApp(App);
app.use(createPinia());
app.use(ToastPlugin);
app.use(i18n);

app.mount('#app');
