import React from 'react';
import classNames from 'classnames';

const THead = React.forwardRef((props, ref) => {
  const {
    children,
    asElement: Component = 'thead',
    className,
    ...rest
  } = props;

  const tHeadClass = classNames(Component !== 'thead' && 'thead', className);

  return (
    <Component className={tHeadClass} {...rest} ref={ref}>
      {children}
    </Component>
  );
});

export default THead;
