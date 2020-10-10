import React, { useContext, FC } from 'react';
import calssNames from 'classnames';
import { MenuContent } from './menu';

export interface menuItemProps {
  /**子菜单样式名称 */
  className?: string;
  index?: string;
  /**子菜单样式 */
  style?: React.CSSProperties;
  /**是否禁用 */
  disabled?: boolean;
}
/**
 * 子菜单
 */
export const menuItem: FC<menuItemProps> = (props) => {
  const { className, index, style, children, disabled } = props;
  console.log(index, 12313);
  const content = useContext(MenuContent);
  const classes = calssNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': content.index === index
  });
  const handleClick = () => {
    if (content.onSelect && !disabled && index !== undefined) {
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
