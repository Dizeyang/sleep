import React, { useState } from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload, Flex, Button, Divider } from 'antd';

const { Dragger } = Upload;



const FileUpdata: React.FC = () => {
    const props: UploadProps = {
        name: 'file',
        multiple: true,
        action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
        onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
          // 更新 fileList 状态
          setFileList(info.fileList);
        },
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
      }; 
  const [fileList, setFileList] = useState<any[]>([]);

  const handleSubmit = () => {
    if (fileList.length === 0) {
      message.warning('请先上传文件！');
      return;
    }
    // 可以在这里添加更多提交逻辑
    message.info('提交成功！');
  };

  return (
    <>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">单击或拖动文件到此区域进行上传</p>
        <p className="ant-upload-hint">
         支持单次或批量上传
        </p>
      </Dragger>
      <Divider type="vertical" />
      <Flex justify="center" gap="small">
        <Button type="primary" htmlType="reset">
          重置
        </Button>
        <Button type="primary" onClick={handleSubmit}>
          提交
        </Button>
        <Button type="primary">返回</Button>
      </Flex>
    </>
  );
};

export default FileUpdata;