import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import { domainApi } from '../services/domainApi'; // Adjust the path based on your folder structure
import domainReducer from './slices/domainSlice'; // Adjust path as needed

export const store = configureStore({
  reducer: {
    [domainApi.reducerPath]: domainApi.reducer,
    domainUi: domainReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(domainApi.middleware),

  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);
