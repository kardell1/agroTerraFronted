<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../store/authStore'
import { useModuloStore } from '../store/moduleStore'

const user = useUserStore()
const moduleStore = useModuloStore()

// valor inicial usando el store (si ya había algo seleccionado)
const selectedUuid = ref<string>(moduleStore.selectedDevice?.uuid || '')

// cuando se selecciona uno
const handleSelect = () => {
  const device = user.devices.find((d) => d.uuid === selectedUuid.value)
  if (device) {
    moduleStore.setDevice(device)
  }
}
</script>

<template>
  <select
    v-model="selectedUuid"
    @change="handleSelect"
    class="p-2 outline-none border-4 border-green-500 rounded-lg"
  >
    <option value="" disabled>Seleccione Modulo</option>

    <option :value="opt.uuid" v-for="(opt, i) in user.devices" :key="i">
      {{ opt.name }}
    </option>
  </select>
</template>
