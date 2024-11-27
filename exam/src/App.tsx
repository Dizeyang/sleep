import {
  useRoutes,
  useLocation
} from 'react-router-dom'
import router from './router'
import { useDispatch, useSelector } from 'react-redux'
import { useLayoutEffect } from 'react'
import { getUserInfo } from './store/models/user'
import type { RootState, AppDispatch } from './store'
import { Spin } from 'antd'

const App = () => {
  const location = useLocation()
  const routes = useRoutes(router)
  const loading = useSelector((state: RootState) => state.user.loading)
  const dispatch: AppDispatch = useDispatch()

  useLayoutEffect(() => {
    if (location.pathname !== '/login') {
      dispatch(getUserInfo())
    }
  }, [])

  if (loading) {
    return <div style={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', paddingTop: 150 }}>
      <Spin size="large" />
    </div>
  }

  return (
    <div className='app'>{routes}</div>
  )
}

export default App