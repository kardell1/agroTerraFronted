import { defineStore } from 'pinia'
export type TypeStoreUser = {
  username: string
  token: string
  isAuthenticated: boolean
}

function initialState() {
  return {
    username: '',
    token: '',
    isAuthenticated: false,
    // menu: [],
  }
}
export const useUserStore = defineStore('user', {
  //informacion inicial del usuario
  state: (): TypeStoreUser => initialState(),
  //los actions son lo que podemos modificar del state
  //sin esto no podemos modificar nada
  actions: {
    // login(username: string, token: string) {
    //   this.username = username; // Modifica el estado
    //   this.token = token; // Modifica el estado
    //   this.isAuthenticated = true; // Cambia el estado
    //   // this.rol = rol;
    // },
    logout() {
      Object.assign(this, initialState())
      localStorage.removeItem("token")
    },
    setInformation({ isAuthenticated, token, username }: TypeStoreUser) {
      this.username = username
      this.token = token
      this.isAuthenticated = isAuthenticated
      // this.menu = menu
    },
  },
})
