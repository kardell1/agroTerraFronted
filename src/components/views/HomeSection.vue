<script setup lang="ts">
import SensorChart from '../SensorChart.vue'
import SelectModule from '../SelectModule.vue'
import MainCard from '../../ui/MainCard.vue'
import HeaderUi from '../../ui/HeaderUi.vue'
import { ref, watch } from 'vue'
import homeService from '../../services/homeServide.ts'
import type { GraficData } from '../../types/index.ts'
const isLoading = ref(false)
const data = ref<GraficData[]>([])
const uuidSelect = ref('')
watch(
  uuidSelect,
  async (newDevice) => {
    if (!newDevice) return
    isLoading.value = true
    try {
      const res = await homeService(newDevice, '1')
      // console.log(res)
      data.value = res
    } finally {
      isLoading.value = false
    }
  },
  { immediate: true },
)
</script>
<template>
  <MainCard>
    <HeaderUi>
      <div class="w-full">
        <p class="text-lg font-bold">Visualizacion de datos</p>
        <p class="text-slate-500 text-[0.90rem]">Graficos y metricas de sensores</p>
      </div>
      <div class="w-full mt-4 md:mt-0 md:w-auto">
        <SelectModule @select="(val) => (uuidSelect = val)" />
      </div>
    </HeaderUi>

    <div :key="i" v-for="(sensor, i) in data" class="bg-white shadow-sm p-4 sm:p-6 rounded-lg">
      <!-- <p>el minimo es : {{ sensor.min }}</p> -->
      <!-- <p>el maximo es : {{ sensor.max }}</p> -->
      <SensorChart
        :title="sensor.name"
        description="Variación diaria"
        :data="sensor.data"
        color="#EF4444"
        unit="°C"
        :min-y="parseFloat(sensor.min) - 1"
        :max-y="parseFloat(sensor.max) + 1"
      />
    </div>
  </MainCard>
</template>
