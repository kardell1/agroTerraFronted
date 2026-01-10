<script setup lang="ts">
import InputCredentials from '@/components/InputCredentials.vue'
import authForm from '../composables/forms/authForm.ts'
import authHandler from '../composables/handlers/authHandler'
import fondo from '../assets/images/fondoLogin3.avif'
import { useRouter } from 'vue-router'

const router = useRouter()
const { username, password, errors, validate } = authForm()

const handleClick = () => {
  router.push({ name: 'home' })
  validate()
  authHandler(username.value, password.value, errors.value)
}
</script>

<template>
  <section
    class="min-h-screen w-screen flex items-center justify-center bg-center bg-cover bg-no-repeat p-4"
    :style="`background-image: url(${fondo})`"
  >
    <div
      class="p-4 sm:p-6 md:p-8 bg-transparent w-full max-w-xs sm:max-w-sm md:max-w-md rounded-xl backdrop-blur-sm border border-white/10 shadow-2xl"
    >
      <div class="items-center flex flex-col gap-2 mb-4 sm:mb-6">
        <img
          src="../assets/images/agroTerraLogo.png"
          alt="logo"
          class="w-40 sm:w-48 md:w-56 h-auto"
        />
        <h1 class="text-lg sm:text-xl md:text-2xl text-white font-medium">Inicio de sesión</h1>
      </div>
      <div class="flex flex-col gap-3 sm:gap-4">
        <InputCredentials
          :model-value="username"
          title="Usuario"
          placeholder="Usuario"
          type="text"
          @update:model-value="(val: string) => (username = val)"
        />
        <InputCredentials
          :model-value="password"
          title="Contraseña"
          placeholder="Contraseña"
          type="password"
          @update:model-value="(val: string) => (password = val)"
        />
        <p class="text-center text-red-500 font-bold">{{ errors[0] }}</p>
        <button
          @click="handleClick"
          class="w-full py-2.5 sm:py-3 mt-2 sm:mt-4 text-sm sm:text-base md:text-lg font-semibold rounded-full bg-white text-black hover:bg-green-700 transition duration-300 shadow-xl"
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  </section>
</template>
