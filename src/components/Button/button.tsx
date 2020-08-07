import React, { ButtonHTMLAttributes, AnchorHTMLAttributes, FC } from 'react';
import classNames from 'classnames';

export type ButtonSize = 'lg' | 'sm';
export type ButtonType = 'primary' | 'default' | 'danger' | 'link';

interface BaseButtonProps {
  /**样式 */
  className?: string;
  /**是否禁用 */
  disabled?: boolean;
  /**尺寸大小 */
  size?: ButtonSize;
  /**不同类型 */
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
}

type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
/**
 * 按钮用于开始一个即时操作
 * ### 引用方法
 *
 * ~~~js
 * import { Button } from 'react-ts'
 * ~~~
 */
export const Button: FC<ButtonProps> = (props) => {
  const { btnType, disabled, size, children, href, className, ...moreProps } = props;

  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === 'link' && disabled
  });

  if (btnType === 'link' && href) {
    return (
      <a className={classes} href={href} {...moreProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...moreProps}>
        {children}
      </button>
    );
  }
};

Button.defaultProps = {
  btnType: 'default',
  disabled: false
};

export default Button;
