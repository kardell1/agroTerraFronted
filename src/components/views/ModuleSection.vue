<script setup lang="ts">
import { Microchip } from 'lucide-vue-next'
import HeaderUi from '../../ui/HeaderUi.vue'
import MainCard from '../../ui/MainCard.vue'
import CardsSensor from '../Sensor/CardsSensor.vue'
import SelectModule from '../SelectModule.vue'
import { useModalStore } from '../../store/modalStore'

const iconoHumedad = 'material-symbols-light:water-voc'
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
      <div>
        <p class="text-lg font-bold">Panel de control</p>
        <p class="text-slate-500 text-[0.90rem]">Gestion de sensores y monitoreo</p>
      </div>
      <div class="flex items-center gap-5">
        <button
          @click="handleViewModal"
          class="p-2 border-2 border-slate-200 rounded-md text-white transition-all ease-in-out duration-75 flex items-center gap-2 bg-black font-semibold cursor-pointer hover:bg-slate-900"
        >
          <span class="text-green-500">
            <Microchip />
          </span>
          Agregar modulo
        </button>
        <SelectModule :data="[]" />
      </div>
    </HeaderUi>
    <!-- contenido de los sensores -->
    <div class="flex flex-wrap gap-3">
      <div class="basis-[50%] max-lg:flex-1">
        <CardsSensor
          :alertHigh="80"
          :alertLow="20"
          tittle="Humedad"
          :iconName="iconoHumedad"
          styleLine="#0284c7"
          styleText="text-sky-600"
          :value="10"
          unit="Nu"
          description="Lectura de datos"
        />
      </div>
      <div class="flex-1">
        <CardsSensor
          :alertHigh="80"
          :alertLow="20"
          tittle="Dioxido de carbono"
          :iconName="iconoHumedad"
          styleLine="#0284c7"
          styleText="text-sky-600"
          :value="10"
          unit="Nu"
          description="Lectura de datos"
        />
      </div>
      <div class="basis-[50%] max-lg:flex-1">
        <CardsSensor
          :alertHigh="80"
          :alertLow="20"
          tittle="Oxigeno"
          :iconName="iconoHumedad"
          styleLine="#0284c7"
          styleText="text-sky-600"
          :value="10"
          unit="Nu"
          description="Lectura de datos"
        />
      </div>
    </div>
  </MainCard>
</template>
