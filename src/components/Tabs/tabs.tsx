import React, { useState, createContext } from 'react';
import classNames from 'classnames';
import { TabsItemProps } from './tab-item';

type tabsMode = 'line' | 'card';
type selectCallBack = (selectIndex: number) => void;

export interface TabsProps {
  className?: string;
  style?: React.CSSProperties;
  defaultIndex?: number;
  onSelect?: selectCallBack;
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

const Tabs: React.FC<TabsProps> = (props) => {
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
      if (childCompent.type.displayName === 'tabItem') {
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
      if (childCompent.type.displayName === 'tabItem') {
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
