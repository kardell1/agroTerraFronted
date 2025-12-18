<script setup lang="ts">
import { ref } from 'vue'
import { useModalStore } from '../store/modalStore'
import { useUserStore } from '../store/authStore'
import axios from 'axios'

const modal = useModalStore()
const userStore = useUserStore()

const API_URL = import.meta.env.VITE_API_URL?.trim()
// Datos del formulario - usando exactamente los nombres que espera la API
const moduleForm = ref({
  device_name: '',
  device_section: '',
  device_uuid: '',
  device_sensors: [
    {
      sensor_name: 'Temperatura',
      sensor_code: 'TMP',
      sensor_type: 'temperature',
      unit: '°C',
      sensor_min: '',
      sensor_max: '',
    },
    {
      sensor_name: 'Humedad',
      sensor_code: 'HMD',
      sensor_type: 'humidity',
      unit: '%',
      sensor_min: '',
      sensor_max: '',
    },
    {
      sensor_name: 'Dioxido de Carbono',
      sensor_code: 'DC',
      sensor_type: 'custom',
      unit: 'ppm',
      sensor_min: '',
      sensor_max: '',
    },
  ],
})

// Función para crear el módulo
const createModule = async () => {
  // console.log(moduleForm.value)
  try {
    const response = await axios.post(`${API_URL}/sensor/create`, moduleForm.value, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userStore.token}`,
      },
    })
    console.log(response)
    userStore.addDevice(response.data)
  } catch (error) {
    console.error('Error:', error)
    // alert('Error al crear el módulo')
  } finally {
    modal.close()
  }
}
</script>

<template>
  <div class="p-4 space-y-6 max-h-[70vh] overflow-y-auto">
    <h3 class="text-lg font-semibold text-gray-800">Crear Nuevo Módulo</h3>

    <!-- Sección: Datos del Módulo -->
    <div class="space-y-4 p-4 border rounded-lg">
      <h4 class="font-medium text-gray-700">📦 Datos del Módulo</h4>

      <div class="grid gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"> Nombre del Módulo * </label>
          <input
            v-model="moduleForm.device_name"
            type="text"
            required
            placeholder="Ej: Invernadero Principal"
            class="w-full p-2 border border-gray-300 rounded-lg"
          />
          <p
            v-if="moduleForm.device_name.length > 0 && moduleForm.device_name.length < 3"
            class="text-xs text-red-500 mt-1"
          >
            Mínimo 3 caracteres
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"> Área/Sección * </label>
          <input
            v-model="moduleForm.device_section"
            type="text"
            required
            placeholder="Ej: Sala de cultivo A"
            class="w-full p-2 border border-gray-300 rounded-lg"
          />
          <p
            v-if="moduleForm.device_section.length > 0 && moduleForm.device_section.length < 3"
            class="text-xs text-red-500 mt-1"
          >
            Mínimo 3 caracteres
          </p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"> UUID del Dispositivo </label>
          <div class="flex items-center gap-2">
            <input
              v-model="moduleForm.device_uuid"
              type="text"
              class="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Sección: Configurar Sensores -->
    <div class="space-y-4 p-4 border rounded-lg">
      <h4 class="font-medium text-gray-700">📡 Configurar Sensores</h4>

      <div class="space-y-4">
        <div
          v-for="(value, index) in moduleForm.device_sensors"
          :key="index"
          class="p-4 bg-gray-50 rounded-lg space-y-3"
        >
          <h5 class="font-medium text-gray-800">{{ value.sensor_name }}</h5>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Mínimo ({{ value.unit }})
              </label>
              <input
                v-model="value.sensor_min"
                type="number"
                step="0.1"
                placeholder="Mínimo"
                class="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Máximo ({{ value.unit }})
              </label>
              <input
                v-model="value.sensor_max"
                type="number"
                step="0.1"
                placeholder="Máximo"
                class="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Botón de envío -->
    <div class="pt-4 border-t">
      <button
        type="button"
        @click="createModule"
        :class="[
          'w-full px-4 py-3 text-white rounded-lg font-medium bg-blue-600 hover:bg-blue-700',
        ]"
      >
        Agregar
      </button>
    </div>
  </div>
</template>
