import React from 'react';
import Select, { components } from 'react-select';

const CustomSelect = ({
  label,
  inputId,
  options,
  value,
  onChange,
  placeholder = 'Select...',
  isClearable = false,
  isSearchable = true,
  isDisabled = false,
  isMulti = false,
  menuPlacement = 'auto',
  error,
  className = '',
  ...props
}) => {
  const customClassNames = {
    control: (state) => `
            select flex w-25[px] items-center justify-between  rounded border bg-white px-2 py-1 text-sm  transition-colors duration-150 ease-in-out
            ${
              isDisabled
                ? 'bg-gray-50 cursor-not-allowed opacity-50'
                : 'hover:border-gray-400'
            }
            ${
              state.isFocused
                ? 'border-blue-500 ring-1 ring-blue-500'
                : 'border-gray-300'
            }
            ${error ? 'border-red-500 ring-1 ring-red-500' : ''}
        `,
    valueContainer: () => 'flex items-center gap-1 py-0.5',
    placeholder: () => 'text-gray-600',
    input: () => 'm-0 p-0 text-gray-800',
    singleValue: () => `
            text-gray-800
            ${isDisabled ? 'text-gray-400' : ''}
        `,
    multiValue: () =>
      'flex items-center rounded bg-blue-100 text-blue-800 text-xs font-medium m-0.5',
    multiValueLabel: () => 'px-2 py-0.5',
    multiValueRemove: () =>
      'text-blue-600 hover:bg-blue-200 hover:text-blue-800 px-1 rounded-r cursor-pointer',
    indicatorsContainer: () => 'flex items-center divide-x divide-gray-300',
    indicatorSeparator: () => 'hidden',
    dropdownIndicator: () => `
            p-1.5 text-gray-400 rounded transition-colors duration-150 ease-in-out
            ${
              isDisabled
                ? 'cursor-not-allowed opacity-50'
                : 'hover:text-gray-600 hover:bg-gray-100 cursor-pointer'
            }
        `,
    clearIndicator: () => `
            p-1.5 text-gray-400 rounded transition-colors duration-150 ease-in-out
            ${
              isDisabled
                ? 'cursor-not-allowed opacity-50'
                : 'hover:text-red-600 hover:bg-red-50 cursor-pointer'
            }
        `,
    menu: () =>
      'mt-1 absolute w-full rounded border border-gray-300 bg-white shadow-lg z-10',
    menuList: () => 'max-h-60 overflow-y-auto p-1',
    option: (state) => `
            px-3 py-2 text-sm rounded cursor-default transition-colors duration-150 ease-in-out
            ${
              state.isDisabled
                ? 'text-gray-400 cursor-not-allowed'
                : state.isSelected
                ? 'bg-blue-600 fo text-white'
                : state.isFocused
                ? 'bg-gray-100 text-gray-800'
                : 'hover:bg-blue-100 hover:text-blue-800'
            }
            ${
              state.isSelected && state.isFocused
                ? 'bg-blue-600 text-white'
                : ''
            }
        `,
    noOptionsMessage: () => 'px-3 py-2 text-sm text-gray-500',
    loadingMessage: () => 'px-3 py-2 text-sm text-gray-500',
  };

  const CustomDropdownIndicator = (props) => (
    <components.DropdownIndicator {...props}></components.DropdownIndicator>
  );

  const CustomClearIndicator = (props) => (
    <components.ClearIndicator {...props}></components.ClearIndicator>
  );

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          {label}
        </label>
      )}
      <Select
        inputId={inputId}
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isClearable={isClearable}
        isSearchable={isSearchable}
        isDisabled={isDisabled}
        isMulti={isMulti}
        menuPlacement={menuPlacement}
        unstyled
        classNames={customClassNames}
        components={{
          ...(isClearable && { ClearIndicator: CustomClearIndicator }),
          DropdownIndicator: CustomDropdownIndicator,
        }}
        {...props}
      />
      {error && <p className='mt-1 text-xs text-red-600'>{error}</p>}
    </div>
  );
};

export default CustomSelect;
