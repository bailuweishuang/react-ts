import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Alert from './alert';

const defaultAlert = () => <Alert title="Success Tex" alertType="success" />;
const differertType = () => (
  <>
    <Alert title="Success Tex" alertType="success" />
    <Alert title="danger Tex" alertType="danger" />
    <Alert title="warning Tex" alertType="warning" />
    <Alert title="default Tex" alertType="default" />
  </>
);
const descriptionAlert = () => (
  <>
    <Alert title="Success Tex" alertType="success" description="这是一段描述" />
    <Alert title="warning Tex" alertType="warning" description="这是一段描述" />
    <Alert title="danger Tex" alertType="danger" description="这是一段描述" showClose showIcon />
  </>
);
const showIconAlert = () => (
  <>
    <Alert title="Success Tex" alertType="success" showIcon />
    <Alert title="danger Tex" alertType="danger" showIcon />
    <Alert title="warning Tex" alertType="warning" showIcon />
    <Alert title="default Tex" alertType="default" showIcon />
  </>
);
const showCloseAlert = () => (
  <>
    <Alert title="Success Tex" alertType="success" showClose showIcon />
    <Alert title="Success Tex" alertType="success" showClose />
    <Alert title="Success Tex" alertType="success" showClose closeBtn="关闭" />
    <Alert title="danger Tex" alertType="danger" description="这是一段描述" showClose showIcon />
  </>
);
storiesOf('Alert 警告提示', module)
  .add('Alert', defaultAlert)
  .add('differertType', differertType)
  .add('descriptionAlert', descriptionAlert)
  .add('showIconAlert', showIconAlert)
  .add('showCloseAlert', showCloseAlert);
