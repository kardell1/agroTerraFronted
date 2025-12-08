import { defineStore } from 'pinia'
export const useModuloStore = defineStore('module', {
  state: () => ({
    selectedDevice: {
      name: '',
      uuid: '',
    },
  }),

  actions: {
    // Guarda localmente el device seleccionado
    setDevice(name: string, uuid: string) {
      this.selectedDevice.name = name
      this.selectedDevice.uuid = uuid
    },
  },
})
