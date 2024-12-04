import React, { useState, useEffect } from 'react';
import { ProFormText, QueryFilter, ProFormSelect } from '@ant-design/pro-components';
import { StudentsListApi, UpdateGroupApi, DeleteGroupApi, CreateGroupApi } from '../../../services';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Modal, Form, Input, Select, Popconfirm } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  setGroupList,
  setTotalGroups,
  setCurrentPage,
  setPageSize,
  setEditingGroup,
  updateGroup,
  deleteGroup,
} from '../../../store/models/groupslice';
import { RootState } from '../../../store';
import { PlusOutlined } from '@ant-design/icons';

const GroupList: React.FC = () => {
  const dispatch = useDispatch();
  const { groupList, totalGroups, currentPage, pageSize, editingGroup } = useSelector((state: RootState) => state.group);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [createForm] = Form.useForm();
  const [teachers, setTeachers] = useState([]);
  const [classifies, setClassifies] = useState([]);

  const getData = async (params = {}) => {
    setLoading(true);
    try {
      const res = await StudentsListApi({
        ...params,
        page: currentPage,
        pagesize: pageSize,
      });

      if (res.data.code === 200) {
        dispatch(setGroupList(res.data.data.list));
        dispatch(setTotalGroups(res.data.data.total));
      } else {
        message.error('获取班级数据失败');
      }
    } catch (error) {
      message.error('网络错误，获取班级数据失败');
    } finally {
      setLoading(false);
    }
  };

  

  


  useEffect(() => {
    getData();
  }, [currentPage, pageSize]);

  const handleEdit = (record) => {
    dispatch(setEditingGroup(record));
    form.setFieldsValue(record);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (!editingGroup) return;
  
      const res = await UpdateGroupApi(editingGroup._id, values.name,values.teacher,values.classify);
  
      if (res.data.code === 200) {
        const updatedGroup = { ...editingGroup, ...values };  
        dispatch(updateGroup(updatedGroup));
        dispatch(setEditingGroup(null));  
        message.success('更新成功');
        getData();
      } else {
        message.error('更新失败');
      }
    } catch (error) {
      message.error('表单验证失败');
    }
  };

  const handleCreate = async () => {
    try {
      const values = await createForm.validateFields();
      const res = await CreateGroupApi({
        ...values,
        students: []  // 默认空数组
      });
      if (res.data.code === 200) {
        message.success('创建成功');
        setCreateModalVisible(false);
        createForm.resetFields();
        getData();
      } else {
        message.error('创建失败');
      }
    } catch (error) {
      message.error('表单验证失败');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await DeleteGroupApi(id);
      if (res.data.code === 200) {
        dispatch(deleteGroup(id));
        message.success('删除成功');
        if (groupList.length === 1 && currentPage > 1) {
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
    dispatch(setEditingGroup(null));
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
      title: '班级名称',
      dataIndex: 'name',
    },
    {
      title: '老师',
      dataIndex: 'teacher',
    },
    {
      title: '科目类别',
      dataIndex: 'classify',
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
            title="确定要删除这个班级吗？"
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

  const FormFields = ({ form }) => (
    <Form form={form} layout="vertical">
      <Form.Item name="name" label="班级名称" rules={[{ required: true, message: '请输入班级名称' }]}>
        <Input />
      </Form.Item>
      <Form.Item name="teacher" label="老师" rules={[{ required: true, message: '请选择老师' }]}>
        <Select
          showSearch
          placeholder="请输入老师名称"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={teachers}
        />
      </Form.Item>
      <Form.Item name="classify" label="科目类别" rules={[{ required: true, message: '请选择科目类别' }]}>
        <Select
          showSearch
          placeholder="请输入科目类别"
          optionFilterProp="children"
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          options={classifies}
        />
      </Form.Item>
    </Form>
  );

  // Fetching data for teachers and subjects
  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const res = await StudentsListApi();
        if (res.data.code === 200) {
          const classes = res.data.data.list;

          // Extract teachers and subjects list dynamically
          const teacherList = Array.from(new Set(classes.map(item => item.teacher)))
            .map(teacher => ({ label: teacher, value: teacher }));
          const classifyList = Array.from(new Set(classes.map(item => item.classify)))
            .map(classify => ({ label: classify, value: classify }));

          setTeachers(teacherList);
          setClassifies(classifyList);
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
          新建班级
        </Button>
      </div>

      <QueryFilter onFinish={onFinish} onReset={handleReset}>
        <Form.Item name="name" label="班级名称">
          <Input />
        </Form.Item>

        <Form.Item name="teacher" label="老师">
          <Select
            showSearch
            placeholder="请选择老师"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={teachers}
          />
        </Form.Item>

        <Form.Item name="classify" label="科目类别">
          <Select
            showSearch
            placeholder="请选择科目类别"
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={classifies}
          />
        </Form.Item>
      </QueryFilter>

      <ProTable
        columns={columns}                  // 表格的列配置
        dataSource={groupList}             // 表格的数据源
        rowKey="_id"                       // 每行的唯一标识，通常用于设置表格行的 `key`
        loading={loading}                  // 表格是否在加载状态
        search={false}                     // 禁用表格的搜索功能
        pagination={{                      // 配置分页功能
          current: currentPage,            // 当前页码
          total: totalGroups,              // 总条数
          showSizeChanger: true,           // 显示页大小切换器
          pageSizeOptions: ['5', '10', '20', '50', '100'],  // 页大小的选择项
          showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条 / 总共 ${total} 条`, // 页脚的分页信息，显示当前页数据范围及总数据量
          onChange: (page, size) => {      // 页码或页大小变化时的回调函数
            const newPage = Math.max(1, Math.min(page, Math.ceil(totalGroups / size)));  // 确保页码在合理范围内
            dispatch(setCurrentPage(newPage));  // 更新当前页码
            dispatch(setPageSize(size));       // 更新页大小
            getData({ page: newPage, pagesize: size });  // 获取新的数据
          },
        disabled: totalGroups === 0,      // 如果没有数据，总条数为 0，禁用分页
        pageSize: pageSize > totalGroups ? totalGroups : pageSize,  // 确保每页显示的条数不大于总条数
          }}
        />


      <Modal
        title="编辑班级"
        open={!!editingGroup}
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
        <FormFields form={form} />
      </Modal>

      <Modal
        title="新建班级"
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
        <FormFields form={createForm} />
      </Modal>
    </div>
  );
};

export default GroupList;
