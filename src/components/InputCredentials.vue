<script setup lang="ts">
// mi input necesita un valor inicial
// mi input necsita un place holder
// mi input requiere tener un type
// mi input icon

// dentro de su logica interna
// evaluar el tipo que recibimos
// si es de typo = password -> mostramos el icon de ojo cerrado
// si presionamos el boton del ojo -> mi type va ser text

// emmit -> esto lo que hace es definir una funcion que emite algo

  const props = defineProps({
    title: String,
    placeholder: String,
    type: String,
    modelValue: String, 
  });

  // 3. Definimos los eventos que puede emitir el componente
  const emit = defineEmits(['update:modelValue']);

  // 4. Función para emitir el cambio de valor
  const handleInput = (event: Event) => {
    // Emitimos el nuevo valor al parent, usando el nombre estándar 'update:modelValue'
    emit('update:modelValue', (event.target as HTMLInputElement).value);
  };
</script>

<template>
  <label for="">
    <div class="flex flex-col text-[1rem] my-1 ">
      <label for="" class="border-2 border-lime-950 p-1 rounded-xl">
        <input
          :type="type"
          :placeholder="placeholder"
          :value="modelValue"  
          @input="handleInput"
          class="outline-none w-full"
        />
      </label>
    </div>
  </label>
</template>
