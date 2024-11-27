import React from 'react'
import { Button, Result } from 'antd'
import {
  Link
} from 'react-router-dom'

const Notfound = () => {
  return (
    <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Link to="/"><Button type="primary">去首页</Button></Link>}
      />
  )
}

export default Notfound