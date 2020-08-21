import React, { useState, createContext, FC } from 'react';
import classNames from 'classnames';
import { TabsItemProps } from './tab-item';

type tabsMode = 'line' | 'card';
export type selectCallBack = (selectIndex: number) => void;

export interface TabsProps {
  /**样式名称 */
  className?: string;
  /**样式 */
  style?: React.CSSProperties;
  /**初始化选择key */
  defaultIndex?: number;
  /**点击回调 */
  onSelect?: selectCallBack;
  /**页签基本样式 */
  mode?: tabsMode;
}

export interface ITabContent {
  index?: number;
  onselect?: selectCallBack;
  mode?: tabsMode;
}

export const TabsContent = createContext<ITabContent>({
  index: 0
});
/**
 * 选项卡切换组件。
 * ### 引用方法
 *
 * ~~~js
 * import { Tabs } from 'react-ts'
 * ~~~
 */
export const Tabs: FC<TabsProps> = (props) => {
  const { className, style, defaultIndex, onSelect, mode, children } = props;
  const [currenActive, setActive] = useState(defaultIndex);
  const classes = classNames('tabs', className);
  const hanldeCilck = (index: number) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  const childrender = () => {
    return React.Children.map(children, (c, i) => {
      const childCompent = c as React.FunctionComponentElement<TabsItemProps>;
      if (childCompent.type.displayName === 'TabItem') {
        return React.cloneElement(childCompent, {
          index: i
        });
      } else {
        console.error('error!');
      }
    });
  };

  const childContentrender = () => {
    return React.Children.map(children, (c, i) => {
      const childCompent = c as React.FunctionComponentElement<TabsItemProps>;
      if (childCompent.type.displayName === 'TabItem') {
        const classesN = classNames('children-content', {
          'children-content-active': currenActive === i
        });
        return <div className={classesN}>{childCompent.props.children}</div>;
      } else {
        console.error('error!');
      }
    });
  };

  const passedContent: ITabContent = {
    index: currenActive,
    mode,
    onselect: hanldeCilck
  };
  return (
    <div>
      <ul className={classes} style={style}>
        <TabsContent.Provider value={passedContent}>{childrender()}</TabsContent.Provider>
      </ul>
      <div>{childContentrender()}</div>
    </div>
  );
};

Tabs.defaultProps = {
  mode: 'line',
  defaultIndex: 0
};
export default Tabs;
