// Parsea un mensaje MQTT en formato "UUID,TMP=23.5,HMD=45.6,DC=0.8"
export function parseMqttMessage(message: string): { uuid: string, data: Record<string, number> } {
  const data: Record<string, number> = {}
  
  if (!message?.trim()) {
    console.warn('⚠️ Mensaje MQTT vacío o inválido')
    return { uuid: '', data }
  }
  
  const parts = message.trim().split(',')
  
  if (parts.length < 2) {
    console.warn('⚠️ Formato de mensaje inválido:', message)
    return { uuid: '', data }
  }
  
  const uuid = parts[0]?.trim() || ''
  
  // Procesar solo las partes que tienen formato "clave=valor"
  for (let i = 1; i < parts.length; i++) {
    const part = parts[i]
    if (!part?.includes('=')) continue
    
    const equalsIndex = part.indexOf('=')
    const key = part.substring(0, equalsIndex).trim().toUpperCase()
    const valueStr = part.substring(equalsIndex + 1).trim()
    const value = parseFloat(valueStr)
    
    if (key && !isNaN(value)) {
      data[key] = value
    }
  }
  
  return { uuid, data }
}