import React, {useState, useEffect} from 'react'
import { examsApi } from '../../services'
import type { Exams, ExamsListItem } from '../../type'
import { Button, TableProps, Table, Space } from "antd"
import './Exams.scss'

const Exams = () => {

  const [examsList, setExamsList] = useState<Exams[]>([])
  const [total, setTotal] = useState(0)
  const [query, setQuery] = useState({
    page: 1,
    pagesize: 5
  })

  const getExamsList = async () => {
    // setLoading(true)
    const res = await examsApi()
    // console.log(res.data.data)
    setExamsList(res.data.data.list)
    setTotal(res.data.data.total)
    // setLoading(false)
  }

  useEffect(() => {
    getExamsList()
  }, [query])


  const columns: TableProps<ExamsListItem>['columns'] = [
    {
      title: '试卷名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      fixed: 'left',
      align: 'center'
    },
    {
      title: '科目类型',
      dataIndex: 'classify',
      key: 'classify',
      width: 200,
      align: 'center'
    },
    {
      title: '总分',
      dataIndex: '',
      key: '',
      width: 200,
      align: 'center'
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
      width: 200,
      align: 'center'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 200,
      align: 'center'
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
          <Button danger size="small">删除</Button>
        </Space>
      }
    }
  ]



  return (
    <div>
      <h2>Exams</h2>
      <div className="btn">
        <Button className='btn1' type='primary'>创建试卷</Button>
        <Button type='primary'>导出excel</Button>
      </div>
      {/* <ul>{examsList.map(exam => (<li key={exam._id}>{exam.name}</li>))}</ul> */}

      <Table align='center'
        // loading={loading}
        columns={columns}
        dataSource={examsList}
        rowKey="_id"
        scroll={{ x: 'max-content' }}
        pagination={{
          total,
          showTotal: (total, [a, b]) => `共 ${total} 条数据 ${a} - ${b}`,
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 15, 20],
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

export default Exams