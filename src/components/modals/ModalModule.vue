<script setup lang="ts">
import { useModalStore } from '../../store/modalStore'
import InputCredentials from '../InputCredentials.vue'

const modal = useModalStore()
const handleCloseModal = () => {
  modal.close()
}
</script>

<template>
  <div class="p-20 bg-white shadow-md rounded-lg">
    <div class="flex justify-between items-center gap-20">
      <p class="font-bold text-lg">Agrega un nuevo modulo</p>
      <button @click="handleCloseModal" class="bg-red-600 text-white rounded-full px-2 py-1">
        X
      </button>
    </div>
    <InputCredentials
      model-value="asdsa"
      title="code_module"
      placeholder="Introuzca codigo uuid"
      type="text"
    />
  </div>
</template>
