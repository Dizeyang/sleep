import React from 'react'
import { permissionListApi } from '../../services/index'
import { useRequest } from 'ahooks'
import { Table, Tag } from 'antd'

const Permission = () => {

  const { data, loading, error } = useRequest(permissionListApi)
  console.log(data?.data.data.list)

  const columns = [
    {
      title: '菜单名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '菜单路径',
      dataIndex: 'path',
      key: 'path'
    },
    {
      title: '权限类型',
      dataIndex: 'isBtn',
      key: 'isBtn',
      render: (_, record) => record.isBtn ? <Tag color='blue'>按钮权限</Tag> : <Tag color='green'>页面权限</Tag>
    }
  ]

  return (
    <Table columns={columns} dataSource={data?.data.data.list} rowKey='_id'>

    </Table>
  )
}

export default Permission