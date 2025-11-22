<template>
    <!-- Header -->
    <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
      <div class="flex-1 min-w-0">
        <h2 class="text-xl font-bold text-gray-800">{{ title }}</h2>
        <p class="text-slate-500 text-sm mt-1">{{ description }}</p>
      </div>
      
      <!-- Selector de fechas -->
      <div class="flex flex-col sm:flex-row gap-2 items-center">
        <input 
          type="date" 
          v-model="startDate"
          class="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 text-sm text-gray-700"
        />
        <span class="text-gray-500">-</span>
        <input 
          type="date" 
          v-model="endDate"
          class="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 text-sm text-gray-700"
        />
      </div>
    </div>

    <!-- Gráfico -->
    <div class="relative h-80 w-full">
      <Line 
        :data="chartData" 
        :options="chartOptions"
      />
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  type ChartOptions
} from 'chart.js';

// Interface para los datos del sensor
interface SensorData {
  time: string;
  value: number;
}

// Props con tipado
interface Props {
  title: string;
  description: string;
  data: SensorData[];
  color: string;
  unit: string;
  minY: number;
  maxY: number;
}

const props = defineProps<Props>();

// Registrar Chart.js
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

// Fechas
const startDate = ref('2024-01-15');
const endDate = ref('2024-01-21');

// Datos del gráfico
const chartData = computed(() => ({
  labels: props.data.map((item: SensorData) => item.time),
  datasets: [
    {
      label: `${props.title} (${props.unit})`,
      data: props.data.map((item: SensorData) => item.value),
      borderColor: props.color,
      backgroundColor: `${props.color}20`,
      borderWidth: 3,
      tension: 0.4,
      fill: true,
      pointBackgroundColor: props.color,
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 4,
    }
  ]
}));

// Opciones del gráfico con tipado
const chartOptions = computed<ChartOptions<'line'>>(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          return `${props.title}: ${context.parsed.y} ${props.unit}`;
        }
      }
    }
  },
  scales: {
    y: {
      min: props.minY,
      max: props.maxY,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
      },
      title: {
        display: true,
        text: props.unit
      }
    },
    x: {
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
      },
      title: {
        display: true,
        text: 'Días' 
      }
    }
  },
}));
</script>