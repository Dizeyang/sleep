import React from 'react'
import { Button, Form, Input, Select, Space } from 'antd'
import style from './Search.module.scss'
import type { UserListItem } from '../../../type'

interface Props {
  onSearch: (params: Partial<UserListItem>) => void // 有参数，没有返回值
}

const Search: React.FC<Props> = (props) => {

  const [form] = Form.useForm()

  return (
    <Form labelCol={{ span: 6 }} form={form}>
      <div className={style.row}>
        <Form.Item name="username" label="用户名">
          <Input />
        </Form.Item>
        <Form.Item name="status" label="账号状态">
          <Select
            options={[
              { label: '启用', value: 1 },
              { label: '禁用', value: 0 }
            ]}
          />
        </Form.Item>
        <Form.Item name="email" label="邮箱">
          <Input />
        </Form.Item>
      </div>
      <div className={style.row}>
        <Form.Item name="age" label="年龄">
          <Input />
        </Form.Item>
        <Form.Item name="sex" label="性别">
          <Input />
        </Form.Item>
        <Form.Item name="creator" label="创建人">
          <Input />
        </Form.Item>
      </div>
      <div className={style.row} style={{ justifyContent: 'space-between' }}>
        <Form.Item name="lastOnlineTime" label="登录时间">
          <Input />
        </Form.Item>
        <Space>
          <Button type='primary' onClick={() => {
            const params = form.getFieldsValue()
            props.onSearch({ ...params })
          }}>查询</Button>
          <Button onClick={() => {
            form.resetFields() // 重置表单
            props.onSearch({}) // 重置查询条件
          }}>重置</Button>
        </Space>
      </div>
    </Form>
  )
}

export default Search