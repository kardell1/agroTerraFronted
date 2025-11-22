import { Boxes, Leaf, LogOut, NotebookText } from 'lucide-vue-next'

const menuOptions = [
  {
    icon: Leaf,
    label: 'AgroTerra',
    route: 'home',
  },
  {
    icon: Boxes, // componente del ícono
    label: 'Módulos',
    route: 'sensors',
  },
  {
    icon: NotebookText,
    label: 'Historial',
    route: 'historic',
  },
  {
    icon: LogOut,
    label: 'Salir',
    route: 'Login',
  },
]
export default menuOptions
