import React from 'react';
import classNames from 'classnames';

const Td = React.forwardRef((props, ref) => {
  const { children, className, asElement: Component = 'td', ...rest } = props;

  const tdClass = classNames(Component !== 'td' && 'td', className);

  return (
    <Component className={tdClass} ref={ref} {...rest}>
      {children}
    </Component>
  );
});

Td.defaultProps = {
  asElement: 'td',
};

export default Td;
