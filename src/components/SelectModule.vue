<script setup lang="ts">
// tienes que recibir : { id : number , label : string}
type Props = {
  id: string
  label: string
}
defineProps<{
  data: Props[]
}>()
</script>

<template>
  <select name="" id="" class="p-2 outline-none border-4 border-green-500 rounded-lg">
    <option value="" disabled selected>Seleccione Modulo</option>
    <option :value="opt.id" v-for="(opt, i) in data" :key="i">
      {{ opt.label }}
    </option>
  </select>
</template>
