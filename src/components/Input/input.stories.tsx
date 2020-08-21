import React from 'react';
import { storiesOf } from '@storybook/react';
import Input from './Input';

const defaultInput = () => <Input />;

const differentInput = () => (
  <>
    <Input sizeT="large" />
    <Input sizeT="small" />
  </>
);
const pandInput = () => (
  <>
    <Input prepand="http://" />
    <Input append=".com" />
    <Input append=".com" icon="search" />
  </>
);
const disabledInput = () => (
    <Input disabled />
);
storiesOf('Input 输入框', module)
  .add('Input', defaultInput)
  .add('不同大小', differentInput)
  .add('前后缀', pandInput)
  .add('不可输入', disabledInput);
