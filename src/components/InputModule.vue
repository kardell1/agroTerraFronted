<!-- src/components/InputModule.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
// Datos principales del módulo
const moduleForm = ref({
  device_name: '',
  device_section: '',
  device_sensors: [{}, {}, {}],
})
// Generar UUID v4 automáticamente
const generateUUID = () => {
  return uuidv4()
}

// Obtener UUID (generar si no existe)
const deviceUUID = computed(() => {
  return generateUUID()
})
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
          <p class="text-xs text-gray-500 mt-1">Entre 3 y 50 caracteres</p>
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
          <p class="text-xs text-gray-500 mt-1">Entre 3 y 30 caracteres</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"> UUID del Dispositivo </label>
          <div class="flex items-center gap-2">
            <input
              :value="deviceUUID"
              type="text"
              readonly
              class="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
            />
            <button
              type="button"
              @click="deviceUUID = generateUUID()"
              class="px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
            >
              🔄
            </button>
          </div>
          <p class="text-xs text-gray-500 mt-1">Identificador único generado automáticamente</p>
        </div>
      </div>
    </div>

    <!-- Sección: Agregar Sensores -->
    <div class="space-y-4 p-4 border rounded-lg">
      <h4 class="font-medium text-gray-700">📡 Agregar Sensores</h4>

      <!-- Formulario para nuevo sensor -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"> Nombre del Sensor * </label>
          <input
            type="text"
            placeholder="Ej: Temperatura Ambiente"
            class="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"> Valor Mínimo * </label>
          <input type="number" step="0.1" class="w-full p-2 border border-gray-300 rounded-lg" />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"> Valor Máximo * </label>
          <input type="number" step="0.1" class="w-full p-2 border border-gray-300 rounded-lg" />
        </div>

        <div class="md:col-span-2">
          <button
            type="button"
            class="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            ➕ Agregar Sensor a la Lista
          </button>
        </div>
      </div>
    </div>

    <!-- Botón de envío -->
    <div class="pt-4 border-t">
      <button
        type="button"
        :disabled="moduleForm.device_sensors.length === 0"
        :class="[
          'w-full px-4 py-3 text-white rounded-lg font-medium',
          moduleForm.device_sensors.length === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700',
        ]"
      >
        🚀 Crear Módulo con {{ moduleForm.device_sensors.length }} Sensores
      </button>
      <p
        v-if="moduleForm.device_sensors.length === 0"
        class="text-sm text-red-500 text-center mt-2"
      >
        Debe agregar al menos un sensor para crear el módulo
      </p>
    </div>
  </div>
</template>
