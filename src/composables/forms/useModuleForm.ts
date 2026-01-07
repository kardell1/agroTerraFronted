import { ref } from 'vue'
import type { ModuleForm } from '../../types'
const useModuleForm = () => {
  const moduleForm = ref<ModuleForm>({
    device_name: '',
    device_section: '',
    device_uuid: '',
    device_sensors: [
      {
        sensor_name: 'Temperatura',
        sensor_code: 'TMP',
        sensor_type: 'temperature',
        unit: '°C',
        sensor_min: '',
        sensor_max: '',
      },
      {
        sensor_name: 'Humedad',
        sensor_code: 'HMD',
        sensor_type: 'humidity',
        unit: '%',
        sensor_min: '',
        sensor_max: '',
      },
      {
        sensor_name: 'Dioxido de Carbono',
        sensor_code: 'DC',
        sensor_type: 'custom',
        unit: 'ppm',
        sensor_min: '',
        sensor_max: '',
      },
    ],
  })
  const errors = ref<string[]>([])

  const validation = () => {
    const validationErrors: string[] = []

    if (!moduleForm.value.device_name.trim()) {
      validationErrors.push('El nombre del dispositivo no puede estar vacio.')
    }
    if (!moduleForm.value.device_section.trim()) {
      validationErrors.push('Debe especificar la seccion del dispositivo.')
    }
    if (!moduleForm.value.device_uuid.trim()) {
      validationErrors.push('Es necesario agregar las UUID del dispositivo')
    }
    errors.value = validationErrors

    return validationErrors.length === 0
  }

  return { moduleForm, validation, errors }
}
export default useModuleForm
