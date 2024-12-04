import React, { useEffect, useState } from 'react';
import { Button, Input, Form, Select, Table, Space,Drawer } from 'antd';
import type { TableProps } from 'antd';
import style from './TestBank.module.scss';
import { testsApi } from '../../services';

const { Search } = Input;

interface DataType {
  question: string;
  classify: string;
  type: string;
  createTime: number;
  action: string[];
  key?: string; // Add key property to DataType
  answer: string;
  options: string[];
}


const TestBank: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [detailData, setDetailData] = useState<DataType | null>(null);
  const showDrawer = (record: DataType) => {
    console.log(record);
    setDetailData(record);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const [data, setData] = useState<DataType[]>([]);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 7 }); // 分页状态
  
  // const tests = async (page: number, pageSize: number): Promise<void> => {
  //   const res = await testsApi({
     
  //   });
  //   console.log(res.data.data);
  //   const dataWithKeys = res.data.data.list.map((item: DataType, index: number) => ({
  //     ...item,
  //     key: `${item.testlist}-${index}`
  //   }));
  //   setData(dataWithKeys);
  // };

  // useEffect(() => {
  //   tests(pagination.current, pagination.pageSize);
  // }, [pagination]); // 依赖项数组中添加 pagination

  const handleTableChange = (newPagination: any) => {
    setPagination(newPagination);
    tests(newPagination.current, newPagination.pageSize);
  };

  const columns: TableProps<DataType>['columns'] = [
    {
      title: '试题类型',
      dataIndex: 'question',
      width:400,
    },
    {
      title: '分类',
      dataIndex: 'classify',
      width:150,
    },
    {
      title: '题型',
      width:150,
      render: (_, record) => {
        if (record.type === '1') {
          return '单选题';
        } else if (record.type === '4') {
          return '多选题';
        }else if (record.type === '2') {
          return '填空题';}
        else {
          return '其他';
        }
       
      },
    },
    {
      title: '创建时间',
      width:250,
      render: (_, record) => {
       
        return `2024-12-04 11:38:00`;
      },
    },
    {
      title: '操作',
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary">编辑</Button>
          <Button type="primary" danger>删除</Button>
          <Button type="link" onClick={() => showDrawer(record)}>试题详情</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Button type="primary">
        添加试题
      </Button>
      <Form
        name="basic"
        layout="inline"
        className={style.card}
      >
        <Form.Item
          label="试题搜索："
          name="search"
        >
          <Search
            placeholder="搜搜试试吧"
            allowClear
            enterButton="搜索"
          />
        </Form.Item>
        <Form.Item
          label="试题分类"
          name="testType"
        >
          <Select
            style={{ width: 120 }}
            options={[ { value: '1', label: '单选题' },{ value:'2',label:'填空题'},{ value: '4', label: '多选题' },]} // 假设添加了更多选项
          />
        </Form.Item>
        <Form.Item
          label="题目类型"
          name="questionType"
        >
          <Select
            style={{ width: 120 }}
            options={[{ value: 'yw', label: '语文' }, { value: 'math', label: '数学' }]} // 假设添加了更多选项
          />
        </Form.Item>
      </Form>
    
      <Table<DataType>
        columns={columns}
        dataSource={data}
        rowKey="key"
        pagination={pagination} // 添加分页配置
        onChange={handleTableChange} // 处理分页变化
      />
        <Drawer title="试题详情" onClose={onClose} open={open}>
        {detailData && (
          <>
            <h2>题型：{detailData.type === '1' ? '单选题' : detailData.type === '4' ? '多选题' : detailData.type === '2' ? '填空题' : '其他'}</h2>
            <h2>{detailData.question} </h2>
            {detailData.type === '1' && (
              <div>
                {detailData.options.map((value, index) => (
                  <p key={index}>{`${String.fromCharCode(65 + index)}: ${value}`}</p>
                ))}
              </div>
            )}
            <p>答案：{detailData.answer}</p>
          </>
        )}
      </Drawer>
    </>
  );
};

export default TestBank;