<script setup lang="ts">
import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { useModalStore } from '../store/modalStore'
import { useUserStore } from '../store/authStore'

const modal = useModalStore()
const userStore = useUserStore()

const API_URL = import.meta.env.VITE_API_URL?.trim()

// Configuración fija de los 3 sensores - CON LOS NOMBRES QUE ESPERA LA API
const sensorConfig = [
  {
    sensor_name: 'Temperatura',
    sensor_code: 'TMP',
    sensor_type: 'temperature',
    unit: '°C',
  },
  {
    sensor_name: 'Humedad',
    sensor_code: 'HMD',
    sensor_type: 'humidity',
    unit: '%',
  },
  {
    sensor_name: 'Dióxido de Carbono',
    sensor_code: 'DC',
    sensor_type: 'custom',
    unit: 'ppm',
  },
]

// Datos del formulario - usando exactamente los nombres que espera la API
const moduleForm = ref({
  device_name: '',
  device_section: '',
  device_sensors: sensorConfig.map((sensor) => ({
    ...sensor,
    sensor_min: null as number | null,
    sensor_max: null as number | null,
    sensor_description: 'descripcion', // Campo opcional que espera la API
  })),
})

const device_uuid = ref(uuidv4())
const regenerateUUID = () => {
  device_uuid.value = uuidv4()
}

// Validar que todos los sensores tengan valores correctos
const allSensorsHaveValues = computed(() => {
  return moduleForm.value.device_sensors.every((sensor) => {
    const min = sensor.sensor_min
    const max = sensor.sensor_max

    return min !== null && max !== null && !isNaN(min) && !isNaN(max) && Number(min) < Number(max)
  })
})

// Validar el formulario completo
const isFormValid = computed(() => {
  return (
    moduleForm.value.device_name.trim().length >= 3 &&
    moduleForm.value.device_name.trim().length <= 50 &&
    moduleForm.value.device_section.trim().length >= 3 &&
    moduleForm.value.device_section.trim().length <= 30 &&
    allSensorsHaveValues.value
  )
})

// Función para crear el módulo
const createModule = async () => {
  if (!isFormValid.value) return

  // Preparar datos EXACTAMENTE como los espera la API
  const requestData = {
    device_name: moduleForm.value.device_name,
    device_uuid: device_uuid.value,
    device_section: moduleForm.value.device_section,
    device_sensors: moduleForm.value.device_sensors.map((sensor) => ({
      sensor_name: sensor.sensor_name,
      sensor_code: sensor.sensor_code,
      sensor_min: Number(sensor.sensor_min),
      sensor_max: Number(sensor.sensor_max),
      sensor_type: sensor.sensor_type,
      sensor_description: sensor.sensor_description || undefined, // Opcional
    })),
  }

  console.log('Enviando a la API:', requestData)

  try {
    const response = await fetch(`${API_URL}/sensor/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userStore.token}`,
      },
      body: JSON.stringify(requestData),
    })

    const result = await response.json()

    if (result.success) {
      resetForm()
      modal.close()
      alert('Módulo creado exitosamente')
    } else {
      alert(`Error: ${result.msg}`)
    }
  } catch (error) {
    console.error('Error:', error)
    alert('Error al crear el módulo')
  }
}

// Función para resetear el formulario
const resetForm = () => {
  moduleForm.value = {
    device_name: '',
    device_section: '',
    device_sensors: sensorConfig.map((sensor) => ({
      ...sensor,
      sensor_min: null,
      sensor_max: null,
      sensor_description: '',
    })),
  }
  device_uuid.value = uuidv4()
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
              :value="device_uuid"
              type="text"
              readonly
              class="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
            />
            <button
              type="button"
              @click="regenerateUUID"
              class="px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
              title="Generar nuevo UUID"
            >
              🔄
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Sección: Configurar Sensores -->
    <div class="space-y-4 p-4 border rounded-lg">
      <h4 class="font-medium text-gray-700">📡 Configurar Sensores</h4>

      <div class="space-y-4">
        <div
          v-for="(sensor, index) in moduleForm.device_sensors"
          :key="index"
          class="p-4 bg-gray-50 rounded-lg space-y-3"
        >
          <h5 class="font-medium text-gray-800">{{ sensor.sensor_name }}</h5>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Mínimo ({{ sensor.unit }})
              </label>
              <input
                v-model.number="sensor.sensor_min"
                type="number"
                step="0.1"
                placeholder="Mínimo"
                class="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Máximo ({{ sensor.unit }})
              </label>
              <input
                v-model.number="sensor.sensor_max"
                type="number"
                step="0.1"
                placeholder="Máximo"
                class="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <p
            v-if="
              sensor.sensor_min !== null &&
              sensor.sensor_max !== null &&
              Number(sensor.sensor_min) >= Number(sensor.sensor_max)
            "
            class="text-xs text-red-500"
          >
            El mínimo debe ser menor que el máximo
          </p>
        </div>
      </div>
    </div>

    <!-- Botón de envío -->
    <div class="pt-4 border-t">
      <button
        type="button"
        @click="createModule"
        :disabled="!isFormValid"
        :class="[
          'w-full px-4 py-3 text-white rounded-lg font-medium',
          isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed',
        ]"
      >
        Agregar
      </button>

      <div v-if="!isFormValid" class="text-xs text-gray-600 mt-2">
        Complete todos los campos requeridos correctamente
      </div>
    </div>
  </div>
</template>
