import React from "react";
import style from "./PublishExam.module.scss";

const PublishExam = ({ formData }) => {
  console.log(formData);
  return (
    <div className={style.publishExam}>
      <h3>配置信息</h3>
      <p>考试名称： {formData.name}</p>
      <p>科目分类: {formData.classify}</p>
      <p>监考人： {formData.examiner}</p>
      <p>考试班级：{formData.name}</p>
      <p>考试时间： {formData?.dateTime}</p>
      {/* <p>考试时间： {formData?.dateTime[0]} - {formData?.dateTime[1]}</p> */}
    </div>
  );
};
export default PublishExam;