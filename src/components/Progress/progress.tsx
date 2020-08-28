import React, { FC } from 'react';
import { ThemeProps } from '../Icon/icon';

interface progressPorps {
  /**进度值 */
  percent: number;
  /**高度 */
  strokeHeight?: number;
  /**是否显示文字 */
  showText?: boolean;
  /**自定义样式 */
  style?: React.CSSProperties;
  /**主题颜色 */
  theme?: ThemeProps;
}

/**
 * 进度条
 * ### 引用方法
 *
 * ~~~js
 * import { Progress } from 'react-ts'
 * ~~~
 */
export const Progress: FC<progressPorps> = (props) => {
  const { percent, strokeHeight, showText, style, theme } = props;
  return (
    <div className="viking-progress-bar" style={style}>
      <div className="viking-progress-bar-outer" style={{ height: `${strokeHeight}px` }}>
        <div className={`viking-progress-bar-inner color-${theme}`} style={{ width: `${percent}%` }}>
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  );
};

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: 'primary'
};
export default Progress;
