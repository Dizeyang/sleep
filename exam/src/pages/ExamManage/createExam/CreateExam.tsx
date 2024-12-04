  import React, {useState, useEffect} from "react";
  import { useSelector } from 'react-redux'
  import Configure from './components/configure/Configure'
  import { useNavigate } from 'react-router-dom';
  // 发布考试
  import PublishExam from './components/publishExam/PublishExam'
  import {
      ProCard,
      ProForm,
      ProFormCheckbox,
      ProFormDatePicker,
      ProFormDateRangePicker,
      ProFormSelect,
      ProFormText,
      StepsForm,
  } from '@ant-design/pro-components';
  import { Button, message } from 'antd';
  // 考试科目
  import {classifyApi} from '../../../services'
  import type { classifyItem } from '../../../type'
  // 考试班级
  import {studentGroupApi} from '../../../services'
  import type { studentGroupItem } from '../../../type'  
    
    const waitTime = (time: number = 100) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, time);
      });
    };




  const CreateExam = () => {
      const navigate = useNavigate();
      const [formData, setFormData] = useState({});
      const [classifyList, setClassifyList] = useState<classifyItem[]>([])
      const query = useSelector((state) => state.query?.query);
      const [gradeOptions, setGradeOptions] = useState<studentGroupItem[]>([]);
    
      // 科目类型
      const getClassifyList = async () => {
          const res = await classifyApi(query);
          const options = res?.data.data.list.map(item => ({
            label: item.name, // 下拉列表显示的文本
            value: item.name, // 下拉列表的值
            key: item._id, // 下拉列表的唯一键值
          }));
          setClassifyList(options)
      }
      useEffect(() => {
        getClassifyList()
      }, [query])

      // 班级列表
      const getStudentGroupList = async () => {
          const res = await studentGroupApi(query);
          const options = res?.data.data.list.map(item => ({
          label: item.name, // 下拉列表显示的文本
          value: item.name, // 下拉列表的值
          key: item._id, // 下拉列表的唯一键值
          }));
          setGradeOptions(options); 
      }
      useEffect(() => {
          getStudentGroupList()
      }, [query])

      const navigates = () => {
          setTimeout(() => {
            navigate('/exam/record')
          }, 2000);
          
      }

    return (
      <ProCard>
        <StepsForm<{
          name: string;
        }>
          onFinish={async (values) => {
            console.log(values);
            await waitTime(1000);
            message.success('提交成功');
          }}
          formProps={{
            validateMessages: {
              required: '此项为必填项',
            },
          }}
          submitter={{
            render: (props) => {
              if (props.step === 0) {
                return (
                  <Button type="primary" onClick={() => props.onSubmit?.()}>
                    去第二步 {'>'}
                  </Button>
                );
              }

              if (props.step === 1) {
                return [
                  <Button key="pre" onClick={() => props.onPre?.()}>
                    返回第一步
                  </Button>,
                  <Button
                    type="primary"
                    key="goToTree"
                    onClick={() => props.onSubmit?.()}
                  >
                    去第三步 {'>'}
                  </Button>,
                ];
              }

              return [
                <Button key="gotoTwo" onClick={() => props.onPre?.()}>
                  {'<'} 返回第二步
                </Button>,
                <Button
                  type="primary"
                  key="goToTree"
                  onClick={() => {
                    props.onSubmit?.()
                    navigates()
                  }}
                    
                >
                  提交 √
                </Button>,
              ];
            },
          }}
        >
          <StepsForm.StepForm<{
            name: string;
            dateTime: [Date, Date]; // 假设dateTime是一个日期范围选择器
            classify: string;
            examiner: string;
          }>
            name="base"
            title="考试基本信息"
            onFinish={async ({ name, dateTime, classify, examiner }) => {
              console.log({ name, dateTime, classify, examiner });
              setFormData({ name, dateTime, classify, examiner })
              await waitTime(2000);
              return true;
            }}
          >
          {/* 信息 */}
            <ProFormText
              name="name"
              label="考试名称"
              width="md"
              tooltip="最长为 24 位，用于标定的唯一 id"
              placeholder="请输入名称"
              rules={[{ required: true }]}
            />
            <ProFormDateRangePicker
            name="dateTime"
            label="考试时间" 
            rules={[{ required: true }]}
            />
            <ProFormSelect
                  name="classify"
                  label="科目分类"
                  rules={[{ required: true }]}
                  options={classifyList}
            />
            <ProFormText
            name="examiner"
            label="监考人"
            rules={[{ required: true }]}
            />
            <ProFormSelect
            name="name"
            label="考试班级"
            rules={[{ required: true }]}
            options={gradeOptions}
            />
            
          </StepsForm.StepForm>
          <StepsForm.StepForm<{
            checkbox: string;
          }>
            name="checkbox"
            title="配置试卷"
          >
          <Configure />
          </StepsForm.StepForm>
          <StepsForm.StepForm name="time" title="发布考试">
            <PublishExam formData={formData}/>
          </StepsForm.StepForm>
        </StepsForm>
      </ProCard>
    );
  };

  export default CreateExam;