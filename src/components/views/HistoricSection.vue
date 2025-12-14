<script setup lang="ts">
import { watch } from 'vue'
import HeaderUi from '../../ui/HeaderUi.vue'
import MainCard from '../../ui/MainCard.vue'
import SelectModule from '../SelectModule.vue'
import historicService from '../../services/historicService'
import { ref } from 'vue'
import type { DevicesType } from '../../types'
import { computed } from 'vue'
import cleanDate from '../../helpers/cleanDate'
const data = ref<DevicesType>({
  name: '',
  sensors: [],
  uuid: '',
})
const isLoading = ref(false)
const uuidSelect = ref('')

watch(
  uuidSelect,
  async (newDevice) => {
    if (!newDevice) return
    isLoading.value = true
    try {
      const res = await historicService(newDevice, '1')
      console.log(res)
      data.value = res
      // de aca sacar los datos de los sensores
    } finally {
      isLoading.value = false
    }
  },
  { immediate: true },
)
const sensorSelect = ref('')
const selectedSensor = computed(() => {
  if (!sensorSelect.value) return null
  return data.value.sensors.find((s) => s.code === sensorSelect.value) || null
})

const headers = ['Nro', 'Medicion', 'Hora y alerta', 'Mensaje']
</script>
<template>
  <MainCard>
    <HeaderUi>
      <div>
        <p class="text-lg font-bold">Visualizacion de datos</p>
        <p class="text-slate-500 text-[0.90rem]">Graficos y metricas de sensores</p>
      </div>
      <div>
        <SelectModule @select="(val) => (uuidSelect = val)" />
      </div>
    </HeaderUi>
    <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <!-- Header -->
      <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
        <div class="flex-1 min-w-0">
          <h2 class="text-xl font-bold text-gray-800">Historial de Alertas</h2>
          <p class="text-slate-500 text-sm mt-1">Registro de alertas generadas por los sensores</p>
        </div>

        <!-- Filtros -->
        <div class="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200">
          <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
            />
          </svg>
          <select
            v-model="sensorSelect"
            class="bg-transparent border-none outline-none text-sm text-gray-700"
          >
            <option disabled>Seleccione un sensor</option>
            <option :key="i" :value="value.code" v-for="(value, i) in data.sensors">
              {{ value.name }}
            </option>
          </select>
        </div>
      </div>
      <!-- Tabla -->
      <div class="overflow-x-auto -mx-2 sm:mx-0">
        <table class="w-full min-w-[600px] sm:min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                :key="i"
                v-for="(value, i) in headers"
                class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ value }}
              </th>
            </tr>
          </thead>

          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="(alert, i) in selectedSensor?.events"
              :key="i"
              class="hover:bg-gray-50 transition-colors"
            >
              <td>{{ i + 1 }}</td>
              <td>{{ alert.data }}</td>
              <td>{{ cleanDate(alert.timestamp) }}</td>
              <td>{{ alert.message }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </MainCard>
</template>
