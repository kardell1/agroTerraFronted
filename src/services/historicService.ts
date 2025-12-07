import axios from 'axios'
import type { ResponseGetHistoric } from '../types'
import { useUserStore } from '../store/authStore'

const historicService = async (uuid: string, months: string) => {
  const userStore = useUserStore()
  // console.time('parse')
  try {
    const response = await axios.get<ResponseGetHistoric>(
      `${import.meta.env.VITE_API_URL}/sensor/historic`,
      {
        headers: {
          'x-device-uuid': uuid,
          'x-months-back': months,
          Authorization: `Bearer ${userStore.token}`,
        },
      },
    )
    // console.timeEnd('parse')
    // console.log('Respuesta exitosa en historicService : ', response.data)
    return response.data.details // success: true
  } catch (error) {
    throw error
  }
}
export default historicService
