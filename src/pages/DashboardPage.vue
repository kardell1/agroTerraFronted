<script setup lang="ts">
import NavBar from '../components/NavBar.vue'
import { useModalStore } from '../store/modalStore'
import ModalModule from '../components/modals/ModalModule.vue'
// importar el store
const modal = useModalStore()
</script>

<template>
  <div class="flex flex-col max-h-screen h-screen gap-5 bg-slate-100 overflow-y-scroll relative">
    <header class="sticky top-0 z-10">
      <NavBar />
    </header>
    <!-- aca renderizamos las rutas internas  -->
    <main class="flex-1 px-4 sm:px-6 lg:px-20">
      <router-view />
    </main>
    <!-- aca renderizar el modal -->
    <div v-if="modal.view" class="absolute w-full h-screen z-20 flex justify-center items-center">
      <ModalModule />
    </div>
  </div>
</template>
