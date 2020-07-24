import * as React from 'react';
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
  className?: string;
  alertType?: string;
  title?: string;
  description?: string;
  closeBtn?: string | React.ReactNode;
  icon?: React.ReactNode;
  showIcon?: boolean;
  showClose?: boolean;
  onClose?: () => void;
}
type NativeButtonProps = React.ButtonHTMLAttributes<HTMLElement>;
export type AlertProps = BaseAlertProps & NativeButtonProps;

const Alert: React.FC<AlertProps> = (props) => {
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
    <div data-show={true} className={classes} data-testid='test-alert'>
      {showIcon ? IconRender() : null}
      <span
        className={classNames({
          ['alert-description-title']: description
        })}
      >
        {title}
      </span>
      {closeRender()}
      <span
        className={classNames({
          description: description
        })}
      >
        {description}
      </span>
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
