<script lang="ts" setup>
import { ref, watchEffect, computed } from "vue";
import ProgresBar from "./ProgresBar.vue";
import { Icon } from "@iconify/vue";

interface Props {
  tittle: string;
  iconName: string;
  styleLine: string;
  styleText: string;
  value: number;
  unit: string;
  description: string;
  alertHigh?: number;
  alertLow?: number;
}

const props = defineProps<Props>();

const showAlert = ref(false);

watchEffect(() => {
  const high = props.alertHigh ?? 100;
  const low = props.alertLow ?? 0;
  const val = props.value ?? 0;

  showAlert.value = val > high || val < low;
});

const textColor = computed(() =>
  showAlert.value ? "text-red-500" : "text-slate-700"
);
</script>


<template>
  <div class="p-4 bg-amber-50 border-[3px] border-amber-900 rounded-3xl flex gap-8 w-full"
              :class="showAlert ? 'border-red-400 shadow-lg shadow-red-200' : ''">
    <div class="flex justify-start relative">
      <ProgresBar
        :circleWidth="200"
        :radius="75"
        :porcentaje="value"
        :iconName="iconName"
        :styleLine="styleLine"
        :styleText="styleText"
      />
      <transition name="fade">
        <div
          v-if="showAlert"
          class="absolute  bg-red-500 text-white p-2 rounded-full shadow-md animate-bounce"
        >
          <Icon icon="mingcute:alert-fill" width="24" height="24" />
        </div>
      </transition>
    </div>

    <div class="flex flex-col justify-around">
      <p class="text-3xl text-slate-700">{{ tittle }}</p>
      <div class="flex gap-2 flex-col">
        <p class="text-sm font-medium">{{ description }} :</p>
        <div class="flex items-center gap-2">
          <p class="text-[2em] font-extrabold" :class="textColor">
            {{ value }}{{ unit }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>