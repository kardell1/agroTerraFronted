# Documentación del Frontend

Este documento describe la configuración, dependencias, estructura y herramientas principales usadas en el proyecto **froned-v2**.

---

## Información General

```
Nombre: froned-v2
Versión: 0.0.0
Privado: Sí
Runtime: Node 20.19+ o 22.12+
Framework: Vue 3 + Vite
Lenguaje: TypeScript
```

---

## 🚀 Scripts Disponibles

Estos comandos se ejecutan con `pnpm` o `npm run`.

### **Desarrollo**

```
pnpm dev
```

Inicia el servidor de desarrollo de Vite.

### **Build**

```
pnpm build
```

Genera los archivos listos para producción.

### **Vista Previa del Build**

```
pnpm preview
```

Sirve localmente la versión construida.

## Dependencias Principales

Aquí se resumen las librerías que componen el frontend.

### **Vue & Ecosistema**

- **vue 3** → Framework principal.
- **vue-router** → Manejo de rutas.
- **pinia** → Store global.
- **@vitejs/plugin-vue** → Compatibilidad con Vite.
- **vue-tsc** → Chequeo de tipos.

### **Estilos**

- **tailwindcss 4** → Utilidades CSS.
- **@tailwindcss/vite** → Integración con Vite.

### **UI & Componentes**

- **@iconify/vue** → Iconos.
- **lucide-vue-next** → Iconos vectoriales.

### **HTTP / Networking**

- **axios** → Cliente HTTP.
- **socket.io-client** → Comunicación en tiempo real.

### **Gráficos**

- **chart.js**
- **vue-chartjs**

### **Herramientas de desarrollo**

- **typescript**
- **eslint + eslint-plugin-vue**
- **prettier**
- **vite**
- **vite-plugin-vue-devtools**

---

## Estructura Sugerida del Proyecto

_(Nota: esta sección puede expandirse si compartes tu carpeta `src/`)_

```
src/
App.vue
assets/
components/
composables/
data/
env.d.ts
helpers/
main.ts
pages/
router/
services/
shims-vue.d.ts
store/
types/
ui/
validator/
__tests__/
```

---

## Comunicación con la API

Generalmente la API se consume usando Axios.

### Ejemplo Base de Configuración

```ts
import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})
```

### Ejemplo de Petición Autenticada

```ts
api.get('/prueba', {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
```

---

## Integración con Pinia

Ejemplo de store para manejar usuario autenticado:

```ts
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null,
  }),
  actions: {
    setToken(t) {
      this.token = t
    },
  },
})
```

---

## Integración de ejemplo con Chart.js

```vue
<script setup>
import { Line } from 'vue-chartjs'
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(LineElement, CategoryScale, LinearScale)
</script>

<template>
  <Line :data="chartData" :options="chartOptions" />
</template>
```

---
