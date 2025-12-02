<script setup lang="ts">
import HeaderUi from '../../ui/HeaderUi.vue'
import MainCard from '../../ui/MainCard.vue'
import SelectModule from '../SelectModule.vue'

const alertHistory = [
  {
    nro: 1,
    sensor: 'Humedad',
    horaAlerta: '09:34:21',
    mensaje: 'Nivel de humedad fuera de rango',
    estado: 'activo',
    prioridad: 'alta',
  },
  {
    nro: 2,
    sensor: 'Temperatura',
    horaAlerta: '10:12:54',
    mensaje: 'Temperatura muy elevada',
    estado: 'activo',
    prioridad: 'alta',
  },
  {
    nro: 3,
    sensor: 'Humedad',
    horaAlerta: '11:03:07',
    mensaje: 'Valores inestables detectados',
    estado: 'resuelto',
    prioridad: 'media',
  },
  {
    nro: 4,
    sensor: 'Temperatura',
    horaAlerta: '12:44:33',
    mensaje: 'Sensor restaurado a valores normales',
    estado: 'resuelto',
    prioridad: 'baja',
  },
]
</script>
<template>
  <MainCard>
    <HeaderUi>
      <div>
        <p class="text-lg font-bold">Visualizacion de datos</p>
        <p class="text-slate-500 text-[0.90rem]">Graficos y metricas de sensores</p>
      </div>
      <div>
        <SelectModule :data="[]" />
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
        <div class="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div
            class="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 w-full sm:w-40"
          >
            <svg
              class="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
              />
            </svg>
            <select class="bg-transparent border-none outline-none text-sm text-gray-700 w-full">
              <option>Todos los sensores</option>
              <option>Humedad</option>
              <option>Temperatura</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Tabla -->
      <div class="overflow-x-auto -mx-2 sm:mx-0">
        <table class="w-full min-w-[600px] sm:min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nro
              </th>
              <th
                class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Sensor
              </th>
              <th
                class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Hora Alerta
              </th>
              <th
                class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Mensaje
              </th>

              <!-- Extras -->
              <th
                class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Estado
              </th>
              <th
                class="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Prioridad
              </th>
            </tr>
          </thead>

          <tbody class="bg-white divide-y divide-gray-200">
            <tr
              v-for="alert in alertHistory"
              :key="alert.nro"
              class="hover:bg-gray-50 transition-colors"
            >
              <td class="px-3 py-4 text-sm text-gray-900 font-medium">{{ alert.nro }}</td>

              <td class="px-3 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div
                    :class="[
                      'w-3 h-3 sm:w-3 sm:h-3 rounded-full mr-2 sm:mr-3',
                      alert.sensor.toLowerCase() === 'humedad' ? 'bg-blue-500' : 'bg-orange-500',
                    ]"
                  ></div>
                  <span class="text-sm font-medium text-gray-900 capitalize">
                    {{ alert.sensor }}
                  </span>
                </div>
              </td>

              <td class="px-3 py-4 text-sm text-gray-900 whitespace-nowrap">
                {{ alert.horaAlerta }}
              </td>

              <td class="px-3 py-4 text-sm text-gray-900">
                <div class="break-words min-w-0">
                  {{ alert.mensaje }}
                </div>
              </td>

              <!-- Estado -->
              <td class="px-3 py-4 whitespace-nowrap">
                <span
                  :class="[
                    'px-2 py-1 rounded text-xs font-semibold',
                    alert.estado === 'activo'
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700',
                  ]"
                >
                  {{ alert.estado }}
                </span>
              </td>

              <!-- Prioridad -->
              <td class="px-3 py-4 whitespace-nowrap">
                {{ alert.prioridad }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </MainCard>
</template>
