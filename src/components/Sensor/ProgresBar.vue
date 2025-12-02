<script lang="ts" setup>
//este componete se usa dentro de cardSensor
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

interface Props {
  porcentaje: number
  circleWidth: number
  radius: number
  iconName: string
  styleLine: string
  styleText: string
}

const props = defineProps<Props>()

const dashArray = computed(() => props.radius * Math.PI * 2)
const dashOffset = computed(() => {
  const porcentajeLimitado = Math.min(Math.max(props.porcentaje, 0), 100)
  return dashArray.value - (dashArray.value * porcentajeLimitado) / 100
})
</script>

<template>
  <div class="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-36 xl:h-36">
    <svg
      :width="circleWidth"
      :height="circleWidth"
      :viewBox="`0, 0, ${circleWidth}, ${circleWidth}`"
      class="w-full h-full"
    >
      <defs>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="2" flood-color="#475569" flood-opacity="1" />
        </filter>
      </defs>

      <!-- Círculo base -->
      <circle
        :cx="circleWidth / 2"
        :cy="circleWidth / 2"
        stroke-width="29px"
        :r="radius"
        style="fill: none; stroke: #fff; filter: url(#shadow)"
      ></circle>

      <!-- Círculo dinámico -->
      <circle
        :cx="circleWidth / 2"
        :cy="circleWidth / 2"
        stroke-width="30px"
        :r="radius"
        :style="{
          fill: 'none',
          stroke: styleLine,
          strokeDasharray: dashArray,
          strokeDashoffset: dashOffset,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }"
        :transform="`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`"
      ></circle>
    </svg>

    <!-- Icono central -->
    <div class="absolute inset-0 flex justify-center items-center">
      <Icon 
        :icon="props.iconName" 
        class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl" 
        :class="props.styleText" 
      />
    </div>
  </div>
</template>
