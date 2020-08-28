import React from 'react';
import { storiesOf } from '@storybook/react';
import Progress from './progress';

const defaultProgress = () => {
  return <Progress percent={11} />;
};
const differentTheme = () => {
  return (
    <div>
      <Progress percent={33} theme="danger" />
      <Progress percent={33} theme="primary" />
      <Progress percent={33} theme="dark" />
      <Progress percent={33} theme="success" />
      <Progress percent={33} theme="warning" />
    </div>
  );
};
storiesOf('Progress 进度条', module).add('Progress', defaultProgress).add('不同主题', differentTheme);
