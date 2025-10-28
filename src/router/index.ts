import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import registerGuards from './guard'

const router = createRouter({
  history: createWebHistory(),
  routes, //importamos las rutas declaradas
})

registerGuards(router) // <- aplica guardias

export default router
