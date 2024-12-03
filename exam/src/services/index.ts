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
  Exams,
  examinationParams,
  examinationRes,
  studentGroupParams,
  studentGroupRes,
  classifyParams,
  classifyRes,
  examParams,
  examRes,
  createExamParams,
  createExamRes,
  removeExamParams,
  removeExamRes,
  removeExamItem,
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

export const examinationListApi = (params: examinationParams) => {
  return request.get<examinationRes>('/examination/list', { params })
}

export const studentGroupApi = (params: studentGroupParams) => {
  return request.get<studentGroupRes>('/studentGroup/list', { params })
}

export const classifyApi = (params: classifyParams) => {
  return request.get<classifyRes>('/classify/list', { params })
}

export const examApi = (params: examParams) => {
  return request.get<examRes>('/exam/list', { params })
}

export const createExamApi = (params: createExamParams) => {
  return request.get<createExamRes>('/examination/create', { params })
}

// export const removeExamApi = (id: string) = (params: removeExamParams) => {
//   return request.get<removeExamRes>('/examination/remove', { params })
// }
// 删除考试的接口
// type removeExamParams = Partial<Omit<removeExamItem, '_id'>> & { _id: string };
// export const removeExamApi = (params: removeExamParams) => {
//   return request.post<removeExamRes>('/examination/remove',params);
// };
export const removeExamApi = (params: removeExamParams) => {
  return request.post<removeExamRes>('/examination/remove', params);
};

// 获取试卷列表
export const examsApi = (params: Partial<Exams> & { page: number, pagesize: number }) => {
  return request.get<BaseResponse<{ list: Exams[], total: number }>>('/exam/list', { params })
}

// 创建试卷
export const createExamApi = (data: Omit<Exams, '_id'>) => {
  return request.post<BaseResponse>('/exam/create', data)
}

// 编辑试卷
export const editExamApi = (data: Exams) => {
  return request.post<BaseResponse>('/exam/update', data)
}

// 删除试卷
export const deleteExamApi = (id: string) => {
  return request.post<BaseResponse>('/exam/remove', { id })
}

// 获取试卷详情（预览）
export const getExamDetailApi = (id: string) => {
  return request.get<BaseResponse<Exams>>('/exam/detail', { params: { id } })
}

// 导出Excel
export const exportExcelApi = () => {
  return request.get('/exam/export', { responseType: 'blob' })
}

// 删除用户接口
export const removeApi = (id: string) => {
  return request.post<BaseResponse>('user/remove', { id })
}

export const permissionListApi = () => {
  return request.get<BaseResponse>('/permission/list')
}
