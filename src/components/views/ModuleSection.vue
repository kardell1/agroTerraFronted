<script setup lang="ts">
import { Microchip } from 'lucide-vue-next'
import HeaderUi from '../../ui/HeaderUi.vue'
import MainCard from '../../ui/MainCard.vue'
import CardsSensor from '../Sensor/CardsSensor.vue'
import SelectModule from '../SelectModule.vue'
import { useModalStore } from '../../store/modalStore'

const iconoHumedad = 'material-symbols-light:water-voc'
const iconoCO = 'iwwa:co2'
const iconoTemp = 'streamline-ultimate-color:temperature-thermometer-high'

// seccion de los modulos
const modal = useModalStore()
const handleViewModal = () => {
  modal.open()
}
</script>

<template>
  <MainCard>
    <!-- navbar de la seccion  -->
    <HeaderUi>
      <div class="w-full">
        <p class="text-lg sm:text-xl font-bold">Panel de control</p>
        <p class="text-slate-500 text-sm sm:text-[0.90rem]">Gestion de sensores y monitoreo</p>
      </div>
      <div class="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 w-full sm:w-auto mt-4 sm:mt-0">
        <button
          @click="handleViewModal"
          class="w-full sm:w-auto p-2 sm:p-2 border-2 border-slate-200 rounded-md text-white transition-all ease-in-out duration-75 flex items-center justify-center gap-2 bg-black font-semibold cursor-pointer hover:bg-slate-900 text-sm sm:text-base"
        >
          <span class="text-green-500">
            <Microchip class="w-4 h-4 sm:w-5 sm:h-5" />
          </span>
          Agregar modulo
        </button>
        <SelectModule :data="[]" class="w-full sm:w-auto" />
      </div>
    </HeaderUi>
    <!-- contenido de los sensores -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      <CardsSensor
        :alertHigh="80"
        :alertLow="20"
        tittle="Humedad"
        :iconName="iconoHumedad"
        styleLine="#0284c7"
        styleText="text-sky-600"
        valueKey="SensorTemperatura"
        unit="Nu"
        description="Lectura de datos"
      />
      
      <CardsSensor
        :alertHigh="80"
        :alertLow="20"
        tittle="Dióxido de carbono"
        :iconName="iconoCO"
        styleLine="#0284c7"
        styleText="text-sky-600"
        valueKey="SensorTemperatura"
        unit="Nu"
        description="Lectura de datos"
      />
      
      <CardsSensor
        :alertHigh="80"
        :alertLow="20"
        tittle="Temperatura"
        :iconName="iconoTemp"
        styleLine="#0284c7"
        styleText="text-sky-600"
        valueKey="SensorTemperatura"
        unit="Nu"
        description="Lectura de datos"
      />
    </div>
  </MainCard>
</template>
