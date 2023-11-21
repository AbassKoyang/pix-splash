// store.js
import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '@/redux/searchSplice';

const store = configureStore({
  reducer: {
    search: searchReducer,
  },
});

export default store;
