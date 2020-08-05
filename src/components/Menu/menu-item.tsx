import React, { useContext } from 'react';
import calssNames from 'classnames';
import { MenuContent } from './menu';

export interface menuItemProps {
  className?: string;
  index?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

const menuItem: React.FC<menuItemProps> = (props) => {
  const { className, index, style, children, disabled } = props;
  const content = useContext(MenuContent);
  const classes = calssNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': content.index === index
  });
  const handleClick = () => {
    if (content.onSelect && !disabled) {
      content.onSelect(index);
    }
  };
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};
menuItem.displayName = 'menuItem';
export default menuItem;
