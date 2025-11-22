<script setup lang="ts">
import { useRouter } from "vue-router";
import ContainerSensors from "@/components/ContainerSensors.vue";
import { provideSocketContext } from "../composables/ContextSocket.ts";
import { useUserStore } from "../store/authStore.ts";
import SensorChart from "../components/SensorChart.vue";


provideSocketContext();

const router = useRouter();
const userStore = useUserStore();

const handleLogout = () => {
  userStore.logout();
  router.push("/login");
};
</script>

<template>
  <div class="p-6 min-h-screen bg-amber-100">
    <!-- HEADER -->
    <header class="flex items-center justify-between mb-6 p-4 bg-amber-50 border-[3px] border-amber-900 rounded-3xl shadow">
        <div class="flex justify-start items-center gap-8">
          <img src="../assets/images/agroTerraLogo.png" alt="logo" class="w-65 h-30">
          <h1 class="flex justify-center items-center text-3xl text-gray-800 text-slate-800">Bienvenido al panel principal de AgroTerra La Rojita</h1>
        </div>
      <div>
        <button 
        @click="handleLogout"
        class="w-20 h-10 bg-red-400 rounded-full hover:bg-red-600 shadow m-4 font-semibold text-slate-800">Salir</button>
      </div>
    </header>
  <ContainerSensors />
  <SensorChart />
  </div>
</template>

<style scoped>

</style>
