import React, { Suspense } from 'react';
import Landing from './landing';

const Views = () => {
  return (
    <Suspense fallback={<h1>Loading</h1>}>
      <Landing />
    </Suspense>
  );
};

export default Views;
