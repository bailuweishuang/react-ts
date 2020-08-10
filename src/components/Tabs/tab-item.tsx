import React, { useContext, FC } from 'react';
import classNames from 'classnames';
import { TabsContent } from './tabs';

export interface TabsItemProps {
  index?: number;
  /**样式名称 */
  classname?: string;
  /**样式 */
  style?: React.CSSProperties;
  /**是否禁用 */
  disabled?: boolean;
  /**选项卡头显示文字 */
  title: string;
  children: any;
}

export const TabItem: FC<TabsItemProps> = (props) => {
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

TabItem.displayName = 'TabItem';

export default TabItem;
