export interface ResponseGenericHttp {
  success: boolean
  msg: string
}

export interface ResponsePost extends ResponseGenericHttp {
  details: string[]
}
