export interface BaseResponse<T = null> {
  code: number
  msg: string
  data: T
}

export type CaptchaRes = BaseResponse<{ code: string }>

export interface LoginParams {
  username: string
  padssword: string
  code: string
}

export type LoginRes = BaseResponse<{ token: string }>

// 用户信息
export type Permission = {
  name: string
  path: string
}
export type UserInfo = {
  age: number
  avator: string
  email: string
  sex: string
  username: string
  _id: string
  permission: Permission[]
  role: string[]
}

// 左侧菜单
export type MenuItem = {
  createTime: number
  disabled: boolean
  isBtn: boolean
  name: string
  path: string
  pid: string
  _id: string
  children?: MenuItem[]
}

// 用户列表
export type UserListParams = {
  page: number
  pagesize: number
}
export type UserListItem = {
  _id: string
  username: string
  password: string
  status: 0 | 1
  age: number
  avator: string
  email: string
  sex: string
}
export type UserListRes = BaseResponse<{
  total: number
  list: UserListItem[]
}>