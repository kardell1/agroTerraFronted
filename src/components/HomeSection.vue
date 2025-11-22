<script setup lang="ts">
import SensorChart from './SensorChart.vue';
import { humidityData, temperatureData, co2Data } from '../data/SensorData';
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6 space-y-6">
    <!-- Gráfico de Humedad -->
    <SensorChart
      title="Monitoreo de Humedad"
      description="Niveles de humedad del suelo"
      :data="humidityData"
      color="#10B981"
      unit="%"
      :min-y="60"
      :max-y="85"
    />
    
    <!-- Gráfico de Temperatura -->
    <SensorChart
      title="Monitoreo de Temperatura"
      description="Temperatura ambiente"
      :data="temperatureData"
      color="#EF4444"
      unit="°C"
      :min-y="15"
      :max-y="17"
    />
    
    <!-- Gráfico de CO2 -->
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
</template>
