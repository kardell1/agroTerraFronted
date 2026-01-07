import router from '../../router'
import moduleService from '../../services/moduleService'
import { useUserStore } from '../../store/authStore'
import type { ModuleForm } from '../../types'

const moduleHandler = async (newModule: ModuleForm) => {
  const userStore = useUserStore()
  // console.log('module handler')
  // console.log(newModule)
  const res = await moduleService(newModule)
  if (res?.success) {
    const sensors = newModule.device_sensors.map((sensor) => ({
      name: sensor.sensor_name,
      minvalue: sensor.sensor_min,
      maxvalue: sensor.sensor_max,
      code: sensor.sensor_code,
      events: [], // default
    }))
    userStore.devices.push({
      name: newModule.device_name,
      sensors: sensors,
      uuid: newModule.device_uuid,
    })
    router.push('/dashboard')
  }
  // console.log(res)
}

export default moduleHandler
