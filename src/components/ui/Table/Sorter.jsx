import React from 'react';

import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const Sorter = ({ sort }) => {
  const color = `text-indigo-600`;

  const renderSort = () => {
    if (typeof sort === 'boolean' && !sort) {
      return <FaSort />;
    }

    if (typeof sort === 'string' && sort === 'asc') {
      return <FaSortDown className={color} />;
    }

    if (typeof sort === 'string' && sort === 'desc') {
      return <FaSortUp className={color} />;
    }
  };

  return <div className='inline-flex'>{renderSort()}</div>;
};

export default Sorter;
