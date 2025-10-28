<script setup lang="ts">
import InputCredentials from '@/components/InputCredentials.vue'
import authForm from '@/composables/forms/authForm.ts'
import authHandler from '@/composables/handlers/authHandler.ts'

const { username, password, errors, validate } = authForm()
const handleClick = () => {
  validate()
  authHandler(username.value, password.value, errors.value);
};
</script>

<template>
     <section class="h-screen w-screen flex items-center justify-center 
           bg-center bg-cover bg-no-repeat bg-fixed 
           bg-[url('/fondoLogin3.jpg')]">
  
    <div class="p-10 bg-transparent w-100 rounded-xl 
                backdrop-blur-sm border border-white/10 shadow-2xl">
      <div class="items-center flex flex-col gap-2 mb-6">
        <img src="/agroTerraLogo.png" alt="logo" class="w-65 h-30">
        <h1>Inicio de sesión</h1>
      </div>
      <div class="flex flex-col gap-2">
        <InputCredentials 
          title="Usuario"
          placeholder="Usuario"
          type="text"
          @update:model-value="(val: string) => username=val"
        />
        <InputCredentials 
          title="Contraseña"
          placeholder="Contraseña"
          type="password"
          @update:model-value="(val: string) => password=val"
        />
        <button @click="handleClick" class="w-full py-3 mt-6 text-lg font-semibold rounded-full
                       bg-white text-black hover:bg-green-700 transition duration-300 shadow-xl">Iniciar sesión</button>
      </div>
    </div>
  </section>
</template>

<style>
</style>