import React, { forwardRef } from 'react';
import classNames from 'classnames';

const TBody = forwardRef((props, ref) => {
  const {
    children,
    className,
    asElement: Component = 'tbody',
    ...rest
  } = props;

  const tBodyClass = classNames(Component !== 'tbody' && 'tbody', className);

  return (
    <Component className={tBodyClass} {...rest} ref={ref}>
      {children}
    </Component>
  );
});

export default TBody;
