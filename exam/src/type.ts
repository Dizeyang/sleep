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

// 试卷库数据类型
export type Exams = {
  _id: string
  name: string
  classify: string
  createTime: number
  creator: string
  questions: string[]
}

// 试题库表格
export type ExamsListItem = {
  _id: string
  username: string
  password: string
  status: 0 | 1
  age: number
  avator: string
  email: string
  sex: string
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
  page?: number
  pagesize?: number
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
  name: string
}
export type UserListRes = BaseResponse<{
  total: number
  list: UserListItem[]
}>

// 考试记录
export type examinationParams = {
  page: number
  pagesize: number
}
export type examinationItem = {
  _id: string
  creator: string
  status: 1 | 2
  name: string
  classify: string
  createTime: number
  endTime: number
  examiner: string
  startTime: number
  group: string
  questionsList: string[]
}
export type examinationRes = BaseResponse<{
  total: number
  list: examinationItem[]
}>

// 考试班级
export type studentGroupParams = {
  page: number
  pagesize: number
}
export type studentGroupItem = {
  _id: string
  name: string
  label: string;
  value: string;
  key: string;
}
export type studentGroupRes = BaseResponse<{
  total: number
  list: studentGroupItem[]
}>

// 科目类型
export type classifyParams = {
  page: number
  pagesize: number
}
export type classifyItem = {
  _id: string
  name: string
  label: string;
  value: string;
  key: string;
}
export type classifyRes = BaseResponse<{
  total: number
  list: classifyItem[]
}>

// 试卷
export type examParams = {
  page: number
  pagesize: number
}
export type examItem = {
  _id: string
  name: string
  classify: string
  createTime: number
  creator: string
  size: number
  key: React.Key
}
export type examRes = BaseResponse<{
  total: number
  list: examItem[]
}>

// 创建考试
export type createExamParams = {
  page: number
  pagesize: number
}
export type createExamItem = {
  name: string
  classify: string
  examId: string
  group: string
  examiner: string
  startTime: number
  endTime: number
  _id: string
}
export type createExamRes = BaseResponse<{
  total: number
  list: createExamItem[]
}>

// 删除考试
export type removeExamParams = {
  page: number
  pagesize: number
}
export type removeExamItem = {
  name: string
  classify: string
  examId: string
  group: string
  examiner: string
  startTime: number
  endTime: number
  _id: string
}
export type removeExamRes = BaseResponse<{
  total: number
  list: removeExamItem[]
  _id: string
}>