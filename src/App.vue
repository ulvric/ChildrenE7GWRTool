<template>
  <div>
    <Navbar />
    <div class="container" style="margin-top: 10px">
      <div class="form-group">
        <input v-model="tower" type="text" class="form-control" :placeholder="t('tower')" />
      </div>
      <div class="row">
        <div class="col-md-12">
          <div class="form-group">
            <nav class="nav nav-tabs">
              <a class="nav-item nav-link active" href="#t1" data-toggle="tab">{{ t('t1') }}</a>
              <a class="nav-item nav-link" href="#t2" data-toggle="tab">{{ t('t2') }}</a>
              <a class="nav-item nav-link" href="#result" data-toggle="tab">{{ t('report') }}</a>
            </nav>
          </div>
          <div class="toast-wrapper" style="position: absolute; top: -14px; right: 14px; z-index: 1000; height: 47px">
            <div id="resettoast" class="toast" data-delay="3000" aria-atomic="true">
              <div class="toast-body">
                {{ t('resetToast') }}
              </div>
            </div>
          </div>
          <div class="toast-wrapper" style="position: absolute; top: -14px; right: 14px; z-index: 1000; height: 47px">
            <div id="copytoast" class="toast" data-delay="3000" aria-atomic="true">
              <div class="toast-body">
                {{ t('copyToast') }}
              </div>
            </div>
          </div>
          <div class="toast-wrapper" style="position: absolute; top: -14px; right: 14px; z-index: 1000; height: 47px">
            <div id="slcopytoast" class="toast" data-delay="3000" aria-atomic="true">
              <div class="toast-body">
                {{ t('copyToast') }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-content">
        <div id="t1" class="tab-pane active">
          <MyHero :hero="firstHero" />
          <hr />
          <Enemy
            :enemy="enemiesFirstHero.first"
            :label-hero="t('enemiesFirstHero')"
            :label-artifact="t('enemiesFirstArtifact')"
          />
          <hr />
          <Enemy
            :enemy="enemiesFirstHero.second"
            :label-hero="t('enemiesSecondHero')"
            :label-artifact="t('enemiesSecondArtifact')"
          />
          <hr />
          <Enemy
            :enemy="enemiesFirstHero.third"
            :label-hero="t('enemiesThirdHero')"
            :label-artifact="t('enemiesThirdArtifact')"
          />
        </div>
        <div id="t2" class="tab-pane">
          <MyHero :hero="secondHero" />
          <hr />
          <Enemy
            :enemy="enemiesSecondHero.first"
            :label-hero="t('enemiesFirstHero')"
            :label-artifact="t('enemiesFirstArtifact')"
          />
          <hr />
          <Enemy
            :enemy="enemiesSecondHero.second"
            :label-hero="t('enemiesSecondHero')"
            :label-artifact="t('enemiesSecondArtifact')"
          />
          <hr />
          <Enemy
            :enemy="enemiesSecondHero.third"
            :label-hero="t('enemiesThirdHero')"
            :label-artifact="t('enemiesThirdArtifact')"
          />
        </div>
        <div id="result" class="tab-pane">
          <div class="d-md-flex flex-md-row justify-content-md-end">
            <div class="p-2">
              <button class="btn btn-secondary" @click="resetForm">
                {{ t('reset') }}
              </button>
            </div>
            <div class="p-2">
              <button class="btn btn-secondary" @click="copyToClipboard">
                {{ t('copyText') }}
              </button>
            </div>
            <div class="p-2">
              <button class="btn btn-secondary" @click="copyToClipboardSL">
                {{ t('copyTextSL') }}
              </button>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <div class="form-group">
                <textarea id="report" v-model="report" class="form-control mt-3" style="height: 300px" />
                <textarea id="sl" style="opacity: 0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useToast } from 'vue-toast-notification';
import $ from 'jquery';
import MyHero from './components/MyHero.vue';
import Enemy from './components/Enemy.vue';
import Navbar from './components/Navbar.vue';
import { makeDefaultHero, type Hero as HeroType } from './model/Hero';
import { makeDefaultEnemy, type Enemy as EnemyType } from './model/Enemy';

const { t, locale } = useI18n();
const $toast = useToast();

interface TowerEnemies {
  first: EnemyType;
  second: EnemyType;
  third: EnemyType;
}

const tower = ref('');
const report = ref('');
const firstHero = ref<HeroType>(makeDefaultHero());
const secondHero = ref<HeroType>(makeDefaultHero());
const enemiesFirstHero = ref<TowerEnemies>({ first: makeDefaultEnemy(), second: makeDefaultEnemy(), third: makeDefaultEnemy() });
const enemiesSecondHero = ref<TowerEnemies>({ first: makeDefaultEnemy(), second: makeDefaultEnemy(), third: makeDefaultEnemy() });

const updateReport = (tower: string, enemiesFirstHero: TowerEnemies, enemiesSecondHero: TowerEnemies, firstHero: HeroType, secondHero: HeroType) => {
  report.value = '';
  if (tower) {
    report.value += `** ${tower} **\r\n`;
  }
  let contentT1 = '';
  contentT1 += updateLine(
    enemiesFirstHero.first,
    firstHero.speed,
    firstHero.crBonus,
    firstHero.crPush,
    firstHero.crPushAlly,
    firstHero.speedDown
  );
  contentT1 += updateLine(
    enemiesFirstHero.second,
    firstHero.speed,
    firstHero.crBonus,
    firstHero.crPush,
    firstHero.crPushAlly,
    firstHero.speedDown
  );
  contentT1 += updateLine(
    enemiesFirstHero.third,
    firstHero.speed,
    firstHero.crBonus,
    firstHero.crPush,
    firstHero.crPushAlly,
    firstHero.speedDown
  );
  if (contentT1 !== '') {
    report.value += `${t('t1')}\r\n${contentT1}`;
  }
  let contentT2 = '';
  contentT2 += updateLine(
    enemiesSecondHero.first,
    secondHero.speed,
    secondHero.crBonus,
    secondHero.crPush,
    secondHero.crPushAlly,
    secondHero.speedDown
  );
  contentT2 += updateLine(
    enemiesSecondHero.second,
    secondHero.speed,
    secondHero.crBonus,
    secondHero.crPush,
    secondHero.crPushAlly,
    secondHero.speedDown
  );
  contentT2 += updateLine(
    enemiesSecondHero.third,
    secondHero.speed,
    secondHero.crBonus,
    secondHero.crPush,
    secondHero.crPushAlly,
    secondHero.speedDown
  );
  if (contentT2 !== '') {
    report.value += `${t('t2')}\r\n${contentT2}`;
  }
};

const updateLine = (enemy: EnemyType, baseSpeed: number, crBonus = 0, crPush = 0, crPushAlly = 0, speedDown = false): string => {
  if (!enemy) return '';
  let content = '';
  if (enemy.name) {
    content += enemy.name;
    content += enemy.artifact ? ` - ${enemy.artifact}` : '';
    content += enemy.hp ? ` - ${formatHp(enemy.hp)} ${t('hp')}` : '';
    if (enemy.cr && baseSpeed) {
      let { cr }: { cr: number } = enemy;
      cr = +cr;
      cr = crPushAlly > 0 ? cr + crPushAlly : cr;
      cr = crPush > 0 ? cr - crPush : cr;
      cr = crBonus > 0 ? (cr * 100) / (crBonus + 100) : cr;
      let crMin = (cr - 5) / 100;
      let crMax = (cr + 5) / 100;
      if (enemy.outspeed) {
        if (speedDown) {
          crMin *= 0.7;
          crMax *= 0.7;
        }
        crMin += 1;
        crMax += 1;
      }

      const speedmin = Math.round(crMin * baseSpeed);
      const speedmax = Math.round(crMax * baseSpeed);
      const speedRange = `${speedmin}-${speedmax}`;
      content += ` - ${speedRange} ${t('speed')}`;
    }
    content += enemy.immunity ? ` - ${t('setImmunity')}` : '';
    content += enemy.protection ? ` - ${t('setProtection')}` : '';
    content += enemy.counter ? ` - ${t('setCounter')}` : '';
    content += enemy.lifesteal ? ` - ${t('setLifesteal')}` : '';
    content += enemy.injury ? ` - ${t('setInjury')}` : '';
    content += enemy.infos ? ` - ${enemy.infos}` : '';
    content += '\r\n';
  }
  return content;
};

const formatHp = (num: number): number | string => {
  let numFormated = num > 999 ? num / 1000 + (t('formatHpK') as string) : num;
  if ($('#locale-changer :selected').val() === 'cn' || $('#locale-changer :selected').val() === 'tw') {
    numFormated = num > 9999 ? num / 10000 + (t('formatHpK') as string) : num;
  }
  return numFormated;
};

const resetForm = () => {
  tower.value = '';
  firstHero.value = makeDefaultHero();
  secondHero.value = makeDefaultHero();
  enemiesFirstHero.value = { first: makeDefaultEnemy(), second: makeDefaultEnemy(), third: makeDefaultEnemy() };
  enemiesSecondHero.value = { first: makeDefaultEnemy(), second: makeDefaultEnemy(), third: makeDefaultEnemy() };
  $toast.info(t('resetToast'));
};

const copyToClipboard = async () => {
  await navigator.clipboard.writeText(report.value);
  $toast.info(t('copyToast'));
};

const copyToClipboardSL = async () => {
  const copyText = report.value.replace(/(\r\n|\n|\r)/gm, ' ');
  await navigator.clipboard.writeText(copyText);
  $toast.info(t('copyToast'));
};

watch([tower, enemiesFirstHero, enemiesSecondHero, firstHero, secondHero], () => {
  updateReport(tower.value, enemiesFirstHero.value, enemiesSecondHero.value, firstHero.value, secondHero.value);
}, { deep: true });

onMounted(() => {
  let langCode = navigator.language || window.navigator.language;
  if (langCode === 'zh-TW' || langCode === 'zh-HK' || langCode === 'zh-MO') langCode = 'tw';
  if (langCode === 'zh-CN' || langCode === 'zh-SG') langCode = 'cn';
  if (localStorage.getItem('langCode')) {
    langCode = localStorage.getItem('langCode') || 'en';
  }
  locale.value = langCode;
  document.title = t('title');
  // $('[data-bs-toggle="tooltip"]').tooltip({ trigger: 'hover' });
  $toast.clear();
});
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
