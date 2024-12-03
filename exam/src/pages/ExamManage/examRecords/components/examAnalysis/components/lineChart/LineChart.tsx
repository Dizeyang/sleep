import React from "react";
import { EllipsisOutlined } from '@ant-design/icons';
import { StatisticCard } from '@ant-design/pro-components';


const LineChart = () => {
  return (
    <StatisticCard
      title="成绩统计"
      tooltip="成绩统计"
      style={{ maxWidth: 780 }}
      extra={<EllipsisOutlined />}
      chart={
        <img
          src="https://gw.alipayobjects.com/zos/alicdn/a-LN9RTYq/zhuzhuangtu.svg"
          alt="柱状图"
          width="100%"
        />
      }
    />
  );
};
export default LineChart;