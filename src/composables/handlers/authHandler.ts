import router from '../../router'
import authService from '../../services/authService'
import { useUserStore } from '../../store/authStore'

//que voy a necesitar para que funcione mi componente
//recibir usrname, password, errors, funcion de validacion
//la funcion de validacion retorna un bool, y debe llenar los errores
const authHandler = async (username: string, password: string, errors: string[]) => {
  console.log(username)
  console.log(password)
  console.log(errors)

  const userStore = useUserStore()
  //authService(username, password)
  /*if (errors.length > 0 ){
    return
  }*/
  const res = authService(username, password)
  console.log(res)
  /*if(prueba){

    return
  }*/
  userStore.setInformation({
    isAuthenticated: true,
    token: 'asdsadsad',
    username: 'franco',
  })
  //antes de programar verificar el flujo del codigo
  //recibir variables
  //enviar
  //decidir que hacer con la respuesta
  router.push('/dashboard')
}

export default authHandler
