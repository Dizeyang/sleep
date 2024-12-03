import React from 'react'
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store';
import { setCurrentPage, setPageSize } from '../../../../store/models/groupslice';
import { setStudentList } from '../../../../store/models/studentslice';
import { Params } from 'react-router-dom';

interface MainProps {
  getStudentsList : ( Params? : any) => void
}



export const waitTimePromise = async (time: number = 20) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};


export const waitTime = async (time: number = 20) => {
    await waitTimePromise(time);
  };
  


  const columns  = [
    {
      title: '排序',
      dataIndex: 'id',
      valueType: 'index',
      width: 50,
    },
    {
      title: '姓名',
      dataIndex: 'username',
    },
    {
      title: '性别',
      dataIndex: 'sex',
      render: ( text ) => {
        if ( text === '男') {
          return '男'
        } else if ( text === '女' ) {
          return '女'
        }
        return text
      }
    },
    {
      title: '年龄',
      dataIndex: 'age',
    },
    {
      title: '班级',
      dataIndex: 'className',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'date',
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
      ],
    },
  ];



const Main: React.FC<MainProps> = ({getStudentsList}) => {

 const dispatch = useDispatch();
 const actionRef = useRef<ActionType>();
 const { studentList, totalStudents, currentPage, pageSize, editingStudent }  = useSelector((state:RootState) => state.student)
  return (
    <div>
    <ProTable
      columns={columns}
      dataSource={ studentList }
      cardBordered
      editable={{
        type: 'multiple',
      }}
      rowKey="_id"
      search={false}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      pagination={{
        current: currentPage,
        total: totalStudents,
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '50', '100'],
        showTotal: (total, range) => `第${range[0]}-${range[1]} 条 / 一共有 ${total} 条哦宝贝`,
        onChange: (page, size) => {
          const newPage = Math.max(1, Math.min(page, Math.ceil(totalStudents / size)))
          dispatch(setCurrentPage(newPage))
          dispatch(setPageSize(size))
          getStudentsList({ page: newPage, pageSize: size})
        },
        disabled: totalStudents === 0,
        pageSize: pageSize > totalStudents ? totalStudents : pageSize,
      }}
      dateFormatter="string"
      headerTitle="德玛西亚万岁😈"
      toolBarRender={() => [
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            actionRef.current?.reload();
          }}
          type="primary"
          style={{backgroundColor:'pink'}}
        >
          添加学生
        </Button>
      ]}
    />
    </div>
  )
}

export default Main