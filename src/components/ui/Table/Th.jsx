import React from 'react';
import classNames from 'classnames';

const Th = React.forwardRef((props, ref) => {
  const { children, className, asElement: Component = 'th', ...rest } = props;

  const thClass = classNames(Component !== 'th' && 'th', className);

  return (
    <Component className={thClass} {...rest} ref={ref}>
      {children}
    </Component>
  );
});

export default Th;
