<template>
  <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
  <!-- Header -->
  <div class="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 p-5 rounded-lg bg-white">
    <!-- Título -->
    <div class="flex-1 min-w-0">
      <p class="text-lg font-bold text-center lg:text-left">Monitoreo de Humedad</p>
      <p class="text-slate-500 text-[0.90rem] text-center lg:text-left">Datos en tiempo real del sensor</p>
    </div>
    
    <!-- Contenedor de controles (fechas + humedad) -->
    <div class="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
      <!-- Selector de Rango de Fechas -->
      <div class="flex flex-col sm:flex-row gap-3 items-center w-full sm:w-auto">
        
        
        <!-- Fechas personalizadas -->
        <div class="flex flex-col xs:flex-row gap-2 items-center">
          <div class="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 w-full xs:w-32">
            <input type="date" class="bg-transparent border-none outline-none text-sm text-gray-700 w-full" />
          </div>
          <span class="text-gray-500 hidden xs:block">-</span>
          <div class="bg-gray-50 rounded-lg px-3 py-2 border border-gray-200 w-full xs:w-32">
            <input type="date" class="bg-transparent border-none outline-none text-sm text-gray-700 w-full" />
          </div>
        </div>
      </div>
      
      <!-- Humedad actual -->
      <div class="bg-green-50 rounded-lg px-4 py-3 border border-green-200 w-full sm:w-40 text-center">
        <p class="text-green-600 text-sm font-medium">Humedad Actual</p>
        <div class="flex items-baseline gap-1 justify-center">
          <span class="text-2xl font-bold text-green-700">{{ currentHumidity }}</span>
          <span class="text-green-600 font-medium">%</span>
        </div>
      </div>
    </div>
  </div>

   </div>
  <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
    </div>

    <!-- Gráfico -->
    <div class="relative h-80 w-full mb-6">
      <Line 
        :data="chartData" 
        :options="chartOptions"
        :key="chartKey"
      />
    </div>    
    <!-- Estadísticas -->
    <div class="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
      <div class="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <p class="text-blue-600 text-sm font-medium">Mínimo</p>
        <p class="text-2xl font-bold text-blue-700">{{ stats.min }}%</p>
      </div>
      
      <div class="bg-green-50 rounded-lg p-4 border border-green-200">
        <p class="text-green-600 text-sm font-medium">Máximo</p>
        <p class="text-2xl font-bold text-green-700">{{ stats.max }}%</p>
      </div>
      
      <div class="bg-purple-50 rounded-lg p-4 border border-purple-200">
        <p class="text-purple-600 text-sm font-medium">Promedio</p>
        <p class="text-2xl font-bold text-purple-700">{{ stats.average }}%</p>
      </div>
      
      <div class="bg-orange-50 rounded-lg p-4 border border-orange-200">
        <p class="text-orange-600 text-sm font-medium">Total Datos</p>
        <p class="text-2xl font-bold text-orange-700">{{ stats.count }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js';

// Registrar componentes de Chart.js
ChartJS.register(
  Title, Tooltip, Legend, 
  LineElement, PointElement, 
  CategoryScale, LinearScale
);

// Datos iniciales de ejemplo
const humidityData = ref([
  { time: '10:00', value: 65 },
  { time: '10:05', value: 68 },
  { time: '10:10', value: 62 },
  { time: '10:15', value: 70 },
  { time: '10:20', value: 58 },
  { time: '10:25', value: 72 },
  { time: '10:30', value: 66 },
]);

const chartKey = ref(0);
const isSimulating = ref(false);
let simulationInterval = null;

// Estadísticas computadas
const stats = computed(() => {
  if (humidityData.value.length === 0) {
    return { min: 0, max: 0, average: 0, count: 0 };
  }
  
  const values = humidityData.value.map(item => item.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const average = (values.reduce((a, b) => a + b, 0) / values.length).toFixed(1);
  
  return {
    min,
    max,
    average,
    count: humidityData.value.length
  };
});

// Datos del gráfico
const chartData = computed(() => ({
  labels: humidityData.value.map(item => item.time),
  datasets: [
    {
      label: 'Humedad (%)',
      data: humidityData.value.map(item => item.value),
      borderColor: 'rgb(34, 197, 94)',
      backgroundColor: 'rgba(34, 197, 94, 0.05)',
      borderWidth: 3,
      tension: 0.4,
      fill: true,
      pointBackgroundColor: 'rgb(34, 197, 94)',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 7,
    }
  ]
}));

// Humedad actual
const currentHumidity = computed(() => {
  const lastItem = humidityData.value[humidityData.value.length - 1];
  return lastItem ? lastItem.value : 0;
});

// Opciones del gráfico
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        color: '#374151',
        font: {
          size: 14,
          weight: '500'
        },
        usePointStyle: true,
        padding: 20
      }
    },
    tooltip: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      titleColor: '#1f2937',
      bodyColor: '#374151',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: false,
      callbacks: {
        label: function(context) {
          return `Humedad: ${context.parsed.y}%`;
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: false,
      min: 0,
      max: 100,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
      },
      ticks: {
        color: '#6b7280',
        callback: function(value) {
          return value + '%';
        }
      },
      title: {
        display: true,
        text: 'Humedad (%)',
        color: '#374151',
        font: {
          size: 12,
          weight: '500'
        }
      }
    },
    x: {
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
      },
      ticks: {
        color: '#6b7280'
      },
      title: {
        display: true,
        text: 'Tiempo',
        color: '#374151',
        font: {
          size: 12,
          weight: '500'
        }
      }
    }
  },
  interaction: {
    intersect: false,
    mode: 'index',
  },
};

</script>