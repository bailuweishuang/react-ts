import React from 'react';
import { storiesOf } from '@storybook/react';
import Upload, { IUploadFile } from './upload';
import Icon from '../Icon/icon';
import Button from '../Button/button';

const defaultFileList: IUploadFile[] = [
  { uid: '123', size: 1234, name: 'hello.md', status: 'uploading', percent: 30 },
  { uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
  { uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
];
const defaultUpload = () => {
  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      defaultFileList={defaultFileList}
      accept=".png, .jpg, .jpeg"
      multiple
    >
      <Button btnType="primary">upload file</Button>
    </Upload>
  );
};

const dragUpload = () => {
  return (
    <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      defaultFileList={defaultFileList}
      accept=".png, .jpg, .jpeg"
      multiple
      drag
    >
      <Icon icon="upload" size="5x" theme="secondary" />
      <br />
      <p>Drag file over to upload</p>
    </Upload>
  );
};

storiesOf('upload 上传', module).add('Upload', defaultUpload).add('drag', dragUpload);
