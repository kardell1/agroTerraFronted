<script setup lang="ts">
import useModuleForm from '../../composables/forms/useModuleForm'
import moduleHandler from '../../composables/handlers/moduleHanlder'
import { useModalStore } from '../../store/modalStore'
const modal = useModalStore()
const handleCloseModal = () => {
  modal.close()
}

const { moduleForm, validation, errors } = useModuleForm()
const createModule = async () => {
  const isValid = validation()
  if (!isValid) {
    // console.log('Formulario inválido', errors.value)
    return
  }
  await moduleHandler(moduleForm.value)
}
</script>

<template>
  <div class="p-4 bg-white shadow-md rounded-lg">
    <div class="flex justify-between items-center gap-20">
      <p class="font-bold text-lg">Agrega un nuevo modulo</p>
      <button
        @click="handleCloseModal"
        class="bg-red-600 text-white cursor-pointer rounded-full px-4 py-2"
      >
        X
      </button>
    </div>
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
            <label class="block text-sm font-medium text-gray-700 mb-1">
              UUID del Dispositivo
            </label>
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
      <!-- visualizacion del error  -->
      <p class="text-[0.85rem] text-red-500 font-semibold">{{ errors[0] }}</p>
      <!-- Botón de envío -->
      <div class="pt-4 border-t">
        <button
          type="button"
          @click="createModule"
          :class="[
            'w-full px-4 py-3 cursor-pointer text-white rounded-lg font-medium bg-blue-600 hover:bg-blue-700',
          ]"
        >
          Agregar
        </button>
      </div>
    </div>
  </div>
</template>
