<script setup lang="ts">
import SensorChart from './SensorChart.vue'
import { humidityData, temperatureData, co2Data } from '../data/SensorData.ts'
import SelectModule from './SelectModule.vue'
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex justify-between items-center p-5 rounded-lg bg-white shadow-sm">
      <div>
        <p class="text-lg font-bold">Visualizacion de datos</p>
        <p class="text-slate-500 text-[0.90rem]">Graficos y metricas de sensores</p>
      </div>
      <div>
        <SelectModule :data="[]" />
      </div>
    </div>
    <!-- Gráfico de Humedad -->
    <div class="bg-white p-6">
      <SensorChart
        title="Monitoreo de Humedad"
        description="Niveles de humedad del suelo"
        :data="humidityData"
        color="#10B981"
        unit="%"
        :min-y="60"
        :max-y="85"
      />
    </div>

    <!-- Gráfico de Temperatura -->
    <div class="bg-white p-6">
      <SensorChart
        title="Monitoreo de Temperatura"
        description="Temperatura ambiente"
        :data="temperatureData"
        color="#EF4444"
        unit="°C"
        :min-y="15"
        :max-y="17"
      />
    </div>

    <!-- Gráfico de CO2 -->
    <div class="bg-white p-6">
      <SensorChart
        title="Monitoreo de CO₂"
        description="Niveles de dióxido de carbono"
        :data="co2Data"
        color="#8B5CF6"
        unit="ppm"
        :min-y="300"
        :max-y="800"
      />
    </div>
  </div>
</template>
