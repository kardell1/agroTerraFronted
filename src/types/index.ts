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
}

export interface ResponsePost extends ResponseGenericHttp {
  details: DevicesType[]
}
