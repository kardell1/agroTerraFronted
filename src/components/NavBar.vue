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
const router = useRouter()
const user = useUserStore()
const handleNavegation = (routeName: string) => {
  currentElement.value = routeName
  if (routeName === 'Login') {
    user.logout()
  }
  router.push({ name: routeName })
}
</script>

<template>
  <nav class="flex justify-between items-center shadow-sm text-slate-700 py-3 px-20 bg-white">
    <CardOptionNav
      hover="hover:text-green-500 font-bold hover:bg-slate-100"
      :style="'text-green-500 font-bold bg-slate-100'"
      :icon="firstItem!.icon"
      :label="firstItem!.label"
      :route="firstItem!.route"
      :current="currentElement"
      @select="handleNavegation"
    />
    <div class="flex gap-10">
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
