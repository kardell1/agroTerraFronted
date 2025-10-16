<script setup lang="ts">
import InputCredentials from './components/InputCredentials.vue'
import authForm from './composables/forms/authForm'
import authHandler from './composables/handlers/authHandler'
const { username, password, errors, validate } = authForm()
</script>

<template>
  <section class="max-h-screen h-screen bg-green-600 flex items-center justify-center">
    <div class="p-10 bg-amber-700/85">
      <div class="flex flex-col gap-2 mb-7">
        <div>icon</div>
        <h1>Titulo</h1>
      </div>
      <div class="flex flex-col gap-4">
        <InputCredentials />
        <input v-model="username" type="text" placeholder="usuario" />
        <input v-model="password" type="text" placeholder="contrasena" />
        <button @click="authHandler(username, password, errors)">login</button>
      </div>
    </div>
  </section>
</template>
