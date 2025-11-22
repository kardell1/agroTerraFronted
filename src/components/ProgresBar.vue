<script lang="ts" setup>
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
  <div class="relative">
    <svg
      :width="circleWidth"
      :height="circleWidth"
      :viewBox="`0, 0, ${circleWidth}, ${circleWidth}`"
    >
      <defs>
        <!-- aca se modifica el border visual que vemos en el circulo  -->
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
      <Icon :icon="props.iconName" class="text-7xl" :class="props.styleText" />
    </div>
  </div>
</template>
