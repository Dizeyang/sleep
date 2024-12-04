import React  from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import TestForm from './component/TestForm';
import FileUpdata from './component/FileUpdata'

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: '手动添加',
    children: <TestForm />,
  },
  {
    key: '2',
    label: '批量导入',
    children: <FileUpdata/>,
  },
 
];

const CreateItem: React.FC = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;

export default CreateItem;