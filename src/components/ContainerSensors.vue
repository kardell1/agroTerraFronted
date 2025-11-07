<script lang="ts" setup>
import Card from "./Cards.vue";
import { inject, computed } from "vue";

const iconoHumedad = "material-symbols-light:water-voc";
const iconoTemperatura = "streamline-ultimate-color:temperature-thermometer-high";
const iconoLuz = "streamline-stickies-color:sun";
const iconoSuelo = "game-icons:plant-roots";

const contextSocket = inject("ContextSocket") as {
  SensorHumedad: string;
  SensorLuz: string;
  SensorSuelo: string;
  SensorTemperatura: string;
};
// Computed: se actualizan automáticamente si cambia el valor del contexto
const SensorHumedad = computed(() => contextSocket?.SensorHumedad ?? "63");
const SensorLuz = computed(() => contextSocket?.SensorLuz ?? "0");
const SensorSuelo = computed(() => contextSocket?.SensorSuelo ?? "0");
const SensorTemperatura = computed(() => contextSocket?.SensorTemperatura ?? "0");
</script>

<template>
  <div class="grid grid-cols-2 gap-5">
    <Card
      :alertHigh="80"
      :alertLow="20"
      tittle="Humedad"
      :iconName="iconoHumedad"
      styleLine="#0284c7"
      styleText="text-sky-600"
      :value="parseInt(SensorHumedad)"
      unit="%"
      description="Lectura de datos"
    />

    <Card
      :alertHigh="40"
      :alertLow="5"
      tittle="Temperatura"
      :iconName="iconoTemperatura"
      styleLine="#c2410c"
      styleText="text-orange-700"
      :value="parseInt(SensorTemperatura)"
      unit=" °C"
      description="Lectura de datos"
    />

    <Card
      :alertHigh="80"
      :alertLow="0"
      tittle="Luz"
      :iconName="iconoLuz"
      styleLine="#fde047"
      styleText="text-yellow-300"
      :value="parseInt(SensorLuz)"
      unit=" lux"
      description="Lectura de datos"
    />

    <Card
      :alertHigh="80"
      :alertLow="20"
      tittle="Suelo"
      :iconName="iconoSuelo"
      styleLine="#57534e"
      styleText="text-stone-600"
      :value="parseInt(SensorSuelo)"
      unit="%"
      description="Lectura de datos"
    />
  </div>
</template>