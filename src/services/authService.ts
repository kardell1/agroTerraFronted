import axios from 'axios'
const authService = async (username: string, password: string) => {
  const credentials = {
    username: username,
    password: password,
  }
  const response = await axios.post('', credentials)
  return response
}
export default authService
//const creden = {clave: valor, clave2: valor2 }
