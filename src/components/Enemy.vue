<template>
  <div>
    <div class="form-row">
      <div class="col-md-3">
        <div class="form-group">
          <SelectCharacter v-model="enemy.name" :title="labelHero" />
        </div>
      </div>
      <div class="col-md-3">
        <div class="form-group">
          <SelectArtifact v-model="enemy.artifact" :title="labelArtifact" />
        </div>
      </div>
      <div class="col-md-3">
        <div class="input-group form-group">
          <input v-model.number="enemy.hp" type="number" min="0" class="form-control" />
          <div class="input-group-append">
            <span class="input-group-text">{{ t('hp') }}</span>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <div class="input-group form-group">
          <input v-model.number="enemy.cr" type="number" min="0" class="form-control" />
          <div class="input-group-append">
            <span class="input-group-text">{{ t('cr') }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">
        <div class="form-group">
          <label data-bs-toggle="tooltip" data-bs-placement="top" :title="t('outspeedDesc')" class="mr-4">
            <input v-model="enemy.outspeed" type="checkbox" />
            {{ t('outspeed') }}
          </label>
          <label class="mr-2">
            <input v-model="enemy.immunity" type="checkbox" />
            <img src="/assets/images/Immunity.png" alt="" />
          </label>
          <label class="mr-2">
            <input v-model="enemy.protection" type="checkbox" />
            <img src="/assets/images/Protection.png" alt="" />
          </label>
          <label class="mr-2">
            <input v-model="enemy.counter" type="checkbox" />
            <img src="/assets/images/Counter.png" alt="" />
          </label>
          <label class="mr-2">
            <input v-model="enemy.lifesteal" type="checkbox" />
            <img src="/assets/images/Lifesteal.png" alt="" />
          </label>
          <label>
            <input v-model="enemy.injury" type="checkbox" />
            <img src="/assets/images/Injury.png" alt="" />
          </label>
        </div>
      </div>
      <div class="col-md-9">
        <div class="form-group">
          <input v-model="enemy.infos" type="text" class="form-control" :placeholder="t('extraInfos')" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import SelectCharacter from './SelectCharacter.vue';
import SelectArtifact from './SelectArtifact.vue';
import type { Enemy } from '../model/Enemy';

const { t } = useI18n({ useScope: 'global' });

defineProps<{
  enemy: Enemy;
  labelHero: string;
  labelArtifact: string;
}>();
</script>
