import DashboardPage from '../pages/DashboardPage.vue'
import LoginPage from '../pages/LoginPage.vue'
export default [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/login',
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
        component: () => import('../components/ModuleSection.vue'),
      },

      {
        path: '',
        name: 'home',
        component: () => import('../components/HomeSection.vue'),
      },

      {
        path: 'historial',
        name: 'historic',
        component: () => import('../components/HistoricSection.vue'),
      },
    ],
  },
]
