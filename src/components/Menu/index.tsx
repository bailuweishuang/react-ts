import { FC } from 'react';
import Menu, { menuProps } from './menu';
import MenuItem, { menuItemProps } from './menu-item';
import Submenu, { IsubMenu } from './submenu';

export type menuType = FC<menuProps> & {
  Item: FC<menuItemProps>;
  Submenu: FC<IsubMenu>;
};

const TransMenu = Menu as menuType;

TransMenu.Item = MenuItem;
TransMenu.Submenu = Submenu;

export default TransMenu;
