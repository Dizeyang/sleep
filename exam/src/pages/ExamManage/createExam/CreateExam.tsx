  import React, {useState, useEffect} from "react";
  import { useSelector,useDispatch } from 'react-redux'
  import Configure from './components/configure/Configure'
  import { useNavigate } from 'react-router-dom';
  import { setQuery } from '../../../store/slices/QuerySlice';
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
  import { Button, message,DatePicker,Form } from 'antd';
  import type { GetProps } from 'antd';
  import dayjs from 'dayjs';
  import customParseFormat from 'dayjs/plugin/customParseFormat';
  // 考试科目
  import {classifyApi} from '../../../services'
  import type { classifyItem } from '../../../type'
  // 考试班级
  import {studentGroupApi} from '../../../services'
  import type { studentGroupItem } from '../../../type'  
  // 用户列表
  import {userListApi} from '../../../services'
  import type { UserListItem } from '../../../type'


  const { RangePicker } = DatePicker;
  dayjs.extend(customParseFormat);
  type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

  const range = (start: number, end: number) => {
    const result = [];
    for (let i = start; i < end; i++) {
      result.push(i);
    }
    return result;
  };
  


  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
  };
  
  
  const disabledRangeTime: RangePickerProps['disabledTime'] = (_, type) => {
    if (type === 'start') {
      return {
        disabledHours: () => range(0, 60).splice(4, 20),
        disabledMinutes: () => range(30, 60),
        disabledSeconds: () => [55, 56],
      };
    }
    return {
      disabledHours: () => range(0, 60).splice(20, 4),
      disabledMinutes: () => range(0, 31),
      disabledSeconds: () => [55, 56],
    };
  };


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
      const [userList, setUserList] = useState<UserListItem[]>([])
      const [total, setTotal] = useState(5)
    
      // 科目类型
      const getClassifyList = async () => {
          const res = await classifyApi(query);
          const options = res?.data.data.list.map(item => ({
            label: item.name, // 下拉列表显示的文本
            value: item.name, // 下拉列表的值
            key: item._id, // 下拉列表的唯一键值
          }));
          setClassifyList(options)
          console.log(res?.data.data.list)
      }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
      useEffect(() => {
        getClassifyList()
      }, [query])

      // 班级列表
      const getStudentGroupList = async () => {
          const res = await studentGroupApi();
          const options = res?.data.data.list.map(item => ({
          label: item.name, // 下拉列表显示的文本
          value: item.name, // 下拉列表的值
          key: item._id, // 下拉列表的唯一键值
          }));
          setGradeOptions(options); 
          console.log(res?.data.data.list)
      }
      useEffect(() => {
          getStudentGroupList()
      }, [query])

      const navigates = () => {
          setTimeout(() => {
            navigate('/exam/record')
          }, 2000);
          
      }

      const getUserList = async () => {
          const res = await userListApi();
          setTotal(res?.data.data.total)
          const options = res?.data.data.list.map(item => ({
          label: item.username, // 下拉列表显示的文本
          value: item.username, // 下拉列表的值
          key: item._id, // 下拉列表的唯一键值
          }));
          setUserList(options);
          console.log(res?.data.data.list)
      };
      useEffect(() => {
          getUserList();
      }, []);
      const dispatch = useDispatch();

     
      const formatRangePickerValue = (value) => {
        if (!value || value.length !== 2) return '';
        const [start, end] = value;
        return `${dayjs(start).format('YYYY-MM-DD HH:mm:ss')} - ${dayjs(end).format('YYYY-MM-DD HH:mm:ss')}`;
      };
      
      const formatDateTime = (date) => {
        return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
      };

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
            onFinish={async ({ name ,dateTime, classify, examiner }) => {
              // const formattedDateTime = formatRangePickerValue(dateTime);
              const [startTime, endTime] = dateTime;
              const formattredStartTime = formatDateTime([startTime]);
              const formattredEndTime = formatDateTime([endTime]);
              console.log({ name, startTime: formattredStartTime,endTime: formattredEndTime, classify, examiner });
              setFormData({ name,dateTime, classify, examiner })
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
            
            <Form.Item
              name="dateTime"
              label="考试时间"
              rules={[{ required: true }]}
            >
              <RangePicker
                placeholder={['开始时间', '结束时间']}
                disabledDate={disabledDate}
                disabledTime={disabledRangeTime}
                showTime={{
                  hideDisabledOptions: true,
                //   defaultValue: [dayjs('00:00:00', 'HH:mm:ss'), dayjs('11:59:59', 'HH:mm:ss')],
                }}
                format="YYYY-MM-DD HH:mm:ss"
              />
            </Form.Item>
            <ProFormSelect
                  name="classify"
                  label="科目分类"
                  rules={[{ required: true }]}
                  options={classifyList}
            />
            <ProFormSelect
            name="examiner"
            label="监考人"
            rules={[{ required: true }]}
            options={userList}
            total={total}
            pagination={{
              total: total,
              current: query.page,
              pageSize: query.pagesize,
              onChange: (page: number, pagesize: number) => {
              dispatch(setQuery({ ...query, page, pagesize }));; // 使用dispatch分发setQuery action
          }
            }}
            />
            <ProFormSelect
            name="examgroup"
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