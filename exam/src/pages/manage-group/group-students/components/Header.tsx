import React from 'react'
import {
    ProFormText,
    QueryFilter,
    ProFormSelect
  } from '@ant-design/pro-components';
const Header = () => {
  return (
    <div>
    <QueryFilter defaultCollapsed split>
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
      <ProFormSelect name="className" label="班级" />
    </QueryFilter>
    </div>
  )
}

export default Header