import { defineStore } from 'pinia'
import type { DevicesType } from '../types'

export const useModuloStore = defineStore('module', {
  state: () => ({
    selectedDevice: {
      name: '',
      uuid: '',
      sensors: [],
    } as DevicesType,
  }),

  actions: {
    // Guarda localmente el device seleccionado
    setDevice(device: DevicesType) {
      this.selectedDevice = device
    },
    funcionPrueba() {
      // Puedes probar aquí accediendo al device seleccionado
      console.log('Device actual:', this.selectedDevice)
    },
  },
})
