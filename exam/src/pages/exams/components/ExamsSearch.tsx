import React from 'react';
import { Button, Form, Space } from 'antd';
import type { Exams } from '../../../type';
import {
  ProForm,
  ProFormText,
  ProFormSelect
} from '@ant-design/pro-components';

interface Props {
  onSearch: (params: Partial<Exams>) => void;
  onReset: () => void;
  creatorOptions: { value: string; label: string }[];
  classifyOptions: { value: string; label: string }[];
}

const ExamsSearch: React.FC<Props> = ({ onSearch, onReset, creatorOptions, classifyOptions }) => {
  const [form] = Form.useForm();

  const handleReset = () => {
    form.resetFields();
    onReset();
  };

  const handleSearch = () => {
    const params = form.getFieldsValue();
    onSearch(params);
  };

  return (
    <ProForm
      form={form}
      layout="horizontal"
      submitter={false}
    >
      <ProForm.Group>
        <ProFormText
          colProps={{ span: 6 }}
          name="name"
          label="试卷名称"
        />
        <ProFormSelect
          name="creator"
          colProps={{ span: 6 }}
          label="创建人"
          showSearch
          options={creatorOptions}
        />
        <ProFormSelect
          name="classify"
          colProps={{ span: 6 }}
          label="查询科目"
          showSearch
          options={classifyOptions}
        />
        <Space>
          <Button onClick={handleReset}>重置</Button>
          <Button type='primary' onClick={handleSearch}>查询</Button>
        </Space>
      </ProForm.Group>
    </ProForm>
  );
};

export default ExamsSearch;

