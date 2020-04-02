import React from 'react';
import { Upload, message, Button } from 'antd';

const props = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export default function UploadBtn() {
  return (
    <Upload {...props}>
      <Button type="primary">
        {/*<Icon type="upload" />*/} 点击上传图片
      </Button>
    </Upload>
  );
}
