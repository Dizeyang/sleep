import React, { useEffect, useState } from 'react'
import style from './ExamRecord.module.scss'
import { Table, Button, Drawer, Radio, Space } from 'antd'
import type { TableProps,  DrawerProps, RadioChangeEvent } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import {examinationListApi} from '../../../../services'
import type { examinationItem } from '../../../../type'
import { setQuery } from '../../../../store/slices/QuerySlice'
import { setExaminationList } from '../../../../store/ExamManages/ExamManageSlice'
import { removeExamination } from '../../../../store/ExamManages/ExamManageSlice';
import { fetchExaminationList,deleteExaminations } from '../../../../store/ExamManages/ExamManageSlice';
import { RootState, AppDispatch } from '../../../../store'; 

interface ExamRecordProps {
  handleAnalysisBack: () => void;
}

const UserList: React.FC<ExamRecordProps> = ({ handleAnalysisBack }) => {
    
  const examinationList = useSelector((state: RootState) => state.examination.examinationList);

  const handleDelete = (id) => {
    dispatch(deleteExaminations(id)); // 调用异步 Thunk
  };

    const dispatch = useDispatch();
    const query = useSelector((state: RootState) => state.query.query);
    // const [dataSource, setDataSource] = useState<readonly examinationItem[]>([]);
    // const [loading, setLoading] = useState(false)
    // const [query, setQuery] = useState({
    //   page: 1,
    //   pagesize: 5
    // })
    // const [total, setTotal] = useState(0)
    // const [examinationList, setExaminationList] = useState<examinationItem[]>([])
    
    // const getexaminationList = async () => {
    //   setLoading(true)
    //   const res = await examinationListApi(query)
    //   // setExaminationList(res?.data.data.list)
    //   dispatch(setExaminationList(res?.data.data.list));
      // dispatch(setDataSource(examinationList))
    //   // dispatch(setTotal(res?.data.data.total))
    //   setLoading(false)
    //   console.log(res)
    // }
    // useEffect(() => {
    //   getexaminationList()
    // }, [query])

    // useEffect(() => {
    //   if (!loading) {
    //     dispatch(fetchExaminationList(query)); // 只有在没有加载中时才触发数据请求
    //   }
    // }, [dispatch, query, loading]); 

    

    // useEffect(() => {
    //   dispatch(fetchExaminationList(query));
    //   console.log('查询参数:', query);
    // }, [dispatch, query]);

    // useEffect(() => {
    //   console.log(examinationList); // 这里将在状态更新后打印新的考试列表
    // }, [examinationList]);
    useEffect(() => {
      // 假设query是你想要传递给API的查询参数
      const query = {}; 
      dispatch(fetchExaminationList(query));
    }, [dispatch]);


    const [open, setOpen] = useState(false);

    const showDrawer = () => {
      setOpen(true);
    };
  
    const onClose = () => {
      setOpen(false);
    };


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

  const columns: TableProps<examinationItem>['columns'] = [
    
    {
      title: '考试名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '科目分类',
      dataIndex: 'classify',
      key: 'classify'
    },
    {
      title: '创建者',
      dataIndex: 'creator',
      key: 'creator'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (text) => formatDate(text),
    },
    {
      title: '状态',
      key: 'status',
      render: (text, record) => {
        // 根据 record.status 的值返回不同的字符串
        if (record.status === 1) {
          return '已结束';
        } else if (record.status === 2) {
          return '未开始';
        } else {
          // 如果还有其他状态，可以在这里继续添加条件
          return '未知状态';
        }
      }
    },
    {
      title: '监考人',
      dataIndex: 'examiner',
      key: 'examiner'
    },
    {
      title: '考试班级',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      key: 'startTime',
      render: (text) => formatDate(text),
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      key: 'endTime',
      render: (text) => formatDate(text),
    },
    {
        title: '设置',
        // valueType: 'option',
        width: 140,
        render: (text, record) => [
            <a  style={{fontSize:'12px',background:'#e6f7ff',color:'#096dd9',padding:'5px',margin:'2px'}}
                key="editable"
                type="primary"
                onClick={() => {
                    showDrawer();
                    console.log('编辑', record);
                }}
            >
                预览试卷
            </a>,
            
            <a  
                className={record.status === 1? style.delete : ''}
                style={{ fontSize: '12px', background: record.status === 1? '#F5F5F5' : '#e6f7ff' , color: record.status === 1 ? '#ccc' : '#096dd9', padding: '5px', margin: '5px' }}
                key="delete"
                aria-disabled={record.status === 1 ? 'true' : 'false'}
                type="primary"                                                      
                onMouseDown={record.status === 1 ? (event) => event.preventDefault() : () => {}} // 阻止默认行为
                // onClick={record.status === 1 ? () => {} : () => setDataSource(dataSource.filter((item) => item._id !== record._id))}
                // onClick={record.status === 1 ? (event) => event.preventDefault() : () => {
                //   dispatch(removeExamination({ id: record._id }));
                // }}
                onClick={record.status === 1 ? (event) => event.preventDefault() : () => handleDelete(record._id)}
           >
                删除
            </a>,
        ],
    },
    {
        title: '操作',
        // valueType: 'option',
        width: 90,
        render: (text, record) => [
            <a  style={{fontSize:'12px',
                        background:'#e6f7ff',
                        color:'#096dd9',
                        padding:'5px'}}
                key="editable"
                onClick={() => {
                    handleAnalysisBack();
                    console.log('成绩分析', record);
                }}
            >
                {record.status === 2? '编辑试卷' : '成绩分析'}
            </a>
        ],
    },
  ]

  return (
    <div>
      <Table
      style={{ overflow: 'auto'}}
      className={style.table}
      components={{
        table: (props) => <table style={{ fontSize: '12px' }} {...props} />,
        // 你可以继续自定义其他组件，如 headerWrapper, bodyWrapper 等
      }}
        // loading={loading}
        columns={columns}
        dataSource={examinationList}
        rowKey="_id"
        pagination={{
          // total,
          current: query.page,
          pageSize: query.pagesize,
          onChange: (page: number, pagesize: number) => {
            dispatch(setQuery({ ...query, page, pagesize }));; // 使用dispatch分发setQuery action
          }
        }}
      />
      <Drawer
      title="预览试卷"
      // placement={placement}
      width={600}
      extra={
        <Space>
          <Button onClick={onClose}>导出PDF</Button>
          <Button type="primary" onClick={onClose}>
            OK
          </Button>
        </Space>
      }
      onClose={onClose} open={open}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>,
    </div>
  )
}

export default UserList