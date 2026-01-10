import moduleService from '../../services/moduleService'
import { useUserStore } from '../../store/authStore'
import { useModalStore } from '../../store/modalStore'
import type { DevicesType, ModuleForm, SensorType } from '../../types'

const moduleHandler = async (newModule: ModuleForm) => {
  const userStore = useUserStore()
  const modal = useModalStore()
  // console.log('module handler')
  // console.log(newModule)
  const res = await moduleService(newModule)

  if (res?.success) {
    const sensors: SensorType[] = newModule.device_sensors.map((sensor) => ({
      name: sensor.sensor_name,
      minvalue: sensor.sensor_min,
      maxvalue: sensor.sensor_max,
      code: sensor.sensor_code,
      events: [],
    }))

    const device: DevicesType = {
      name: newModule.device_name,
      uuid: newModule.device_uuid,
      sensors,
    }
    userStore.devices.push(device)
  }
  modal.close()
  console.log(res)
}

export default moduleHandler
