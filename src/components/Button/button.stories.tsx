import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from './button';

const defaultButton = () => <Button onClick={action('click')}>default</Button>;

const differentSizeButton = () => (
  <>
    <Button size="lg">large button</Button>
    <Button size="sm">small button</Button>
  </>
);

const differentTypeButton = () => (
  <>
    <Button btnType="default">default button</Button>
    <Button btnType="primary">primary button</Button>
    <Button btnType="danger">danger button</Button>
    <Button btnType="danger" disabled>
      danger button
    </Button>
    <Button btnType="link" href="https://google.com">
      link button
    </Button>
    <Button btnType="link" disabled href="https://google.com">
      link button
    </Button>
  </>
);

storiesOf('Button 按钮', module)
  .add('Button', defaultButton)
  .add('不同大小', differentSizeButton)
  .add('不同状态', differentTypeButton);
