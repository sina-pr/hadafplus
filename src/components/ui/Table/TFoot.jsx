import React, { forwardRef } from 'react';
import classNames from 'classnames';

const TFoot = forwardRef((props, ref) => {
  const {
    children,
    className,
    asElement: Component = 'tfoot',
    ...rest
  } = props;

  const tBodyClass = classNames(Component !== 'tfoot' && 'tfoot', className);

  return (
    <Component className={tBodyClass} {...rest} ref={ref}>
      {children}
    </Component>
  );
});

export default TFoot;
