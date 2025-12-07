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
