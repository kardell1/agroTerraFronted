<script setup lang="ts">
import ModuleSection from '../components/ModuleSection.vue'
import NavBar from '../components/NavBar.vue'
</script>

<template>
  <div class="flex flex-col max-h-screen h-screen gap-5 bg-slate-100">
    <header>
      <NavBar />
    </header>
    <!-- aca renderizamos las rutas internas  -->
    <main class="flex-1 px-20">
      <ModuleSection />
    </main>
  </div>
</template>
