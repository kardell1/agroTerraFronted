<script setup lang="ts">
import type { Component } from 'vue'

const props = defineProps<{
  icon: Component
  label: string
  route: string
  style: string //lo que aplicamos
  hover: string //estilo del hover
  current: string
}>()
const emit = defineEmits<{
  (e: 'select', route: string): void
}>()
const handleClick = () => {
  emit('select', props.route)
}
</script>
<template>
  <button
    @click="handleClick"
    :class="[
      'flex items-center justify-center gap-2 py-1 px-2 rounded-sm transition-colors delay-75 cursor-pointer ease-in-out',
      hover,
      current === route ? style : '',
    ]"
  >
    <span>
      <component :is="icon" />
    </span>
    <p>{{ label }}</p>
  </button>
</template>
