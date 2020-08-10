import React from 'react';
import { storiesOf } from '@storybook/react';
import Tabs from './tabs';
import TabItem from './tab-item';

const defaultTabs = () => (
  <Tabs>
    <TabItem title="Tab 1">Content of Tab Pane 1</TabItem>
    <TabItem title="Tab 2">Content of Tab Pane 2</TabItem>
    <TabItem title="Tab 3">Content of Tab Pane 3</TabItem>
  </Tabs>
);
const differerntTabs = () => (
  <Tabs mode="card">
    <TabItem title="Tab 1">Content of Tab Pane 1</TabItem>
    <TabItem title="Tab 2" disabled>
      Content of Tab Pane 2
    </TabItem>
    <TabItem title="Tab 3">Content of Tab Pane 3</TabItem>
  </Tabs>
);
storiesOf('tabs 标签页', module).add('Tabs', defaultTabs).add('不同类型', differerntTabs);
