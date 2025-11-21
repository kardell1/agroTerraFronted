<script setup lang="ts">
import { Boxes, NotebookText, LogOut } from 'lucide-vue-next'
//desde este componente mandamos los datos para la navegacion
// cada elemento del nav, esta compuesto por un icon y un title
</script>

<template>
  <nav class="flex justify-between items-center shadow-sm text-slate-700 py-3 px-20 bg-white">
    <div class="flex items-center justify-center gap-2">
      <span>icon</span>
      <div class="flex">
        <p class="font-bold">Agro</p>
        <p class="font-bold text-green-600">Terra</p>
      </div>
    </div>
    <div class="flex gap-10">
      <div
        class="flex items-center justify-center gap-2 hover:bg-slate-100 hover:text-green-500 py-1 px-2 rounded-sm transition-colors delay-75 cursor-pointer ease-in-out"
      >
        <span><Boxes /></span>
        <p>Modulos</p>
      </div>

      <div
        class="flex items-center justify-center gap-2 hover:bg-slate-100 hover:text-green-500 py-1 px-2 rounded-sm transition-colors delay-75 cursor-pointer ease-in-out"
      >
        <span> <NotebookText /> </span>
        <p>Historial</p>
      </div>

      <div
        class="flex items-center justify-center gap-2 hover:text-red-500 py-1 px-2 rounded-sm transition-colors delay-75 cursor-pointer ease-in-out"
      >
        <span> <LogOut /></span>
        <p>Salir</p>
      </div>
    </div>
  </nav>
</template>
