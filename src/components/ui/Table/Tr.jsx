import React from 'react';
import classNames from 'classnames';

const Tr = React.forwardRef((props, ref) => {
  const { children, asElement: Component = 'tr', className, ...rest } = props;

  const trClass = classNames(Component !== 'tr' && 'tr', className);

  return (
    <Component className={trClass} ref={ref} {...rest}>
      {children}
    </Component>
  );
});

export default Tr;
