import request from "./request"
import type {
  BaseResponse,
  LoginParams,
  CaptchaRes,
  LoginRes,
  UserInfo,
  MenuItem,
  UserListParams,
  UserListRes,
  Exam,
} from '../type' 


export const getCaptcha = () => {
  return request.get<CaptchaRes>('/login/captcha')
}

export const loginApi = (params: LoginParams) => {
  return request.post<LoginRes>('/login', params)
}


export const userInfoApi = () => {
  return request.get<BaseResponse<UserInfo>>('/user/info')
}

export const menuListApi = () => {
  return request.get<BaseResponse<{ list: MenuItem[] }>>('/user/menulist')
}
export const userListApi = (params: UserListParams) => {
  return request.get<UserListRes>('/user/list', { params })
}
//查询试卷列表
// http://192.168.28.11:3001/exam/list?page=1&pagesize=10

// 试卷库接口
export const examsApi = (params:UserListParams) => {
  return request.get<BaseResponse<Exam>>('/Exam/list', { params })
}

export const testsApi = (params:UserListParams) => {
  return request.get<BaseResponse<Exam>>('/question/list', { params })
}

export const createQuestionApi = () => {
  return request.post('/question/create')
}
