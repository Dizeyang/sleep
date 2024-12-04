import React, { useState } from 'react';
import { Button, Form, Input, Select, Radio, Space, Flex } from 'antd';
import type { FormItemProps, RadioChangeEvent } from 'antd';
import { useNavigate } from 'react-router-dom';
import style from './TestForm.module.scss';

const { TextArea } = Input;

const MyFormItemContext = React.createContext<(string | number)[]>([]);

interface MyFormItemGroupProps {
  prefix: string | number | (string | number)[];
}

const baseStyle: React.CSSProperties = {
  width: '25%',
  height: 54,
};

function toArr(str: string | number | (string | number)[]): (string | number)[] {
  return Array.isArray(str) ? str : [str];
}

const MyFormItemGroup: React.FC<React.PropsWithChildren<MyFormItemGroupProps>> = ({
  prefix,
  children,
}) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatPath = React.useMemo(() => [...prefixPath, ...toArr(prefix)], [prefixPath, prefix]);

  return <MyFormItemContext.Provider value={concatPath}>{children}</MyFormItemContext.Provider>;
};

const MyFormItem = ({ name, ...props }: FormItemProps) => {
  const prefixPath = React.useContext(MyFormItemContext);
  const concatName = name !== undefined ? [...prefixPath, ...toArr(name)] : undefined;

  return <Form.Item name={concatName} {...props} />;
};

const TestForm: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = (values: object) => {
    console.log(values);
  };

  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  return (
    <Form
      name="form_item_path"
      layout="vertical"
      onFinish={onFinish}
      className={style.formItem}
    >
      <MyFormItemGroup prefix={['user']}>
        <MyFormItem
          name="type"
          label="题型"
          rules={[{ required: true, message: '请选择题型!' }]}
        >
          <Select
            style={{ width: 120 }}
            options={[
              { value: '单选' },
              { value: '多选' },
              { value: '判断' },
            ]}
          />
        </MyFormItem>
        <MyFormItem
          name="lei"
          label="分类"
          rules={[{ required: true, message: '请选择分类!' }]}
        >
          <Select
            style={{ width: 120 }}
            options={[
              { value: '英语' },
              { value: '数学' },
              { value: '语文' },
              { value: '政治' },
              { value: '历史' },
              { value: '地理' },
              { value: '生物' },
              { value: '化学' },
              { value: '物理' },
              { value: '其他' },
            ]}
          />
        </MyFormItem>
        <MyFormItem
          name="question"
          label="题目"
          rules={[{ required: true, message: '请输入题目!' }]}
        >
          <TextArea placeholder="请输入题目" />
        </MyFormItem>

        <MyFormItem
          name="answer"
          label="选项"
          rules={[{ required: true, message: '请输入选项!' }]}
        >
          <Radio.Group onChange={onChange} value={value}>
            <Space size={50}>
              <div>
                <Radio value={1}>A</Radio>
                <Input
                 
                />
              </div>
              <div>
                <Radio value={2}>B</Radio>
                <Input
                 
                />
              </div>
              <div>
                <Radio value={3}>C</Radio>
                <Input
                 
                />
              </div>
              <div>
                <Radio value={4}>D</Radio>
                <Input
                 
                />
              </div>
            </Space>
          </Radio.Group>
        </MyFormItem>

        <MyFormItem
          name="resolution"
          label="解析"
          rules={[{ required: true, message: '请输入解析!' }]}
        >
          <TextArea placeholder="请输入解析" />
        </MyFormItem>
      </MyFormItemGroup>
      <Flex justify="center" gap="small">
        <Button type="primary" htmlType="reset">
          重置
        </Button>
        <Button type="primary" htmlType="submit">
          提交
        </Button>
        <Button type="primary" onClick={() => navigate('/')}>返回</Button>
      </Flex>
    </Form>
  );
};

export default TestForm;