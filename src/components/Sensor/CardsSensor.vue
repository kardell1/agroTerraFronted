<script lang="ts" setup>
import { inject, computed } from 'vue'
import { ContextSocketKey, type SensorData } from '../../composables/ContextSocket'
import ProgresBar from './ProgresBar.vue'
import { Icon } from '@iconify/vue'

interface Props {
  tittle: string
  iconName: string
  styleLine: string
  styleText: string
  valueKey: keyof SensorData  // 'SensorTemperatura' | 'SensorHumedad' | etc.
  unit: string
  description: string
  alertHigh?: number
  alertLow?: number
}

const props = defineProps<Props>()

// 1. Obtener datos del contexto
const sensorData = inject<SensorData>(ContextSocketKey)

// 2. Valor actual del sensor (con validación)
const currentValue = computed(() => {
  // Validar que existan los datos y la clave
  if (!sensorData) {
    console.warn('⚠️ No hay datos de sensores disponibles')
    return 0
  }
  
  const valueStr = sensorData[props.valueKey]
  if (!valueStr) {
    console.warn(`⚠️ No hay valor para ${props.valueKey}`)
    return 0
  }
  
  const value = parseFloat(valueStr)
  return isNaN(value) ? 0 : value
})

// 3. Lógica de alertas
const showAlert = computed(() => {
  const high = props.alertHigh ?? 100
  const low = props.alertLow ?? 0
  const val = currentValue.value
  
  return val > high || val < low
})

const textColor = computed(() => (showAlert.value ? 'text-red-500' : 'text-slate-700'))

// 4. Debug: Verificar que todo funciona (solo desarrollo)
if (import.meta.env.DEV) {
  console.log(`🔍 CardsSensor [${props.tittle}]:`, {
    valueKey: props.valueKey,
    currentValue: currentValue.value,
    sensorData: sensorData
  })
}
</script>

<template>
  <div
    class="p-2 sm:p-3 md:p-4 bg-white border-[3px] border-green-500 rounded-3xl flex gap-3 sm:gap-5 md:gap-6 lg:gap-8 w-full"
    :class="showAlert ? 'border-red-400 shadow-lg shadow-red-200' : ''"
  >
    <div class="flex justify-start relative">
      <ProgresBar
        :circleWidth="200"
        :radius="75"
        :porcentaje="currentValue"
        :iconName="iconName"
        :styleLine="styleLine"
        :styleText="styleText"
      />
      <transition name="fade">
        <div
          v-if="showAlert"
          class="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white p-1 sm:p-2 rounded-full shadow-md animate-bounce"
        >
          <Icon icon="mingcute:alert-fill" width="12" height="12" class="sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
        </div>
      </transition>
    </div>

    <div class="flex flex-col justify-around">
      <p class="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-slate-700">{{ tittle }}</p>
      <div class="flex gap-1 sm:gap-2 flex-col">
        <p class="text-xs font-medium">{{ description }} :</p>
        <div class="flex items-center gap-1 sm:gap-2">
          <p class="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-[2em] font-extrabold" :class="textColor">
            {{ currentValue.toFixed(1) }}{{ unit }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
