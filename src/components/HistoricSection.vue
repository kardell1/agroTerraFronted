<template>
  <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
    <!-- Header -->
    <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
      <div class="flex-1 min-w-0">
        <h2 class="text-xl font-bold text-gray-800">Historial de Sensores</h2>
        <p class="text-slate-500 text-sm mt-1">Registro de datos recolectados por los sensores</p>
      </div>
      
      <!-- Filtros -->
      <div class="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
        <div class="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 w-full sm:w-40">
          <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"/>
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
    <div class="overflow-x-auto">
      <table class="w-full min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tipo de Sensor
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mínimo
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Máximo
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Promedio
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr 
            v-for="(sensor, index) in sensorData" 
            :key="index"
            class="hover:bg-gray-50 transition-colors"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div 
                  :class="[
                    'w-3 h-3 rounded-full mr-3',
                    sensor.type === 'humedad' ? 'bg-blue-500' : 'bg-orange-500'
                  ]"
                ></div>
                <span class="text-sm font-medium text-gray-900 capitalize">
                  {{ sensor.type }}
                </span>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="text-sm text-gray-900">
                {{ sensor.min }}{{ sensor.unit }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="text-sm text-gray-900">
                {{ sensor.max }}{{ sensor.unit }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="text-sm font-medium text-gray-900">
                {{ sensor.average }}{{ sensor.unit }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="text-sm text-gray-900">
                {{ sensor.date }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
// Datos de prueba
const sensorData = [
  {
    type: 'humedad',
    min: 45,
    max: 78,
    average: 62.5,
    unit: '%',
    date: '15/01/2024'
  },
  {
    type: 'temperatura',
    min: 18,
    max: 32,
    average: 25.3,
    unit: '°C',
    date: '15/01/2024'
  },
  {
    type: 'humedad',
    min: 52,
    max: 85,
    average: 68.7,
    unit: '%',
    date: '14/01/2024'
  },
  {
    type: 'temperatura',
    min: 20,
    max: 35,
    average: 27.8,
    unit: '°C',
    date: '14/01/2024'
  },
  {
    type: 'humedad',
    min: 38,
    max: 72,
    average: 55.2,
    unit: '%',
    date: '13/01/2024'
  },
  {
    type: 'temperatura',
    min: 16,
    max: 28,
    average: 22.1,
    unit: '°C',
    date: '13/01/2024'
  }
];
</script>