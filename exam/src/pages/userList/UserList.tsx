import React, { useEffect, useState } from 'react'
import { userListApi } from '../../services'
import type { UserListItem } from '../../type'
import { Table, Image } from 'antd'
import type { TableProps } from 'antd'

const UserList = () => {
  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState({
    page: 1,
    pagesize: 5
  })
  const [total, setTotal] = useState(0)
  const [userList, setUserList] = useState<UserListItem[]>([])

  const getList = async () => {
    setLoading(true)
    const res = await userListApi(query)
    setUserList(res.data.data.list)
    setTotal(res.data.data.total)
    setLoading(false)
  }

  useEffect(() => {
    getList()
  }, [query])

  const columns: TableProps<UserListItem>['columns'] = [
    
    {
      title: '头像',
      dataIndex: 'avator',
      key: 'avator',
      render: (_, record) => <Image src={record.avator} width={100} />
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: '密码',
      dataIndex: 'password',
      key: 'password'
    },
    {
      title: '用户状态',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: '性别',
      dataIndex: 'sex',
      key: 'sex'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age'
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: '最后登录时间',
      dataIndex: 'lastOnlineTime',
      key: 'lastOnlineTime'
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator'
    }
  ]

  return (
    <div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={userList}
        rowKey="_id"
        pagination={{
          total,
          current: query.page,
          pageSize: query.pagesize,
          onChange: (page: number, pagesize: number) => {
            setQuery({ page, pagesize })
          }
        }}
      />
    </div>
  )
}

export default UserList