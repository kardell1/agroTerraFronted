<script setup lang="ts">
import NavBar from '../components/NavBar.vue'
</script>

<template>
  <div class="flex flex-col max-h-screen h-screen gap-5 bg-slate-100 overflow-y-scroll required:">
    <header class="sticky top-0 z-10">
      <NavBar />
    </header>
    <!-- aca renderizamos las rutas internas  -->
    <main class="flex-1 px-20 py-5">
      <router-view />
    </main>
  </div>
</template>
