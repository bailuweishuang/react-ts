import React, { useContext, useState, FC } from 'react';
import classNames from 'classnames';
import { MenuContent } from './menu';
import { menuItemProps } from './menu-item';
import Icon from '../Icon/icon';
import Transtion from '../Transtion/transtion';

export interface IsubMenu {
  index?: string;
  /**子菜单项值 */
  title: string;
  className?: string;
}
/**
 * 子菜单
 */
export const SubMenu: FC<IsubMenu> = (props) => {
  const content = useContext(MenuContent);
  const { index, title, className, children } = props;
  const defaultSubMenu = content.defaultSubmenuKey as Array<string>;
  const isOpend = index && content.mode === 'vertical' ? defaultSubMenu.includes(index) : false;
  const [opened, setOpened] = useState(isOpend);
  const classes = classNames('submenu-item menu-item', className, {
    'is-active': content.index === index,
    'is-vertical': content.mode === 'vertical',
    'is-opened': opened
  });
  const submenuClass = classNames('submenu', {
    'menu-opened': opened
  });
  const childrenRender = () => {
    const childrencompent = React.Children.map(children, (child, i) => {
      const childCompent = child as React.FunctionComponentElement<menuItemProps>;
      if (childCompent.type.displayName === 'menuItem') {
        return React.cloneElement(childCompent, { index: `${index}-${i}` });
      } else {
        console.error('error');
      }
    });
    return (
      <Transtion in={opened} timeout={300} animation="zoom-in-top">
        <ul className={submenuClass}>{childrencompent}</ul>
      </Transtion>
    );
  };
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpened(!opened);
    if (content.onSelect) {
      content.onSelect(index);
    }
  };
  let timer: any;
  const handleMover = (e: React.MouseEvent, target: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpened(target);
    }, 300);
  };
  const clickEvent = content.mode === 'vertical' ? { onClick: handleClick } : {};
  const moverEvent =
    content.mode !== 'vertical'
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMover(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMover(e, false);
          }
        }
      : {};
  return (
    <ul className={classes} {...moverEvent}>
      <div
        className={classNames('submenu-title', {
          'is-active': content.index === index || content.index.split('-').includes(index)
        })}
        {...clickEvent}
      >
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {childrenRender()}
    </ul>
  );
};

SubMenu.displayName = 'SubMenu';
export default SubMenu;
