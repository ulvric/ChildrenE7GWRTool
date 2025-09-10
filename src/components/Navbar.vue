<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="#">{{ t('title') }}</a>
      <div class="col-md-6" style="display: flex; align-items: center; justify-content: flex-end">
        <div class="custom-control mr-3">
          <select id="locale-changer" v-model="locale" class="form-control" @change="changeLang()">
            <option v-for="lang in store.langs" :value="lang.code" :key="lang.code">
              {{ lang.name }}
            </option>
          </select>
        </div>
        <div class="custom-control custom-switch">
          <input
            id="darkSwitch"
            v-model="darkMode"
            type="checkbox"
            class="form-control custom-control-input"
            true-value="true"
            false-value="false"
          />
          <label class="custom-control-label" for="darkSwitch">{{ t('darkMode') }}</label>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { useMainStore } from '../stores/MainStore';

const { t, locale } = useI18n({ useScope: 'global' });
const store = useMainStore();
const { darkMode } = storeToRefs(store);

const toggleDarkMode = (val: string) => {
  if (val === 'true') {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }
  store.setDarkMode(val);
};

const changeLang = () => {
  localStorage.setItem('langCode', locale.value);
  document.title = t('title');
};

watch(darkMode, (val) => {
  toggleDarkMode(val);
});

onMounted(() => {
  if (localStorage.getItem('darkMode')) {
    toggleDarkMode(localStorage.getItem('darkMode') as string);
  }
});
</script>
