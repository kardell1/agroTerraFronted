<script setup lang="ts">
import { Boxes, NotebookText, LogOut, Leaf } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
//desde este componente mandamos los datos para la navegacion
// cada elemento del nav, esta compuesto por un icon y un title
const router = useRouter()

const handleNavegation = (routeName: string) => {
  router.push({ name: routeName })
}
</script>

<template>
  <nav class="flex justify-between items-center shadow-sm text-slate-700 py-3 px-20 bg-white">
    <button
      @click="handleNavegation('home')"
      class="flex cursor-pointer hover:bg-slate-100 rounded-sm items-center gap-2 px-2"
    >
      <span class="text-green-600 rounded-full bg-slate-100 p-2">
        <Leaf />
      </span>
      <div class="flex">
        <p class="font-bold">Agro</p>
        <p class="font-bold text-green-600">Terra</p>
      </div>
    </button>
    <div class="flex gap-10">
      <button
        @click="handleNavegation('sensors')"
        class="flex items-center justify-center gap-2 hover:bg-slate-100 hover:text-green-500 py-1 px-2 rounded-sm transition-colors delay-75 cursor-pointer ease-in-out"
      >
        <span><Boxes /></span>
        <p>Modulos</p>
      </button>

      <button
        @click="handleNavegation('historic')"
        class="flex items-center justify-center gap-2 hover:bg-slate-100 hover:text-green-500 py-1 px-2 rounded-sm transition-colors delay-75 cursor-pointer ease-in-out"
      >
        <span> <NotebookText /> </span>
        <p>Historial</p>
      </button>

      <button
        @click="handleNavegation('/')"
        class="flex items-center justify-center gap-2 hover:text-red-500 py-1 px-2 rounded-sm transition-colors delay-75 cursor-pointer ease-in-out"
      >
        <span> <LogOut /></span>
        <p>Salir</p>
      </button>
    </div>
  </nav>
</template>
