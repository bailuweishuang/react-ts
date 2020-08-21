import React, { ReactElement, InputHTMLAttributes, FC, CSSProperties, ChangeEvent } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import Icon from '../Icon/icon';

type InputSize = 'large' | 'small';
export interface InputProps extends InputHTMLAttributes<HTMLElement> {
  /**控件大小 */
  sizeT?: InputSize;
  /**是否禁用 */
  disabled?: boolean;
  /**图标 */
  icon?: IconProp;
  /**前缀 */
  prepand?: string | ReactElement;
  /**后缀 */
  append?: string | ReactElement;
  style?: CSSProperties;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
/**
 * 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 * ### 引用方法
 *
 * ~~~js
 * import { Input } from 'react-ts'
 * ~~~
 */
export const Input: FC<InputProps> = (Props) => {
  const { sizeT, disabled, icon, prepand, append, style, ...moreProps } = Props;

  const classes = classNames('input', {
    [`input-${sizeT}`]: sizeT,
    'input-disabled': disabled,
    'input-prepadn': prepand,
    'input-append': append
  });
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return '';
    }
    return value;
  };
  if ('value' in Props) {
    delete moreProps.defaultValue;
    moreProps.value = fixControlledValue(Props.value);
  }
  return (
    <div className={classes} style={style}>
      {prepand ? <div className="input-prepand">{prepand}</div> : null}
      <div className="input-icon">
        {icon ? <Icon icon={icon} /> : null}
        <input className="input-content" disabled={disabled} {...moreProps} />
      </div>
      {append ? <div className="input-append">{append}</div> : null}
    </div>
  );
};

export default Input;
