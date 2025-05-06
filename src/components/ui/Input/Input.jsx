import React from 'react';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import { useMemo } from 'react';

const Input = React.forwardRef((props, ref) => {
  const {
    className,
    disabled = false,
    invalid,
    type = 'text',
    style,
    value,
    onChange,
    placeholder,
    field,
    form,
    ...rest
  } = props;

  const isInvalid = useMemo(() => {
    let validate = false;
    if (!isEmpty(form)) {
      const { touched, errors } = form;
      const touchedField = get(touched, field.name);
      const errorField = get(errors, field.name);
      validate = touchedField && errorField;
    }
    if (typeof invalid === 'boolean') {
      validate = invalid;
    }
    return validate;
  }, [form, invalid, field]);

  // --- Combine Classes ---
  const inputClasses = classNames(
    'input',
    isInvalid && 'input-invalid',
    disabled && 'input-disabled',
    className
  );

  // --- Render Input ---
  return (
    <input
      ref={ref}
      type={type}
      className={inputClasses}
      style={style}
      disabled={disabled}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      aria-invalid={invalid ? 'true' : 'false'}
      {...field}
      {...rest}
    />
  );
});

Input.displayName = 'Input';

export default Input;
