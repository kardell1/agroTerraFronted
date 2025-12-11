/**
 Parsea un mensaje MQTT en formato "TMP=23.5,HMD=45.6,DC=0.8"
 Retorna un objeto con códigos y valores: { TMP: 23.5, HMD: 45.6, DC: 0.8 }
 **/
export function parseMqttMessage(message: string): Record<string, number> {
  const result: Record<string, number> = {}
  
  if (!message || typeof message !== 'string') {
    console.warn('⚠️ Mensaje MQTT vacío o inválido')
    return result
  }
  
  // Dividir por comas
  const parts = message.split(',')
  
  parts.forEach(part => {
    if (!part.includes('=')) return
    
    const [key, value] = part.split('=')
    if (!key || !value) return
    
    const code = key.trim().toUpperCase()
    const numValue = parseFloat(value.trim())
    
    if (!isNaN(numValue)) {
      result[code] = numValue
    }
  })
  
  return result
}