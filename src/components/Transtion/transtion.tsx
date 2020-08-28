import React, { FC } from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

export type AnimationName = 'zoom-in-top' | 'zoom-in-left' | 'zoom-in-bottom' | 'zoom-in-right';

type TransitionProps = CSSTransitionProps & {
  /**不同方向 */
  animation?: AnimationName;
  /**是否需要包一层 */
  wrapper?: boolean;
};
/**
 * 动画。
 * ### 引用方法
 *
 * ~~~js
 * import { Transition } from 'react-ts'
 * ~~~
 */
export const Transition: FC<TransitionProps> = (props) => {
  const { children, classNames, animation, wrapper, ...restProps } = props;
  return (
    <CSSTransition classNames={classNames ? classNames : animation} {...restProps}>
      {wrapper ? <div>{children}</div> : children}
    </CSSTransition>
  );
};
Transition.defaultProps = {
  unmountOnExit: true,
  appear: true
};

export default Transition;
