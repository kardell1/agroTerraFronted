export interface ResponseGenericHttp {
  success: boolean
  msg: string
}

export type DevicesType = {
  name: string
  uuid: string
  sensors: SensorType[]
}
export type SensorType = {
  name: string
  minvalue: string
  maxvalue: string
  code: string
  events: EventType[]
}

export type EventType = {
  data: string
  message: string
  severity: string
  timestamp: Date
}
export interface ResponsePost extends ResponseGenericHttp {
  details: DevicesType[]
}

export interface ResponseGetHistoric extends ResponseGenericHttp {
  details: DevicesType
}

export type GraficData = {
  code: string
  name: string
  min: string
  max: string
  data: { date: string; value: number }[]
}
export interface ResponseGetGraficData extends ResponseGenericHttp {
  details: GraficData[]
}

export type Sensor = {
  sensor_name: string
  sensor_code: string
  sensor_type: string
  unit: string
  sensor_min: string
  sensor_max: string
}
// Luego el tipo del form completo
export type ModuleForm = {
  device_name: string
  device_section: string
  device_uuid: string
  device_sensors: Sensor[]
}
// export type DevicesType = {
//   name: string
//   uuid: string
//   sensors: SensorType[]
// }
// export type SensorType = {
//   name: string
//   minvalue: string
//   maxvalue: string
//   code: string
//   events: EventType[]
// }
