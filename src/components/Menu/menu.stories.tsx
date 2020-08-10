import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Menu from './menu';
import SubMenu from './submenu';
import MenuItem from './menu-item';

const defaultMenu = () => (
  <Menu
    defaultIndex={'0'}
    onSelect={() => {
      action('click');
    }}
  >
    <MenuItem> Navigation One</MenuItem>
    <MenuItem disabled> Navigation Two</MenuItem>
    <SubMenu title="Navigation Three - Submenu">
      <MenuItem> Navigation One</MenuItem>
      <MenuItem> Navigation Two</MenuItem>
    </SubMenu>
  </Menu>
);
const verticalMenu = () => (
  <Menu defaultIndex={'0'} mode="vertical">
    <MenuItem> Navigation One</MenuItem>
    <MenuItem> Navigation Two</MenuItem>
    <SubMenu title="Navigation Three - Submenu">
      <MenuItem> Navigation One</MenuItem>
      <MenuItem> Navigation Two</MenuItem>
    </SubMenu>
  </Menu>
);
storiesOf('Menu 菜单', module).add('Menu', defaultMenu).add('纵向菜单', verticalMenu);
