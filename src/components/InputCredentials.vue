<script setup lang="ts">
defineProps<{
  title: string
  placeholder: string
  type: string
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<template>
  <label for="">
    <div class="flex flex-col text-[1rem] my-1">
      <label for="" class="border-2 border-lime-950 p-1 rounded-xl">
        <input
          :type="type"
          :placeholder="placeholder"
          :value="modelValue"
          @input="handleInput"
          class="p-1 outline-none w-full text-white font-sans"
        />
      </label>
    </div>
  </label>
</template>
