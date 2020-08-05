import React, { useState, createContext } from 'react';
import classNames from 'classnames';
import { menuItemProps } from './menu-item';

export type menuMode = 'horizontal' | 'vertical';
type slelectCallBack = (selectedIndex: string) => void;

export interface menuProps {
  className?: string;
  style?: React.CSSProperties;
  defaultIndex?: string;
  mode?: menuMode;
  onSelect?: slelectCallBack;
  defaultSubmenuKey?: string[];
}

export interface IMenuContent {
  index: string;
  onSelect?: slelectCallBack;
  mode?: menuMode;
  defaultSubmenuKey?: string[];
}
export const MenuContent = createContext<IMenuContent>({ index: '0' });

const Menu: React.FC<menuProps> = (props) => {
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
    defaultSubmenuKey
  };
  const renderChild = () => {
    return React.Children.map(children, (child, index) => {
      const childItem = child as React.FunctionComponentElement<menuItemProps>;
      const { type } = childItem;
      const { displayName } = type;
      if (displayName === 'menuItem' || displayName === 'subMenu') {
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
  mode: 'horizontal',
  defaultSubmenuKey: []
};

export default Menu;
