import React, { useEffect, useState } from 'react'
import { userListApi, removeApi } from '../../services'
import type { UserListItem } from '../../type'
import { Table, Image, Space, Button, Popconfirm, message, PopconfirmProps } from 'antd'
import type { TableProps } from 'antd'
import Search from './components/Search'

const UserList = () => {
  const [dataSource, setDataSource] = useState<readonly DataSourceType[]>([]);

  const [loading, setLoading] = useState(false)
  const [query, setQuery] = useState({
    page: 1,
    pagesize: 5
  })
  const [total, setTotal] = useState(0)
  const [userList, setUserList] = useState<UserListItem[]>([])
  const [searchParams, setSearchParams] = useState({})

  const getList = async () => {
    setLoading(true)
    const res = await userListApi({ ...query, ...searchParams })
    setUserList(res.data.data.list)
    console.log(res.data.data.list)
    setTotal(res.data.data.total)
    setLoading(false)
  }

  useEffect(() => {
    getList()
  }, [query, searchParams])

  const confirm = async (record: UserListItem) => {
    try {
      const res = await removeApi(record._id);
      if (res.data.code === 200) {
        message.success('删除成功');
        getList();
      } else {
        message.error(res.data.msg || '删除失败');
      }
    } catch (error) {
      console.error('删除失败:', error);
      message.error('删除失败');
    }
  }
  
  const cancel: PopconfirmProps['onCancel'] = (e) => {
    console.log(e);
    message.error('Click on No');
  };

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
    },
    {
      title: '操作',
      key: 'actions',
      fixed: 'right',
      width: 200,
      align: 'center',
      render: (_, record) => {
        return <Space>
          <Button type="primary" size="small">分配角色</Button>
          <Button size="small">编辑</Button>
          <Popconfirm
            title="删除"
            description="你确定要删除这一项内容吗？"
            onConfirm={() => confirm(record)}
            onCancel={cancel}
            okText="是"
            cancelText="否"
          >
            <Button danger size="small">删除</Button>
          </Popconfirm>
        </Space>
      }
    }
  ]

  return (
    <div>
      <Search onSearch={params => {
        console.log(params)
        setSearchParams(params)
      }}/>
      <Table
        loading={loading}
        columns={columns}
        dataSource={userList}
        rowKey="_id"
        pagination={{
          total,
          showTotal: (total, [a, b]) => `共 ${total} 条数据 ${a} - ${b}`,
          showSizeChanger: true, // 是否可以改变 pageSize
          pageSizeOptions: [5, 10, 20, 30],
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