import React,{ useState } from "react";
import { Card } from 'antd';
import style from './ExamAnalysis.module.scss'
import LineChart from './components/lineChart/LineChart'
import ItemAnalysis from './components/itemAnalysis/ItemAnalysis'

const tabList = [
    {
      key: 'tab1',
      tab: '成绩统计',
    },
    {
      key: 'tab2',
      tab: '试题分析',
    },
  ];

  const contentList: Record<string, React.ReactNode> = {
    tab1: <ul>
            <li>考试时间：2022-03-09</li>
            <li>考试分类：练习</li>
            <li>总分：100</li>
            <li>平均分：82</li>
            <li>最高分：100</li>
            <li>最低分：72</li>
            <LineChart />
          </ul>,
          
    tab2: <ItemAnalysis />,
  };
  

const ExamAnalysis: React.FC = ({ onBack }) => {

  const [activeTabKey1, setActiveTabKey1] = useState<string>('tab1');

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };
  


  return (
    <>
    
      <Card
        style={{ width: '100%' }}
        title="vue2 考试分析"
        extra={<a href="#" onClick={onBack}>返回</a>}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
      > 
      <div className={style.analysis}>
         {contentList[activeTabKey1]}
         
      </div>
        
      </Card>
      <br />
      
    </>
  )
};

export default ExamAnalysis;