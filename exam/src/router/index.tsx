import Notfound from '../pages/404/404'
import Login from '../pages/login/Login'
import Home from '../pages/home/Home'
import UserList from '../pages/userList/UserList'
import Exams from '../pages/exams/Exams'
import TestBank from '../pages/test/TestBank'
import CreateItem from '../pages/test/createItem'
import LayoutPage from '../layout/Layout'


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
    path: '/question/item-bank',
    element: (
      <LayoutPage>
        <TestBank />
      </LayoutPage>
    )
  },
  {
    path: '/question/create-item',
    element: (
      <LayoutPage>
        <CreateItem />
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
  }
]