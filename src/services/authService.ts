import axios from 'axios'
import type { ResponsePost } from '../types'

const authService = async (username: string, password: string) => {
  const credentials = {
    username: username,
    password: password,
  }
  try {
    const response = await axios.post<ResponsePost>(
      `${import.meta.env.VITE_API_URL}/authenticate`,
      credentials,
    )
    console.log('✅ Respuesta exitosa:', response.data)
    return response.data // success: true
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const apiResponse = error.response?.data as ResponsePost
      console.error('⚠️ Error controlado:', apiResponse)
      return apiResponse // success: false
    }
    console.error('❌ Error desconocido:', error)
    return {
      success: false,
      msg: 'Error inesperado del cliente',
      details: [],
    }
  }
}
export default authService
