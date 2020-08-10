import React, { FC } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

export type ThemeProps = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'light' | 'dark';

export interface IconProps extends FontAwesomeIconProps {
  /**不同主题 */
  theme?: ThemeProps;
}

/**
 * 语义化的矢量图形
 * ### 引用方法
 * ~~~js
 * import { library } from '@fortawesome/fontawesome-svg-core';
 * import { fas } from '@fortawesome/free-solid-svg-icons';
 * import { Icon } from "react-ts";
 * library.add(fas);
 * ~~~
 */
export const Icon: FC<IconProps> = (props) => {
  const { className, theme, ...moreProps } = props;
  const classes = classNames('ts-icon', className, {
    [`icon-${theme}`]: theme
  });
  return <FontAwesomeIcon className={classes} {...moreProps} />;
};

export default Icon;
