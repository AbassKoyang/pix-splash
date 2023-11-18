// store.js
import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '@/redux/searchSplice';
import statsReducer from '@/redux/statsSplice'

const store = configureStore({
  reducer: {
    search: searchReducer,
    stats: statsReducer,
  },
});

export default store;
