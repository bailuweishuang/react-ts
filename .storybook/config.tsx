import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import '../src/style/index.scss';

const styleWrapper: React.CSSProperties = {
  padding: '20px 40px'
};
const storyWrapper = (storyFc: any) => {
  return (
    <div style={styleWrapper}>
      <h3>组件演示</h3>
      {storyFc()}
    </div>
  );
};
addDecorator(withInfo);
addDecorator(storyWrapper);
addParameters({
  info: {
    inline: true,
    header: false
  }
});
