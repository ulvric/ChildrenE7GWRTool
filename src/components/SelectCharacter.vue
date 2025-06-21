<template>
  <select
    :value="model"
    class="selectpicker"
    :title="title"
    data-live-search="true"
    data-width="100%"
    @change="select($event)"
    ref="selectpicker"
  >
    <option v-for="item in characters" :key="item._id" :data-tokens="getTokens(item)">
      {{ item.name }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import $ from 'jquery';
import 'bootstrap-select';
import { en } from '../assets/js/en.characters';
import { fr } from '../assets/js/fr.characters';
import { cn } from '../assets/js/cn.characters';
import { tw } from '../assets/js/tw.characters';
import { nicknames } from '../assets/js/nicknames';
import type { CharacterIncomplete } from '../assets/js/types';

interface Props {
  title: string;
}

const props = defineProps<Props>();
const model = defineModel<string>()

const { locale } = useI18n({ useScope: 'global' });
const characters = ref<CharacterIncomplete[]>(en);
const selectpicker = ref<HTMLSelectElement>();

function select($event: Event): void {
  model.value = ($event.target as HTMLInputElement).value;
}

function uniqueMerge(arrays: Array<CharacterIncomplete[]>) {
  const results: Record<string, CharacterIncomplete> = {};
  arrays.forEach((arr) => {
    arr.forEach((item) => {
      results[item._id] = item;
    });
  });
  return Object.values(results) as CharacterIncomplete[];
}

function getTokens(item: { _id: string }): string {
  if (item._id && nicknames[item._id]) {
    return nicknames[item._id];
  }
  return '';
}

function getItems(): CharacterIncomplete[] {
  let items: CharacterIncomplete[] = [];
  switch (locale.value) {
    case 'en':
      items = en;
      break;
    case 'fr':
      items = uniqueMerge([en, fr]);
      break;
    case 'cn':
      items = uniqueMerge([en, cn]);
      break;
    case 'tw':
      items = uniqueMerge([en, tw]);
      break;
    default:
      items = en;
  }
  return items;
}

// Initialize characters on mount
onMounted(() => {
  characters.value = getItems();
});

watch(locale, () => {
  characters.value = getItems();
  // Need to wait for Vue to update the DOM
  nextTick(() => {
    if (selectpicker.value) {
      $(selectpicker.value).selectpicker('destroy');
      $(selectpicker.value).selectpicker({ title: props.title }).selectpicker('render');
    }
  });
});
</script>
