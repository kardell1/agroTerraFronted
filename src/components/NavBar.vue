<script setup lang="ts">
import { useRouter } from 'vue-router'
import menuOptions from '../helpers/menuOptions'
import CardOptionNav from './CardOptionNav.vue'
import { ref } from 'vue'
import { useUserStore } from '../store/authStore'

const [firstItem, ...restItems] = menuOptions
const lastItem = restItems.pop()
const middleItems = restItems
const currentElement = ref('home')
const showMenu = ref(false)

const router = useRouter()
const user = useUserStore()

const handleNavegation = (routeName: string) => {
  currentElement.value = routeName
  showMenu.value = false
  if (routeName === 'Login') {
    user.logout()
  }
  router.push({ name: routeName })
}

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}
</script>

<template>
  <nav class="flex justify-between items-center shadow-sm text-slate-700 py-3 bg-white px-4 sm:px-6 lg:px-20 relative">
    <CardOptionNav
      hover="hover:text-green-500 font-bold hover:bg-slate-100"
      :style="'text-green-500 font-bold bg-slate-100'"
      :icon="firstItem!.icon"
      :label="firstItem!.label"
      :route="firstItem!.route"
      :current="currentElement"
      @select="handleNavegation"
    />
    
    <div class="hidden sm:flex gap-2 sm:gap-4 lg:gap-10">
      <CardOptionNav
        :key="i"
        v-for="(option, i) in middleItems"
        hover="hover:text-green-500  hover:bg-slate-100"
        :style="'text-green-500 font-bold bg-slate-100'"
        :icon="option.icon"
        :label="option.label"
        :route="option.route"
        :current="currentElement"
        @select="handleNavegation"
      />
      <CardOptionNav
        hover="hover:text-red-500 font-bold"
        :style="''"
        :icon="lastItem!.icon"
        :label="lastItem!.label"
        :route="lastItem!.route"
        :current="currentElement"
        @select="handleNavegation"
      />
    </div>

    <!-- Botón menú hamburguesa - Solo en móvil -->
    <button 
      @click="toggleMenu"
      class="sm:hidden flex items-center justify-center p-2 rounded-sm transition-colors delay-75 cursor-pointer ease-in-out hover:text-green-500 hover:bg-slate-100"
    >
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>

    <!-- Menú desplegable - Solo en móvil -->
    <div 
      v-if="showMenu"
      class="flex items-center justify-center sm:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50"
    >
      <CardOptionNav
        :key="i"
        v-for="(option, i) in middleItems"
        hover="hover:text-green-500  hover:bg-slate-100"
        :style="'text-green-500 font-bold bg-slate-100'"
        :icon="option.icon"
        :label="option.label"
        :route="option.route"
        :current="currentElement"
        @select="handleNavegation"
      />
      <CardOptionNav
        hover="hover:text-red-500 font-bold"
        :style="''"
        :icon="lastItem!.icon"
        :label="lastItem!.label"
        :route="lastItem!.route"
        :current="currentElement"
        @select="handleNavegation"
      />
    </div>
  </nav>
</template>