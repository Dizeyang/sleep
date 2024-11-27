import React from 'react';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Avatar } from 'antd'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import type { MenuItem } from '../type'
import type { RootState } from '../store'

const { Header, Content, Sider } = Layout;

const LayoutPage: React.FC<{ children: React.ReactNode }> = (props) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const userInfo = useSelector((state: RootState) => state.user.userInfo)
  const menuList = useSelector((state: RootState) => state.user.menuList)

  const format = (list: MenuItem[]): MenuProps['items']  => {
    if (!list || list.length === 0) return []
    return list.map((item: MenuItem) => {
      const other = item.children ? { children: format(item.children)} : {}
      return {
        key: item.path,
        label: item.children ? item.name : <Link to={item.path}>{item.name}</Link>,
        ...other
      }
    })
  }
  const baseItem: MenuProps['items']  = [{ label: <Link to="/">首页</Link>, key: '/' }]

  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Avatar src={userInfo?.avator} />
        <p style={{ color: '#fff' }}>{userInfo?.username}</p>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={(baseItem.concat(format(menuList)))}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb
            items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
            style={{ margin: '16px 0' }}
          />
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;