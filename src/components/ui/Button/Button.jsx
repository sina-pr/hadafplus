import React from 'react';
import classNames from 'classnames';

const SimpleSpinner = ({ className = '' }) => (
  <svg
    className={classNames('animate-spin h-5 w-5 text-current', className)}
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
  >
    <circle
      className='opacity-25'
      cx='12'
      cy='12'
      r='10'
      stroke='currentColor'
      strokeWidth='4'
    ></circle>
    <path
      className='opacity-75'
      fill='currentColor'
      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
    ></path>
  </svg>
);

const Button = React.forwardRef((props, ref) => {
  const {
    children,
    icon,
    className,
    variant = 'primary',
    block = false,
    disabled = false,
    loading = false,
    onClick,
    type = 'button',
    ...rest
  } = props;

  const solidColorClasses = `
    bg-blue-600 hover:bg-blue-700 active:bg-blue-800
    focus:ring-blue-500
  `;

  // Combine all classes using classNames utility
  const classes = classNames(
    'button',
    variant,
    solidColorClasses, // Apply the solid color theme
    block ? 'w-full' : '', // Apply block style if needed
    disabled || loading ? 'disabled' : '', // Apply disabled style
    className // Allow overriding/adding classes via props
  );

  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    onClick?.(e);
  };

  const renderChildren = () => {
    if (loading) {
      return (
        <span className='flex items-center justify-center'>
          <SimpleSpinner className='mr-2' />
          Loading...
        </span>
      );
    }

    // If icon and children are provided
    if (icon && children) {
      return (
        <span className='flex items-center justify-center'>
          {/* Adjust icon margin/size as needed */}
          <span className='mr-2'>{icon}</span>
          <span>{children}</span>
        </span>
      );
    }

    // If only icon is provided (icon button)
    if (icon && !children) {
      // You might want different padding/sizing for icon-only buttons
      // Add specific classes via `className` prop if needed
      return <>{icon}</>;
    }

    // Default: only children
    return <>{children}</>;
  };

  return (
    <button
      ref={ref}
      className={classes}
      disabled={disabled || loading} // Set disabled attribute
      onClick={handleClick}
      type={type}
      {...rest} // Spread other native button props
    >
      {renderChildren()}
    </button>
  );
});

// Add display name for debugging
Button.displayName = 'Button';

export default Button;
