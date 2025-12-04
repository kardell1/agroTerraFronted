import mqtt from 'mqtt' 
import { ref } from 'vue'
type MqttClient = ReturnType<typeof mqtt.connect>

export function useMqtt() {
  const client = ref<MqttClient | null>(null)
  const isConnected = ref(false)
  
  const messageHandlers = new Map<string, (message: string) => void>()

  const connect = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Configuración DIRECTA de tu HiveMQ (del readme.md)
      const brokerUrl = 'wss://051e1da66fac44cb94d48b068cba3b30.s1.eu.hivemq.cloud:8884/mqtt' //wss://b2253d55de2740b68ac4991e75c5f2f5.s1.eu.hivemq.cloud:8884/mqtt
      
      client.value = mqtt.connect(brokerUrl, {
        username: 'admin', //hivemq.webclient.1760647679265
        password: 'Administrador1', //dhRnEef,83%:lN64@XCL
        clientId: `agro-web-${Math.random().toString(16).substr(2, 8)}`,
        clean: true,
      })

      client.value.on('connect', () => {
        console.log('✅ Conectado a HiveMQ')
        isConnected.value = true
        resolve()
      })

      client.value.on('error', (error) => {
        console.error('❌ Error MQTT:', error)
        reject(error)
      })

      client.value.on('message', (topic: string, message: Buffer) => {
        const handler = messageHandlers.get(topic)
        if (handler) {
          handler(message.toString())
        }
      })

      client.value.on('close', () => {
        console.log('🔌 Desconectado de MQTT')
        isConnected.value = false
      })
    })
  }

  const subscribe = (topic: string, callback: (message: string) => void): void => {
    if (!client.value?.connected) {
      console.error('No hay conexión MQTT')
      return
    }

    messageHandlers.set(topic, callback)
    
    client.value.subscribe(topic, (err) => {
      if (err) {
        console.error(`Error suscribiendo a ${topic}:`, err)
      } else {
        console.log(`📡 Suscrito a: ${topic}`)
      }
    })
  }

  const disconnect = (): void => {
    if (client.value) {
      client.value.end()
      client.value = null
      isConnected.value = false
      messageHandlers.clear()
    }
  }

  return { client, isConnected, connect, subscribe, disconnect }
}