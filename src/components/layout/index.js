import React from 'react';
import View from 'views';

const Layout = (props) => {
  return (
    <div className='flex flex-auto flex-col h-[100vh]'>
      <View {...props} />
    </div>
  );
};

export default Layout;
