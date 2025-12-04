<script setup lang="ts">
import { useModalStore } from '../../store/modalStore'
import InputModule from '../InputModule.vue'

const modal = useModalStore()
const handleCloseModal = () => {
  modal.close()
}
</script>

<template>
  <div class="p-4 bg-white shadow-md rounded-lg">
    <div class="flex justify-between items-center gap-20">
      <p class="font-bold text-lg">Agrega un nuevo modulo</p>
      <button @click="handleCloseModal" class="bg-red-600 text-white rounded-full px-4 py-2">
        X
      </button>
    </div>
    <InputModule
      />
  </div>
</template>
