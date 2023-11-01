// store.js
import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '@/redux/searchSplice';

const store = configureStore({
  reducer: {
    search: searchReducer,
    // Add other reducers if you have them
  },
});

export default store;
