import axios from 'axios'
import type { ModuleForm, ResponsePost } from '../types'
import { useUserStore } from '../store/authStore'

const moduleService = async (form: ModuleForm) => {
  const userStore = useUserStore()

  try {
    const response = await axios.post<ResponsePost>(
      `${import.meta.env.VITE_API_URL}/sensor/create`,
      form,
      {
        headers: {
          Authorization: `Bearer ${userStore.token}`,
        },
      },
    )
    return response.data // success: true
  } catch (error) {
    console.log(error)
  }
}
export default moduleService
