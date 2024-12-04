import React, { useState,useEffect } from 'react';
import { Divider, Radio, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import style from './Configure.module.scss'
import type { examItem } from '../../../../../type'
import {examApi} from '../../../../../services'
import { useDispatch, useSelector } from 'react-redux';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const formatDate = (timestamp) => {
    const date = new Date(timestamp); // 创建 Date 对象
    const year = date.getFullYear(); // 获取年份
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 获取月份，+1 因为月份是从0开始的
    const day = date.getDate().toString().padStart(2, '0'); // 获取日期
    const hour = date.getHours().toString().padStart(2, '0'); // 获取小时
    const minute = date.getMinutes().toString().padStart(2, '0'); // 获取分钟
    const second = date.getSeconds().toString().padStart(2, '0'); // 获取秒
  
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`; // 返回格式化的日期字符串
  };

const columns: TableColumnsType<examItem> = [
  {
    title: '试卷名称',
    dataIndex: 'name',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: '科目分类',
    dataIndex: 'classify',
  },
  {
    title: '试卷创建人',
    dataIndex: 'creator',
  },
  {
    title: '试卷创建时间',
    dataIndex: 'createTime',
    render: (text) => formatDate(text),
  },
];




const Configure: React.FC = () => {
  const query = useSelector((state) => state.query.query);

  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('radio');
  const [dataSource, setDataSource] = useState<readonly examItem[]>([]);
//   const query = useSelector((state) => state.query.query);
  const [selectedRowKey, setSelectedRowKey] = useState<React.Key | null>(null); // 用于跟踪单选行的key
  // const query = {
  //   page: 1,
  //   pagesize: 5
  // }

  const getExamApi = async () => {
    const res = await examApi(query)
    setDataSource(res?.data.data.list)
  }
  useEffect(() => {
    getExamApi()
  }, [query])

 
// rowSelection object indicates the need for row selection
const rowSelection: TableProps<examItem>['rowSelection'] = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: examItem[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: examItem) => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
    name: record.name,
  }),
};


  return (
    <div className={style.box}>
      <Radio.Group onChange={(e) => setSelectionType(e.target.value)} value={selectionType}>
        <Radio value="checkbox">Checkbox</Radio>
        <Radio value="radio">radio</Radio>
      </Radio.Group>
      <Divider />
      <Table<examItem>
        className={`${style.table} custom-large-table`}
        rowSelection={{ type: selectionType, ...rowSelection }}
        columns={columns}
        dataSource={dataSource}
      />
    </div>
  );
};

export default Configure;