<script setup lang="ts">
import { Microchip } from 'lucide-vue-next'
import HeaderUi from '../../ui/HeaderUi.vue'
import MainCard from '../../ui/MainCard.vue'
import CardsSensor from '../Sensor/CardsSensor.vue'
import SelectModule from '../SelectModule.vue'
import { useModalStore } from '../../store/modalStore'
import { useUserStore } from '../../store/authStore'
import { useMqtt } from '../../composables/useMqtt'
import { onUnmounted, ref, watch, computed } from 'vue'
import { useModuloStore } from '../../store/moduleStore'
import { parseMqttMessage } from '../../helpers/mqttParser'

const iconoHumedad = 'material-symbols-light:water-voc'
const iconoCO = 'iwwa:co2'
const iconoTemp = 'streamline-ultimate-color:temperature-thermometer-high'

const modal = useModalStore()
const moduloStore = useModuloStore()
const userStore = useUserStore()

const { connect, subscribe, disconnect } = useMqtt()
const sensorValues = ref<Record<string, number>>({})

const currentDevice = computed(() => {
  if (!moduloStore.selectedDevice.uuid) return null
  return userStore.devices.find(device => device.uuid === moduloStore.selectedDevice.uuid)
})

const currentSensors = computed(() => {
  return currentDevice.value?.sensors || []
})

const processMqttMessage = (message: string) => {
  console.log('📨 Mensaje MQTT recibido:', message)
  const parsedData = parseMqttMessage(message)
  console.log('📊 Datos parseados:', parsedData)
  const updatedValues = { ...sensorValues.value }
  Object.entries(parsedData).forEach(([code, value]) => {
    updatedValues[code] = value
  })

  sensorValues.value = updatedValues
}

const connectMqttForDevice = async () => {
  disconnect()
  sensorValues.value = {}
  
  if (!currentDevice.value) return
  
  try {
    await connect()
    subscribe('test/sensors', processMqttMessage)
  } catch (error) {
    console.error('❌ Error MQTT:', error)
  }
}

// Watch simplificado
watch(() => moduloStore.selectedDevice.uuid, (newUuid) => {
  if (newUuid) connectMqttForDevice()
}, { immediate: true })

onUnmounted(() => {
  disconnect()
})

const getSensorData = (sensorCode: string) => {
  const sensor = currentSensors.value.find(s => s.code === sensorCode)
  if (!sensor) return null
  
  const minvalue = Number(sensor.minvalue)
  const maxvalue = Number(sensor.maxvalue)
  
  const displayConfigs = {
    'TMP': { 
      icon: iconoTemp,
      color: '#ef4444',
      textColor: 'text-red-500',
      unit: '°C'
    },
    'HMD': { 
      icon: iconoHumedad,
      color: '#3b82f6',
      textColor: 'text-blue-500',
      unit: '%'
    },
    'DC': { 
      icon: iconoCO,
      color: '#10b981',
      textColor: 'text-green-500',
      unit: '%'
    }
  }
  
  const display = displayConfigs[sensorCode as keyof typeof displayConfigs] || {}
  
  const currentValue = sensorValues.value[sensorCode] || 0

  return {
    ...sensor,
    ...display,
    minvalue,
    maxvalue,
    currentValue
  }
}

const handleViewModal = () => {
  modal.open()
}
</script>

<template>
  <MainCard>
    <HeaderUi>
      <div class="w-full">
        <p class="text-lg sm:text-xl font-bold">Panel de control</p>
        <p class="text-slate-500 text-sm sm:text-[0.90rem]">Gestion de sensores y monitoreo</p>
      </div>
      <div class="flex flex-col sm:flex-row items-center gap-3">
        <button
          @click="handleViewModal"
          class="w-max p-2 border-2 border-slate-200 rounded-md text-white transition-all ease-in-out duration-75 flex items-center justify-center gap-2 bg-black font-semibold cursor-pointer hover:bg-slate-900 text-sm"
        >
          <span class="text-green-500">
            <Microchip class="w-4 h-4 sm:w-5 sm:h-5" />
          </span>
          Agregar modulo
        </button>
        <SelectModule 
          @select="(uuid) => {
            const device = userStore.devices.find(d => d.uuid === uuid)
            if (device) moduloStore.setDevice(device.name, uuid)
          }"
          :data="userStore.devices" 
          class="w-full sm:w-auto" 
        />
      </div>
    </HeaderUi>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      <CardsSensor
        v-if="getSensorData('TMP')"
        :alertHigh="getSensorData('TMP')!.maxvalue"
        :alertLow="getSensorData('TMP')!.minvalue"
        tittle="Temperatura"
        :iconName="getSensorData('TMP')!.icon"
        styleLine="#0284c7"
        styleText="text-sky-600"
        :valueKey="getSensorData('TMP')!.currentValue"
        unit="°C"
        description="Lectura de datos"
      />

      <CardsSensor
        v-if="getSensorData('HMD')"
        :alertHigh="getSensorData('HMD')!.maxvalue"
        :alertLow="getSensorData('HMD')!.minvalue"
        tittle="Humedad"
        :iconName="getSensorData('HMD')!.icon"
        styleLine="#0284c7"
        styleText="text-sky-600"
        :valueKey="getSensorData('HMD')!.currentValue"
        unit="%"
        description="Lectura de datos"
      />

      <CardsSensor
        v-if="getSensorData('DC')"
        :alertHigh="getSensorData('DC')!.maxvalue"
        :alertLow="getSensorData('DC')!.minvalue"
        tittle="Dióxido de carbono"
        :iconName="getSensorData('DC')!.icon"
        styleLine="#0284c7"
        styleText="text-sky-600"
        :valueKey="getSensorData('DC')!.currentValue"
        unit="%"
        description="Lectura de datos"
      />
    </div>
  </MainCard>
</template>