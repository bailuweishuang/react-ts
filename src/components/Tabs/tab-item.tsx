import React, { useContext } from 'react';
import classNames from 'classnames';
import { TabsContent } from './tabs';

export interface TabsItemProps {
  index?: number;
  classname?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  title: string;
  children: any;
}

const TabItem: React.FC<TabsItemProps> = (props) => {
  const { index, classname, disabled, style, title } = props;
  const content = useContext(TabsContent);

  const titleClass = classNames('title', classname, {
    'title-disabled': disabled,
    [`title-${content.mode}-active`]: content.index === index
  });
  const handleClick = () => {
    if (content.onselect && !disabled) {
      content.onselect(index);
    }
  };
  return (
    <div className={titleClass} onClick={handleClick} style={style}>
      {title}
    </div>
  );
};

TabItem.displayName = 'tabItem';

export default TabItem;
