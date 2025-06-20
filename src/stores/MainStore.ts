import { defineStore } from 'pinia';

interface Lang {
  code: string;
  name: string;
}

interface State {
  darkMode: string;
  langs: Lang[];
}

export const useMainStore = defineStore('main', {
  state: (): State => ({
    darkMode: localStorage.getItem('darkMode') || 'false',
    langs: [
      { code: 'en', name: 'English' },
      { code: 'fr', name: 'Français' },
      { code: 'cn', name: '简体中文' },
      { code: 'tw', name: '繁體中文' },
    ],
  }),
  actions: {
    setDarkMode(value: string) {
      this.darkMode = value
      localStorage.setItem('darkMode', value)
    },
  },
});
