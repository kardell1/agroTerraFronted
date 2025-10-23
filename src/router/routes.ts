import Dashboard from "../pages/dashboard.vue";
import Login from "../pages/login.vue";

export default [
  { path: "/", component: Login },
  {
    path: "/dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("../pages/home/LayoutHome.vue"),
        /**
         * devuelve distintos graficos para cada rol
         * quiza para que el fronted sepa
         * poner un type :
         * contenido de informacion
         */
      },
      {
        path: "calendar",
        name: "calendar",
        component: () => import("../pages/calendar/LayoutCalendar.vue"),
      },
    ],
  },
  {
    //redirige al login cualquier otra ruta no verificada
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
  //   { //alternativa , muestra un 404 page
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   component: () => import('../pages/NotFound.vue')
  // }
];