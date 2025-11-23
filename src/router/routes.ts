import DashboardPage from '../pages/DashboardPage.vue'
import LoginPage from '../pages/LoginPage.vue'
export default [
  {
    path: '/',
    name: 'Login',
    component: LoginPage,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'sensores',
        name: 'sensors',
        component: () => import('../components/views/ModuleSection.vue'),
      },

      {
        path: '',
        name: 'home',
        component: () => import('../components/views/HomeSection.vue'),
      },

      {
        path: 'historial',
        name: 'historic',
        component: () => import('../components/views/HistoricSection.vue'),
      },
    ],
  },
]
