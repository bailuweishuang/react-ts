import React, { FC, ButtonHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import { CheckOutlined, InfoOutlined, CloseOutlined, ExclamationOutlined } from '@ant-design/icons';
export type AlertType = 'success' | 'default' | 'danger' | 'warning';

export enum IconType {
  success = 'success',
  default = 'default',
  danger = 'danger',
  warning = 'warning'
}

interface BaseAlertProps {
  /**样式名 */
  className?: string;
  /**不同类型 */
  alertType?: string;
  /**警告提示内容 */
  title?: string;
  /**警告提示的辅助性文字介绍 */
  description?: string;
  /**自定义关闭按钮 */
  closeBtn?: string | ReactNode;
  /**自定义图标，showIcon 为 true 时有效 */
  icon?: ReactNode;
  /**是否显示辅助图标 */
  showIcon?: boolean;
  /**是否显显示关闭按钮 */
  showClose?: boolean;
  /**关闭时触发的回调函数 */
  onClose?: () => void;
}
type NativeButtonProps = BaseAlertProps & ButtonHTMLAttributes<HTMLElement>;
export type AlertProps = NativeButtonProps;
/**
 * 警告提示，展现需要关注的信息。
 * ### 引用方法
 *
 * ~~~js
 * import { Alert } from 'react-ts'
 * ~~~
 */
export const Alert: FC<AlertProps> = (props) => {
  const [closing, setclosing] = React.useState(false);
  const { className, alertType, title, description, showIcon } = props;
  const classes = classNames('alert', className, {
    [`alert-${alertType}`]: alertType
  });
  const IconRender = () => {
    const { icon, alertType } = props;
    const iconClass = classNames('alert-icon', {
      [`icon-${alertType}`]: alertType,
      [`icon-big-${alertType}`]: description,
      'icon-big': description
    });
    if (icon) {
      return icon;
    }
    if (alertType === IconType.default) return <InfoOutlined className={iconClass} />;
    if (alertType === IconType.success) return <CheckOutlined className={iconClass} />;
    if (alertType === IconType.danger) return <CloseOutlined className={iconClass} />;
    if (alertType === IconType.warning) return <ExclamationOutlined className={iconClass} />;
  };

  const handleClose = () => {
    const { onClose } = props;
    setclosing(true);
    onClose();
  };

  const closeRender = () => {
    const { closeBtn, showClose } = props;
    let content;
    if (typeof closeBtn === 'string') {
      content = <span>{closeBtn}</span>;
    } else {
      content = closeBtn;
    }
    return showClose ? (
      <button className="close-btn" onClick={handleClose}>
        {content}
      </button>
    ) : null;
  };
  return !closing ? (
    <div data-show={true} className={classes} data-testid="test-alert">
      {showIcon ? IconRender() : null}
      <span
        className={classNames({
          ['alert-description-title']: description
        })}
      >
        {title}
      </span>
      {closeRender()}
      {description ? (
        <span
          className={classNames({
            description: description
          })}
        >
          {description}
        </span>
      ) : null}
    </div>
  ) : null;
};
Alert.defaultProps = {
  alertType: 'default',
  showIcon: false,
  closeBtn: <CloseOutlined />,
  showClose: false,
  onClose: () => {}
};
export default Alert;
