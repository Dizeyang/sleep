import React, { useState, useEffect } from 'react';
import { ProFormText, QueryFilter, ProFormSelect } from '@ant-design/pro-components';
import { StudentsListApi1, UpdateStudentApi, DeleteStudentApi, CreateStudentApi } from '../../../services';
import { ProTable } from '@ant-design/pro-components';
import { Button, Modal, Form, Input, Select, Popconfirm, InputNumber, App } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  setStudentList,
  setTotalStudents,
  setCurrentPage,
  setPageSize,
  setEditingStudent,
  updateStudent,
  deleteStudent,
} from '../../../store/models/studentslice';
import { RootState } from '../../../store';
import { PlusOutlined } from '@ant-design/icons';

const StudentList: React.FC = () => {
  const dispatch = useDispatch();
  const { studentList, totalStudents, currentPage, pageSize, editingStudent } = useSelector((state: RootState) => state.student);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [createForm] = Form.useForm();
  const [classes, setClasses] = useState([]);

  const { message, modal } = App.useApp();

  const getData = async (params = {}) => {
    setLoading(true);
    try {
      const res = await StudentsListApi1({
        ...params,
        page: currentPage,
        pagesize: pageSize,
      });

      if (res.data.code === 200) {
        dispatch(setStudentList(res.data.data.list));
        dispatch(setTotalStudents(res.data.data.total));
      } else {
        message.error('获取学生数据失败');
      }
    } catch (error) {
      message.error('网络错误，获取学生数据失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [currentPage, pageSize]);

  const handleEdit = (record) => {
    dispatch(setEditingStudent(record));
    form.setFieldsValue({
      ...record
    });
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (!editingStudent) return;

      const res = await UpdateStudentApi(editingStudent._id, values);

      if (res.data.code === 200) {
        message.success('更新成功');
        dispatch(setEditingStudent(null));
        dispatch(updateStudent({ ...editingStudent, ...values }));  // 更新 Redux 状态
        getData();  // 刷新数据
      } else {
        message.error('更新失败');
      }
    } catch (error) {
      message.error('表单验证失败');
    }
  };

  const handleCreate = async () => {
    try {
      // 获取表单中的字段值
      const values = await createForm.validateFields();
      
      // 调用创建学生接口，确保字段名和接口要求一致
      const res = await CreateStudentApi({
        username: values.username,
        password: values.password,
        sex: values.sex || '',
        age: values.age,
        email: values.email || '',
        className: values.className || '',
        avatar: values.avatar || '',
        status: 1, 
      });
  
      // 请求结果处理
      if (res.data.code === 200) {
        message.success('创建成功');
        setCreateModalVisible(false);
        createForm.resetFields();
        getData();  // 刷新数据
      } else {
        message.error(res.data.msg || '创建失败');
      }
    } catch (error) {
      console.error('创建学生失败:', error);
      if (error.errorFields) {
        message.error('请填写必填字段');
      } else {
        message.error('创建失败');
      }
    }
  };
  

  const handleDelete = async (id: string) => {
    try {
      const res = await DeleteStudentApi(id);
      if (res.data.code === 200) {
        dispatch(deleteStudent(id));
        message.success('删除成功');
        if (studentList.length === 1 && currentPage > 1) {
          dispatch(setCurrentPage(currentPage - 1));
        } else {
          getData();
        }
      } else {
        message.error('删除失败');
      }
    } catch (error) {
      message.error('网络错误，删除失败');
    }
  };

  const handleCancel = () => {
    dispatch(setEditingStudent(null));
    form.resetFields();
  };

  const columns = [
    {
      title: '排序',
      dataIndex: 'id',
      valueType: 'index',
      width: 80,
    },
    {
      title: '姓名',
      dataIndex: 'username',
    },
    {
      title: '性别',
      dataIndex: 'sex',
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
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个学生吗？"
            onConfirm={() => handleDelete(record._id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger>
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  const onFinish = async (values) => {
    dispatch(setCurrentPage(1));
    getData(values);
  };

  const handleReset = () => {
    dispatch(setCurrentPage(1));
    getData();
  };

  const FormFields = ({ form, formId }) => (
    <Form form={form} layout="vertical">
      <Form.Item name="username" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}>
        <Input id={`username-${formId}`} />
      </Form.Item>
      <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }]}>
        <Input.Password id={`password-${formId}`} />
      </Form.Item>
      <Form.Item name="sex" label="性别">
        <Select id={`sex-${formId}`}>
          <Select.Option value="男">男</Select.Option>
          <Select.Option value="女">女</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item name="age" label="年龄" rules={[{ required: true, message: '请输入年龄' }]}>
        <InputNumber id={`age-${formId}`} min={1} max={120} />
      </Form.Item>
      <Form.Item name="email" label="邮箱">
        <Input id={`email-${formId}`} type="email" />
      </Form.Item>
      <Form.Item name="className" label="班级">
        <Select
          id={`className-${formId}`}
          showSearch
          placeholder="请选择班级"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={classes}
        />
      </Form.Item>
    </Form>
  );

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const res = await StudentsListApi1();
        if (res.data.code === 200) {
          const students = res.data.data.list;
          const classList = Array.from(new Set(students.map(item => item.className)))
            .map(className => ({ label: className, value: className }));
          setClasses(classList);
        } else {
          message.error('获取班级数据失败');
        }
      } catch (error) {
        message.error('网络错误，获取班级数据失败');
      }
    };

    fetchClassData();
  }, []);

  return (
    <div>
      <div className="mb-4">
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setCreateModalVisible(true)}>
          新建学生
        </Button>
      </div>

      <QueryFilter onFinish={onFinish} onReset={handleReset}>
        <ProFormText name="name" label="姓名" />
        <ProFormSelect
          name="sex"
          label="性别"
          options={[
            { label: '男', value: '男' },
            { label: '女', value: '女' },
          ]}
        />
        <ProFormText name="age" label="年龄" />
        <ProFormSelect
          name="className"
          label="班级"
          options={classes}
        />
      </QueryFilter>

      <ProTable
        columns={columns}
        dataSource={studentList}
        rowKey="_id"
        loading={loading}
        search={false}
        pagination={{
          current: currentPage,
          total: totalStudents,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20', '50', '100'],
          showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条 / 总共 ${total} 条`,
          onChange: (page, size) => {
            const newPage = Math.max(1, Math.min(page, Math.ceil(totalStudents / size)));
            dispatch(setCurrentPage(newPage));
            dispatch(setPageSize(size));
            getData({ page: newPage, pagesize: size });
          },
          disabled: totalStudents === 0,
          pageSize: pageSize > totalStudents ? totalStudents : pageSize,
        }}
      />

      <Modal
        title="编辑学生"
        open={!!editingStudent}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="save" type="primary" onClick={handleSave}>
            保存
          </Button>,
        ]}
      >
        <FormFields form={form} formId="edit" />
      </Modal>

      <Modal
        title="新建学生"
        open={createModalVisible}
        onCancel={() => {
          setCreateModalVisible(false);
          createForm.resetFields();
        }}
        footer={[
          <Button key="cancel" onClick={() => {
            setCreateModalVisible(false);
            createForm.resetFields();
          }}>
            取消
          </Button>,
          <Button key="save" type="primary" onClick={handleCreate}>
            保存
          </Button>,
        ]}
      >
        <FormFields form={createForm} formId="create" />
      </Modal>
    </div>
  );
};

const WrappedStudentList: React.FC = () => (
  <App>
    <StudentList />
  </App>
);

export default WrappedStudentList;

