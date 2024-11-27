import Notfound from '../pages/404/404'
import Login from '../pages/login/Login'
import Home from '../pages/home/Home'
import UserList from '../pages/userList/UserList'
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
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <Notfound />
  }
]