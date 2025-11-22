<script setup lang="ts">
import ModuleSection from '../components/ModuleSection.vue'
import NavBar from '../components/NavBar.vue'
import SensorChart from '../components/SensorChart.vue';
import SensorHistory from '../components/SensorHistory.vue';
</script>

<template>
  <div class="flex flex-col max-h-screen h-screen gap-5 bg-slate-100">
    <header>
      <NavBar />
    </header>
    <!-- aca renderizamos las rutas internas  -->
    <main class="flex-1 px-20">
     <!-- <ModuleSection /> -->
     <SensorHistory />
     <SensorChart />
    </main>
  </div>
</template>
