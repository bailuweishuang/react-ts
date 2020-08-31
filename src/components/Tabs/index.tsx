import { FC } from 'react';
import Tabs, { TabsProps } from './tabs';
import TabItem, { TabsItemProps } from './tab-item';

export type tabType = FC<TabsProps> & {
  TabItem: FC<TabsItemProps>;
};

const NewTabs = Tabs as tabType;

NewTabs.TabItem = TabItem;

export default NewTabs;
