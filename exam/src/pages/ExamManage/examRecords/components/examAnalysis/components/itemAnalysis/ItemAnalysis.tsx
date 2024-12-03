import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: '1',
    icon: <MailOutlined />,
    label: '单选题',
    children: [
      { key: '11', label: 'Option 1' },
      { key: '12', label: 'Option 2' },
    ],
  },
  {
    key: '2',
    icon: <AppstoreOutlined />,
    label: '多选题',
    children: [
      { key: '21', label: 'Option 1' },
      { key: '22', label: 'Option 2' },
    ],
  },
  {
    key: '3',
    icon: <SettingOutlined  />,
    label: '填空题',
    children: [
      { key: '31', label: 'Option 1' },
      { key: '32', label: 'Option 2' },
    ],
  }
];

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const levelKeys = getLevelKeys(items as LevelKeysProps[]);

const ItemAnalysis: React.FC = () => {
  const [stateOpenKeys, setStateOpenKeys] = useState(['1']);

//   const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
//     const lastOpenKey = openKeys[openKeys.length - 1];
//     if (lastOpenKey) {
//       const levelKey = levelKeys[lastOpenKey];
//       let newOpenKeys = openKeys.filter((key) => levelKeys[key] <= levelKey);
//       setStateOpenKeys(newOpenKeys);
//     } else {
//       setStateOpenKeys(openKeys);
//     }
//   };
const onOpenChange: MenuProps['onOpenChange'] = (openKeys) => {
    const currentOpenKey = openKeys.find((key) => stateOpenKeys.indexOf(key) === -1);
    if (currentOpenKey) {
      // 打开新菜单项
      const repeatIndex = openKeys
        .filter((key) => key !== currentOpenKey)
        .findIndex((key) => levelKeys[key] === levelKeys[currentOpenKey]);

      setStateOpenKeys(
        openKeys
          .filter((_, index) => index !== repeatIndex)
          .filter((key) => levelKeys[key] <= levelKeys[currentOpenKey]),
      );
    } else {
      // 关闭菜单项
      setStateOpenKeys(openKeys);
    }
  };

  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={['11']}
      openKeys={stateOpenKeys}
      onOpenChange={onOpenChange}
      style={{ width: 256 }}
      items={items}
    />
  );
};

export default ItemAnalysis;