import { defineStore } from 'pinia'

export const useModalStore = defineStore('modalStore', {
  state: () => ({
    view: false, // estado inicial del modal
  }),

  actions: {
    open() {
      this.view = true
    },

    close() {
      this.view = false
    },

    toggle() {
      this.view = !this.view
    },
  },
})
