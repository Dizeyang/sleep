import Notfound from '../pages/404/404'
import Login from '../pages/login/Login'
import Home from '../pages/home/Home'
import UserList from '../pages/userList/UserList'
import Exams from '../pages/exams/Exams'
import LayoutPage from '../layout/Layout'
import Permission from '../pages/permission/Permission'
import ExamRecords from '../pages/ExamManage/examRecords/ExamRecords'
import CreateExam from '../pages/ExamManage/createExam/CreateExam'

export default [
  {
    path: '/',
    element: (
      <LayoutPage>
        <Home />
      </LayoutPage>
    )
  },
  {
    path: '/exam/record',
    element: (
      <LayoutPage>
        <ExamRecords />
      </LayoutPage>
    )
  },
  {
    path: '/exam/create',
    element: (
      <LayoutPage>
        <CreateExam />
      </LayoutPage>
    )
  },
  {
    path: '/userManage/manage-page',
    element: (
      <LayoutPage>
        <UserList />
      </LayoutPage>
    )
  },
  {
    path: '/paper/paper-bank',
    element: (
      <LayoutPage>
        <Exams />
      </LayoutPage>
    )
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <Notfound />
  },
  {
    path: '/userManage/menuManage',
    element: (
      <LayoutPage>
        <Permission />
      </LayoutPage>
    )
  }
]