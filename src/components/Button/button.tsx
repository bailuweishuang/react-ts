import * as React from 'react';
import classNames from 'classnames';

export type ButtonSize = 'lg' | 'sm';
export type ButtonType = 'primary' | 'default' | 'danger' | 'link';

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
}

type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps & BaseButtonProps>;

const Button: React.FC<ButtonProps> = (props) => {
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
