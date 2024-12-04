import React, { useEffect, useState } from 'react'
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import style from './ExamRecord.module.scss'
import { Table, Button, Drawer, Radio, Space } from 'antd'
import type { TableProps,  DrawerProps, RadioChangeEvent } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import {examinationListApi} from '../../../../services'
import { removeExamApi } from '../../../../services'
import type { examinationItem,studentGroupItem } from '../../../../type'
import { setQuery } from '../../../../store/slices/QuerySlice'
// import { setExaminationList } from '../../../../store/ExamManages/ExamManageSlice'
// import { removeExamination } from '../../../../store/ExamManages/ExamManageSlice';
// import { fetchExaminationList,deleteExaminations } from '../../../../store/ExamManages/ExamManageSlice';
// import { RootState, AppDispatch } from '../../../../store'; 

interface ExamRecordProps {
  handleAnalysisBack: () => void;
  studentGroupList: any[]; // 定义gradeOptions的类型
}

const UserList: React.FC<ExamRecordProps> = ({ query,studentGroupList, handleAnalysisBack }) => {
    console.log(studentGroupList)
  // const examinationList = useSelector((state: RootState) => state.examination.examinationList);

  // const handleDelete = (id) => {
  //   dispatch(deleteExaminations(id)); // 调用异步 Thunk
  //   deleteExaminations(id)
  // };

  const dispatch = useDispatch();
  // const query = useSelector((state: RootState) => state.query.query);

  // useEffect(() => {
  //   // 假设query是你想要传递给API的查询参数
  //   const query = {}; 
  //   dispatch(fetchExaminationList(query));
  // }, [dispatch]);


    // const query = useSelector((state) => state.query?.query); // 使用useSelector获取query状态
    const [loading, setLoading] = useState(false)
    // 考试列表
    const [total, setTotal] = useState(0); // 用于分页的总条目数

    const [examinationList, setExaminationList] = useState<examinationItem[]>([])
    // 考试列表
    const getexaminationList = async () => {
      // console.log('API Request with query:', query);
      setLoading(true)
      const res = await examinationListApi(query)
      setExaminationList(res?.data.data.list)
      setTotal(res?.data.data.total);
      console.log(res?.data.data.list)
      // setTotal(res?.data.data.total)
      // setQuery({ page: 1, pagesize: 90 })
      // dispatch(setExaminationList(res?.data.data.list));
      // dispatch(setTotal(res?.data.data.total));
      setLoading(false)
        
    }
    useEffect(() => {
      getexaminationList()
      // console.log('Query Changed:', query); 
    }, [query])


// 删除
const deleteExaminations = async (id) => {
      // const response = await removeExamApi({id: _id});
      try {
        const response = await removeExamApi({ id });
        console.log(response);
        // 重新获取考试列表
        getexaminationList();
      } catch (error) {
        console.error('删除失败:', error);
      }
}

const getClassNameById = (_id) => {
  const grade = studentGroupList.find(option => option._id === _id);
  console.log(grade)
  return grade ? grade.name : '未知班级'; // 如果找不到班级，返回'未知班级'
};




    // 预览试卷抽屉
    const [open, setOpen] = useState(false);
    const [currentExam, setCurrentExam] = useState<examinationItem | null>(null);
    const optionsPrefix = ['A', 'B', 'C', 'D'];
    
    const showDrawer = (exam) => {
      setOpen(true);
      setCurrentExam(exam);
    };
  
    const onClose = () => {
      setOpen(false);
      setCurrentExam(null);
    };

  //  转换时间戳
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


      const exportPdf = () => {
        if (!currentExam) return;
    
        const content = document.querySelector(`.${style.currentExam}`);
        html2canvas(content).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF();
          pdf.addImage(imgData, 'PNG', 0, 0);
          pdf.save('examination.pdf');
        });
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
      // dataIndex: 'name',
      // key: 'name'
      key: 'examgroup', // 使用一个新的key来表示班级
      render: (text, record) =>{
        const className = record.group && record.group.length > 0 ? record.group[0] : '未知班级';
        return className; // 直接返回班级名称
      }  // 假设每个考试记录有一个group字段，里面包含班级ID
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
                    showDrawer(record);
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
                // onClick={record.status === 1 ? (event) => event.preventDefault() : () => handleDelete(record._id)}
                onClick={record.status === 1 ? (event) => event.preventDefault() : () => deleteExaminations(record._id)}
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
          total,
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
      // onRow={(record) => {
      //   return {
      //     onClick: () => {
      //       showDrawer(record);
      //     },
      //   };
      // }}
      extra={
        <Space>
          <Button onClick={exportPdf}>导出PDF</Button>
          <Button type="primary" onClick={onClose}>
            OK
          </Button>
        </Space>
      }
      onClose={onClose} open={open}>
        {/* {currentExam && ( */}
          <div className={style.currentExam}>
            <h2>科目：{currentExam?.classify}</h2>
            {['1', '2'].map((type) => {
              const questions = currentExam?.questionsList.filter(q => q.type === type);
              if (questions?.length === 0) return null;
              return (
                <div key={type}>
                  <h3>{type === '1' ? '单选题' : '多选题'}</h3>
                  {questions?.map((question, index) => (
                    <div className={style.questions} key={question._id}>
                      <h5>{index + 1}. {question?.question}</h5>
                      <ul>
                      {question?.options.map((option, idx) => (
                      <li key={idx}>{`${optionsPrefix[idx]}: ${option}`}</li>
                    ))}
                      </ul>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        
        
      </Drawer>,
    </div>
  )
}

export default UserList