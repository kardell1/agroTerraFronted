import router from '../../router'
import authService from '../../services/authService'
import { useUserStore } from '../../store/authStore'

const authHandler = async (username: string, password: string, errors: string[]) => {
  const userStore = useUserStore()

  if (errors.length > 0) {
    console.log(errors)
    return
  }

  try {
    const res = await authService(username, password)
    // console.log(res)

    if (!res.success) {
      router.push('/')
      return
    }

    userStore.setInformation({
      isAuthenticated: res.success,
      token: res.msg,
      username: '',
      devices: res.details,
    })

    router.push('/dashboard')
  } catch (error) {
    console.log(error)
  }
}

export default authHandler
