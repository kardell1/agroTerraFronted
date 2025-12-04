<!-- src/components/InputModule.vue -->
<script setup lang="ts">
import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid' 

// Emit para enviar datos al padre
const emit = defineEmits<{
  (e: 'module-created', moduleData: any): void
}>()

// Datos principales del módulo
const moduleForm = ref({
  device_name: '',
  device_section: '',
  device_sensors: [] as Array<{
    sensor_name: string
    sensor_code: string
    sensor_min: number
    sensor_max: number
    sensor_type: string
    sensor_description: string
  }>
})

// Sensor temporal para agregar
const tempSensor = ref({
  sensor_name: '',
  sensor_code: '',
  sensor_min: 0,
  sensor_max: 100,
  sensor_type: 'temperature',
  sensor_description: ''
})

// Tipos de sensor permitidos (según tu backend)
const sensorTypes = [
  { value: 'temperature', label: '🌡️ Temperatura' },
  { value: 'humidity', label: '💧 Humedad' },
  { value: 'pressure', label: '📊 Presión' },
  { value: 'light', label: '☀️ Luz' },
  { value: 'motion', label: '🚶 Movimiento' },
  { value: 'custom', label: '⚙️ Personalizado' }
]

// Validaciones
const validateModule = () => {
  if (!moduleForm.value.device_name.trim()) {
    alert('El nombre del módulo es requerido')
    return false
  }
  if (!moduleForm.value.device_section.trim()) {
    alert('La sección/área es requerida')
    return false
  }
  if (moduleForm.value.device_sensors.length === 0) {
    alert('Debe agregar al menos un sensor')
    return false
  }
  return true
}

const validateSensor = () => {
  if (!tempSensor.value.sensor_name.trim()) {
    alert('Nombre del sensor requerido')
    return false
  }
  if (!tempSensor.value.sensor_code.trim()) {
    alert('Código del sensor requerido')
    return false
  }
  if (tempSensor.value.sensor_min >= tempSensor.value.sensor_max) {
    alert('El valor mínimo debe ser menor al máximo')
    return false
  }
  return true
}

// Agregar sensor a la lista
const addSensor = () => {
  if (!validateSensor()) return
  
  // Verificar que no exista un sensor con el mismo código
  const exists = moduleForm.value.device_sensors.some(
    s => s.sensor_code === tempSensor.value.sensor_code
  )
  
  if (exists) {
    alert('Ya existe un sensor con ese código')
    return
  }
  
  moduleForm.value.device_sensors.push({ ...tempSensor.value })
  
  // Resetear formulario de sensor
  tempSensor.value = {
    sensor_name: '',
    sensor_code: '',
    sensor_min: 0,
    sensor_max: 100,
    sensor_type: 'temperature',
    sensor_description: ''
  }
}

// Remover sensor de la lista
const removeSensor = (index: number) => {
  moduleForm.value.device_sensors.splice(index, 1)
}

// Generar UUID v4 automáticamente
const generateUUID = () => {
  return uuidv4()
}

// Obtener UUID (generar si no existe)
const deviceUUID = computed(() => {
  return generateUUID()
})

// Enviar formulario completo
const handleSubmit = async () => {
  if (!validateModule()) return
  
  const moduleData = {
    device_name: moduleForm.value.device_name,
    device_uuid: deviceUUID.value,
    device_section: moduleForm.value.device_section,
    device_sensors: moduleForm.value.device_sensors
  }
  
  console.log('📦 Datos del módulo a enviar:', moduleData)
  
  // Aquí normalmente enviarías a tu API
  // await api.createModule(moduleData)
  
  emit('module-created', moduleData)
  
  // Resetear formulario
  moduleForm.value = {
    device_name: '',
    device_section: '',
    device_sensors: []
  }
}

// Generar código automático basado en nombre y tipo
const generateSensorCode = () => {
  if (!tempSensor.value.sensor_name || !tempSensor.value.sensor_type) return
  
  const namePart = tempSensor.value.sensor_name
    .toLowerCase()
    .replace(/\s+/g, '_')
    .substring(0, 10)
  
  const typePart = tempSensor.value.sensor_type.substring(0, 3)
  
  tempSensor.value.sensor_code = `${namePart}_${typePart}_${Math.floor(Math.random() * 1000)}`
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
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Nombre del Módulo *
          </label>
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
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Área/Sección *
          </label>
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
          <label class="block text-sm font-medium text-gray-700 mb-1">
            UUID del Dispositivo
          </label>
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
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Nombre del Sensor *
          </label>
          <input
            v-model="tempSensor.sensor_name"
            type="text"
            placeholder="Ej: Temperatura Ambiente"
            class="w-full p-2 border border-gray-300 rounded-lg"
            @blur="generateSensorCode"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Código del Sensor *
          </label>
          <input
            v-model="tempSensor.sensor_code"
            type="text"
            placeholder="Ej: temp_amb_001"
            class="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Sensor *
          </label>
          <select
            v-model="tempSensor.sensor_type"
            class="w-full p-2 border border-gray-300 rounded-lg"
          >
            <option v-for="type in sensorTypes" :key="type.value" :value="type.value">
              {{ type.label }}
            </option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Descripción (opcional)
          </label>
          <input
            v-model="tempSensor.sensor_description"
            type="text"
            placeholder="Ej: Mide temperatura del aire"
            class="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Valor Mínimo *
          </label>
          <input
            v-model.number="tempSensor.sensor_min"
            type="number"
            step="0.1"
            class="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Valor Máximo *
          </label>
          <input
            v-model.number="tempSensor.sensor_max"
            type="number"
            step="0.1"
            class="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
        
        <div class="md:col-span-2">
          <button
            type="button"
            @click="addSensor"
            class="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            ➕ Agregar Sensor a la Lista
          </button>
        </div>
      </div>
      
      <!-- Lista de sensores agregados -->
      <div v-if="moduleForm.device_sensors.length > 0" class="mt-4">
        <h5 class="font-medium text-gray-700 mb-2">
          Sensores agregados: {{ moduleForm.device_sensors.length }}
        </h5>
        <div class="space-y-2 max-h-40 overflow-y-auto">
          <div
            v-for="(sensor, index) in moduleForm.device_sensors"
            :key="index"
            class="flex justify-between items-center p-3 bg-white border rounded-lg"
          >
            <div>
              <div class="font-medium">{{ sensor.sensor_name }}</div>
              <div class="text-sm text-gray-600">
                {{ sensor.sensor_code }} • {{ sensor.sensor_type }} • 
                {{ sensor.sensor_min }} - {{ sensor.sensor_max }}
              </div>
              <div v-if="sensor.sensor_description" class="text-xs text-gray-500">
                {{ sensor.sensor_description }}
              </div>
            </div>
            <button
              @click="removeSensor(index)"
              class="px-3 py-1 text-red-600 hover:bg-red-50 rounded"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
      <div v-else class="text-center py-4 text-gray-500 border rounded-lg">
        No hay sensores agregados aún
      </div>
    </div>
    
    <!-- Botón de envío -->
    <div class="pt-4 border-t">
      <button
        type="button"
        @click="handleSubmit"
        :disabled="moduleForm.device_sensors.length === 0"
        :class="[
          'w-full px-4 py-3 text-white rounded-lg font-medium',
          moduleForm.device_sensors.length === 0
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        ]"
      >
        🚀 Crear Módulo con {{ moduleForm.device_sensors.length }} Sensores
      </button>
      <p v-if="moduleForm.device_sensors.length === 0" class="text-sm text-red-500 text-center mt-2">
        Debe agregar al menos un sensor para crear el módulo
      </p>
    </div>
  </div>
</template>