<script setup lang="ts">
import { computed, watch } from 'vue'
import { useModuloStore } from '../../store/moduleStore'
import HeaderUi from '../../ui/HeaderUi.vue'
import MainCard from '../../ui/MainCard.vue'
import SelectModule from '../SelectModule.vue'
import historicService from '../../services/historicService'
import { ref } from 'vue'
import type { DevicesType } from '../../types'

const moduleStore = useModuloStore()
// cada que cambia
// const uuid = computed(() => moduleStore.selectedDevice?.uuid || '')
const data = ref<DevicesType>({
  name: '',
  sensors: [],
  uuid: '',
})
const isLoading = ref(false)

const sensorSelect = ref('')
watch(
  moduleStore.selectedDevice,
  async (newDevice) => {
    isLoading.value = true
    console.log('el cambio : ' + newDevice)
    // ejecutar la solicitud para recuperar los datos del api
    try {
      const response = await historicService(newDevice.uuid, '1')
      data.value = response
      sensorSelect.value = response.sensors[0]?.name || ''
    } catch (error) {
      console.log(error)
    } finally {
      isLoading.value = false
    }
  },
  { immediate: true },
)
// de cada device mapear sus sensores
// de cada sensor mapear sus datos
// debe filtrarse los datos
const filterData = computed(() =>
  data.value.sensors.find((item) => item.name === sensorSelect.value),
)
const headers = ['Nro', 'Medicion', 'Hora y alerta', 'Mensaje', 'Prioridad']
</script>
<template>
  <MainCard>
    <HeaderUi>
      <div>
        <p class="text-lg font-bold">Visualizacion de datos</p>
        <p class="text-slate-500 text-[0.90rem]">Graficos y metricas de sensores</p>
      </div>
      <div>
        <!-- <button
          class="bg-orange-400"
          @click="
            () => {
              ;(console.log(data), console.log(sensorSelect))
            }
          "
        >
          press
        </button> -->
        <SelectModule />
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
            class="bg-transparent border-none outline-none text-sm text-gray-700"
            v-model="sensorSelect"
          >
            <option disabled>Seleccione un sensor</option>
            <option :key="i" v-for="(value, i) in data.sensors">{{ value.name }}</option>
          </select>
        </div>
      </div>

      <!-- Tabla -->
      <div class="overflow-x-auto -mx-2 sm:mx-0" v-if="!isLoading">
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
              v-for="(alert, i) in filterData?.events"
              :key="i"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-3 py-4 text-sm text-gray-900 font-medium">{{ i + 1 }}</td>

              <td class="px-3 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div
                    :class="[
                      'w-3 h-3 sm:w-3 sm:h-3 rounded-full mr-2 sm:mr-3',
                      filterData?.name.toLowerCase() === 'humedad'
                        ? 'bg-blue-500'
                        : 'bg-orange-500',
                    ]"
                  ></div>
                  <span class="text-sm font-medium text-gray-900 capitalize">
                    {{ alert.data }}
                  </span>
                </div>
              </td>

              <td class="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">
                {{ alert.timestamp }}
              </td>

              <td class="px-3 py-4 text-sm text-gray-900">
                <div class="break-words min-w-0">
                  {{ alert.message }}
                </div>
              </td>
              <td class="px-3 py-4 text-sm text-gray-900">
                <div class="break-words min-w-0">
                  {{ alert.severity }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </MainCard>
</template>
