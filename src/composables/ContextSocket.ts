import { reactive, onMounted, onUnmounted, provide } from "vue"
import { useMqtt } from "./useMqtt"

export interface SensorData {
  SensorLuz: string
  SensorTemperatura: string
  SensorHumedad: string
  SensorSuelo: string
}

export const ContextSocketKey = Symbol("ContextSocket")

export function provideSocketContext() {
  const data = reactive<SensorData>({
    SensorLuz: "0",
    SensorTemperatura: "0",
    SensorHumedad: "0",
    SensorSuelo: "0",
  })

  const { connect, subscribe, disconnect } = useMqtt()

  // En tu ContextSocket.ts - Función processMqttMessage

const processMqttMessage = (message: string) => {
  console.log('📨 Mensaje MQTT recibido:', message)
  // Formato esperado: "TMP=23.5,HMD=45.6,LGT=12.56,SOL=78.3"
  const parts = message.split(',') 

  parts.forEach(part => {
    
    if (part.includes('=')) {
      const [key, value] = part.split('=')

      if (!key || !value) {
        console.warn('⚠️ Formato incorrecto en:', part)
        return
      }
      
      const upperKey = key.trim().toUpperCase()
      const cleanValue = value.trim()
      
      switch(upperKey) {
        case 'TMP':
        case 'T':
          data.SensorTemperatura = cleanValue
          break
        case 'HMD':
        case 'H':
          data.SensorHumedad = cleanValue
          break
        case 'LGT':
        case 'L':
          data.SensorLuz = cleanValue
          break
        case 'SOL':
        case 'S':
          data.SensorSuelo = cleanValue
          break
        default:
          console.log(`⚠️ Clave no reconocida: ${upperKey}=${cleanValue}`)
      }
    }
  })
}

  onMounted(async () => {
    try {
      await connect()
      
      // 🔴 IMPORTANTE: Reemplaza con el TOPIC CORRECTO
      const topic = 'agroterra/sensors/data' // topic a cambiar
      
      subscribe(topic, processMqttMessage)
      
    } catch (error) {
      console.error('Error conectando a MQTT:', error)
      // Datos de prueba para desarrollo
      data.SensorTemperatura = "25.5"
      data.SensorHumedad = "65.2"
      data.SensorLuz = "450"
      data.SensorSuelo = "78.3"
    }
  })

  onUnmounted(() => {
    disconnect()
  })

  provide(ContextSocketKey, data)

  return { data }
}