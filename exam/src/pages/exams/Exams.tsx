import React, { useState, useEffect, useCallback } from 'react';
import { examsApi, createExamApi, exportExcelApi, editExamApi, deleteExamApi } from '../../services';
import type { Exams, ExamsListItem } from '../../type';
import { Button, TableProps, Table, Space, Modal, message } from "antd";
import style from './Exams.module.scss';
import ExamsSearch from './components/ExamsSearch';
import ExamForm from './components/ExamForm';

const Exams: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [examsList, setExamsList] = useState<Exams[]>([]);
  const [total, setTotal] = useState(0);
  const [query, setQuery] = useState({
    page: 1,
    pagesize: 10
  });
  const [searchParams, setSearchParams] = useState<Partial<Exams>>({});
  const [creators, setCreators] = useState<string[]>([]);
  const [classes, setClasses] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentExam, setCurrentExam] = useState<Exams | null>(null);
  const [modalType, setModalType] = useState<'create' | 'edit' | 'preview'>('create');

  const getAllExamsData = useCallback(async () => {
    try {
      const res = await examsApi({ page: 1, pagesize: 1000000 }); // 获取所有数据
      const uniqueCreators = Array.from(new Set(res.data.data.list.map(item => item.creator)));
      const uniqueClasses = Array.from(new Set(res.data.data.list.map(item => item.classify)));
      setCreators(uniqueCreators);
      setClasses(uniqueClasses);
    } catch (error) {
      console.error('Failed to fetch all exams data:', error);
    }
  }, []);

  const getExamsList = useCallback(async () => {
    setLoading(true);
    try {
      const res = await examsApi({ ...query, ...searchParams });
      setExamsList(res.data.data.list);
      setTotal(res.data.data.total);
    } catch (error) {
      console.error('Failed to fetch exams:', error);
    } finally {
      setLoading(false);
    }
  }, [query, searchParams]);

  useEffect(() => {
    getAllExamsData();
    getExamsList();
  }, [getAllExamsData, getExamsList]);

  const handleSearch = (params: Partial<Exams>) => {
    setSearchParams(params);
    setQuery(prev => ({ ...prev, page: 1 }));
  };

  const handleReset = () => {
    setSearchParams({});
    setQuery({ page: 1, pagesize: 10 });
  };

  const handleCreateExam = () => {
    setModalType('create');
    setCurrentExam(null);
    setIsModalVisible(true);
  };

  const handleEditExam = (exam: Exams) => {
    setModalType('edit');
    setCurrentExam(exam);
    setIsModalVisible(true);
  };

  const handlePreviewExam = (exam: Exams) => {
    setModalType('preview');
    setCurrentExam(exam);
    setIsModalVisible(true);
  };

  const handleDeleteExam = async (id: string) => {
    try {
      await deleteExamApi(id);
      message.success('试卷删除成功');
      getExamsList();
    } catch (error) {
      console.error('Failed to delete exam:', error);
      message.error('试卷删除失败');
    }
  };

  const handleExportExcel = async () => {
    try {
      const res = await exportExcelApi();
      const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = '试卷列表.xlsx';
      link.click();
    } catch (error) {
      console.error('Failed to export excel:', error);
      message.error('导出Excel失败');
    }
  };

  const handleModalOk = async (values: Exams) => {
    try {
      if (modalType === 'create') {
        await createExamApi(values);
        message.success('试卷创建成功');
      } else if (modalType === 'edit') {
        await editExamApi(values);
        message.success('试卷编辑成功');
      }
      setIsModalVisible(false);
      getExamsList();
    } catch (error) {
      console.error('Failed to save exam:', error);
      message.error('保存试卷失败');
    }
  };

  const columns: TableProps<ExamsListItem>['columns'] = [
    {
      title: '试卷名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      fixed: 'left',
      align: 'center'
    },
    {
      title: '科目类型',
      dataIndex: 'classify',
      key: 'classify',
      width: 200,
      align: 'center'
    },
    {
      title: '总分',
      dataIndex: 'totalScore',
      key: 'totalScore',
      width: 200,
      align: 'center'
    },
    {
      title: '创建人',
      dataIndex: 'creator',
      key: 'creator',
      width: 200,
      align: 'center'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 200,
      align: 'center'
    },
    {
      title: '操作',
      key: 'actions',
      fixed: 'right',
      width: 300,
      align: 'center',
      render: (_, record) => (
        <Space>
          <Button type="primary" size="small" onClick={() => handleEditExam(record)}>编辑</Button>
          <Button danger size="small" onClick={() => handleDeleteExam(record._id)}>删除</Button>
          <Button size="small" onClick={() => handlePreviewExam(record)}>预览试卷</Button>
        </Space>
      )
    }
  ];

  return (
    <div>
      <h2 className={style.title}>试卷库</h2>
      <div className={style.btn}>
        <Button className={style.btn1} type='primary' onClick={handleCreateExam}>创建试卷</Button>
        <Button type='primary' onClick={handleExportExcel}>导出excel</Button>
      </div>

      <ExamsSearch
        onSearch={handleSearch}
        onReset={handleReset}
        creatorOptions={creators.map(creator => ({ value: creator, label: creator }))}
        classifyOptions={classes.map(classify => ({ value: classify, label: classify }))}
      />

      <Table
        loading={loading}
        columns={columns}
        dataSource={examsList}
        rowKey="_id"
        scroll={{ x: 'max-content' }}
        pagination={{
          total,
          showTotal: (total, [a, b]) => `共 ${total} 条数据 ${a} - ${b}`,
          showSizeChanger: true,
          pageSizeOptions: [10, 20, 50, 100],
          current: query.page,
          pageSize: query.pagesize,
          onChange: (page: number, pagesize: number) => {
            setQuery({ page, pagesize });
          }
        }}
      />

      <Modal
        title={modalType === 'create' ? '创建试卷' : modalType === 'edit' ? '编辑试卷' : '预览试卷'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
      >
        <ExamForm
          initialValues={currentExam}
          onFinish={handleModalOk}
          mode={modalType}
          classifyOptions={classes.map(classify => ({ value: classify, label: classify }))}
        />
      </Modal>
    </div>
  );
};

export default Exams;

