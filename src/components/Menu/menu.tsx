import React, { useState, createContext, FC } from 'react';
import classNames from 'classnames';
import { menuItemProps } from './menu-item';

export type menuMode = 'horizontal' | 'vertical';
type slelectCallBack = (selectedIndex: string) => void;

export interface menuProps {
  /**菜单样式名称 */
  className?: string;
  /**菜单样式 */
  style?: React.CSSProperties;
  /**默认Key */
  defaultIndex?: string;
  /**菜单类型 */
  mode?: menuMode;
  /**菜单点击回调 */
  onSelect?: slelectCallBack;
  /**菜单默认展开项 */
  defaultSubmenuKey?: string[];
}

export interface IMenuContent {
  index?: string;
  onSelect?: slelectCallBack;
  mode?: menuMode;
  defaultSubmenuKey?: string[];
}
export const MenuContent = createContext<IMenuContent>({ index: '0' });

/**
 * 为页面和功能提供导航的菜单列表。
 * ### 引用方法
 * ~~~js
 * import {Menu} from 'react-ts'
 * ~~~
 */
export const Menu: FC<menuProps> = (props) => {
  const { className, style, defaultIndex, mode, children, onSelect, defaultSubmenuKey } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  });
  const handleClick = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const passedContext: IMenuContent = {
    index: currentActive,
    onSelect: handleClick,
    mode,
    defaultSubmenuKey: []
  };
  const renderChild = () => {
    return React.Children.map(children, (child, index) => {
      const childItem = child as React.FunctionComponentElement<menuItemProps>;
      const { type } = childItem;
      const { displayName } = type;
      if (displayName === 'menuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childItem, {
          index: index.toString()
        });
      } else {
        console.log('waring: error');
      }
    });
  };
  return (
    <ul className={classes} style={style}>
      <MenuContent.Provider value={passedContext}>{renderChild()}</MenuContent.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal'
};

export default Menu;
