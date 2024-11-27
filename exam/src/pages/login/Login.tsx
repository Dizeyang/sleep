import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormText,
} from '@ant-design/pro-components';
import { Input, Form, theme, message } from 'antd';
import { type CSSProperties, useEffect, useState } from 'react';
import { getCaptcha, loginApi } from '../../services'
import type { LoginParams } from '../../type' 
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUserInfo } from '../../store/models/user'
import type { AppDispatch } from '../../store'

const codeStyle: CSSProperties = {
  display: 'flex'
}
const codeImgStyle: CSSProperties = {
  width: 100,
  flexShrink: 0,
  background: '#fff',
  marginLeft: 15,
  borderRadius: 10
}


const Page = () => {
  const dispatch: AppDispatch = useDispatch()
  const [codeImg, setCodeImg] = useState('')
  const { token } = theme.useToken(); // 获取主题配置的 token 变量
  const navigate = useNavigate()

  const onFinish = async (values: LoginParams) => {
    const res = await loginApi(values)
    console.log(res.data)
    if (res.data.code === 200) {
      message.success('登录成功')
      localStorage.setItem('token', res.data.data.token)
      dispatch(getUserInfo())
      navigate('/')
    } else if (res.data.code === 1005) {
      message.error('验证码错误')
      refreshCode()
    } else {
      message.error(res.data.msg)
    }
  }

  const refreshCode = async () => {
    const res = await getCaptcha()
    setCodeImg(res.data.data.code)
  }

  useEffect(() => {
    refreshCode()
  }, [])



  return (
    <div
      style={{
        backgroundColor: 'white',
        height: '100vh',
      }}
    >
      <LoginFormPage
        backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
        logo="https://github.githubassets.com/favicons/favicon.png"
        backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        title="Github"
        containerStyle={{
          backgroundColor: 'rgba(0, 0, 0,0.65)',
          backdropFilter: 'blur(4px)',
        }}
        subTitle="全球最大的代码托管平台"
        onFinish={onFinish}
      >
        <ProFormText
          name="username"
          fieldProps={{
            size: 'large',
            prefix: (
              <UserOutlined
                style={{
                  color: token.colorText,
                }}
                className={'prefixIcon'}
              />
            ),
          }}
          placeholder={'用户名: admin or user'}
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />
        <ProFormText.Password
          name="password"
          fieldProps={{
            size: 'large',
            prefix: (
              <LockOutlined
                style={{
                  color: token.colorText,
                }}
                className={'prefixIcon'}
              />
            ),
          }}
          placeholder={'密码: ant.design'}
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
        <Form.Item name="code" rules={[
            {
              required: true,
              message: '请输入验证码！',
            },
          ]}
        >
          <div style={codeStyle}>
            <Input size="large" placeholder="输入验证码" />
            <img onClick={refreshCode} style={codeImgStyle} src={codeImg} alt="" />
          </div>
        </Form.Item> 
      </LoginFormPage>
    </div>
  );
};

const Login = () => {
  return (
    <ProConfigProvider dark>
      <Page />
    </ProConfigProvider>
  );
}
export default Login