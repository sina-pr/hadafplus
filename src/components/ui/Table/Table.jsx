import React from 'react';
import classNames from 'classnames';

const Table = React.forwardRef((props, ref) => {
  const {
    borderlessRow,
    children,
    className,
    hoverable,
    compact,
    oveerflow = true,
    asElement: Component = 'table',
    ...rest
  } = props;

  const tableClass = classNames(
    Component === 'table' ? 'table-default' : 'table-flex',
    hoverable && 'table-hover',
    compact && 'table-compact',
    borderlessRow && 'borderless-row',
    className
  );

  return (
    <div className={classNames(oveerflow && 'overflow-x-auto')}>
      <Component className={tableClass} {...rest} ref={ref}>
        {children}
      </Component>
    </div>
  );
});

Table.defaultProps = {
  hoverable: true,
  compact: false,
  asElement: 'table',
  borderlessRow: false,
};

export default Table;
