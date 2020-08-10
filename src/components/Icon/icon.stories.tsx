import React from 'react';
import { storiesOf } from '@storybook/react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Icon from './icon';

library.add(fas);

const defaultIcon = () => <Icon icon="coffee" />;

const differentIcon = () => (
  <>
    <Icon icon="coffee" theme="primary" />
    <Icon icon="coffee" theme="secondary" />
    <Icon icon="coffee" theme="warning" />
    <Icon icon="coffee" theme="info" />
    <Icon icon="coffee" theme="success" />
    <Icon icon="coffee" theme="danger" />
    <Icon icon="coffee" theme="light" />
    <Icon icon="coffee" theme="dark" />
  </>
);

storiesOf('Icon 图标', module).add('Icon', defaultIcon).add('不同主题', differentIcon);
