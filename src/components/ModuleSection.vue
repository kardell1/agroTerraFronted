<script setup lang="ts">
import CardsSensor from './CardsSensor.vue'
import SelectModule from './SelectModule.vue'

const iconoHumedad = 'material-symbols-light:water-voc'
// seccion de los modulos
</script>

<template>
  <main class="flex flex-col gap-5">
    <!-- navbar de la seccion  -->
    <div class="flex justify-between items-center p-5 rounded-lg bg-white">
      <div>
        <p class="text-lg font-bold">Panel de control</p>
        <p class="text-slate-500 text-[0.90rem]">Gestion de sensores y monitoreo</p>
      </div>
      <div>
        <SelectModule :data="[]" />
      </div>
    </div>
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
  </main>
</template>
