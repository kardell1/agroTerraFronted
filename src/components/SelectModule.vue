<script setup lang="ts">
import { useUserStore } from '../store/authStore'

const moduleStore = useUserStore()
// evento que solo devuelve el uuid
const emit = defineEmits<{
  (e: 'select', uuid: string): void
}>()
const handleSelect = (e: Event) => {
  const target = e.target as HTMLSelectElement
  const uuid = target.value
  // console.log('valor seleccionado : ' + uuid)
  emit('select', uuid)
}
</script>

<template>
  <select @change="handleSelect" class="p-2 outline-none border-4 border-green-500 rounded-lg">
    <option value="">Seleccione Modulo</option>
    <option :value="opt.uuid" v-for="(opt, i) in moduleStore.devices" :key="i">
      {{ opt.name }}
    </option>
  </select>
</template>
