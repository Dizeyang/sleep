import React from 'react';
import { Form, Input, InputNumber, Button, Select, DatePicker } from 'antd';
import type { Exams } from '../../../type';


interface Props {
  initialValues?: Exams | null;
  onFinish: (values: Exams) => void;
  mode: 'create' | 'edit' | 'preview';
  classifyOptions: { value: string; label: string }[];
}

const ExamForm: React.FC<Props> = ({ initialValues, onFinish, mode, classifyOptions }) => {
  const [form] = Form.useForm();

  const isPreview = mode === 'preview';

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues ? {...initialValues, createTime: moment(initialValues.createTime)} : {}}
      onFinish={(values) => {
        const formattedValues = {
          ...values,
          createTime: values.createTime.format('YYYY-MM-DD HH:mm:ss')
        };
        onFinish(formattedValues);
      }}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item name="name" label="试卷名称" rules={[{ required: true, message: '请输入试卷名称' }]}>
        <Input disabled={isPreview} />
      </Form.Item>
      <Form.Item name="classify" label="科目类型" rules={[{ required: true, message: '请选择科目类型' }]}>
        <Select disabled={isPreview} options={classifyOptions} />
      </Form.Item>
      <Form.Item name="totalScore" label="总分" rules={[{ required: true, message: '请输入总分' }]}>
        <InputNumber disabled={isPreview} min={0} max={100} />
      </Form.Item>
      <Form.Item name="creator" label="创建人" rules={[{ required: true, message: '请输入创建人' }]}>
        <Input disabled={isPreview} />
      </Form.Item>
      <Form.Item name="createTime" label="创建时间" rules={[{ required: true, message: '请选择创建时间' }]}>
        <DatePicker showTime disabled={isPreview} />
      </Form.Item>
      {!isPreview && (
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {mode === 'create' ? '创建' : '保存'}
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default ExamForm;

