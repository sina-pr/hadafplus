import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import Views from './views';

function App() {
  return (
    <Provider store={store}>
      <Views />
    </Provider>
  );
}

export default App;
