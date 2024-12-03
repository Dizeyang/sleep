import { useEffect, useState } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import { StudentsListApi1 } from '../../../services/index.ts'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../store'
import { message } from 'antd'
import { 
  setStudentList,
  setTotalStudents,
 } from '../../../store/models/studentslice.ts'

const StudentsList = () => {

 const dispatch = useDispatch()
 const [ loading , setLoading ] = useState(false)
 const { currentPage , pageSize }  = useSelector((state:RootState) => state.student)


 // 获取学生列表的数据
 const getStudentsList = async (params = {}) => {
  setLoading(true)
  try {
    const res = await StudentsListApi1({
      ...params,
      page: currentPage,
      pagesize: pageSize
    })

    if (res.data.code === 200) {
      console.log(res.data.data)
      console.log(res.data.data.list)
      console.log(res.data.data.total)
      // 将学生信息存入 store 动态管理库
      dispatch(setStudentList(res.data.data.list))
      // 将学生总数存入 store 动态管理库
      dispatch(setTotalStudents(res.data.data.total))
    }
  } catch  {
       message.error('获取德玛西亚学生用户信息失败')
  } finally {
     setLoading(false)
  }
 }

  useEffect(() => {
    getStudentsList()
  },[currentPage,pageSize])


  return (
    <div>
     <Header />
     <Main
     getStudentsList = { getStudentsList }
      />
    </div>
  )
}

export default StudentsList