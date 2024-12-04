import React, {useEffect, useState} from 'react'
import ExamRecord from './components/ExamRecord'
import { useDispatch, useSelector } from 'react-redux'
import { setQuery } from '../../../store/slices/QuerySlice';
import ExamAnalysis from './components/examAnalysis/ExamAnalysis'
import style from './ExamRecords.module.scss'
import {
    ProFormDatePicker,
    ProFormText,
    QueryFilter,
    ProFormSelect,
  } from '@ant-design/pro-components';
// 考试记录
import {examinationListApi} from '../../../services'
import type { examinationItem } from '../../../type'  
// 考试班级
import {studentGroupApi} from '../../../services'
import type { studentGroupItem } from '../../../type'   
// 考试科目
import {classifyApi} from '../../../services'
import type { classifyItem } from '../../../type'


const ExamRecords = () => {
  const dispatch = useDispatch(); // 获取dispatch函数
  const query = useSelector((state) => state.query?.query); // 使用useSelector获取query状态

  const [isAnalysisOpen, setIsAnalysisOpen] = useState(true);
  const handleAnalysisBack = () => {
    if (isAnalysisOpen) {
      setIsAnalysisOpen(false);
    }else{
      setIsAnalysisOpen(true)
    }

    console.log(11);
    
  }; 

  // 查询
  const handleSearch = (params) => {

    console.log('Updated Query:', params);
    // console.log("handleSearch triggered with values:", value);
    // 使用dispatch分发action来更新query状态
    dispatch(setQuery({ ...query, ...params, page: 1 })); // 使用setQuery action creator
  };

    const [loading, setLoading] = useState(false)
    // const [query, setQuery] = useState({
    //   page: 1,
    //   pagesize: 10,
    // })
    const [total, setTotal] = useState(0)
    // 班级列表
    const [studentGroupList, setstudentGroupList] = useState<studentGroupItem[]>([])
    const [gradeOptions, setGradeOptions] = useState<studentGroupItem[]>([]);
    // 考试列表
    const [examinationList, setExaminationList] = useState<examinationItem[]>([])
    // 科目类型
    const [classifyList, setClassifyList] = useState<classifyItem[]>([])

    // 考试列表
    const getexaminationList = async () => {
      // console.log('API Request with query:', query);
      setLoading(true)
      const res = await examinationListApi(query)
      // setExaminationList(res?.data.data.list)
      // setTotal(res?.data.data.total)
      // setQuery({ page: 1, pagesize: 90 })
      // dispatch(setExaminationList(res?.data.data.list));
      // dispatch(setTotal(res?.data.data.total));
      setLoading(false)
        
    }
    useEffect(() => {
      getexaminationList()
      console.log('Query Changed:', query); 
    }, [query])
    
    // 班级列表
    const getStudentGroupList = async () => {
      setLoading(true);
      const res = await studentGroupApi(query);
      const options = res?.data.data.list.map(item => ({
        label: item.name, // 下拉列表显示的文本
        value: item.name, // 下拉列表的值
        key: item._id, // 下拉列表的唯一键值
      }));
      setLoading(true)
      setstudentGroupList(res?.data.data.list)
      setTotal(res?.data.data.total)
      // setQuery({ page: 1, pagesize: 20 })
      setGradeOptions(options); // 设置班级选择的选项
      setLoading(false)
    }
    useEffect(() => {
      getStudentGroupList()
    }, [query])

    // 科目类型
    const getClassifyList = async () => {
      setLoading(true);
      const res = await classifyApi(query);
      const options = res?.data.data.list.map(item => ({
        label: item.name, // 下拉列表显示的文本
        value: item._id, // 下拉列表的值
        key: item._id, // 下拉列表的唯一键值
      }));
      setClassifyList(options)
      setLoading(true)
      setTotal(res?.data.data.total)
      // setQuery({ page: 1, pagesize: 20 })
      setLoading(false)
    }
    useEffect(() => {
      getClassifyList()
    }, [query])


    return (
      <div>
        {isAnalysisOpen && (
          <div className={style.QueryFilter}>
            <QueryFilter
              defaultCollapsed
              split
              span={6}
              onFinish={handleSearch}
            >
              <ProFormText name="name" label="考试名称" />
              <ProFormSelect
                name="classify"
                label="科目分类"
                options={classifyList}
              />
              <ProFormText name="creator" label="创建者" />
              <ProFormDatePicker name="createTime" label="创建时间" />
              <ProFormText name="status" label="状态" />
              <ProFormText name="examiner" label="监考人" />
              <ProFormSelect
                name="name"
                label="班级选择"
                options={gradeOptions}
              />
              <ProFormDatePicker name="startTime" label="考试时间" />
            </QueryFilter>
            <ExamRecord handleAnalysisBack={handleAnalysisBack}/>
          </div>
        )}
        {!isAnalysisOpen && <ExamAnalysis onBack={handleAnalysisBack} />}
      </div>
    );
}

export default ExamRecords
